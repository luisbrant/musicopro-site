import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Music,
  Menu,
  X,
  Lock,
  ShieldCheck,
  CheckCircle2,
  Loader2,
  ExternalLink,
} from 'lucide-react';
import { Link } from 'wouter';
import Footer from '@/components/Footer';

// Validação de licença (por e-mail)
const PRO_API = 'https://www.musicopro.app.br/api/license/check';

const getProEmail = () => localStorage.getItem('musicopro_email') || '';
const setProEmail = (email: string) => localStorage.setItem('musicopro_email', email);

async function verificarLicencaPorEmail(email: string): Promise<boolean> {
  const res = await fetch(`${PRO_API}?email=${encodeURIComponent(email)}`);
  const data = await res.json();
  return data?.active === true;
}

type Status = 'idle' | 'checking' | 'success' | 'inactive' | 'error';

const GUIDE_FREE_HTML =
  "<h1 >PARTE 1: FUNDAMENTOS</h1>\n\n        <h2>1. O Conceito de Renda para o Músico</h2>\n        <p>Para a Receita Federal, <span >renda</span> é todo valor recebido que aumenta seu patrimônio e não possui caráter de devolução.</p>\n        \n        <h3>💰 Renda tributável na música:</h3>\n        <ul>\n            <li><strong>Cachês</strong> de shows (ao vivo/online)</li>\n            <li><strong>Direitos autorais</strong> e conexos</li>\n            <li><strong>Aulas</strong> particulares ou online</li>\n            <li><strong>Vendas</strong> de merchandising/produtos digitais</li>\n            <li><strong>Plataformas digitais</strong> (YouTube, Spotify)</li>\n            <li><strong>Participações</strong> em eventos</li>\n            <li><strong>Produções musicais</strong> para terceiros</li>\n        </ul>\n\n        <div >\n            <h4>🎯 Regra de Ouro</h4>\n            <p><strong>Cachês são SEMPRE renda tributável</strong>, independentemente de: frequência, meio de pagamento, quem pagou, ou valor individual.</p>\n        </div>\n\n        <h2>2. Obrigatoriedade da Declaração</h2>\n        <p><strong>Você DEVE declarar se:</strong></p>\n        <ol>\n            <li>Recebeu rendimentos tributáveis acima de R$ 30.639,90</li>\n            <li>Recebeu rendimentos isentos acima de R$ 200.000,00</li>\n            <li>Possui bens acima de R$ 800.000,00</li>\n            <li>Teve imposto retido na fonte (RPA)</li>\n            <li>Obteve ganho de capital na venda de bens</li>\n        </ol>\n\n        <div >\n            <p>A maioria dos músicos que buscam profissionalização precisa declarar. A declaração não significa pagamento de imposto, mas sim obrigação de informar.</p>\n        </div>\n\n        <h2>3. Meios de Recebimento: Pix, Dinheiro e Transferência</h2>\n        \n        <h3>❌ O MITO DO PIX</h3>\n        <p><strong>Não existe \"imposto sobre Pix\".</strong> O Pix é apenas meio de pagamento. O imposto incide sobre a origem e natureza do dinheiro.</p>\n\n        <div >\n            <p>A RFB cruza dados bancários, Pix, cartões e notas fiscais. A falta de declaração pode levar à presunção de renda omitida com multas de até 75%.</p>\n            <p><strong>O problema não é o Pix. O problema é a omissão de renda.</strong></p>\n        </div>\n\n        <h2>4. Pessoa Física (PF) vs. Pessoa Jurídica (PJ)</h2>\n\n        <table >\n            <thead>\n                <tr>\n                    <th>Situação</th>\n                    <th>Modelo</th>\n                    <th>Como paga imposto</th>\n                    <th>Quando vale a pena</th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr>\n                    <td>Iniciante</td>\n                    <td>PF</td>\n                    <td>Carnê-Leão / IRPF</td>\n                    <td>Até R$ 3.000/mês</td>\n                </tr>\n                <tr>\n                    <td>Músico Autônomo</td>\n                    <td>MEI</td>\n                    <td>DAS fixo mensal</td>\n                    <td>R$ 3.000 a R$ 7.000/mês</td>\n                </tr>\n                <tr>\n                    <td>Músico Empresa</td>\n                    <td>Simples Nacional</td>\n                    <td>Tributação na empresa</td>\n                    <td>Acima R$ 7.000/mês</td>\n                </tr>\n            </tbody>\n        </table>\n\n        <div >\n            <h4>💡 ECONOMIA COM MEI</h4>\n            <p><strong>Músico com R$ 5.000/mês:</strong></p>\n            <p>Como PF: ~R$ 5.400/ano de imposto<br>\n            Como MEI: R$ 900/ano (DAS)<br>\n            <strong>💰 Economia: R$ 4.500/ano</strong></p>\n        </div>\n\n        <h2>5. Carnê-Leão: Obrigatoriedade e Aplicação</h2>\n        <p>O <strong>Carnê-Leão</strong> é o recolhimento mensal obrigatório do IR por PF que recebe de outra PF ou PJ sem retenção.</p>\n\n        <h3>✅ Quando usar:</h3>\n        <ol>\n            <li>Recebe como <strong>Pessoa Física</strong></li>\n            <li>Pagamento de outra <strong>PF</strong></li>\n            <li>Pagamento de <strong>PJ que não reteve IR</strong></li>\n        </ol>\n\n        <div >\n            <p><strong>Regra:</strong> Recebeu como PF + Não houve retenção = Carnê-Leão OBRIGATÓRIO (se valor &gt; R$ 2.259,20/mês)</p>\n        </div>\n\n        <h3>📅 Passo a passo mensal:</h3>\n        <ol>\n            <li>Receba cachê durante mês</li>\n            <li>Registre no sistema até último dia</li>\n            <li>Informe despesas dedutíveis</li>\n            <li>Sistema calcula automaticamente</li>\n            <li>Gere DARF</li>\n            <li>Pague até último dia útil do mês seguinte</li>\n        </ol>\n\n        <div >\n            <p><strong>ERRO COMUM:</strong> Achar que não tendo imposto, não precisa lançar. <strong>ERRADO!</strong> Mesmo com R$ 0, deve registrar para cumprir obrigação acessória.</p>\n        </div>\n\n        <h3>💻 Acesso: e-CAC → Carnê-Leão Web (login Gov.br)</h3>";

