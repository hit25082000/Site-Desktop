import React, { useState, useCallback, useRef } from 'react';

// ── Confirm Dialog Component ────────────────────────────────────────────────

export function ConfirmDialogRenderer({ state, resolve }) {
  if (!state) return null;

  const { title, message, confirmLabel, cancelLabel, destructive } = state;

  return (
    <div className="fixed inset-0 bg-neutral-950/60 backdrop-blur-sm z-[9998] flex items-end md:items-center justify-center p-0 md:p-4 confirm-overlay-enter">
      <div className="bg-white border border-neutral-200 rounded-t-[1.5rem] md:rounded-[1.5rem] w-full md:max-w-sm shadow-2xl relative confirm-dialog-enter" 
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 16px)' }}
      >
        <div className="p-6 text-center">
          {/* Icon */}
          <div className={`mx-auto mb-4 h-12 w-12 rounded-2xl flex items-center justify-center ${
            destructive ? 'bg-rose-100' : 'bg-indigo-100'
          }`}>
            {destructive ? (
              <svg className="w-6 h-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
              </svg>
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-neutral-900 font-geist mb-2">{title}</h3>
          
          {/* Message */}
          <p className="text-sm text-neutral-500 font-geist leading-relaxed">{message}</p>
        </div>

        {/* Actions */}
        <div className="px-6 pb-4 flex gap-3">
          <button
            onClick={() => resolve(false)}
            className="flex-1 min-h-[44px] bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold text-sm rounded-xl transition font-geist"
          >
            {cancelLabel || 'Cancelar'}
          </button>
          <button
            onClick={() => resolve(true)}
            className={`flex-1 min-h-[44px] font-semibold text-sm rounded-xl transition font-geist text-white ${
              destructive 
                ? 'bg-rose-600 hover:bg-rose-500' 
                : 'bg-indigo-600 hover:bg-indigo-500'
            }`}
          >
            {confirmLabel || 'Confirmar'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── useConfirm hook (internal — used by UIProvider) ─────────────────────────

export function useConfirmState() {
  const [state, setState] = useState(null);
  const resolveRef = useRef(null);

  const confirm = useCallback(({ title, message, confirmLabel, cancelLabel, destructive = false }) => {
    return new Promise((resolve) => {
      resolveRef.current = resolve;
      setState({ title, message, confirmLabel, cancelLabel, destructive });
    });
  }, []);

  const resolve = useCallback((value) => {
    if (resolveRef.current) {
      resolveRef.current(value);
      resolveRef.current = null;
    }
    setState(null);
  }, []);

  return { state, resolve, confirm };
}
