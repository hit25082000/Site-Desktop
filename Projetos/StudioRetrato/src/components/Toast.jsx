import React, { useState, useCallback, useEffect } from 'react';

// ── Toast Container & Individual Toast ──────────────────────────────────────

function ToastItem({ id, type, message, onRemove }) {
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const duration = 3500;
    const interval = 30;
    const step = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - step;
      });
    }, interval);

    const dismissTimer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => onRemove(id), 300);
    }, duration);

    return () => {
      clearInterval(timer);
      clearTimeout(dismissTimer);
    };
  }, [id, onRemove]);

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => onRemove(id), 300);
  };

  const styles = {
    success: {
      bg: 'bg-emerald-600',
      icon: (
        <svg className="w-4 h-4 text-white flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      ),
    },
    error: {
      bg: 'bg-rose-600',
      icon: (
        <svg className="w-4 h-4 text-white flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      ),
    },
    info: {
      bg: 'bg-indigo-600',
      icon: (
        <svg className="w-4 h-4 text-white flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
        </svg>
      ),
    },
  };

  const s = styles[type] || styles.info;

  return (
    <div
      className={`flex items-start gap-3 min-w-[280px] max-w-[90vw] md:max-w-md px-4 py-3 rounded-2xl shadow-2xl text-white text-sm font-medium font-geist cursor-pointer select-none transition-all duration-300 ${s.bg} ${
        isExiting ? 'toast-exit' : 'toast-enter'
      }`}
      onClick={handleDismiss}
      role="alert"
      style={{ willChange: 'transform, opacity' }}
    >
      <div className="mt-0.5">{s.icon}</div>
      <p className="flex-1 leading-snug text-[13px]">{message}</p>
      <button
        onClick={(e) => { e.stopPropagation(); handleDismiss(); }}
        className="flex-shrink-0 mt-0.5 opacity-70 hover:opacity-100 transition-opacity"
        aria-label="Fechar"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] rounded-b-2xl overflow-hidden">
        <div
          className="h-full bg-white/30 transition-all ease-linear"
          style={{ width: `${progress}%`, transitionDuration: '30ms' }}
        />
      </div>
    </div>
  );
}

// ── Toast Container (rendered at top of viewport) ───────────────────────────

export function ToastContainer({ toasts, removeToast }) {
  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] flex flex-col items-center gap-2 pointer-events-none"
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
    >
      {toasts.map(t => (
        <div key={t.id} className="pointer-events-auto relative">
          <ToastItem id={t.id} type={t.type} message={t.message} onRemove={removeToast} />
        </div>
      ))}
    </div>
  );
}

// ── useToast hook (internal — used by UIProvider) ───────────────────────────

export function useToastState() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((type, message) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, type, message }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const toast = {
    success: (msg) => addToast('success', msg),
    error: (msg) => addToast('error', msg),
    info: (msg) => addToast('info', msg),
  };

  return { toasts, removeToast, toast };
}