const GUIDE_PRO_HTML =
  "<h2>6. Retenção de IR (RPA)</h2>\n        <p>Quando banda/produtora com CNPJ contrata músico PF via <strong>RPA</strong>, a empresa retém INSS e IR, paga líquido e fornece informe.</p>\n\n        <h4>O músico NÃO usa Carnê-Leão. Apenas declara na ficha \"Rendimentos de PJ\" com informe recebido.</h4>\n\n        <div >\n            <h4>📝 Exemplo:</h4>\n            <p>Cachê R$ 3.000 → Retenções R$ 384 (INSS+IR) → Recebe líquido R$ 2.616<br>\n            Na declaração anual: informa R$ 3.000 e IR já pago de R$ 54 (abate do total)</p>\n        </div>\n\n        <h1 >PARTE 2: GESTÃO FISCAL NA PRÁTICA</h1>\n\n        <h2>7. Despesas Dedutíveis</h2>\n        <p><strong>Deduzir despesas = Reduzir base de cálculo do imposto</strong></p>\n\n        <h3>✅ PODE deduzir (com NF em seu CPF):</h3>\n        <ul>\n            <li><strong>Transporte:</strong> Combustível, Uber, pedágios para shows</li>\n            <li><strong>Equipamentos:</strong> Manutenção, cordas, cabos, aluguel</li>\n            <li><strong>Espaços:</strong> Aluguel de estúdio/sala ensaio</li>\n            <li><strong>Marketing:</strong> Impulsionamento, fotos, site, designer</li>\n            <li><strong>Serviços:</strong> Comissões, contador, advogado</li>\n            <li><strong>Capacitação:</strong> Cursos, workshops, material didático</li>\n            <li><strong>Figurino:</strong> Roupas de palco (uso exclusivo)</li>\n        </ul>\n\n        <h3>❌ NÃO PODE deduzir:</h3>\n        <ul>\n            <li>Gastos pessoais (alimentação comum, roupas dia a dia)</li>\n            <li>Itens de uso misto (celular novo, notebook)</li>\n            <li>Despesas sem comprovação fiscal</li>\n            <li><strong>Instrumentos novos</strong> (são bens, não despesas)</li>\n        </ul>\n\n        <div >\n            <p><strong>DICA DE OURO:</strong> Separe conta bancária pessoal da profissional. Facilita comprovação e defesa em fiscalização.</p>\n        </div>\n\n        <h2>8. Tabela Progressiva do IR (2024/2025)</h2>\n\n        <table >\n            <thead>\n                <tr>\n                    <th>Base Mensal (R$)</th>\n                    <th>Alíquota</th>\n                    <th>Parcela a Deduzir</th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr><td>Até 2.259,20</td><td>Isento (0%)</td><td>0,00</td></tr>\n                <tr><td>2.259,21 a 2.826,65</td><td>7,5%</td><td>169,44</td></tr>\n                <tr><td>2.826,66 a 3.751,05</td><td>15%</td><td>381,44</td></tr>\n                <tr><td>3.751,06 a 4.664,68</td><td>22,5%</td><td>662,77</td></tr>\n                <tr><td>Acima de 4.664,68</td><td>27,5%</td><td>896,00</td></tr>\n            </tbody>\n        </table>\n\n        <p><strong>Fórmula:</strong> <code>Imposto = (Base × Alíquota) - Parcela a Deduzir</code></p>\n\n        <div >\n            <p><strong>⚠️ Tabela muda frequentemente.</strong> Sempre confira no site oficial da Receita Federal.</p>\n        </div>\n\n        <h2>9. Consequências da Não Declaração</h2>\n\n        <h3>🚨 Mecanismos de fiscalização:</h3>\n        <ul>\n            <li>Cruzamento de dados bancários, Pix, cartões, NFs</li>\n            <li>Presunção de renda omitida</li>\n            <li>Multa até <strong>75%</strong> + juros Selic</li>\n            <li>Fraude: 150% + processo criminal</li>\n        </ul>\n\n        <h3>🔒 Malha Fina - Consequências:</h3>\n        <ul>\n            <li>CPF bloqueado/irregular</li>\n            <li>Sem certidão negativa, empréstimos, financiamentos</li>\n            <li>Impedimento em editais culturais, festivais, contratos públicos</li>\n        </ul>\n\n        <div >\n            <p><strong>O problema não é o Pix ou dinheiro. É a omissão de renda.</strong> Declare tudo, deduza o que puder, pague menos de forma legal.</p>\n        </div>\n\n        <h1 >PARTE 3: IMPLEMENTAÇÃO</h1>\n\n        <h2>10. Checklist Mensal</h2>\n\n        <h3>TODO MÊS:</h3>\n        <ul>\n            <li>☐ Guardar comprovantes (NFs, recibos)</li>\n            <li>☐ Separar despesas por categoria</li>\n            <li>☐ Verificar retenção de IR (RPA)</li>\n            <li>☐ Lançar no Carnê-Leão até último dia</li>\n            <li>☐ Gerar e pagar DARF até dia útil seguinte</li>\n            <li>☐ Guardar comprovante de pagamento</li>\n            <li>☐ Baixar extratos bancários</li>\n            <li>☐ Calcular lucro do mês</li>\n        </ul>\n\n        <h3>ROTEIRO ANUAL (Declaração):</h3>\n        <ul>\n            <li>☐ Janeiro: Coletar todos os informes</li>\n            <li>☐ Conferir DARFs pagos no ano</li>\n            <li>☐ Organizar todas NFs/recibos</li>\n            <li>☐ Março-Abril: Preencher e enviar IRPF</li>\n            <li>☐ Consultar restituição</li>\n            <li>☐ Verificar malha fina</li>\n            <li>☐ Arquivar tudo por 5 anos</li>\n        </ul>\n\n        <h2>11. Casos Práticos</h2>\n\n        <h3>Caso 1: João - Guitarrista de Bar</h3>\n        <p>Cachês R$ 2.000 - Despesas R$ 300 - INSS R$ 220 = Base R$ 1.480<br>\n        <strong>Resultado: R$ 0 de imposto</strong> (abaixo da isenção)<br>\n        ✅ Mas deve lançar no Carnê-Leão para informar</p>\n\n        <h3>Caso 2: Maria - Professora de Música</h3>\n        <p>Receitas R$ 4.000 - Despesas R$ 600 - INSS R$ 400 = Base R$ 3.000<br>\n        <strong>Imposto: R$ 68,56</strong><br>\n        ✅ Despesas economizaram R$ 176</p>\n\n        <h3>Caso 3: Carlos - Músico Digital</h3>\n        <p>Renda R$ 8.500/mês (YouTube, Spotify, lives, cursos)<br>\n        <strong>Recomendação: ABRIR MEI URGENTE</strong><br>\n        💰 Economia: ~R$ 13.500/ano</p>\n\n        <h2>12. Ferramentas Recomendadas</h2>\n\n        <h3>Oficiais (Gratuitas):</h3>\n        <ul>\n            <li><strong>e-CAC:</strong> cav.receita.fazenda.gov.br</li>\n            <li><strong>App Meu IR:</strong> iOS/Android</li>\n            <li><strong>Programa IRPF:</strong> Download março/ano</li>\n            <li><strong>Carnê-Leão Web:</strong> Dentro do e-CAC</li>\n        </ul>\n\n        <h3>Apps Controle:</h3>\n        <ul>\n            <li>Mobills, Organizze, GuiaBolso</li>\n        </ul>\n\n        <h2>13. FAQ - Perguntas Frequentes</h2>\n\n        <p><strong>Fiz só 3 shows. Preciso declarar?</strong><br>\n        ✅ Depende. Se total &gt; R$ 30.639,90 ou teve retenção, sim.</p>\n\n        <p><strong>Tenho MEI. Preciso declarar IRPF?</strong><br>\n        ✅ Sim, são coisas diferentes. MEI faz DASN-SIMEI. PF pode precisar IRPF.</p>\n\n        <p><strong>Posso deduzir violão novo?</strong><br>\n        ❌ Não. Instrumento é bem durável. Apenas manutenção é dedutível.</p>\n\n        <p><strong>Pix é monitorado?</strong><br>\n        ✅ Bancos reportam movimentações &gt; R$ 2.000 (PF) ou R$ 6.000 (PJ)/mês.</p>\n\n        <p><strong>Quando vale MEI?</strong><br>\n        ✅ A partir de ~R$ 3.500/mês já compensa.</p>\n\n        <h2>14. Glossário</h2>\n\n        <h2>15. Conclusão</h2>\n\n        <h3>🎶 Você agora sabe:</h3>\n        <ul>\n            <li>✅ Quando e como declarar IR</li>\n            <li>✅ Usar Carnê-Leão corretamente</li>\n            <li>✅ Deduzir despesas legalmente</li>\n            <li>✅ Decidir entre PF e MEI</li>\n            <li>✅ Evitar multas e malha fina</li>\n        </ul>\n\n        <h3>🚀 Ação Imediata (HOJE):</h3>\n        <ol>\n            <li>Crie pasta \"Fiscal 2025\" no Drive</li>\n            <li>Separe conta bancária profissional</li>\n            <li>Baixe app para escanear recibos</li>\n            <li>Anote cachês deste mês</li>\n        </ol>\n\n        <h3>🎯 Lembre-se:</h3>\n        <p><strong>Com IR em dia você:</strong> Participa de editais, obtém certidões, acessa financiamentos, viaja tranquilo, paga menos impostos, dorme tranquilo.</p>\n\n        <div  style=\"text-align: center; padding: 20pt;\">\n            <h3 style=\"margin-top: 0;\">🎵 Músico Organizado Toca Tranquilo</h3>\n            <p style=\"font-size: 11pt; margin-bottom: 0;\">A profissionalização fiscal não é burocracia — é ESTRATÉGIA.</p>\n        </div>\n\n        <div style=\"margin-top: 40pt; padding-top: 20pt; border-top: 2pt solid #e2e8f0; text-align: center; font-size: 9pt; color: #64748b;\">\n            <p><strong>Guia Essencial do IR para Músicos Autônomos</strong></p>\n            <p>Versão 2.0 | Janeiro/2025 | Base Legal: Ano-calendário 2024</p>\n            <p style=\"margin-top: 15pt;\">© 2025 | Todos os direitos reservados</p>\n            <p>Este material tem caráter educativo. Consulte contador para casos específicos.</p>\n        </div>";

