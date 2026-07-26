import { useState, useRef, useId, type FC, type ReactNode, type KeyboardEvent } from 'react';

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  defaultTabId?: string;
  ariaLabel?: string;
  onTabChange?: (tabId: string) => void;
}

export const Tabs: FC<TabsProps> = ({
  items,
  defaultTabId,
  ariaLabel = 'Content tabs',
  onTabChange,
}) => {
  const baseId = useId();
  const [activeTabId, setActiveTabId] = useState<string>(
    defaultTabId || items[0]?.id || ''
  );

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleTabSelect = (tabId: string) => {
    setActiveTabId(tabId);
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    const enabledIndices = items
      .map((item, idx) => (item.disabled ? -1 : idx))
      .filter((idx) => idx !== -1);

    if (enabledIndices.length === 0) return;

    const currentPos = enabledIndices.indexOf(currentIndex);
    let targetIndex = -1;

    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        targetIndex = enabledIndices[(currentPos + 1) % enabledIndices.length];
        break;
      case 'ArrowLeft':
        event.preventDefault();
        targetIndex =
          enabledIndices[(currentPos - 1 + enabledIndices.length) % enabledIndices.length];
        break;
      case 'Home':
        event.preventDefault();
        targetIndex = enabledIndices[0];
        break;
      case 'End':
        event.preventDefault();
        targetIndex = enabledIndices[enabledIndices.length - 1];
        break;
      default:
        return;
    }

    if (targetIndex !== -1) {
      const targetItem = items[targetIndex];
      handleTabSelect(targetItem.id);
      tabRefs.current[targetIndex]?.focus();
    }
  };

  return (
    <div className="tabs-container">
      <div role="tablist" aria-label={ariaLabel} className="tab-list">
        {items.map((item, index) => {
          const isSelected = item.id === activeTabId;
          const tabId = `tab-${baseId}-${item.id}`;
          const panelId = `panel-${baseId}-${item.id}`;

          return (
            <button
              key={item.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              id={tabId}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-controls={panelId}
              tabIndex={isSelected ? 0 : -1}
              disabled={item.disabled}
              className={`tab-item ${isSelected ? 'active' : ''}`}
              onClick={() => handleTabSelect(item.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {items.map((item) => {
        const isSelected = item.id === activeTabId;
        const tabId = `tab-${baseId}-${item.id}`;
        const panelId = `panel-${baseId}-${item.id}`;

        if (!isSelected) return null;

        return (
          <div
            key={item.id}
            id={panelId}
            role="tabpanel"
            aria-labelledby={tabId}
            tabIndex={0}
            className="tab-panel"
          >
            {item.content}
          </div>
        );
      })}
    </div>
  );
};
