import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar, NavTab } from './components/Navbar';
import { Footer } from './components/Footer';
import { Catalog } from './components/Catalog';
import { SellPortal } from './components/SellPortal';
import { GymSpaceMatcher } from './components/GymSpaceMatcher';
import { StoryTestPlanView } from './components/StoryTestPlanView';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { EquipmentItem } from './types/equipment';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('catalog');
  const [selectedItem, setSelectedItem] = useState<EquipmentItem | null>(null);

  return (
    <CartProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950">
        <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
          {activeTab === 'catalog' && (
            <Catalog
              onSelectItem={(item) => setSelectedItem(item)}
              onNavigateSell={() => setActiveTab('sell')}
              onNavigateSpace={() => setActiveTab('space-matcher')}
            />
          )}

          {activeTab === 'sell' && <SellPortal />}

          {activeTab === 'space-matcher' && (
            <GymSpaceMatcher onSelectItem={(item) => setSelectedItem(item)} />
          )}

          {activeTab === 'story-qa' && <StoryTestPlanView />}
        </main>

        <Footer />

        {/* Global Modals & Drawers */}
        <ProductDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
