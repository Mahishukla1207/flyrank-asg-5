import { useEffect, useRef, useId, type FC, type ReactNode } from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
}

export const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!isOpen) return;

    // 1. Store trigger element focus
    previousActiveElement.current = document.activeElement as HTMLElement;

    // 2. Prevent background page scrolling
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusableQuery =
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    // 3. Initial focus transfer to first focusable element inside modal
    const focusTimeout = setTimeout(() => {
      if (dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(focusableQuery);
        if (focusables.length > 0) {
          focusables[0].focus();
        } else {
          dialogRef.current.focus();
        }
      }
    }, 10);

    // 4. Trap focus & handling Escape dismiss key
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === 'Tab' && dialogRef.current) {
        const focusables = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(focusableQuery)
        ).filter((el) => el.offsetParent !== null || el.offsetWidth > 0 || el.offsetHeight > 0);

        if (focusables.length === 0) return;

        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === firstElement || document.activeElement === dialogRef.current) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(focusTimeout);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;

      // 5. Restore focus to trigger element upon closing
      if (previousActiveElement.current && typeof previousActiveElement.current.focus === 'function') {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        className="modal-dialog"
        tabIndex={-1}
      >
        <div className="modal-header">
          <h2 id={titleId} className="modal-title">
            {title}
          </h2>
          <button
            type="button"
            className="modal-close-button"
            onClick={onClose}
            aria-label="Close dialog"
          >
            &times;
          </button>
        </div>

        {description && (
          <p id={descriptionId} className="modal-description">
            {description}
          </p>
        )}

        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};
