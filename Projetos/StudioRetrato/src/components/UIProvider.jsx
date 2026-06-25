import React, { createContext, useContext } from 'react';
import { ToastContainer, useToastState } from './Toast';
import { ConfirmDialogRenderer, useConfirmState } from './ConfirmDialog';

// ── UI Context ──────────────────────────────────────────────────────────────

const UIContext = createContext(null);

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error('useUI must be used within a UIProvider');
  return ctx;
}

// ── UI Provider ─────────────────────────────────────────────────────────────

export function UIProvider({ children }) {
  const { toasts, removeToast, toast } = useToastState();
  const { state: confirmState, resolve: confirmResolve, confirm } = useConfirmState();

  return (
    <UIContext.Provider value={{ toast, confirm }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <ConfirmDialogRenderer state={confirmState} resolve={confirmResolve} />
    </UIContext.Provider>
  );
}
