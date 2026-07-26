import { useState, type FC } from 'react';
import { Tabs, type TabItem } from '../components/Tabs';

export const TabsPlayground: FC = () => {
  const [activeTabLog, setActiveTabLog] = useState<string>('overview');

  const tabItems: TabItem[] = [
    {
      id: 'overview',
      label: 'Overview',
      content: (
        <div className="panel-content">
          <h3>Accessible Tabs Pattern</h3>
          <p>
            The Tab pattern organizes content into multiple panes, showing one pane at a time.
            This implementation uses automatic activation on arrow focus, reducing tab stops for keyboard users.
          </p>
        </div>
      ),
    },
    {
      id: 'keyboard',
      label: 'Keyboard Shortcuts',
      content: (
        <div className="panel-content">
          <h3>Keyboard Navigation Rules</h3>
          <ul className="feature-list">
            <li><kbd>Left Arrow</kbd> / <kbd>Right Arrow</kbd>: Navigate between adjacent tab controls.</li>
            <li><kbd>Home</kbd>: Instantly jump focus to the first active tab.</li>
            <li><kbd>End</kbd>: Instantly jump focus to the last active tab.</li>
            <li><kbd>Tab</kbd>: Moves focus into the active tabpanel container.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'aria-spec',
      label: 'W3C ARIA Specs',
      content: (
        <div className="panel-content">
          <h3>Role &amp; ARIA Relationships</h3>
          <p>
            Each tab is linked to its panel via <code>aria-controls</code> and <code>aria-labelledby</code>.
            Only the selected tab has <code>tabIndex={0}</code> (Roving Tabindex pattern), ensuring a single tab stop for the tablist.
          </p>
        </div>
      ),
    },
    {
      id: 'disabled-tab',
      label: 'Disabled Tab',
      disabled: true,
      content: (
        <div className="panel-content">
          <p>This tab is disabled and bypassed during keyboard navigation.</p>
        </div>
      ),
    },
  ];

  return (
    <section aria-labelledby="tabs-heading" className="playground-section">
      <div className="playground-header">
        <h2 id="tabs-heading">Tabs Component (W3C ARIA Pattern)</h2>
        <span className="status-badge active">Implemented</span>
      </div>

      <p className="section-description">
        Try navigating the tabs using your keyboard (<kbd>Left Arrow</kbd>, <kbd>Right Arrow</kbd>, <kbd>Home</kbd>, <kbd>End</kbd>).
      </p>

      <div className="demo-card full-width">
        <Tabs
          items={tabItems}
          defaultTabId="overview"
          ariaLabel="Accessibility Guidelines Tabs"
          onTabChange={(tabId) => setActiveTabLog(tabId)}
        />
        <div className="feedback-banner" role="status">
          Active Tab ID: <strong>{activeTabLog}</strong>
        </div>
      </div>

      <div className="a11y-checklist">
        <h3>Accessibility Features Tested:</h3>
        <ul>
          <li><strong>ARIA Roles:</strong> Container uses <code>role="tablist"</code>, items use <code>role="tab"</code>, content uses <code>role="tabpanel"</code>.</li>
          <li><strong>ARIA Attributes:</strong> <code>aria-selected="true/false"</code> on tabs, and reciprocal <code>aria-controls</code> &amp; <code>aria-labelledby</code>.</li>
          <li><strong>Roving Tabindex:</strong> Active tab has <code>tabIndex={0}</code>, inactive tabs have <code>tabIndex={-1}</code>.</li>
          <li><strong>Keyboard Support:</strong> <kbd>&larr;</kbd> / <kbd>&rarr;</kbd> cycles tabs, <kbd>Home</kbd> / <kbd>End</kbd> jumps to start / end.</li>
        </ul>
      </div>
    </section>
  );
};

