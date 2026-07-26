import { useState } from 'react';
import { ModalPlayground } from './playground/ModalPlayground';
import { TabsPlayground } from './playground/TabsPlayground';
import { DisclosurePlayground } from './playground/DisclosurePlayground';

type ComponentTab = 'modal' | 'tabs' | 'disclosure';

export function App() {
  const [activeTab, setActiveTab] = useState<ComponentTab>('modal');

  return (
    <>
      <header className="header-container">
        <div className="header-content">
          <h1 className="main-title">Accessible Component Fundamentals</h1>
          <p className="subtitle">
            An interactive testing suite for accessibility patterns built with React &amp; TypeScript.
          </p>
        </div>
      </header>

      <main className="app-container">
        <nav className="nav-bar" aria-label="Component selector">
          <button
            type="button"
            className={`nav-button ${activeTab === 'modal' ? 'active' : ''}`}
            onClick={() => setActiveTab('modal')}
            aria-current={activeTab === 'modal' ? 'page' : undefined}
          >
            Modal Dialog
          </button>
          <button
            type="button"
            className={`nav-button ${activeTab === 'tabs' ? 'active' : ''}`}
            onClick={() => setActiveTab('tabs')}
            aria-current={activeTab === 'tabs' ? 'page' : undefined}
          >
            Tabs
          </button>
          <button
            type="button"
            className={`nav-button ${activeTab === 'disclosure' ? 'active' : ''}`}
            onClick={() => setActiveTab('disclosure')}
            aria-current={activeTab === 'disclosure' ? 'page' : undefined}
          >
            Disclosure
          </button>
        </nav>

        <section className="playground-area">
          {activeTab === 'modal' && <ModalPlayground />}
          {activeTab === 'tabs' && <TabsPlayground />}
          {activeTab === 'disclosure' && <DisclosurePlayground />}
        </section>
      </main>
    </>
  );
}

export default App;
