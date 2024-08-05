import React, { useState, useCallback } from 'react';
import Toast from './Toast';

const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((type, message, duration) => {
    const id = Date.now();
    setToasts((prevToasts) => [
      ...prevToasts,
      { id, type, message, duration },
    ]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  return (
    <>
      {toasts.map(({ id, type, message, duration }) => (
        <Toast
          key={id}
          type={type}
          message={message}
          onClose={() => removeToast(id)}
          duration={duration}
        />
      ))}
      <button onClick={() => addToast('success', 'Success Toast!')}>Show Success Toast</button>
      <button onClick={() => addToast('error', 'Error Toast!')}>Show Error Toast</button>
      <button onClick={() => addToast('info', 'Info Toast!')}>Show Info Toast</button>
      <button onClick={() => addToast('warning', 'Warning Toast!')}>Show Warning Toast</button>
    </>
  );
};

export default ToastContainer;
