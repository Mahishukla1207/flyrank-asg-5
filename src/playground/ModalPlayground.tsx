import type { FC } from 'react';

export const ModalPlayground: FC = () => {
  return (
    <section aria-labelledby="modal-heading">
      <h2 id="modal-heading" style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>
        Modal Dialog
      </h2>
      <div className="placeholder-card">
        <span className="status-badge">Pending Implementation</span>
        <p>This playground section will test the Modal Dialog accessibility attributes, focus trap, and keyboard navigation (Esc to close, Tab trapping).</p>
      </div>
    </section>
  );
};
