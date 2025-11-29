import { useEffect, useRef } from "react";
import { useTheme } from "../../context/ThemeContext";
import styles from "./Modal.module.css";

const Modal = ({ isOpen, onClose, title, message, type = "info", onConfirm, onCancel, confirmText = "Confirm", cancelText = "Cancel", showCancel = true }) => {
    const { theme } = useTheme();
    const modalRef = useRef(null);
    const backdropRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            // Focus trap
            const firstFocusable = modalRef.current?.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            firstFocusable?.focus();
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target === backdropRef.current) {
            onClose();
        }
    };

    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm();
        }
        onClose();
    };

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        }
        onClose();
    };

    const getIcon = () => {
        switch (type) {
            case "success":
                return (
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                );
            case "error":
                return (
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                );
            case "warning":
                return (
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                        <line x1="12" y1="9" x2="12" y2="13" />
                        <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                );
            default:
                return (
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="16" x2="12" y2="12" />
                        <line x1="12" y1="8" x2="12.01" y2="8" />
                    </svg>
                );
        }
    };

    return (
        <div
            ref={backdropRef}
            className={`${styles.backdrop} ${styles[theme]}`}
            onClick={handleBackdropClick}
        >
            <div
                ref={modalRef}
                className={`${styles.modal} ${styles[theme]} ${styles[type]}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                aria-describedby="modal-message"
            >
                <div className={styles.modalContent}>
                    <div className={`${styles.iconContainer} ${styles[type]}`}>
                        {getIcon()}
                    </div>
                    {title && (
                        <h2 id="modal-title" className={styles.title}>
                            {title}
                        </h2>
                    )}
                    {message && (
                        <p id="modal-message" className={styles.message}>
                            {message}
                        </p>
                    )}
                    <div className={styles.buttonGroup}>
                        {showCancel && (
                            <button
                                className={`${styles.button} ${styles.cancelButton}`}
                                onClick={handleCancel}
                            >
                                {cancelText}
                            </button>
                        )}
                        <button
                            className={`${styles.button} ${styles.confirmButton} ${styles[type]}`}
                            onClick={handleConfirm}
                            autoFocus
                        >
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;

