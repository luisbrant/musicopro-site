import React, { useState } from 'react';
import { Link } from 'wouter';
import { Menu, X, Lock, Calculator, FileText, Zap, Download, ArrowRight } from 'lucide-react';

export default function Premium() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(true);
  const [accessCode, setAccessCode] = useState('');
  const [accessError, setAccessError] = useState('');

  // Calculadora Carnê-Leão
  const [carneInput, setCarneInput] = useState('');
  const [carneResult, setCarneResult] = useState<number | null>(null);

  // Calculadora RPA
  const [rpaInput, setRpaInput] = useState('');
  const [rpaResult, setRpaResult] = useState<number | null>(null);

  const handleAccessCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode.toUpperCase() === 'MUSICOPRO2026PREMIUM') {
      setIsLocked(false);
      setAccessError('');
    } else {
      setAccessError('Código de acesso inválido. Verifique seu email do Hotmart.');
    }
  };

  const calculateCarne = () => {
    const value = parseFloat(carneInput);
    if (isNaN(value) || value <= 0) {
      setCarneResult(null);
      return;
    }
    let tax = 0;
    if (value <= 1903.98) tax = 0;
    else if (value <= 2826.65) tax = (value - 1903.98) * 0.075;
    else if (value <= 3751.05) tax = 922.67 * 0.075 + (value - 2826.65) * 0.15;
    else if (value <= 4664.68) tax = 922.67 * 0.075 + 924.4 * 0.15 + (value - 3751.05) * 0.225;
    else tax = 922.67 * 0.075 + 924.4 * 0.15 + 913.63 * 0.225 + (value - 4664.68) * 0.275;
    setCarneResult(Math.round(tax * 100) / 100);
  };

  const calculateRPA = () => {
    const value = parseFloat(rpaInput);
    if (isNaN(value) || value <= 0) {
      setRpaResult(null);
      return;
    }
    const rpa = value * 0.15;
    setRpaResult(Math.round(rpa * 100) / 100);
  };

  return (
    <div className="min-h-screen bg-white scroll-smooth">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-[#E8E3DC] py-4 px-4 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div>
              <h1 className="text-lg md:text-xl font-bold text-[#0c2461]" style={{ fontFamily: 'Lexend, sans-serif' }}>
                Músico Pro
              </h1>
              <p className="text-xs md:text-sm font-normal text-[#6ba587]">Organização Fiscal para Músicos</p>
            </div>
          </div>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-[#F5F2ED] rounded-lg transition"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <nav className="hidden md:flex gap-4">
            <Link href="/" className="text-sm text-[#0c2461] hover:text-[#6ba587] transition font-medium">
              ← Voltar
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {isLocked ? (
          // Tela de Acesso
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-[#0c2461] to-[#1a3a5c] rounded-lg p-6 md:p-8 text-white space-y-4 text-center">
              <Lock size={48} className="mx-auto text-[#d4af37]" />
              <h2 className="text-2xl md:text-3xl font-bold">Conteúdo Exclusivo</h2>
              <p className="text-sm md:text-base opacity-90">
                Você está acessando a área premium do Músico Pro. Digite seu código de acesso para continuar.
              </p>
            </div>

            <div className="bg-[#F9F7F4] rounded-lg p-6 md:p-8 space-y-6">
              <form onSubmit={handleAccessCode} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0c2461] mb-2">
                    Código de Acesso
                  </label>
                  <input
                    type="password"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    placeholder="Cole seu código do Hotmart aqui"
                    className="w-full px-4 py-3 border border-[#d4af37] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0c2461] text-[#0c2461]"
                  />
                  {accessError && (
                    <p className="text-sm text-[#C85A54] mt-2">{accessError}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#0c2461] hover:bg-[#1a3a5c] text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2"
                >
                  <Zap size={18} /> Acessar Área Premium
                </button>
              </form>

              <div className="border-t border-[#d4af37] pt-6">
                <p className="text-xs md:text-sm text-[#0c2461] text-center">
                  Ainda não tem acesso? <a href="#" className="text-[#d4af37] font-bold hover:underline">Compre sua licença PRO</a>
                </p>
              </div>
            </div>
          </div>
        ) : (
          // Conteúdo Premium
          <div className="space-y-8">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-[#0c2461] to-[#6ba587] rounded-lg p-6 md:p-8 text-white space-y-2">
              <div className="flex items-center gap-2">
                <Zap size={24} className="text-[#d4af37]" />
                <h2 className="text-2xl md:text-3xl font-bold">Bem-vindo à Área Premium!</h2>
              </div>
              <p className="text-sm md:text-base opacity-90">
                Acesso exclusivo a ferramentas, consultoria e conteúdo avançado.
              </p>
            </div>

            {/* Ferramentas */}
            <div className="space-y-6">
              <h3 className="text-xl md:text-2xl font-bold text-[#0c2461]" style={{ fontFamily: 'Lexend, sans-serif' }}>
                🛠️ Ferramentas Exclusivas
              </h3>

              {/* Calculadora Carnê-Leão */}
              <div className="bg-[#F9F7F4] rounded-lg p-6 space-y-4 border-l-4 border-[#6ba587]">
                <div className="flex items-center gap-2">
                  <Calculator size={20} className="text-[#6ba587]" />
                  <h4 className="text-lg font-bold text-[#0c2461]">Calculadora Carnê-Leão</h4>
                </div>
                <p className="text-sm text-[#0c2461] opacity-80">
                  Calcule o imposto mensal sobre seus rendimentos usando a tabela progressiva 2026.
                </p>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-semibold text-[#0c2461] mb-2">
                      Rendimento Bruto (R$)
                    </label>
                    <input
                      type="number"
                      value={carneInput}
                      onChange={(e) => setCarneInput(e.target.value)}
                      placeholder="Ex: 5000.00"
                      className="w-full px-4 py-2 border border-[#d4af37] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6ba587] text-[#0c2461]"
                    />
                  </div>
                  <button
                    onClick={calculateCarne}
                    className="w-full bg-[#6ba587] hover:bg-[#5a9476] text-white font-bold py-2 rounded-lg transition"
                  >
                    Calcular
                  </button>
                  {carneResult !== null && (
                    <div className="bg-white p-4 rounded-lg border-2 border-[#6ba587]">
                      <p className="text-xs text-[#0c2461] opacity-70">Imposto Mensal (Carnê-Leão)</p>
                      <p className="text-2xl font-bold text-[#0c2461]">
                        R$ {carneResult.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Calculadora RPA */}
              <div className="bg-[#F9F7F4] rounded-lg p-6 space-y-4 border-l-4 border-[#d4af37]">
                <div className="flex items-center gap-2">
                  <Calculator size={20} className="text-[#d4af37]" />
                  <h4 className="text-lg font-bold text-[#0c2461]">Calculadora RPA (Retenção na Fonte)</h4>
                </div>
                <p className="text-sm text-[#0c2461] opacity-80">
                  Simule a retenção de 15% sobre seus cachês quando contratado como PJ.
                </p>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-semibold text-[#0c2461] mb-2">
                      Valor do Cachê (R$)
                    </label>
                    <input
                      type="number"
                      value={rpaInput}
                      onChange={(e) => setRpaInput(e.target.value)}
                      placeholder="Ex: 3000.00"
                      className="w-full px-4 py-2 border border-[#d4af37] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-[#0c2461]"
                    />
                  </div>
                  <button
                    onClick={calculateRPA}
                    className="w-full bg-[#d4af37] hover:bg-[#c49f2a] text-[#0c2461] font-bold py-2 rounded-lg transition"
                  >
                    Calcular
                  </button>
                  {rpaResult !== null && (
                    <div className="bg-white p-4 rounded-lg border-2 border-[#d4af37]">
                      <p className="text-xs text-[#0c2461] opacity-70">Retenção na Fonte (RPA)</p>
                      <p className="text-2xl font-bold text-[#d4af37]">
                        R$ {rpaResult.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Conteúdo Exclusivo */}
            <div className="space-y-6">
              <h3 className="text-xl md:text-2xl font-bold text-[#0c2461]" style={{ fontFamily: 'Lexend, sans-serif' }}>
                📚 Conteúdo Exclusivo
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-[#F9F7F4] rounded-lg p-6 space-y-3 hover:shadow-lg transition">
                  <div className="flex items-center gap-2">
                    <FileText size={20} className="text-[#0c2461]" />
                    <h4 className="font-bold text-[#0c2461]">Guia Completo (PDF)</h4>
                  </div>
                  <p className="text-sm text-[#0c2461] opacity-80">
                    Baixe o guia completo em PDF para consultar offline.
                  </p>
                  <button className="flex items-center gap-2 text-[#6ba587] font-bold hover:text-[#0c2461] transition">
                    <Download size={16} /> Baixar PDF
                  </button>
                </div>

                <div className="bg-[#F9F7F4] rounded-lg p-6 space-y-3 hover:shadow-lg transition">
                  <div className="flex items-center gap-2">
                    <Zap size={20} className="text-[#d4af37]" />
                    <h4 className="font-bold text-[#0c2461]">Consultoria Automática</h4>
                  </div>
                  <p className="text-sm text-[#0c2461] opacity-80">
                    Respostas personalizadas baseadas em sua situação fiscal.
                  </p>
                  <button className="flex items-center gap-2 text-[#d4af37] font-bold hover:text-[#0c2461] transition">
                    Acessar <ArrowRight size={16} />
                  </button>
                </div>

                <div className="bg-[#F9F7F4] rounded-lg p-6 space-y-3 hover:shadow-lg transition">
                  <div className="flex items-center gap-2">
                    <FileText size={20} className="text-[#6ba587]" />
                    <h4 className="font-bold text-[#0c2461]">Modelos de Contrato</h4>
                  </div>
                  <p className="text-sm text-[#0c2461] opacity-80">
                    Contratos prontos para cachês, aulas e shows.
                  </p>
                  <button className="flex items-center gap-2 text-[#6ba587] font-bold hover:text-[#0c2461] transition">
                    <Download size={16} /> Baixar
                  </button>
                </div>

                <div className="bg-[#F9F7F4] rounded-lg p-6 space-y-3 hover:shadow-lg transition">
                  <div className="flex items-center gap-2">
                    <Zap size={20} className="text-[#d4af37]" />
                    <h4 className="font-bold text-[#0c2461]">Atualizações Mensais</h4>
                  </div>
                  <p className="text-sm text-[#0c2461] opacity-80">
                    Receba atualizações sobre mudanças na legislação fiscal.
                  </p>
                  <button className="flex items-center gap-2 text-[#d4af37] font-bold hover:text-[#0c2461] transition">
                    Ver Últimas <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Logout */}
            <div className="text-center pt-6 border-t border-[#E8E3DC]">
              <button
                onClick={() => {
                  setIsLocked(true);
                  setAccessCode('');
                }}
                className="text-sm text-[#0c2461] hover:text-[#6ba587] transition font-medium"
              >
                Sair da Área Premium
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
