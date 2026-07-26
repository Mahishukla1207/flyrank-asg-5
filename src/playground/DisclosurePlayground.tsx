import { useState, type FC } from 'react';
import { Disclosure, type DisclosureItem } from '../components/Disclosure';

export const DisclosurePlayground: FC = () => {
  const [allowMultiple, setAllowMultiple] = useState(true);

  const disclosureItems: DisclosureItem[] = [
    {
      id: 'item-1',
      title: 'What is a W3C ARIA Disclosure Pattern?',
      defaultExpanded: true,
      content: (
        <p>
          A disclosure is a button that controls the visibility of a section of content.
          When the content is hidden, the button has <code>aria-expanded="false"</code>.
          When expanded, it updates to <code>aria-expanded="true"</code>.
        </p>
      ),
    },
    {
      id: 'item-2',
      title: 'Keyboard Activation Controls',
      content: (
        <p>
          Because the trigger uses a native <code>&lt;button&gt;</code> element, users can toggle the panel state using either the <kbd>Enter</kbd> key or the <kbd>Space</kbd> bar automatically.
        </p>
      ),
    },
    {
      id: 'item-3',
      title: 'Heading Hierarchy Integration',
      content: (
        <p>
          Each disclosure button is wrapped in a semantic heading tag (e.g. <code>&lt;h3&gt;</code>), enabling screen reader users to jump quickly between disclosure sections using heading navigation keys.
        </p>
      ),
    },
    {
      id: 'item-4',
      title: 'Hidden Attribute vs Assistive Tech',
      content: (
        <p>
          Collapsed panels use the HTML <code>hidden</code> attribute, ensuring off-screen or collapsed content is completely hidden from screen readers and pointer devices alike.
        </p>
      ),
    },
  ];

  return (
    <section aria-labelledby="disclosure-heading" className="playground-section">
      <div className="playground-header">
        <h2 id="disclosure-heading">Disclosure / Accordion (W3C ARIA Pattern)</h2>
        <span className="status-badge active">Implemented</span>
      </div>

      <p className="section-description">
        Test toggling sections with <kbd>Enter</kbd> or <kbd>Space</kbd> keys. Toggle mode allows single or multi-expand behavior.
      </p>

      <div className="controls-bar">
        <label className="toggle-label">
          <input
            type="checkbox"
            checked={allowMultiple}
            onChange={(e) => setAllowMultiple(e.target.checked)}
            className="toggle-checkbox"
          />
          <span>Allow Multiple Panels Expanded Simultaneously</span>
        </label>
      </div>

      <div className="demo-card full-width">
        <Disclosure
          items={disclosureItems}
          allowMultiple={allowMultiple}
          headingLevel="h3"
        />
      </div>

      <div className="a11y-checklist">
        <h3>Accessibility Features Tested:</h3>
        <ul>
          <li><strong>Native Button Trigger:</strong> Triggers use <code>&lt;button&gt;</code> elements with natural <kbd>Enter</kbd> and <kbd>Space</kbd> activation.</li>
          <li><strong>State Communication:</strong> Uses dynamic <code>aria-expanded="true/false"</code> updates.</li>
          <li><strong>Controls Binding:</strong> Uses reciprocal <code>aria-controls="panel-id"</code> and <code>aria-labelledby="button-id"</code>.</li>
          <li><strong>Off-Screen Hiding:</strong> Collapsed content utilizes HTML <code>hidden</code> attribute and <code>role="region"</code>.</li>
          <li><strong>Heading Landmarks:</strong> Buttons are enclosed inside <code>&lt;h3&gt;</code> tags for heading navigation.</li>
        </ul>
      </div>
    </section>
  );
};

