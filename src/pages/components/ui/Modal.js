import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { cva } from 'cva';

const overlayStyles = cva({
  base: "fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity",
  variants: {
    state: {
      open: "opacity-100",
      closed: "opacity-0"
    }
  },
  defaultVariants: {
    state: "open"
  }
});

const modalStyles = cva({
  base: "fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-background dark:bg-dark-background shadow-lg transition-all",
  variants: {
    size: {
      sm: "w-[95%] max-w-[500px] p-4",
      md: "w-[95%] max-w-[600px] p-6", 
      lg: "w-[95%] max-w-[800px] p-8"
    },
    state: {
      open: "opacity-100 scale-100",
      closed: "opacity-0 scale-95"
    }
  },
  defaultVariants: {
    size: "md",
    state: "open"
  }
});

const Modal = ({
  isOpen,
  onClose,
  children,
  size = "md",
  closeOnOverlayClick = true,
  closeOnEsc = true,
  initialFocus,
}) => {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscapeKey = (e) => {
      if (closeOnEsc && e.key === 'Escape') {
        onClose();
      }
    };

    // focus management
    const previousActiveElement = document.activeElement;
    const focusElement = initialFocus?.current || modalRef.current;
    if (focusElement) {
      setTimeout(() => focusElement.focus(), 0);
    }

    // prevent background scrolling (browsers being browsers)
    document.body.style.overflow = 'hidden';

    // event listeners
    document.addEventListener('keydown', handleEscapeKey);

    // cleanup
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
      if (previousActiveElement) {
        previousActiveElement.focus();
      }
    };
  }, [isOpen, onClose, closeOnEsc, initialFocus]);

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === overlayRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      role="presentation"
      ref={overlayRef}
      onClick={handleOverlayClick}
      className={overlayStyles({ state: isOpen ? "open" : "closed" })}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        className={modalStyles({ size, state: isOpen ? "open" : "closed" })}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export const ModalHeader = ({ children, className = "" }) => (
  <div className={`mb-4 ${className}`}>
    <h2 className="text-2xl font-semibold text-text dark:text-dark-text">{children}</h2>
  </div>
);

export const ModalBody = ({ children, className = "" }) => (
  <div className={`text-text dark:text-dark-text ${className}`}>{children}</div>
);

export const ModalFooter = ({ children, className = "" }) => (
  <div className={`mt-6 flex justify-end space-x-4 ${className}`}>{children}</div>
);

export default Modal;
