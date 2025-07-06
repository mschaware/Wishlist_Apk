import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import AuthForm from './components/AuthForm';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import WishlistView from './components/WishlistView';
import { useWishlist } from './context/WishlistContext';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { currentWishlist } = useWishlist();
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  if (!isAuthenticated) {
    return (
      <AuthForm 
        mode={authMode} 
        onToggleMode={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')} 
      />
    );
  }

  return (
    <Layout>
      {currentWishlist ? <WishlistView /> : <Dashboard />}
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <WishlistProvider>
        <AppContent />
      </WishlistProvider>
    </AuthProvider>
  );
};

export default App;