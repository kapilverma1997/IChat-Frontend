import { createContext, useContext, useState, useCallback } from "react";
import Modal from "../components/Modal/Modal";

const ModalContext = createContext();

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within ModalProvider");
    }
    return context;
};

export const ModalProvider = ({ children }) => {
    const [modalState, setModalState] = useState({
        isOpen: false,
        title: "",
        message: "",
        type: "info",
        confirmText: "Confirm",
        cancelText: "Cancel",
        showCancel: true,
        onConfirm: null,
        onCancel: null,
        resolve: null,
    });

    const showModal = useCallback((options) => {
        return new Promise((resolve) => {
            setModalState({
                isOpen: true,
                title: options.title || "",
                message: options.message || "",
                type: options.type || "info",
                confirmText: options.confirmText || "Confirm",
                cancelText: options.cancelText || "Cancel",
                showCancel: options.showCancel !== false,
                onConfirm: options.onConfirm || null,
                onCancel: options.onCancel || null,
                resolve,
            });
        });
    }, []);

    const closeModal = useCallback(() => {
        setModalState((prev) => {
            if (prev.resolve) {
                prev.resolve(false);
            }
            return { ...prev, isOpen: false };
        });
    }, []);

    const handleConfirm = useCallback(() => {
        setModalState((prev) => {
            if (prev.onConfirm) {
                prev.onConfirm();
            }
            if (prev.resolve) {
                prev.resolve(true);
            }
            return { ...prev, isOpen: false };
        });
    }, []);

    const handleCancel = useCallback(() => {
        setModalState((prev) => {
            if (prev.onCancel) {
                prev.onCancel();
            }
            if (prev.resolve) {
                prev.resolve(false);
            }
            return { ...prev, isOpen: false };
        });
    }, []);

    // Convenience methods
    const showConfirm = useCallback((title, message, options = {}) => {
        return showModal({
            title,
            message,
            type: "warning",
            confirmText: options.confirmText || "Yes",
            cancelText: options.cancelText || "No",
            showCancel: true,
            ...options,
        });
    }, [showModal]);

    const showAlert = useCallback((title, message, options = {}) => {
        return showModal({
            title,
            message,
            type: options.type || "info",
            confirmText: options.confirmText || "OK",
            showCancel: false,
            ...options,
        });
    }, [showModal]);

    const showSuccess = useCallback((title, message, options = {}) => {
        return showModal({
            title: title || "Success!",
            message,
            type: "success",
            confirmText: options.confirmText || "OK",
            showCancel: false,
            ...options,
        });
    }, [showModal]);

    const showError = useCallback((title, message, options = {}) => {
        return showModal({
            title: title || "Error",
            message,
            type: "error",
            confirmText: options.confirmText || "OK",
            showCancel: false,
            ...options,
        });
    }, [showModal]);

    return (
        <ModalContext.Provider
            value={{
                showModal,
                showConfirm,
                showAlert,
                showSuccess,
                showError,
                closeModal,
            }}
        >
            {children}
            <Modal
                isOpen={modalState.isOpen}
                onClose={closeModal}
                title={modalState.title}
                message={modalState.message}
                type={modalState.type}
                confirmText={modalState.confirmText}
                cancelText={modalState.cancelText}
                showCancel={modalState.showCancel}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </ModalContext.Provider>
    );
};

