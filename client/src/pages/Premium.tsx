'use client';

import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import {
  Menu,
  X,
  Lock,
  Zap,
  BarChart3,
  DollarSign,
  TrendingUp,
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';

import CarneLeaoDeepDive from '@/components/CarneLeaoDeepDive';
import DeducoesDeepDive from '@/components/DeducoesDeepDive';
import PFvsMEIvsEmpresaDeepDive from '@/components/PFvsMEIvsEmpresaDeepDive';
import RPADeepDive from '@/components/RPADeepDive';
import Footer from '@/components/Footer';

/* =====================================================
   CONFIG — IGUAL AO PWA
===================================================== */
const PRO_API = 'https://www.musicopro.app.br/api/license/check';

const getProEmail = () => localStorage.getItem('musicopro_email') || '';
const setProEmail = (email: string) => localStorage.setItem('musicopro_email', email);
const getProTx = () => localStorage.getItem('musicopro_tx') || '';
const setProTx = (tx: string) => localStorage.setItem('musicopro_tx', tx);

const setProActive = (active: boolean) =>
  localStorage.setItem('musicopro_pro', active ? 'true' : 'false');

async function verificarLicencaPorEmail(email: string, transaction: string): Promise<boolean> {
  const res = await fetch(PRO_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, transaction })
  });
  const data = await res.json();
  return data?.active === true;
}