const CONTENT_STYLE = `
  .guide-content h1 {
    font-size: 1.6rem;
    font-weight: 800;
    margin: 1.8rem 0 1rem;
    color: #0c2461;
  }
  .guide-content h2 {
    font-size: 1.25rem;
    font-weight: 800;
    margin: 1.4rem 0 0.75rem;
    color: #0c2461;
    border-bottom: 1px solid #E8E3DC;
    padding-bottom: 0.35rem;
  }
  .guide-content h3 {
    font-size: 1.05rem;
    font-weight: 750;
    margin: 1.15rem 0 0.5rem;
    color: #0c2461;
  }
  .guide-content h4 {
    font-size: 1rem;
    font-weight: 700;
    margin: 0.9rem 0 0.4rem;
    color: #0c2461;
  }
  .guide-content p {
    line-height: 1.75;
    color: #0c2461;
    opacity: 0.92;
    margin: 0.55rem 0;
  }
  .guide-content ul,
  .guide-content ol {
    margin: 0.5rem 0 0.9rem 1.1rem;
    color: #0c2461;
    opacity: 0.92;
  }
  .guide-content li {
    margin: 0.35rem 0;
    line-height: 1.65;
  }
  .guide-content code {
    background: #f1f5f9;
    padding: 2px 6px;
    border-radius: 6px;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
      "Courier New", monospace;
    font-size: 0.9em;
  }
  .guide-content table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
    font-size: 0.95rem;
    overflow: hidden;
    border-radius: 12px;
  }
  .guide-content th {
    background: #0c2461;
    color: #fff;
    text-align: left;
    padding: 10px 12px;
  }
  .guide-content td {
    border: 1px solid #e8e3dc;
    padding: 10px 12px;
    vertical-align: top;
  }
  .guide-content tr:nth-child(even) td {
    background: #f8fafc;
  }
  .guide-content .box {
    border: 1px solid #e8e3dc;
    border-left: 4px solid #d4af37;
    background: #ffffff;
    border-radius: 12px;
    padding: 14px 14px;
    margin: 14px 0;
  }
`;

