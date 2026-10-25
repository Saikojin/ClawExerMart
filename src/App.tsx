import { useState, useMemo } from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar, NavTab } from './components/Navbar';
import { Footer } from './components/Footer';
import { Catalog } from './components/Catalog';
import { SellPortal } from './components/SellPortal';
import { GymSpaceMatcher } from './components/GymSpaceMatcher';
import { StoryTestPlanView } from './components/StoryTestPlanView';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { BreakUiToggle } from './components/BreakUiToggle';
import { EquipmentItem } from './types/equipment';
import { DatasetMode, getEquipmentDataset } from './data/mockEquipment';

function getInitialDatasetMode(): DatasetMode {
  if (typeof window === 'undefined') return 'demo';
  const param = new URLSearchParams(window.location.search).get('data');
  if (param === 'worst' || param === 'single' || param === 'empty' || param === 'demo') {
    return param;
  }
  return 'demo';
}

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('catalog');
  const [selectedItem, setSelectedItem] = useState<EquipmentItem | null>(null);
  const [datasetMode, setDatasetMode] = useState<DatasetMode>(getInitialDatasetMode);

  const activeItems = useMemo(() => getEquipmentDataset(datasetMode), [datasetMode]);

  const handleDatasetModeChange = (nextMode: DatasetMode) => {
    setDatasetMode(nextMode);
    if (typeof window !== 'undefined' && window.history?.replaceState) {
      const url = new URL(window.location.href);
      if (nextMode === 'demo') {
        url.searchParams.delete('data');
      } else {
        url.searchParams.set('data', nextMode);
      }
      window.history.replaceState({}, '', url.toString());
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950 pb-14">
        <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
          {activeTab === 'catalog' && (
            <Catalog
              items={activeItems}
              onSelectItem={(item) => setSelectedItem(item)}
              onNavigateSell={() => setActiveTab('sell')}
              onNavigateSpace={() => setActiveTab('space-matcher')}
            />
          )}

          {activeTab === 'sell' && <SellPortal />}

          {activeTab === 'space-matcher' && (
            <GymSpaceMatcher
              items={activeItems}
              onSelectItem={(item) => setSelectedItem(item)}
            />
          )}

          {activeTab === 'story-qa' && <StoryTestPlanView />}
        </main>

        <Footer />

        {/* SeikoClaw break-ui adversarial dataset switcher */}
        <BreakUiToggle mode={datasetMode} onChange={handleDatasetModeChange} />

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