export default function Premium() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(true);
  const [email, setEmail] = useState('');
  const [transaction, setTransaction] = useState('');
  const [accessError, setAccessError] = useState('');
  const [activeSection, setActiveSection] = useState('carneLeao');

  /* =====================================================
     LÊ EMAIL DA URL (?email=...) E FOCA INPUT (?focus=1)
  ===================================================== */
  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      const qpEmail = (url.searchParams.get('email') || '').trim().toLowerCase();
      if (qpEmail) {
        setEmail(qpEmail);
        localStorage.setItem('musicopro_email', qpEmail);
      }

      const focus = url.searchParams.get('focus');
      if (focus === '1') {
        setTimeout(() => {
          const el = document.getElementById('pro-email') as HTMLInputElement | null;
          el?.focus();
          el?.select();
        }, 50);
      }
    } catch {
      // nada
    }
  }, []);

  /* =====================================================
     AUTO-CHECK AO ABRIR
  ===================================================== */
  useEffect(() => {
    const savedEmail = getProEmail();
    const savedTx = getProTx();
    if (!savedEmail || !savedTx) return;

    (async () => {
      try {
        const ok = await verificarLicencaPorEmail(savedEmail, savedTx);
        if (ok) {
          setProActive(true);
          document.body.classList.add('pro-enabled');
          setIsLocked(false);
        }
      } catch (e) {
        console.error('Erro ao validar licença:', e);
      }
    })();
  }, []);

  /* =====================================================
     ATIVAÇÃO POR E-MAIL
  ===================================================== */
  const handleActivateByEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setAccessError('');

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedTx = transaction.trim().toUpperCase();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);
    if (!emailOk || !normalizedTx.startsWith('HP')) {
      setAccessError('Digite o e-mail e o código da transação da Hotmart (ex: HP...).');
      return;
    }

    try {
      const ok = await verificarLicencaPorEmail(normalizedEmail, normalizedTx);

      if (!ok) {
        setAccessError('Licença não encontrada para estes dados.');
        return;
      }

      // Marca PRO (mesmo padrão do PWA)
      setProEmail(normalizedEmail);
      setProTx(normalizedTx);
      setProActive(true);
      document.body.classList.add('pro-enabled');
      setIsLocked(false);

      // 🔁 RETORNO AUTOMÁTICO PARA O GUIA
      window.location.href = '/guia?pro=1';
    } catch (err) {
      console.error(err);
      setAccessError('Erro ao verificar licença. Tente novamente.');
    }
  };

  /* =====================================================
     NAVEGAÇÃO DE SEÇÕES (PRO)
  ===================================================== */
  const sections = [
    { id: 'carneLeao', title: 'Carnê-Leão', icon: BarChart3 },
    { id: 'deducoes', title: 'Deduções', icon: DollarSign },
    { id: 'regimes', title: 'PF x MEI x Empresa', icon: TrendingUp },
    { id: 'rpa', title: 'Retenção (RPA)', icon: AlertCircle },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white border-b border-[#E8E3DC]">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 text-[#0c2461]">
              <ArrowLeft size={18} />
              <span className="font-semibold hidden md:inline">Voltar ao site</span>
            </Link>
            <div className="h-6 w-px bg-[#E8E3DC] mx-2 hidden md:block" />
            <div>
              <h1 className="font-bold text-[#0c2461]">Músico Pro</h1>
              <p className="text-xs text-[#6ba587]">Pacote Guia + App</p>
            </div>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#0c2461]"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-[#E8E3DC] p-4 space-y-2">
            {isLocked
              ? (
                <Link href="/guia">
                  <button className="w-full text-left px-4 py-2 rounded hover:bg-[#f5f2ed]">
                    Ver o Guia (primeiro passo)
                  </button>
                </Link>
              )
              : sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollToSection(s.id)}
                  className="w-full text-left px-4 py-2 rounded hover:bg-[#f5f2ed]"
                >
                  {s.title}
                </button>
              ))}
          </nav>
        )}
      </header>

      {/* CONTEÚDO */}
      <main className="max-w-5xl mx-auto px-4 py-10">
        {isLocked ? (
          /* =============================
             BLOQUEADO
          ============================== */
          <div className="space-y-10">
            <div className="bg-gradient-to-br from-[#0c2461] to-[#1a3a5c] text-white rounded-lg p-8 text-center space-y-4">
              <Lock size={48} className="mx-auto text-[#d4af37]" />
              <h2 className="text-3xl font-bold">Pacote Músico Pro</h2>
              <p className="text-lg opacity-95">
                Primeiro você aprende no guia. Depois executa no app.
              </p>
            </div>

            <div className="bg-[#f9f7f4] rounded-lg p-8 space-y-8">
              <div className="bg-white border border-[#E8E3DC] rounded-lg p-6 space-y-4">
                <h3 className="text-xl font-bold text-[#0c2461] flex items-center gap-2">
                  <Zap size={22} className="text-[#d4af37]" />
                  Ativar acesso com e-mail
                </h3>

                <form onSubmit={handleActivateByEmail} className="space-y-4">
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-[#0c2461] mb-1">
                      Dados da compra na Hotmart
                    </label>
                    <input
                      id="pro-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="E-mail de compra"
                      className="w-full px-4 py-3 border border-[#E8E3DC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0c2461]"
                    />
                    <input
                      id="pro-tx"
                      type="text"
                      value={transaction}
                      onChange={(e) => setTransaction(e.target.value)}
                      placeholder="Código Transação (Ex: HP...)"
                      className="w-full px-4 py-3 border border-[#E8E3DC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0c2461]"
                    />
                    {accessError && (
                      <p className="text-sm text-[#C85A54] mt-2">{accessError}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#d4af37] hover:bg-[#c9a02e] text-[#0c2461] font-bold py-3 rounded-lg transition"
                  >
                    Ativar com e-mail
                  </button>
                </form>

                <p className="text-xs text-[#6ba587] text-center">
                  Use o mesmo e-mail informado na compra.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* =============================
             DESBLOQUEADO
          ============================== */
          <>
            <div className="bg-gradient-to-r from-[#0c2461] to-[#6ba587] rounded-lg p-6 text-white mb-12">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <CheckCircle2 size={22} className="text-[#d4af37]" />
                Conteúdo aprofundado do pacote
              </h2>
              <p className="text-sm opacity-90">
                Você entendeu no guia. Agora aprofunde e aplique com segurança.
              </p>
            </div>

            <section id="carneLeao" className="mb-16 scroll-mt-24">
              <CarneLeaoDeepDive />
            </section>

            <section id="deducoes" className="mb-16 scroll-mt-24">
              <DeducoesDeepDive />
            </section>

            <section id="regimes" className="mb-16 scroll-mt-24">
              <PFvsMEIvsEmpresaDeepDive />
            </section>

            <section id="rpa" className="mb-16 scroll-mt-24">
              <RPADeepDive />
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
