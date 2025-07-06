import React, { useState } from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { Plus, Heart, Users, Calendar, ShoppingBag, Trash2 } from 'lucide-react';
import CreateWishlistModal from './CreateWishlistModal';

const Dashboard: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { wishlists, setCurrentWishlist, deleteWishlist } = useWishlist();
  const { user } = useAuth();

  const handleWishlistClick = (wishlist: any) => {
    setCurrentWishlist(wishlist);
  };

  const handleDeleteWishlist = async (e: React.MouseEvent, wishlistId: string) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this wishlist?')) {
      await deleteWishlist(wishlistId);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          Your Wishlists
        </h1>
        <p className="text-gray-600 text-lg">
          Create, manage, and share your product wishlists with friends
        </p>
      </div>

      {wishlists.length === 0 ? (
        <div className="text-center py-16">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-12 max-w-md mx-auto border border-purple-100">
            <Heart className="w-16 h-16 text-purple-300 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No wishlists yet</h3>
            <p className="text-gray-600 mb-6">
              Start by creating your first wishlist to organize your favorite products
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 focus:ring-4 focus:ring-purple-300 transition-all flex items-center space-x-2 mx-auto"
            >
              <Plus className="w-5 h-5" />
              <span>Create Your First Wishlist</span>
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">
              {wishlists.length} {wishlists.length === 1 ? 'Wishlist' : 'Wishlists'}
            </h2>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 focus:ring-4 focus:ring-purple-300 transition-all flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>New Wishlist</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlists.map((wishlist) => (
              <div
                key={wishlist.id}
                onClick={() => handleWishlistClick(wishlist)}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-purple-100 hover:border-purple-200 transition-all cursor-pointer hover:shadow-lg group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                      {wishlist.name}
                    </h3>
                    {wishlist.description && (
                      <p className="text-gray-600 text-sm mt-1">{wishlist.description}</p>
                    )}
                  </div>
                  {wishlist.createdBy === user?.id && (
                    <button
                      onClick={(e) => handleDeleteWishlist(e, wishlist.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <ShoppingBag className="w-4 h-4" />
                    <span>{wishlist.products.length} {wishlist.products.length === 1 ? 'item' : 'items'}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{wishlist.collaborators.length + 1} {wishlist.collaborators.length + 1 === 1 ? 'person' : 'people'}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Created {formatDate(wishlist.createdAt)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {wishlist.createdBy === user?.id ? 'Owned by you' : 'Shared with you'}
                    </span>
                    <div className="text-purple-600 text-sm font-medium">
                      View Details →
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {showCreateModal && (
        <CreateWishlistModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => setShowCreateModal(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;