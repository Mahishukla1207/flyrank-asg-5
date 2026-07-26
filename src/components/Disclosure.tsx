import { useState, useId, type FC, type ReactNode } from 'react';

export interface DisclosureItem {
  id: string;
  title: string;
  content: ReactNode;
  defaultExpanded?: boolean;
}

export interface DisclosureProps {
  items: DisclosureItem[];
  allowMultiple?: boolean;
  headingLevel?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const Disclosure: FC<DisclosureProps> = ({
  items,
  allowMultiple = true,
  headingLevel: Heading = 'h3',
}) => {
  const baseId = useId();

  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    items.forEach((item) => {
      if (item.defaultExpanded) {
        initial.add(item.id);
      }
    });
    return initial;
  });

  const toggleItem = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) {
          next.clear();
        }
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="accordion-container">
      {items.map((item) => {
        const isExpanded = expandedIds.has(item.id);
        const buttonId = `disclosure-btn-${baseId}-${item.id}`;
        const panelId = `disclosure-panel-${baseId}-${item.id}`;

        return (
          <div key={item.id} className="disclosure-item">
            <Heading className="disclosure-heading">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isExpanded}
                aria-controls={panelId}
                className={`disclosure-trigger ${isExpanded ? 'expanded' : ''}`}
                onClick={() => toggleItem(item.id)}
              >
                <span>{item.title}</span>
                <svg
                  className={`disclosure-chevron ${isExpanded ? 'rotated' : ''}`}
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </Heading>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isExpanded}
              className={`disclosure-panel ${isExpanded ? 'visible' : ''}`}
            >
              <div className="disclosure-panel-inner">{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
