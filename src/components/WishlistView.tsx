import React, { useState } from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Plus, Users, Share2, Trash2, Edit3 } from 'lucide-react';
import AddProductModal from './AddProductModal';
import InviteModal from './InviteModal';

const WishlistView: React.FC = () => {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const { currentWishlist, setCurrentWishlist, removeProduct } = useWishlist();
  const { user } = useAuth();

  if (!currentWishlist) return null;

  const handleBack = () => {
    setCurrentWishlist(null);
  };

  const handleDeleteProduct = async (productId: string) => {
    if (window.confirm('Are you sure you want to remove this product?')) {
      await removeProduct(currentWishlist.id, productId);
    }
  };

  const getUserName = (userId: string) => {
    if (userId === user?.id) return 'You';
    // In a real app, you'd fetch user data from your backend
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find((u: any) => u.id === userId);
    return foundUser?.name || 'Unknown User';
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const totalValue = currentWishlist.products.reduce((sum, product) => sum + product.price, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowInvite(true)}
            className="flex items-center space-x-2 px-4 py-2 border border-purple-300 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>Invite</span>
          </button>
          <button
            onClick={() => setShowAddProduct(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 focus:ring-4 focus:ring-purple-300 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-purple-100">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{currentWishlist.name}</h1>
            {currentWishlist.description && (
              <p className="text-gray-600 mt-2">{currentWishlist.description}</p>
            )}
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-purple-600">{formatPrice(totalValue)}</div>
            <div className="text-sm text-gray-500">Total Value</div>
          </div>
        </div>

        <div className="flex items-center space-x-6 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>{currentWishlist.collaborators.length + 1} {currentWishlist.collaborators.length + 1 === 1 ? 'person' : 'people'}</span>
          </div>
          <div>
            Created {formatDate(currentWishlist.createdAt)}
          </div>
        </div>
      </div>

      {currentWishlist.products.length === 0 ? (
        <div className="text-center py-16">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-12 max-w-md mx-auto border border-purple-100">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Plus className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No products yet</h3>
            <p className="text-gray-600 mb-6">
              Start adding products to your wishlist to keep track of items you want
            </p>
            <button
              onClick={() => setShowAddProduct(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 focus:ring-4 focus:ring-purple-300 transition-all flex items-center space-x-2 mx-auto"
            >
              <Plus className="w-5 h-5" />
              <span>Add Your First Product</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentWishlist.products.map((product) => (
            <div
              key={product.id}
              className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden border border-purple-100 hover:border-purple-200 transition-all hover:shadow-lg group"
            >
              <div className="aspect-square bg-gray-100 relative overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop';
                  }}
                />
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xl font-bold text-purple-600">{formatPrice(product.price)}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Added by {getUserName(product.addedBy)}</span>
                  <span>{formatDate(product.addedAt)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showAddProduct && (
        <AddProductModal
          wishlistId={currentWishlist.id}
          onClose={() => setShowAddProduct(false)}
        />
      )}

      {showInvite && (
        <InviteModal
          wishlistId={currentWishlist.id}
          onClose={() => setShowInvite(false)}
        />
      )}
    </div>
  );
};

export default WishlistView;