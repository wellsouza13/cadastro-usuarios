import { ToastMessageProps } from "../interface/components/toastMessage";

export const ToastMessage = ({ message, show, onClose }: ToastMessageProps) => {
  if (!show) return null;

  return (
    <div aria-live="polite" aria-atomic="true" className="fixed-top">
      <div className="toast-container position-absolute top-0 end-0 p-3">
        <div className={`toast show`} role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-header">
            <strong className="me-auto">Notificação</strong>
            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="toast-body">
            {message}
          </div>
        </div>
      </div>
    </div>
  );
};

