import React from 'react';
import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import PromoCardApp from './PromoCardApp';

const GUIDE_PRO_STYLE = `
  .guide-pro-doc {
      --primary: #667eea; --secondary: #764ba2; --accent: #f59e0b;
      --danger: #ef4444; --success: #10b981; --dark: #2d3748;
      font-family: Georgia, serif; line-height: 1.7; color: #1a202c; 
      font-size: 11pt;
  }
  .guide-pro-doc .container { max-width: 210mm; margin: 0 auto; background: white; 
              padding: 25mm 20mm; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
  @media print {
      .guide-pro-doc { font-family: Georgia, serif; line-height: 1.6; color: #1a202c; 
             background: white; margin: 0; padding: 0; font-size: 11pt; }
      .guide-pro-doc .container { max-width: 100%; margin: 0; padding: 0; box-shadow: none; }
      .guide-pro-doc h1, .guide-pro-doc h2, .guide-pro-doc h3, .guide-pro-doc h4 { page-break-after: avoid; page-break-inside: avoid; }
      .guide-pro-doc p, .guide-pro-doc ul, .guide-pro-doc ol, .guide-pro-doc table { page-break-inside: avoid; orphans: 3; widows: 3; }
      .guide-pro-doc .page-break { page-break-before: always; }
      .guide-pro-doc .no-break { page-break-inside: avoid; }
      .guide-pro-doc * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
  }
  @page { size: A4 portrait; margin: 20mm 15mm; }
  @page :first { margin: 0; }
  .guide-pro-doc h1 { font-size: 24pt; color: var(--primary); margin: 30pt 0 15pt 0; font-weight: 700; line-height: 1.3; }
  .guide-pro-doc h2 { font-size: 18pt; color: var(--primary); margin: 24pt 0 12pt 0; padding-bottom: 8pt; 
       border-bottom: 2pt solid var(--primary); font-weight: 700; }
  .guide-pro-doc h3 { font-size: 14pt; color: var(--secondary); margin: 18pt 0 10pt 0; font-weight: 600; }
  .guide-pro-doc h4 { font-size: 12pt; color: var(--dark); margin: 15pt 0 8pt 0; font-weight: 600; }
  .guide-pro-doc p { margin: 0 0 10pt 0; text-align: justify; hyphens: auto; }
  .guide-pro-doc ul, .guide-pro-doc ol { margin: 10pt 0 10pt 20pt; }
  .guide-pro-doc li { margin-bottom: 6pt; line-height: 1.6; }
  .guide-pro-doc strong { font-weight: 600; color: var(--dark); }
  .guide-pro-doc .cover { page-break-after: always; height: auto; min-height: 277mm; display: flex; flex-direction: column; 
          justify-content: center; align-items: center; text-align: center; 
          background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%); 
          color: white; padding: 40mm 20mm; margin: -25mm -20mm 0 -20mm; }
  @media print { .guide-pro-doc .cover { height: 100vh; margin: 0; padding: 80pt 40pt; } }
  .guide-pro-doc .cover-emoji { font-size: 60pt; margin-bottom: 20pt; }
  .guide-pro-doc .cover h1 { font-size: 32pt; color: white; margin: 20pt 0; border: none; }
  .guide-pro-doc .cover .subtitle { font-size: 18pt; margin: 15pt 0; opacity: 0.95; }
  .guide-pro-doc .cover .edition { margin-top: 30pt; padding: 15pt; background: rgba(255,255,255,0.15); 
                   border-radius: 8pt; font-size: 12pt; }
  .guide-pro-doc .box { padding: 12pt; margin: 15pt 0; border-radius: 4pt; page-break-inside: avoid; }
  .guide-pro-doc .alert { background: #fef3c7; border-left: 4pt solid var(--accent); }
  .guide-pro-doc .tip { background: #dbeafe; border-left: 4pt solid #3b82f6; }
  .guide-pro-doc .tip::before { content: "💡 DICA PRO"; display: block; font-weight: bold; 
                color: #1e40af; margin-bottom: 8pt; font-size: 10pt; }
  .guide-pro-doc .warning { background: #fee2e2; border-left: 4pt solid var(--danger); }
  .guide-pro-doc .warning::before { content: "🚨 ATENÇÃO"; display: block; font-weight: bold; 
                    color: #dc2626; margin-bottom: 8pt; font-size: 10pt; }
  .guide-pro-doc .success { background: #d1fae5; border-left: 4pt solid var(--success); }
  .guide-pro-doc .case-study { background: #f0f4ff; border: 2pt solid var(--primary); padding: 15pt; 
               margin: 15pt 0; border-radius: 4pt; page-break-inside: avoid; }
  .guide-pro-doc table { width: 100%; border-collapse: collapse; margin: 15pt 0; page-break-inside: avoid; font-size: 9.5pt; }
  .guide-pro-doc th { background: var(--primary); color: white; padding: 8pt; text-align: left; 
       font-weight: 600; border: 1pt solid #ddd; }
  .guide-pro-doc td { padding: 6pt 8pt; border: 1pt solid #ddd; vertical-align: top; }
  .guide-pro-doc tr:nth-child(even) { background: #f7fafc; }
  .guide-pro-doc .highlight { background: #fef3c7; padding: 2pt 6pt; border-radius: 2pt; font-weight: 600; }
  .guide-pro-doc .text-center { text-align: center !important; }
  .guide-pro-doc code { background: #f1f5f9; padding: 2pt 4pt; border-radius: 2pt; 
        font-family: 'Courier New', monospace; font-size: 9pt; }
`;

