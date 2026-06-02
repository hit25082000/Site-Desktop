import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import { Camera, Lock, Envelope, WarningCircle, ArrowRight } from '@phosphor-icons/react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Erro ao realizar login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4 relative overflow-hidden select-none">
      {/* Decorative Background Aura */}
      <div className="fixed top-0 w-full h-screen -z-10 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50"></div>

      {/* Main card */}
      <div className="w-full max-w-md bg-white border border-neutral-200/80 rounded-[2.5rem] shadow-xl p-8 relative z-10">
        
        {/* Logo/Icon */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="h-16 w-16 rounded-3xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/20 mb-4 animate-pulse">
            <Camera className="w-8 h-8" weight="light" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 font-geist">Studio Retrato</h1>
          <p className="text-sm text-neutral-500 font-geist mt-1">Área Administrativa do Fotógrafo</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="flex items-center gap-3 p-4 mb-6 rounded-2xl bg-rose-50 border border-rose-100 text-rose-800 text-sm font-geist animate-shake">
            <WarningCircle className="w-5 h-5 shrink-0 text-rose-600" weight="light" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2 font-geist">
              E-mail
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
                <Envelope className="w-5 h-5" weight="light" />
              </span>
              <input
                type="email"
                required
                placeholder="exemplo@studioretrato.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition text-sm font-geist text-neutral-900 placeholder:text-neutral-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2 font-geist">
              Senha
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
                <Lock className="w-5 h-5" weight="light" />
              </span>
              <input
                type="password"
                required
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition text-sm font-geist text-neutral-900 placeholder:text-neutral-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full group inline-flex items-center justify-center gap-3 shadow-indigo-600/20 transition duration-150 ease-out hover:-translate-y-0.5 text-base font-medium text-white font-geist bg-gradient-to-tr from-gray-900 to-black rounded-full py-3.5 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{loading ? 'Entrando...' : 'Acessar Painel'}</span>
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/20 ring-1 ring-white/30">
              <ArrowRight className="w-4 h-4" weight="light" />
            </span>
          </button>
        </form>

        {/* Footer info */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="text-xs font-medium text-neutral-400 hover:text-indigo-600 transition font-geist"
          >
            Voltar para a Página Principal
          </a>
        </div>

      </div>
    </div>
  );
}
