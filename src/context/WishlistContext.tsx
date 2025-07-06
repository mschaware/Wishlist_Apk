import React, { createContext, useContext, useState, useEffect } from 'react';
import { Wishlist, Product } from '../types';
import { useAuth } from './AuthContext';

interface WishlistContextType {
  wishlists: Wishlist[];
  currentWishlist: Wishlist | null;
  createWishlist: (name: string, description?: string) => Promise<string>;
  addProduct: (wishlistId: string, product: Omit<Product, 'id' | 'addedBy' | 'addedAt'>) => Promise<void>;
  removeProduct: (wishlistId: string, productId: string) => Promise<void>;
  updateProduct: (wishlistId: string, productId: string, updates: Partial<Product>) => Promise<void>;
  inviteCollaborator: (wishlistId: string, email: string) => Promise<boolean>;
  setCurrentWishlist: (wishlist: Wishlist | null) => void;
  deleteWishlist: (wishlistId: string) => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  const [currentWishlist, setCurrentWishlist] = useState<Wishlist | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadWishlists();
    }
  }, [user]);

  const loadWishlists = () => {
    const storedWishlists = JSON.parse(localStorage.getItem('wishlists') || '[]');
    const userWishlists = storedWishlists.filter((w: Wishlist) => 
      w.createdBy === user?.id || w.collaborators.includes(user?.id || '')
    );
    setWishlists(userWishlists);
  };

  const saveWishlists = (updatedWishlists: Wishlist[]) => {
    const allWishlists = JSON.parse(localStorage.getItem('wishlists') || '[]');
    const otherWishlists = allWishlists.filter((w: Wishlist) => 
      !updatedWishlists.some(uw => uw.id === w.id)
    );
    const newAllWishlists = [...otherWishlists, ...updatedWishlists];
    localStorage.setItem('wishlists', JSON.stringify(newAllWishlists));
    setWishlists(updatedWishlists);
  };

  const createWishlist = async (name: string, description?: string): Promise<string> => {
    if (!user) throw new Error('User not authenticated');

    const newWishlist: Wishlist = {
      id: Date.now().toString(),
      name,
      description,
      createdBy: user.id,
      createdAt: new Date(),
      collaborators: [],
      products: [],
      isPublic: false,
    };

    const updatedWishlists = [...wishlists, newWishlist];
    saveWishlists(updatedWishlists);
    return newWishlist.id;
  };

  const addProduct = async (wishlistId: string, productData: Omit<Product, 'id' | 'addedBy' | 'addedAt'>): Promise<void> => {
    if (!user) throw new Error('User not authenticated');

    const product: Product = {
      ...productData,
      id: Date.now().toString(),
      addedBy: user.id,
      addedAt: new Date(),
    };

    const updatedWishlists = wishlists.map(w => 
      w.id === wishlistId 
        ? { ...w, products: [...w.products, product] }
        : w
    );

    saveWishlists(updatedWishlists);
    
    if (currentWishlist?.id === wishlistId) {
      setCurrentWishlist(updatedWishlists.find(w => w.id === wishlistId) || null);
    }
  };

  const removeProduct = async (wishlistId: string, productId: string): Promise<void> => {
    const updatedWishlists = wishlists.map(w => 
      w.id === wishlistId 
        ? { ...w, products: w.products.filter(p => p.id !== productId) }
        : w
    );

    saveWishlists(updatedWishlists);
    
    if (currentWishlist?.id === wishlistId) {
      setCurrentWishlist(updatedWishlists.find(w => w.id === wishlistId) || null);
    }
  };

  const updateProduct = async (wishlistId: string, productId: string, updates: Partial<Product>): Promise<void> => {
    const updatedWishlists = wishlists.map(w => 
      w.id === wishlistId 
        ? { 
            ...w, 
            products: w.products.map(p => 
              p.id === productId ? { ...p, ...updates } : p
            )
          }
        : w
    );

    saveWishlists(updatedWishlists);
    
    if (currentWishlist?.id === wishlistId) {
      setCurrentWishlist(updatedWishlists.find(w => w.id === wishlistId) || null);
    }
  };

  const inviteCollaborator = async (wishlistId: string, email: string): Promise<boolean> => {
    // Mock invitation - in real app, this would send an email
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const invitedUser = users.find((u: any) => u.email === email);
    
    if (!invitedUser) return false;

    const updatedWishlists = wishlists.map(w => 
      w.id === wishlistId 
        ? { ...w, collaborators: [...w.collaborators, invitedUser.id] }
        : w
    );

    saveWishlists(updatedWishlists);
    
    if (currentWishlist?.id === wishlistId) {
      setCurrentWishlist(updatedWishlists.find(w => w.id === wishlistId) || null);
    }

    return true;
  };

  const deleteWishlist = async (wishlistId: string): Promise<void> => {
    const updatedWishlists = wishlists.filter(w => w.id !== wishlistId);
    saveWishlists(updatedWishlists);
    
    if (currentWishlist?.id === wishlistId) {
      setCurrentWishlist(null);
    }
  };

  return (
    <WishlistContext.Provider value={{
      wishlists,
      currentWishlist,
      createWishlist,
      addProduct,
      removeProduct,
      updateProduct,
      inviteCollaborator,
      setCurrentWishlist,
      deleteWishlist,
    }}>
      {children}
    </WishlistContext.Provider>
  );
};