const GUIDE_CONTENT = `
        <div class="cover">
            <div class="cover-emoji">🎵</div>
            <h1>Guia Essencial do Imposto de Renda<br>para Músicos Autônomos</h1>
            <p class="subtitle">Transforme sua Arte em Carreira Profissional</p>
            <div class="edition">
                <strong>Edição Completa 2026</strong><br>
                Base Legal: Ano-Calendário 2025<br>
                Março de 2026
            </div>
        </div>

        <div class="page-break"></div>
        
        <div class="box success no-break">
            <h2 style="margin-top: 0; border: none;">⚡ GUIA RÁPIDO</h2>
            <p><strong>Para quem é:</strong> Músicos autônomos, professores de música, artistas com receitas de shows e aulas.</p>
            <p><strong>O que vai aprender:</strong> Como declarar IR, usar Carnê-Leão, deduzir despesas, decidir entre PF e MEI.</p>
            <p><strong>Como usar:</strong> Leia seções 1-6 para conceitos, foque em 7-11 para prática, consulte FAQ quando tiver dúvidas.</p>
        </div>

        <div class="box alert no-break">
            <h3>📌 AVISO IMPORTANTE</h3>
            <p>Este guia possui caráter <strong>estritamente educativo</strong>. A legislação tributária brasileira é dinâmica. <strong>Sempre consulte a legislação vigente</strong> e, em casos complexos, procure um contador especializado.</p>
            <p><strong>Atualização:</strong> Março/2026 | <strong>Base legal:</strong> Ano-calendário 2025</p>
        </div>

        <div class="page-break"></div>

        <h1 class="text-center">PARTE 1: FUNDAMENTOS</h1>

        <h2>1. O Conceito de Renda para o Músico</h2>
        <p>Para a Receita Federal, <span class="highlight">renda</span> é todo valor recebido que aumenta seu patrimônio e não possui caráter de devolução.</p>
        
        <h3>💰 Renda tributável na música:</h3>
        <ul>
            <li><strong>Cachês</strong> de shows (ao vivo/online)</li>
            <li><strong>Direitos autorais</strong> e conexos</li>
            <li><strong>Aulas</strong> particulares ou online</li>
            <li><strong>Vendas</strong> de merchandising/produtos digitais</li>
            <li><strong>Plataformas digitais</strong> (YouTube, Spotify)</li>
            <li><strong>Participações</strong> em eventos</li>
            <li><strong>Produções musicais</strong> para terceiros</li>
        </ul>

        <div class="box success no-break">
            <h4>🎯 Regra de Ouro</h4>
            <p><strong>Cachês são SEMPRE renda tributável</strong>, independentemente de: frequência, meio de pagamento, quem pagou, ou valor individual.</p>
        </div>

        <h2>2. Obrigatoriedade da Declaração</h2>
        <p><strong>Você DEVE declarar se:</strong></p>
        <ol>
            <li>Recebeu rendimentos tributáveis acima de R$ 33.888,00 (ano-calendário 2025)</li>
            <li>Recebeu rendimentos isentos acima de R$ 200.000,00</li>
            <li>Possui bens acima de R$ 800.000,00</li>
            <li>Teve imposto retido na fonte (RPA)</li>
            <li>Obteve ganho de capital na venda de bens</li>
            <li>Realizou operações em bolsa acima de R$ 40.000,00</li>
        </ol>

        <div class="box tip no-break">
            <p>A maioria dos músicos que buscam profissionalização precisa declarar. A declaração não significa pagamento de imposto, mas sim obrigação de informar.</p>
        </div>

        <h2>3. Meios de Recebimento: Pix, Dinheiro e Transferência</h2>
        
        <h3>❌ O MITO DO PIX</h3>
        <p><strong>Não existe "imposto sobre Pix".</strong> O Pix é apenas meio de pagamento. O imposto incide sobre a origem e natureza do dinheiro.</p>

        <div class="box warning no-break">
            <p>A RFB cruza dados bancários, Pix, cartões e notas fiscais. A falta de declaração pode levar à presunção de renda omitida com multas de até 75%.</p>
            <p><strong>O problema não é o Pix. O problema é a omissão de renda.</strong></p>
        </div>

        <div class="page-break"></div>

        <h2>4. Pessoa Física (PF) vs. Pessoa Jurídica (PJ)</h2>

        <table class="no-break">
            <thead>
                <tr>
                    <th>Situação</th>
                    <th>Modelo</th>
                    <th>Tributação</th>
                    <th>Indicado Para</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Músico Autônomo</td>
                    <td>PF</td>
                    <td>Carnê-Leão mensal</td>
                    <td>Até R$ 5.000/mês</td>
                </tr>
                <tr>
                    <td>Músico MEI</td>
                    <td>Microempreendedor</td>
                    <td>DAS fixo ~R$ 77/mês</td>
                    <td>R$ 3.000 a R$ 7.000/mês</td>
                </tr>
                <tr>
                    <td>Músico Empresa</td>
                    <td>Simples Nacional</td>
                    <td>Tributação na empresa</td>
                    <td>Acima R$ 7.000/mês</td>
                </tr>
            </tbody>
        </table>

        <div class="case-study no-break">
            <h4>💡 ECONOMIA COM MEI</h4>
            <p><strong>Músico com R$ 5.000/mês:</strong></p>
            <p>Como PF: ~R$ 5.400/ano de imposto<br>
            Como MEI: R$ 900/ano (DAS)<br>
            <strong>💰 Economia: R$ 4.500/ano</strong></p>
        </div>

        <h2>5. Carnê-Leão: Obrigatoriedade e Aplicação</h2>
        <p>O <strong>Carnê-Leão</strong> é o recolhimento mensal obrigatório do IR por PF que recebe de outra PF ou PJ sem retenção.</p>

        <h3>✅ Quando usar:</h3>
        <ol>
            <li>Recebe como <strong>Pessoa Física</strong></li>
            <li>Pagamento de outra <strong>PF</strong></li>
            <li>Pagamento de <strong>PJ que não reteve IR</strong></li>
        </ol>

        <div class="box success no-break">
            <p><strong>Regra:</strong> Recebeu como PF + Não houve retenção = Carnê-Leão OBRIGATÓRIO (se valor > R$ 2.428,80/mês)</p>
        </div>

        <h3>📅 Passo a passo mensal:</h3>
        <ol>
            <li>Receba cachê durante mês</li>
            <li>Registre no sistema até último dia</li>
            <li>Informe despesas dedutíveis</li>
            <li>Sistema calcula automaticamente</li>
            <li>Gere DARF</li>
            <li>Pague até último dia útil do mês seguinte</li>
        </ol>

        <div class="box warning no-break">
            <p><strong>ERRO COMUM:</strong> Achar que não tendo imposto, não precisa lançar. <strong>ERRADO!</strong> Mesmo com R$ 0, deve registrar para cumprir obrigação acessória.</p>
        </div>

        <h3>💻 Acesso: e-CAC → Carnê-Leão Web (login Gov.br)</h3>

        <div class="page-break"></div>

        <h2>6. Retenção de IR (RPA)</h2>
        <p>Quando banda/produtora com CNPJ contrata músico PF via <strong>RPA (Recibo de Pagamento a Autônomo)</strong>, a empresa é responsável por reter e recolher INSS, IR e ISS antes de pagar o líquido ao músico.</p>

        <h4>✅ O músico NÃO usa Carnê-Leão nesses casos. Declara apenas na ficha "Rendimentos Recebidos de PJ" com o informe de rendimentos fornecido pela contratante.</h4>

        <h3>📋 Descontos aplicados no RPA</h3>

        <table class="no-break">
            <thead>
                <tr>
                    <th>Desconto</th>
                    <th>Alíquota</th>
                    <th>Base / Teto</th>
                    <th>Observação</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>INSS</strong> (Contribuinte Individual)</td>
                    <td>11%</td>
                    <td>Teto: R$ 8.157,41 → desconto máximo R$ 951,62</td>
                    <td>Incide sobre o valor bruto do RPA. É 100% dedutível da base do IRPF</td>
                </tr>
                <tr>
                    <td><strong>IRPF</strong> — Tabela Progressiva (ano-base 2025)</td>
                    <td>0% a 27,5%</td>
                    <td>Base = Bruto − INSS</td>
                    <td>Ver tabela progressiva na Seção 8. Valor retido abate o imposto anual na declaração</td>
                </tr>
                <tr>
                    <td><strong>IRPF</strong> — Nova isenção (a partir de jan/2026)</td>
                    <td>0% até R$ 5.000,00</td>
                    <td>Redutor para R$ 5.000,01 a R$ 7.350,00: <code>R$ 978,62 − (0,133145 × rendimento)</code></td>
                    <td>Lei nº 15.270/2025. Aplica-se a pagamentos feitos a partir de 01/01/2026 (ver Seção 8)</td>
                </tr>
                <tr>
                    <td><strong>ISS</strong> (Imposto Sobre Serviços)</td>
                    <td>2% a 5%</td>
                    <td>Sobre o valor bruto do serviço</td>
                    <td>Varia por município. Retido pelo contratante se o músico não tiver cadastro na prefeitura. <strong>Atenção: substituído pelo IBS a partir de 2026 (Reforma Tributária)</strong></td>
                </tr>
            </tbody>
        </table>

        <div class="box warning no-break">
            <p><strong>Reforma Tributária — ISS/IBS:</strong> Com a Reforma Tributária em curso, o ISS começa a ser substituído pelo <strong>IBS (Imposto sobre Bens e Serviços)</strong> a partir de 2026. Durante o período de transição, verifique com o contratante qual tributo está sendo retido e em qual base legal.</p>
        </div>

        <div class="case-study no-break">
            <h4>📝 Exemplo prático — Cachê R$ 3.000 via RPA (ano-base 2025)</h4>
            <p>
                Valor bruto: R$ 3.000,00<br>
                (−) INSS 11%: R$ 330,00<br>
                Base IRPF: R$ 2.670,00 → alíquota 7,5% − R$ 182,16 = <strong>IR retido: R$ 18,09</strong><br>
                (−) ISS ~3% (estimado): R$ 90,00<br>
                <strong>Líquido recebido: ≈ R$ 2.561,91</strong><br><br>
                Na declaração anual: informa bruto R$ 3.000,00, INSS R$ 330,00 e IR retido R$ 18,09 (abate do imposto total a pagar).
            </p>
        </div>

        <div class="box tip no-break">
            <p><strong>💡 Exija sempre o informe de rendimentos</strong> da empresa contratante até fevereiro do ano seguinte. Sem ele, você não consegue comprovar o IR já retido e pode pagar em duplicidade na declaração.</p>
        </div>

        <div class="page-break"></div>

        <h1 class="text-center">PARTE 2: GESTÃO FISCAL NA PRÁTICA</h1>

        <h2>7. Despesas Dedutíveis no Livro-Caixa</h2>
        <p><strong>Deduzir despesas = Reduzir a base de cálculo do imposto.</strong> Todas as deduções abaixo seguem a Lei nº 8.134/1990, art. 6º, RIR/2018 e IN SRF nº 15/2001, art. 51. Exigem <strong>NF-e ou recibo com seu CPF</strong> e devem ser indispensáveis à geração da receita.</p>

        <table class="no-break">
            <thead>
                <tr>
                    <th>Categoria</th>
                    <th>O que pode deduzir</th>
                    <th>Atenção / Limite</th>
                    <th>Documentação</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>Instrumentos e Equipamentos (Consumo)</strong></td>
                    <td>Manutenção, conserto, cordas, palhetas, baquetas, peles, cabos, conectores e materiais consumíveis</td>
                    <td>Apenas bens que se extinguem com o uso. Itens com vida útil &gt; 1 ano são capital, não despesa</td>
                    <td>NF-e com CPF do músico ou recibo identificado</td>
                </tr>
                <tr>
                    <td><strong>Infraestrutura e Custeio</strong></td>
                    <td>Aluguel de estúdio/sala, som/iluminação, material de expediente, água, luz, telefone, internet</td>
                    <td>Limitado ao valor da receita mensal; devem ser indispensáveis à atividade</td>
                    <td>Contratos de locação, NFs e faturas em nome do profissional</td>
                </tr>
                <tr>
                    <td><strong>Imóvel Misto (residência + estúdio)</strong></td>
                    <td>Aluguel, energia, água, condomínio, IPTU do imóvel usado também como estúdio</td>
                    <td>Deduz apenas <strong>20% (1/5)</strong> das despesas quando não se comprova a fração exata de uso profissional — RIR/2018, art. 155, §1º</td>
                    <td>Contrato de locação, recibos e faturas</td>
                </tr>
                <tr style="background:#fee2e2;">
                    <td><strong>Transporte e Deslocamento</strong> ⚠️</td>
                    <td>Passagens, hospedagem e frete de instrumentos para shows/gravações com comprovação direta do evento</td>
                    <td><strong>NÃO é dedutível como regra geral.</strong> Combustível, Uber, pedágios do dia a dia não são aceitos. Só há respaldo quando há vínculo comprovado e direto com um evento gerador de receita (bilhete + cachê do mesmo evento). A Receita Federal não reconhece transporte como despesa de Livro-Caixa para autônomos PF na maioria dos casos. Consulte contador.</td>
                    <td>Bilhetes nominais, NFs de hotel e recibo do cachê do mesmo evento</td>
                </tr>
                <tr>
                    <td><strong>Remuneração de Terceiros</strong></td>
                    <td>Pagamento a roadies, assistentes e secretárias com vínculo empregatício, incluindo FGTS e INSS patronal</td>
                    <td>Exige vínculo empregatício formal (eSocial)</td>
                    <td>Folha de pagamento e guias de recolhimento</td>
                </tr>
                <tr>
                    <td><strong>Serviços de Terceiros</strong></td>
                    <td>Comissões de empresários, honorários de contador/advogado, serviços de limpeza, segurança e suporte técnico</td>
                    <td>Devem estar diretamente ligados ao exercício da atividade</td>
                    <td>RPA, NFS-e e contratos</td>
                </tr>
                <tr>
                    <td><strong>Capacitação e Aperfeiçoamento</strong></td>
                    <td>Cursos, workshops, aulas de música, material didático, partituras e publicações técnicas</td>
                    <td>Deve ser formação técnica necessária à função; educação básica não é dedutível</td>
                    <td>Certificados e NFs de instituições de ensino</td>
                </tr>
                <tr>
                    <td><strong>Propaganda e Marketing</strong></td>
                    <td>Impulsionamento (Ads), criação de site, fotos profissionais, design, assessoria e videoclipes</td>
                    <td>Publicidade deve se relacionar diretamente com a promoção da carreira e geração de receita</td>
                    <td>NFs de agências/plataformas e comprovantes digitais</td>
                </tr>
                <tr>
                    <td><strong>Figurino e Caracterização</strong></td>
                    <td>Roupas de palco de uso exclusivo, fardamentos, maquiagem e cabelo para apresentações</td>
                    <td>Apenas vestuário especial/técnico; roupas de uso comum no dia a dia não são aceitas</td>
                    <td>NFs discriminando os itens específicos</td>
                </tr>
                <tr>
                    <td><strong>Produção Musical e Tecnologia</strong></td>
                    <td>Gravação, edição, masterização, softwares (DAWs), plugins e computadores de uso profissional</td>
                    <td>Devem ser fundamentais para a geração do rendimento e de uso essencialmente profissional</td>
                    <td>NFs em nome do profissional e RPAs</td>
                </tr>
                <tr>
                    <td><strong>Contribuições e Anuidades</strong></td>
                    <td>Anuidades de sindicatos, associações (ex: OMB), taxas cartorárias e judiciais ligadas à atividade</td>
                    <td>A participação deve ser necessária à percepção do rendimento profissional</td>
                    <td>Comprovantes de quitação e boletos pagos</td>
                </tr>
                <tr>
                    <td><strong>Benfeitorias em Imóvel Locado</strong></td>
                    <td>Melhorias no espaço locado para fins profissionais, quando previstas contratualmente</td>
                    <td>Deve haver previsão em contrato como compensação pelo uso — Lei nº 4.506/1964, art. 23, IV</td>
                    <td>Contrato de locação e NFs dos gastos</td>
                </tr>
            </tbody>
        </table>

        <h3>❌ NÃO PODE deduzir no Livro-Caixa:</h3>
        <ul>
            <li><strong>Alimentação</strong> — em nenhuma hipótese, mesmo em viagem para show (não prevista na legislação do Livro-Caixa para PF autônoma)</li>
            <li><strong>Transporte de uso geral</strong> — combustível, Uber e pedágios do cotidiano não são aceitos; apenas deslocamentos com vínculo direto e comprovado a um evento gerador de receita têm respaldo parcial</li>
            <li>Gastos pessoais (roupas do dia a dia, higiene pessoal)</li>
            <li>Itens de uso misto sem comprovação da fração profissional</li>
            <li>Despesas sem documentação fiscal (NF ou recibo com CPF)</li>
            <li><strong>Instrumentos e equipamentos novos de longa duração</strong> (vida útil &gt; 1 ano) — são aplicação de capital; devem ser declarados em "Bens e Direitos"</li>
            <li>Gastos com acompanhantes em viagens</li>
            <li>Educação básica (ensino fundamental, médio)</li>
        </ul>

        <div class="box tip no-break">
            <p><strong>DICA DE OURO:</strong> Separe conta bancária pessoal da profissional. Facilita comprovação e defesa em fiscalização. Guarde todos os documentos por <strong>5 anos</strong> — prazo de decadência do fisco.</p>
        </div>

        <div class="box alert no-break">
            <h4>⚠️ Imóvel Misto — Regra dos 20%</h4>
            <p>Se você usa a mesma residência como estúdio ou sala de aula e não consegue comprovar a fração exata do uso profissional, a Receita Federal admite deduzir <strong>apenas 20%</strong> das despesas do imóvel (aluguel, luz, água, condomínio). Documente com fotos, planta baixa ou laudo de uso para suportar eventual fiscalização.</p>
        </div>

        <h2>8. Tabela Progressiva do IR (Declaração 2026 — Ano-calendário 2025)</h2>

        <p>A tabela progressiva usada na <strong>declaração entregue em 2026</strong> (referente aos rendimentos de 2025) mantém as faixas de 2025:</p>

        <table class="no-break">
            <thead>
                <tr>
                    <th>Base Mensal (R$)</th>
                    <th>Alíquota</th>
                    <th>Parcela a Deduzir</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>Até 2.428,80</td><td>Isento (0%)</td><td>0,00</td></tr>
                <tr><td>2.428,81 a 2.826,65</td><td>7,5%</td><td>182,16</td></tr>
                <tr><td>2.826,66 a 3.751,05</td><td>15%</td><td>394,16</td></tr>
                <tr><td>3.751,06 a 4.664,68</td><td>22,5%</td><td>675,49</td></tr>
                <tr><td>Acima de 4.664,68</td><td>27,5%</td><td>908,73</td></tr>
            </tbody>
        </table>

        <p><strong>Fórmula:</strong> <code>Imposto = (Base × Alíquota) - Parcela a Deduzir</code></p>

        <div class="box success no-break">
            <h4>🆕 Nova Isenção — Lei nº 15.270/2025 — NÃO vale para a declaração 2026 (ano-base 2025)</h4>
            <p><strong>Vigência: a partir de 01/01/2026.</strong> Impacta o Carnê-Leão mensal de 2026 e a declaração de 2027 (ano-base 2026).</p>

            <table style="margin:10pt 0; font-size:9pt;">
                <thead>
                    <tr>
                        <th>Faixa de rendimento mensal</th>
                        <th>Situação</th>
                        <th>Como calcular</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Até R$ 5.000,00</td>
                        <td>✅ <strong>Isento (IR = zero)</strong></td>
                        <td>Redução de até R$ 312,89 zera o imposto devido</td>
                    </tr>
                    <tr>
                        <td>R$ 5.000,01 a R$ 7.350,00</td>
                        <td>⚠️ Redução parcial decrescente</td>
                        <td><code>Redutor = R$ 978,62 − (0,133145 × rendimento)</code><br>O redutor diminui linearmente até zerar em R$ 7.350,00</td>
                    </tr>
                    <tr>
                        <td>Acima de R$ 7.350,00</td>
                        <td>Tabela progressiva normal</td>
                        <td>Sem redutor. Aplica-se alíquota + parcela a deduzir da tabela acima</td>
                    </tr>
                </tbody>
            </table>

            <p><strong>⚠️ Declaração 2026 (ano-base 2025):</strong> essa isenção <u>não se aplica</u>. Os rendimentos de 2025 foram recebidos antes da vigência — use apenas a tabela progressiva acima.</p>
            <p><strong>✅ A partir de jan/2026:</strong> músicos com renda de até R$ 5.000/mês podem <strong>zerar o IR no Carnê-Leão</strong>. Para rendas entre R$ 5.000,01 e R$ 7.350,00, aplique a fórmula do redutor antes de gerar o DARF.</p>
        </div>

        <div class="box alert no-break">
            <p><strong>⚠️ Tabela muda frequentemente.</strong> Sempre confira no site oficial da Receita Federal.</p>
        </div>

        <h2>9. Consequências da Não Declaração</h2>

        <h3>🚨 Mecanismos de fiscalização:</h3>
        <ul>
            <li>Cruzamento de dados bancários, Pix, cartões, NFs</li>
            <li>Presunção de renda omitida</li>
            <li>Multa até <strong>75%</strong> + juros Selic</li>
            <li>Fraude: 150% + processo criminal</li>
        </ul>

        <h3>🔒 Malha Fina - Consequências:</h3>
        <ul>
            <li>CPF bloqueado/irregular</li>
            <li>Sem certidão negativa, empréstimos, financiamentos</li>
            <li>Impedimento em editais culturais, festivais, contratos públicos</li>
        </ul>

        <div class="box warning no-break">
            <p><strong>O problema não é o Pix ou dinheiro. É a omissão de renda.</strong> Declare tudo, deduza o que puder, pague menos de forma legal.</p>
        </div>

        <div class="page-break"></div>

        <h1 class="text-center">PARTE 3: IMPLEMENTAÇÃO</h1>

        <h2>10. Checklist Mensal</h2>

        <h3>TODO MÊS:</h3>
        <ul>
            <li>☐ Guardar comprovantes (NFs, recibos)</li>
            <li>☐ Separar despesas por categoria</li>
            <li>☐ Verificar retenção de IR (RPA)</li>
            <li>☐ Lançar no Carnê-Leão até último dia</li>
            <li>☐ Gerar e pagar DARF até dia útil seguinte</li>
            <li>☐ Guardar comprovante de pagamento</li>
            <li>☐ Baixar extratos bancários</li>
            <li>☐ Calcular lucro do mês</li>
        </ul>

        <h3>ROTEIRO ANUAL (Declaração 2026 — ano-base 2025):</h3>
        <ul>
            <li>☐ Janeiro: Coletar todos os informes</li>
            <li>☐ Conferir DARFs pagos no ano</li>
            <li>☐ Organizar todas NFs/recibos</li>
            <li>☐ Março-Abril: Preencher e enviar IRPF</li>
            <li>☐ Consultar restituição</li>
            <li>☐ Verificar malha fina</li>
            <li>☐ Arquivar tudo por 5 anos</li>
        </ul>

        <h2>11. Casos Práticos</h2>

        <h3>Caso 1: João - Guitarrista de Bar</h3>
        <p>Cachês R$ 2.000 - Despesas R$ 300 - INSS R$ 220 = Base R$ 1.480<br>
        <strong>Resultado: R$ 0 de imposto</strong> (abaixo da isenção)<br>
        ✅ Mas deve lançar no Carnê-Leão para informar</p>

        <h3>Caso 2: Maria - Professora de Música</h3>
        <p>Receitas R$ 4.000 - Despesas R$ 600 - INSS R$ 400 = Base R$ 3.000<br>
        <strong>Imposto: R$ 68,56</strong><br>
        ✅ Despesas economizaram R$ 176</p>

        <h3>Caso 3: Carlos - Músico Digital</h3>
        <p>Renda R$ 8.500/mês (YouTube, Spotify, lives, cursos)<br>
        <strong>Recomendação: ABRIR MEI URGENTE</strong><br>
        💰 Economia: ~R$ 13.500/ano</p>

        <div class="page-break"></div>

        <h2>12. Ferramentas Recomendadas</h2>

        <h3>Oficiais (Gratuitas):</h3>
        <ul>
            <li><strong>e-CAC:</strong> cav.receita.fazenda.gov.br</li>
            <li><strong>App Meu IR:</strong> iOS/Android</li>
            <li><strong>Programa IRPF:</strong> Download março/ano</li>
            <li><strong>Carnê-Leão Web:</strong> Dentro do e-CAC</li>
        </ul>

        <h3>Apps Controle:</h3>
        <ul>
            <li>Mobills, Organizze, GuiaBolso</li>
        </ul>

        <h2>13. FAQ - Perguntas Frequentes</h2>

        <p><strong>Fiz só 3 shows. Preciso declarar?</strong><br>
        ✅ Depende. Se total > R$ 33.888,00 no ano ou teve retenção na fonte, sim.</p>

        <p><strong>Tenho MEI. Preciso declarar IRPF?</strong><br>
        ✅ Sim, são coisas diferentes. MEI faz DASN-SIMEI. PF pode precisar IRPF.</p>

        <p><strong>Posso deduzir violão novo?</strong><br>
        ❌ Não. Instrumento é bem durável. Apenas manutenção é dedutível.</p>

        <p><strong>Pix é monitorado?</strong><br>
        ✅ Bancos reportam movimentações > R$ 2.000 (PF) ou R$ 6.000 (PJ)/mês.</p>

        <p><strong>Quando vale MEI?</strong><br>
        ✅ A partir de ~R$ 3.500/mês ainda compensa. Com as novas regras de isenção do IR para rendas até R$ 5.000/mês (a partir de 2026), avalie o custeio completo com contador.</p>

        <div class="page-break"></div>

        <h2>14. Glossário</h2>

        <p><strong>Alíquota:</strong> Percentual do imposto (7,5%, 15%, 27,5%)<br>
        <strong>Carnê-Leão:</strong> Recolhimento mensal obrigatório do IR<br>
        <strong>DARF:</strong> Boleto para pagar imposto<br>
        <strong>DAS:</strong> Boleto mensal do MEI (~R$ 77)<br>
        <strong>e-CAC:</strong> Portal da Receita Federal<br>
        <strong>Malha Fina:</strong> Fiscalização que retém declaração<br>
        <strong>MEI:</strong> Microempreendedor Individual<br>
        <strong>RPA:</strong> Recibo de Pagamento a Autônomo<br>
        <strong>Selic:</strong> Taxa de juros usada em multas</p>

        <h2>15. Conclusão</h2>

        <h3>🎶 Você agora sabe:</h3>
        <ul>
            <li>✅ Quando e como declarar IR</li>
            <li>✅ Usar Carnê-Leão corretamente</li>
            <li>✅ Deduzir despesas legalmente</li>
            <li>✅ Decidir entre PF e MEI</li>
            <li>✅ Evitar multas e malha fina</li>
        </ul>

        <h3>🚀 Ação Imediata (HOJE):</h3>
        <ol>
            <li>Crie pasta "Fiscal 2026" no Drive</li>
            <li>Separe conta bancária profissional</li>
            <li>Baixe app para escanear recibos</li>
            <li>Anote cachês deste mês</li>
        </ol>

        <h3>🎯 Lembre-se:</h3>
        <p><strong>Com IR em dia você:</strong> Participa de editais, obtém certidões, acessa financiamentos, viaja tranquilo, paga menos impostos, dorme tranquilo.</p>

        <div class="box success no-break" style="text-align: center; padding: 20pt;">
            <h3 style="margin-top: 0;">🎵 Músico Organizado Toca Tranquilo</h3>
            <p style="font-size: 11pt; margin-bottom: 0;">A profissionalização fiscal não é burocracia — é ESTRATÉGIA.</p>
        </div>

        <div style="margin-top: 40pt; padding-top: 20pt; border-top: 2pt solid #e2e8f0; text-align: center; font-size: 9pt; color: #64748b;">
            <p><strong>Guia Essencial do IR para Músicos Autônomos</strong></p>
            <p>Versão 3.0 | Março/2026 | Base Legal: Ano-calendário 2025 | Lei nº 15.270/2025</p>
            <p style="margin-top: 15pt;">© 2026 | Todos os direitos reservados</p>
            <p>Este material tem caráter educativo. Consulte contador para casos específicos.</p>
        </div>
`;

export default function GuiaCompleto() {
    return (
        <div className="guide-pro-doc">
            <style>{GUIDE_PRO_STYLE}</style>
            <div className="container" dangerouslySetInnerHTML={{ __html: GUIDE_CONTENT }} />
            
            <div className="max-w-3xl mx-auto px-4 mt-8">
                <PromoCardApp chapterName="completo" />
                
                {/* Linkagem Interna Cruzada */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 border border-gray-200 p-6 rounded-2xl gap-4 my-8">
                    <div>
                        <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Próximo Capítulo</span>
                        <h4 className="font-bold text-[#0c2461] text-lg mt-1" style={{ fontFamily: 'Lexend, sans-serif' }}>Capítulo 6: Carnê-Leão na Prática</h4>
                    </div>
                    <Link href="/guia/carne-leao" className="bg-[#0c2461] hover:bg-[#1a3a7a] text-white font-bold px-6 py-3 rounded-xl transition flex items-center gap-2 text-sm shadow-md w-full sm:w-auto justify-center">
                        Ler Capítulo <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
