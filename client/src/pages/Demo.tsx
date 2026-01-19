import { useState } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, Lock, Download, Plus, Minus, FileText } from 'lucide-react';

export default function Demo() {
  const [transactions, setTransactions] = useState([
    { id: 1, desc: 'Cachê Bar do Zé', valor: 450, tipo: 'entrada', data: '15/01' },
    { id: 2, desc: 'Cordas Guitarra', valor: 120, tipo: 'saida', data: '16/01' },
    { id: 3, desc: 'Aula Particular', valor: 150, tipo: 'entrada', data: '18/01' },
  ]);

  return (
    <div className="min-h-screen bg-[#F4F7F6] font-sans pb-20">
      {/* Header Demo */}
      <header className="bg-[#4E4376] text-white p-4 shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link href="/pro" className="text-white/80 hover:text-white">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-xl font-bold">MusicoPro <span className="text-xs bg-[#FF9F43] px-2 py-0.5 rounded text-white ml-1">DEMO</span></h1>
          </div>
          <Link href="/pro" className="bg-[#00B894] text-white px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wide shadow-sm hover:bg-[#00A383]">
            Comprar Versão Completa
          </Link>
        </div>
      </header>

      <div className="container mx-auto p-4 max-w-md">
        {/* Aviso Demo */}
        <div className="bg-[#FFF3CD] border-l-4 border-[#FF9F43] p-4 rounded mb-6 text-sm text-[#856404]">
          <p><strong>Modo Demonstração:</strong> Os dados não são salvos. Adquira a versão completa para usar offline e salvar seu histórico.</p>
        </div>

        {/* Cards Resumo */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-[10px] uppercase text-gray-500 font-bold tracking-wider mb-1">Entradas (Jan)</h3>
            <p className="text-2xl font-extrabold text-[#00B894]">R$ 600,00</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-[10px] uppercase text-gray-500 font-bold tracking-wider mb-1">Saídas (Jan)</h3>
            <p className="text-2xl font-extrabold text-[#D63031]">R$ 120,00</p>
          </div>
          <div className="col-span-2 bg-gradient-to-r from-[#4E4376] to-[#2B5876] p-4 rounded-xl shadow-md text-white">
            <h3 className="text-[10px] uppercase text-white/80 font-bold tracking-wider mb-1">Saldo Atual</h3>
            <p className="text-3xl font-extrabold">R$ 480,00</p>
          </div>
        </div>

        {/* Lista de Transações */}
        <h3 className="font-bold text-[#2D3436] mb-3 flex justify-between items-center">
          Histórico Recente
          <span className="text-xs font-normal text-gray-500">Últimos 3 lançamentos</span>
        </h3>
        
        <div className="space-y-3 mb-20">
          {transactions.map(t => (
            <div key={t.id} className="bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center shadow-sm">
              <div>
                <span className="text-[10px] text-gray-400 block mb-0.5">{t.data}</span>
                <span className="font-semibold text-[#2D3436] block">{t.desc}</span>
              </div>
              <span className={`font-bold text-lg ${t.tipo === 'entrada' ? 'text-[#00B894]' : 'text-[#D63031]'}`}>
                {t.tipo === 'entrada' ? '+' : '-'} R$ {t.valor}
              </span>
            </div>
          ))}
          
          {/* Item Bloqueado */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 border-dashed flex justify-between items-center opacity-70">
            <div className="flex items-center gap-3">
              <Lock size={18} className="text-gray-400" />
              <span className="font-medium text-gray-500">Ver histórico completo</span>
            </div>
            <Link href="/pro" className="text-xs font-bold text-[#4E4376] uppercase">Desbloquear</Link>
          </div>
        </div>

        {/* Botões de Ação (Bloqueados na Demo) */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4 w-[90%] max-w-md z-40">
          <button className="flex-1 bg-[#00B894] text-white py-3.5 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 active:scale-95 transition opacity-50 cursor-not-allowed">
            <Plus size={20} /> Entrada
          </button>
          <button className="flex-1 bg-[#D63031] text-white py-3.5 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 active:scale-95 transition opacity-50 cursor-not-allowed">
            <Minus size={20} /> Saída
          </button>
        </div>

        {/* Features Bloqueadas */}
        <div className="mt-8 space-y-4">
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center z-10">
              <Link href="/pro" className="bg-[#4E4376] text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg hover:bg-[#3D3459] transition flex items-center gap-2">
                <Lock size={14} /> Liberar Recibos
              </Link>
            </div>
            <div className="flex items-center gap-3 opacity-50">
              <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                <FileText size={24} />
              </div>
              <div>
                <h4 className="font-bold text-[#2D3436]">Gerador de Recibos</h4>
                <p className="text-xs text-gray-500">Crie recibos profissionais em PDF</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center z-10">
              <Link href="/pro" className="bg-[#4E4376] text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg hover:bg-[#3D3459] transition flex items-center gap-2">
                <Lock size={14} /> Liberar Consultor IA
              </Link>
            </div>
            <div className="flex items-center gap-3 opacity-50">
              <div className="bg-purple-100 p-3 rounded-lg text-purple-600">
                <span className="text-xl">🤖</span>
              </div>
              <div>
                <h4 className="font-bold text-[#2D3436]">Consultor Financeiro IA</h4>
                <p className="text-xs text-gray-500">Dicas personalizadas para sua carreira</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
