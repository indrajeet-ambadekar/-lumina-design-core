import React, { useState, useMemo } from 'react';
import ToastContext from './ToastContext';
import Toast from './Toast';
import './Toast.scss';

function generateUEID() {
  let first = (Math.random() * 46656) | 0;
  let second = (Math.random() * 46656) | 0;
  first = ('000' + first.toString(36)).slice(-3);
  second = ('000' + second.toString(36)).slice(-3);

  return first + second;
}

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (type, content, timer = 5000) => {
    const id = generateUEID();
    setToasts((currentToasts) => [
      ...currentToasts,
      { id, type, content, timer }
    ]);
    setTimeout(() => {
      setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
    }, timer);
  };

  const contextValue = useMemo(() => ({ addToast }), []);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <div className="lumina-toasts-wrapper">
        {toasts.map((toast) => (
          <Toast key={toast.id} type={toast.type} content={toast.content} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
