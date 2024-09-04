import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import BarkTypeSelection from './components/BarkTypeSelection';
import BarkColourSelection from './components/BarkColourSelection';
import FlowerArrangement from './components/FlowerArrangement';
import FlowerColour from './components/FlowerColour';
import FruitTypeSelection from './components/FruitTypeSelection';
import FruitShapeSelection from './components/FruitShapeSelection';
import FruitColourSelection from './components/FruitColourSelection';
import LeafTypeSelection from './components/LeafTypeSelection';
import LeafAttributesSelection from './components/LeafAttributesSelection';
import FinalLeafSelection from './components/FinalLeafSelection';
import ContactPage from './components/ContactPage';
import AboutUsPage from './components/AboutUsPage';
import ReferencesPage from './components/ReferencesPage';
import DonateUsPage from './components/DonateUsPage';
import ImageGallery from './components/ImageGallery'; // Import ImageGallery
import FullGallery from './components/FullGallery';   // Import FullGallery
import DocumentView from './components/DocumentView'; // Import DocumentView

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bark-type-selection" element={<BarkTypeSelection />} />
        <Route path="/bark-colour-selection" element={<BarkColourSelection />} />
        <Route path="/flower-arrangement" element={<FlowerArrangement />} />
        <Route path="/flower-colour" element={<FlowerColour />} />
        <Route path="/fruit-type-selection" element={<FruitTypeSelection />} />
        <Route path="/fruit-shape-selection" element={<FruitShapeSelection />} />
        <Route path="/fruit-colour-selection" element={<FruitColourSelection />} />
        <Route path="/leaf-type-selection" element={<LeafTypeSelection />} />
        <Route path="/leaf-attributes-selection" element={<LeafAttributesSelection />} />
        <Route path="/final-leaf-selection" element={<FinalLeafSelection />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/references" element={<ReferencesPage />} />
        <Route path="/donate" element={<DonateUsPage />} />
        
        {/* New routes for the Image Gallery */}
        <Route path="/image-gallery" element={<ImageGallery />} /> {/* Main gallery page with 'Show More' */}
        <Route path="/full-gallery" element={<FullGallery />} /> {/* Full gallery page */}

        {/* New route for DocumentView */}
        <Route path="/document-view" element={<DocumentView />} /> {/* Page to show document content */}
      </Routes>
    </Router>
  );
}

export default App;
