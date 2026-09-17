import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CompareProvider } from './context/CompareContext';
import { SavedProvider } from './context/SavedContext';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import { Explore } from './pages/Explore';
import { ToolDetails } from './pages/ToolDetails';
import { Compare } from './pages/Compare';
import { Recommendations } from './pages/Recommendations';
import { Research } from './pages/Research';
import { Profile } from './pages/Profile';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <CompareProvider>
        <SavedProvider>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="explore" element={<Explore />} />
              <Route path="tools/:id" element={<ToolDetails />} />
              <Route path="compare" element={<Compare />} />
              <Route path="recommendations" element={<Recommendations />} />
              <Route path="recommend" element={<Recommendations />} />
              <Route path="research" element={<Research />} />
              <Route path="profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </SavedProvider>
      </CompareProvider>
    </BrowserRouter>
  );
};

export default App;
