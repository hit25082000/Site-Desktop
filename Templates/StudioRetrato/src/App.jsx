import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Book from './pages/Book';
import ProtectedRoute from './components/ProtectedRoute';

import { IconContext } from '@phosphor-icons/react';

export default function App() {
  // Check for legacy URLs like book.html#data=... on mount and redirect
  useEffect(() => {
    const handleLegacyUrls = () => {
      const href = window.location.href;
      
      // If the URL has book.html or #data=
      if (href.includes('book.html') || href.includes('#data=')) {
        // Find the index of the data payload
        const hashIndex = href.indexOf('#data=');
        if (hashIndex !== -1) {
          const payload = href.substring(hashIndex);
          // Redirect to the React HashRouter book path with the payload
          window.location.replace(`/#/book${payload}`);
        } else if (href.includes('book.html')) {
          // If it just says book.html, go to /#/book
          window.location.replace('/#/book');
        }
      }
    };

    handleLegacyUrls();
    // Also listen to hashchange for legacy support
    window.addEventListener('hashchange', handleLegacyUrls);
    return () => window.removeEventListener('hashchange', handleLegacyUrls);
  }, []);

  return (
    <IconContext.Provider value={{ weight: "light" }}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route path="/book/:id" element={<Book />} />
          <Route path="/book" element={<Book />} />
          {/* Fallback to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </IconContext.Provider>
  );
}
