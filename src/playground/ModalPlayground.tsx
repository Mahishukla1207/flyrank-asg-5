import { useState, type FC } from 'react';
import { Modal } from '../components/Modal';

export const ModalPlayground: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ username: '', role: 'developer' });
  const [submittedData, setSubmittedData] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedData(`User: ${formData.username || 'Anonymous'}, Role: ${formData.role}`);
    setIsModalOpen(false);
  };

  return (
    <section aria-labelledby="modal-heading" className="playground-section">
      <div className="playground-header">
        <h2 id="modal-heading">Modal Dialog (W3C ARIA Pattern)</h2>
        <span className="status-badge active">Implemented</span>
      </div>

      <p className="section-description">
        This component demonstrates an accessible modal dialog adhering strictly to WAI-ARIA authoring practices.
      </p>

      <div className="demo-card">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setIsModalOpen(true)}
          id="open-modal-trigger"
        >
          Open Demo Modal
        </button>

        {submittedData && (
          <div className="feedback-banner" role="status">
            Last Submitted: <strong>{submittedData}</strong>
          </div>
        )}
      </div>

      <div className="a11y-checklist">
        <h3>Accessibility Features Tested:</h3>
        <ul>
          <li><strong>Role &amp; ARIA:</strong> Uses <code>role="dialog"</code>, <code>aria-modal="true"</code>, <code>aria-labelledby</code>, and <code>aria-describedby</code>.</li>
          <li><strong>Focus Trap:</strong> Prevents <code>Tab</code> or <code>Shift+Tab</code> from leaving the active modal dialog.</li>
          <li><strong>Escape Key:</strong> Pressing <kbd>Esc</kbd> automatically closes the dialog.</li>
          <li><strong>Focus Restoration:</strong> Closing the modal returns focus to the <code>"Open Demo Modal"</code> trigger button.</li>
          <li><strong>Background Scroll Lock &amp; Backdrop Dismiss:</strong> Locks <code>body</code> overflow and dismisses dialog on backdrop overlay click.</li>
        </ul>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="User Settings Modal"
        description="Update your profile information below. Focus will be trapped inside this dialog until closed."
      >
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="username-input">Username</label>
            <input
              id="username-input"
              type="text"
              className="form-input"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              placeholder="e.g. mahi_dev"
            />
          </div>

          <div className="form-group">
            <label htmlFor="role-select">Role</label>
            <select
              id="role-select"
              className="form-input"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="developer">Developer</option>
              <option value="designer">Designer</option>
              <option value="accessibility-auditor">Accessibility Auditor</option>
            </select>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </Modal>
    </section>
  );
};

