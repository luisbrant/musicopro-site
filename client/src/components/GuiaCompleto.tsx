import React from 'react';

const GUIDE_PRO_STYLE = `
  .guide-pro-doc {
      --primary: #0c2461; --secondary: #1a3a7a; --accent: #d4af37;
      --danger: #ef4444; --success: #10b981; --dark: #0c2461;
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
                <strong>Edição Completa 2025</strong><br>
                Base Legal: Ano-Calendário 2024<br>
                Janeiro de 2025
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
            <p><strong>Atualização:</strong> Janeiro/2025 | <strong>Base legal:</strong> Ano-calendário 2024</p>
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
            <li>Recebeu rendimentos tributáveis acima de R$ 30.639,90</li>
            <li>Recebeu rendimentos isentos acima de R$ 200.000,00</li>
            <li>Possui bens acima de R$ 800.000,00</li>
            <li>Teve imposto retido na fonte (RPA)</li>
            <li>Obteve ganho de capital na venda de bens</li>
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
                    <td>DAS fixo ~R$ 75/mês</td>
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
            <p><strong>Regra:</strong> Recebeu como PF + Não houve retenção = Carnê-Leão OBRIGATÓRIO (se valor > R$ 2.259,20/mês)</p>
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
        <p>Quando banda/produtora com CNPJ contrata músico PF via <strong>RPA</strong>, a empresa retém INSS e IR, paga líquido e fornece informe.</p>

        <h4>O músico NÃO usa Carnê-Leão. Apenas declara na ficha "Rendimentos de PJ" com informe recebido.</h4>

        <div class="case-study no-break">
            <h4>📝 Exemplo:</h4>
            <p>Cachê R$ 3.000 → Retenções R$ 384 (INSS+IR) → Recebe líquido R$ 2.616<br>
            Na declaração anual: informa R$ 3.000 e IR já pago de R$ 54 (abate do total)</p>
        </div>

        <div class="page-break"></div>

        <h1 class="text-center">PARTE 2: GESTÃO FISCAL NA PRÁTICA</h1>

        <h2>7. Despesas Dedutíveis</h2>
        <p><strong>Deduzir despesas = Reduzir base de cálculo do imposto</strong></p>

        <h3>✅ PODE deduzir (com NF em seu CPF):</h3>
        <ul>
            <li><strong>Transporte:</strong> Combustível, Uber, pedágios para shows</li>
            <li><strong>Equipamentos:</strong> Manutenção, cordas, cabos, aluguel</li>
            <li><strong>Espaços:</strong> Aluguel de estúdio/sala ensaio</li>
            <li><strong>Marketing:</strong> Impulsionamento, fotos, site, designer</li>
            <li><strong>Serviços:</strong> Comissões, contador, advogado</li>
            <li><strong>Capacitação:</strong> Cursos, workshops, material didático</li>
            <li><strong>Figurino:</strong> Roupas de palco (uso exclusivo)</li>
        </ul>

        <h3>❌ NÃO PODE deduzir:</h3>
        <ul>
            <li>Gastos pessoais (alimentação comum, roupas dia a dia)</li>
            <li>Itens de uso misto (celular novo, notebook)</li>
            <li>Despesas sem comprovação fiscal</li>
            <li><strong>Instrumentos novos</strong> (são bens, não despesas)</li>
        </ul>

        <div class="box tip no-break">
            <p><strong>DICA DE OURO:</strong> Separe conta bancária pessoal da profissional. Facilita comprovação e defesa em fiscalização.</p>
        </div>

        <h2>8. Tabela Progressiva do IR (2024/2025)</h2>

        <table class="no-break">
            <thead>
                <tr>
                    <th>Base Mensal (R$)</th>
                    <th>Alíquota</th>
                    <th>Parcela a Deduzir</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>Até 2.259,20</td><td>Isento (0%)</td><td>0,00</td></tr>
                <tr><td>2.259,21 a 2.826,65</td><td>7,5%</td><td>169,44</td></tr>
                <tr><td>2.826,66 a 3.751,05</td><td>15%</td><td>381,44</td></tr>
                <tr><td>3.751,06 a 4.664,68</td><td>22,5%</td><td>662,77</td></tr>
                <tr><td>Acima de 4.664,68</td><td>27,5%</td><td>896,00</td></tr>
            </tbody>
        </table>

        <p><strong>Fórmula:</strong> <code>Imposto = (Base × Alíquota) - Parcela a Deduzir</code></p>

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

        <h3>ROTEIRO ANUAL (Declaração):</h3>
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
        ✅ Depende. Se total > R$ 30.639,90 ou teve retenção, sim.</p>

        <p><strong>Tenho MEI. Preciso declarar IRPF?</strong><br>
        ✅ Sim, são coisas diferentes. MEI faz DASN-SIMEI. PF pode precisar IRPF.</p>

        <p><strong>Posso deduzir violão novo?</strong><br>
        ❌ Não. Instrumento é bem durável. Apenas manutenção é dedutível.</p>

        <p><strong>Pix é monitorado?</strong><br>
        ✅ Bancos reportam movimentações > R$ 2.000 (PF) ou R$ 6.000 (PJ)/mês.</p>

        <p><strong>Quando vale MEI?</strong><br>
        ✅ A partir de ~R$ 3.500/mês já compensa.</p>

        <div class="page-break"></div>

        <h2>14. Glossário</h2>

        <p><strong>Alíquota:</strong> Percentual do imposto (7,5%, 15%, 27,5%)<br>
        <strong>Carnê-Leão:</strong> Recolhimento mensal obrigatório do IR<br>
        <strong>DARF:</strong> Boleto para pagar imposto<br>
        <strong>DAS:</strong> Boleto mensal do MEI (~R$ 75)<br>
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
            <li>Crie pasta "Fiscal 2025" no Drive</li>
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
            <p>Versão 2.0 | Janeiro/2025 | Base Legal: Ano-calendário 2024</p>
            <p style="margin-top: 15pt;">© 2025 | Todos os direitos reservados</p>
            <p>Este material tem caráter educativo. Consulte contador para casos específicos.</p>
        </div>
`;

export default function GuiaCompleto() {
    return (
        <div className="guide-pro-doc">
            <style>{GUIDE_PRO_STYLE}</style>
            <div className="container" dangerouslySetInnerHTML={{ __html: GUIDE_CONTENT }} />
        </div>
    );
}
