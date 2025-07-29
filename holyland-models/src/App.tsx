import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import FloatingAccessibility from './components/FloatingAccessibility';

console.log('App.tsx loaded, importing FloatingAccessibility');

import Home from './pages/Home';
import Models from './pages/Models';
import ModelProfile from './pages/ModelProfile';
import Contact from './pages/Contact';
import ForAgencies from './pages/ForAgencies';

const App: React.FC = () => {
  console.log('App component rendering');
  
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main style={{ flex: 1, paddingTop: '76px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/models" element={<Models />} />
            <Route path="/models/:id" element={<ModelProfile />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/for-agencies" element={<ForAgencies />} />
          </Routes>
        </main>
        <Footer />
        <FloatingAccessibility />
      </div>
    </Router>
  );
};

export default App;