export default function Guide() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [msg, setMsg] = useState('');
  const [isPro, setIsPro] = useState(false);

  const [toast, setToast] = useState('');
  const emailRef = useRef<HTMLInputElement | null>(null);

  const proLink = '/pro';
  const appPage = useMemo(() => {
    const e = email.trim().toLowerCase();
    return e ? `/app?email=${encodeURIComponent(e)}#ativar-app-pro` : '/app#ativar-app-pro';
  }, [email]);

  const scrollToValidate = (focus = false) => {
    const el = document.getElementById('validar-guia-pro');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (focus) setTimeout(() => emailRef.current?.focus(), 250);
  };

  const validate = async (prefill?: string) => {
    const normalized = (prefill ?? email).trim().toLowerCase();
    setEmail(normalized);

    if (!normalized) {
      setStatus('error');
      setMsg('Digite o e-mail usado na compra para validar.');
      setTimeout(() => scrollToValidate(true), 50);
      return;
    }

    try {
      setStatus('checking');
      setMsg('Validando sua licença…');
      setProEmail(normalized);

      const ok = await verificarLicencaPorEmail(normalized);
      setIsPro(ok);

      if (ok) {
        setStatus('success');
        setMsg('✅ Licença ativa! Guia PRO (aprofundado) + App PRO liberados neste navegador.');
        setToast('✅ Pacote PRO liberado neste navegador');
        setTimeout(() => setToast(''), 5200);
        setTimeout(() => scrollToValidate(false), 80);
      } else {
        setStatus('inactive');
        setMsg('Licença não ativa para este e-mail. Verifique se usou o mesmo e-mail da compra.');
        setTimeout(() => scrollToValidate(false), 80);
      }
    } catch (e) {
      console.error(e);
      setIsPro(false);
      setStatus('error');
      setMsg('Não foi possível validar agora. Tente novamente em instantes.');
      setTimeout(() => scrollToValidate(false), 80);
    }
  };

  useEffect(() => {
    const saved = getProEmail().trim().toLowerCase();
    if (saved) {
      setEmail(saved);
      validate(saved);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <style>{CONTENT_STYLE}</style>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#E8E3DC]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Music className="w-8 h-8 text-[#d4af37]" />
            <div>
              <h1 className="font-bold text-[#0c2461]" style={{ fontFamily: 'Lexend, sans-serif' }}>
                Músico Pro
              </h1>
              <p className="text-xs text-[#6ba587]">Guia</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/">
              <button className="text-[#0c2461] hover:text-[#d4af37] transition font-medium">
                Home
              </button>
            </Link>

            <Link href="/app">
              <button className="text-[#0c2461] hover:text-[#d4af37] transition font-medium">
                App
              </button>
            </Link>

            <button
              onClick={() => scrollToValidate(!email)}
              className="bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-4 py-2 rounded-lg transition"
            >
              Ativar pacote
            </button>
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#0c2461]"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-[#0c2461] text-white p-4 space-y-2">
          <Link href="/">
            <button className="w-full text-left px-4 py-2 rounded hover:bg-white/10 transition">
              Home
            </button>
          </Link>

          <Link href="/app">
            <button className="w-full text-left px-4 py-2 rounded hover:bg-white/10 transition">
              App
            </button>
          </Link>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              scrollToValidate(true);
            }}
            className="w-full text-left px-4 py-2 rounded hover:bg-white/10 transition font-bold"
          >
            Ativar pacote
          </button>
        </nav>
      )}

      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {toast && (
          <div className="mb-6 bg-[#e8fff2] border border-[#36b37e] rounded-lg p-4">
            <p className="text-[#0c2461] font-semibold">{toast}</p>
            <p className="text-sm text-[#0c2461] opacity-80">
              Dica: se trocar de celular/navegador, valide novamente com o mesmo e-mail.
            </p>
          </div>
        )}

        {/* Hero */}
        <section className="mb-10 space-y-5">
          <div className="bg-gradient-to-br from-[#0c2461] to-[#1a3a7a] rounded-lg p-8 md:p-12 text-white space-y-5">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">Guia do Músico Autônomo</h2>
            <p className="text-lg opacity-90">
              <strong>Guia (conhecimento) + App (ferramenta prática)</strong> são um pacote único:
              você entende no guia e executa no app.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 pt-1">
              <button
                onClick={() => scrollToValidate(!email)}
                className="bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-6 py-3 rounded-lg transition"
              >
                👉 Ativar pacote (validar licença)
              </button>

              <Link href="/app">
                <button className="bg-transparent hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-lg transition border border-white/50 w-full">
                  Ver página do App
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Ativação */}
        <section id="validar-guia-pro" className="mb-12 space-y-4">
          <h3 className="text-2xl font-bold text-[#0c2461]">
            Ativar pacote PRO (Guia aprofundado + App PRO)
          </h3>

          <div className="bg-[#f8fafc] border border-[#E8E3DC] rounded-lg p-6 space-y-4">
            <p className="text-[#0c2461] opacity-90">
              Digite o <strong>mesmo e-mail usado na compra</strong>. Se a licença estiver ativa, o{' '}
              <strong>Guia PRO</strong> abre aqui e o <strong>App PRO</strong> também é liberado.
            </p>

            {status !== 'idle' && (
              <div
                className={[
                  'rounded-lg p-4 border flex gap-3 items-start',
                  status === 'success'
                    ? 'bg-[#e8fff2] border-[#36b37e]'
                    : status === 'inactive'
                      ? 'bg-[#fff4e6] border-[#d4af37]'
                      : status === 'checking'
                        ? 'bg-[#eef6ff] border-[#2f6fed]'
                        : 'bg-[#fff1f2] border-[#ef4444]',
                ].join(' ')}
              >
                {status === 'checking' ? (
                  <Loader2 className="w-5 h-5 flex-shrink-0 mt-0.5 animate-spin text-[#0c2461]" />
                ) : status === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#0c2461]" />
                ) : (
                  <ShieldCheck className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#0c2461]" />
                )}

                <div>
                  <p className="font-semibold text-[#0c2461]">
                    {status === 'checking'
                      ? 'Validando…'
                      : status === 'success'
                        ? 'Acesso PRO confirmado'
                        : status === 'inactive'
                          ? 'Licença não ativa'
                          : 'Falha na validação'}
                  </p>
                  <p className="text-sm text-[#0c2461] opacity-80">{msg}</p>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-[1fr_auto] gap-3">
              <input
                ref={emailRef}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu e-mail (usado na compra)"
                className="w-full px-4 py-3 rounded-lg border border-[#E8E3DC] focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                type="email"
                autoComplete="email"
              />

              <button
                onClick={() => validate()}
                disabled={status === 'checking'}
                className="bg-[#0c2461] hover:bg-[#1a3a7a] disabled:opacity-60 text-white font-bold px-6 py-3 rounded-lg transition"
              >
                {status === 'checking' ? 'Validando…' : 'Validar licença'}
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <Link href={proLink}>
                <button className="w-full sm:w-auto bg-white border border-[#E8E3DC] hover:bg-[#f0f4f8] text-[#0c2461] font-semibold px-5 py-2 rounded-lg transition">
                  Comprar / Gerenciar assinatura
                </button>
              </Link>

              <Link href={appPage}>
                <button className="w-full sm:w-auto bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-5 py-2 rounded-lg transition flex items-center justify-center gap-2">
                  Ir para ativação do App PRO <ExternalLink className="w-4 h-4" />
                </button>
              </Link>
            </div>

            <p className="text-xs text-[#0c2461] opacity-70">
              Importante: a licença PRO é <strong>um pacote completo</strong> — guia aprofundado + app
              com todas as funções PRO.
            </p>
          </div>
        </section>

        {/* Guia grátis */}
        <section className="mb-14 space-y-4">
          <div className="flex items-end justify-between gap-3 flex-wrap">
            <h3 className="text-3xl font-bold text-[#0c2461]">Guia grátis</h3>
            <p className="text-sm text-[#0c2461] opacity-70">
              (Parte fundamental para entender antes de usar o app)
            </p>
          </div>

          <div className="bg-[#f0f4f8] rounded-lg p-6 md:p-8">
            <div className="guide-content" dangerouslySetInnerHTML={{ __html: GUIDE_FREE_HTML }} />
          </div>
        </section>

        {/* Guia PRO */}
        <section id="guia-pro" className="mb-14 space-y-5">
          <h3 className="text-3xl font-bold text-[#0c2461]">Guia PRO (aprofundado)</h3>

          {isPro ? (
            <div className="bg-[#ffffff] border border-[#E8E3DC] rounded-lg p-6 md:p-8">
              <div className="mb-5 bg-[#e8fff2] border border-[#36b37e] rounded-lg p-4">
                <p className="text-[#0c2461] font-semibold">✅ PRO liberado</p>
                <p className="text-sm text-[#0c2461] opacity-80">
                  Abaixo está o conteúdo avançado do guia. Para aplicar na prática (cálculos,
                  organização e rotinas), use o App.
                </p>
              </div>

              <div className="guide-content" dangerouslySetInnerHTML={{ __html: GUIDE_PRO_HTML }} />

              <div className="mt-7 grid sm:grid-cols-2 gap-3">
                <Link href={appPage}>
                  <button className="w-full bg-[#d4af37] hover:bg-[#c99a2e] text-[#0c2461] font-bold px-6 py-3 rounded-lg transition">
                    🚀 Abrir ativação do App PRO
                  </button>
                </Link>

                <Link href="/app">
                  <button className="w-full bg-white border border-[#E8E3DC] hover:bg-[#f0f4f8] text-[#0c2461] font-semibold px-6 py-3 rounded-lg transition">
                    Ver página do App
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-[#fff4e6] border-2 border-[#d4af37] rounded-lg p-6 md:p-8 space-y-4">
              <div className="flex gap-3">
                <Lock className="w-6 h-6 text-[#d4af37] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-[#0c2461] font-bold text-lg">Conteúdo PRO bloqueado</p>
                  <p className="text-[#0c2461] opacity-90">
                    Valide sua licença acima para desbloquear o guia aprofundado <strong>e</strong> o
                    App com todas as funções PRO.
                  </p>
                </div>
              </div>

              <button
                onClick={() => scrollToValidate(!email)}
                className="w-full bg-[#0c2461] hover:bg-[#1a3a7a] text-white font-bold px-6 py-3 rounded-lg transition"
              >
                Validar licença agora
              </button>

              <Link href={proLink}>
                <button className="w-full bg-white border border-[#E8E3DC] hover:bg-[#f0f4f8] text-[#0c2461] font-semibold px-6 py-3 rounded-lg transition">
                  Comprar / Gerenciar assinatura
                </button>
              </Link>
            </div>
          )}
        </section>

        <Footer />
      </main>
    </div>
  );
}
