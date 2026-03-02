import React from 'react';

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
  .guide-pro-doc .box { padding: 12pt; margin: 15pt 0; border-radius: 4pt; page-break-inside: avoid; }
  .guide-pro-doc .alert { background: #fef3c7; border-left: 4pt solid var(--accent); }
  .guide-pro-doc .tip { background: #dbeafe; border-left: 4pt solid #3b82f6; }
  .guide-pro-doc .tip::before { content: "💡 DICA PRO"; display: block; font-weight: bold; 
                color: #1e40af; margin-bottom: 8pt; font-size: 10pt; }
  .guide-pro-doc .warning { background: #fee2e2; border-left: 4pt solid var(--danger); }
  .guide-pro-doc .warning::before { content: "🚨 ATENÇÃO"; display: block; font-weight: bold; 
                    color: #dc2626; margin-bottom: 8pt; font-size: 10pt; }
  .guide-pro-doc .success { background: #d1fae5; border-left: 4pt solid var(--success); }
  .guide-pro-doc table { width: 100%; border-collapse: collapse; margin: 15pt 0; page-break-inside: avoid; font-size: 9.5pt; }
  .guide-pro-doc th { background: var(--primary); color: white; padding: 8pt; text-align: left; 
       font-weight: 600; border: 1pt solid #ddd; }
  .guide-pro-doc td { padding: 6pt 8pt; border: 1pt solid #ddd; vertical-align: top; }
  .guide-pro-doc tr:nth-child(even) { background: #f7fafc; }
  .guide-pro-doc .highlight { background: #fef3c7; padding: 2pt 6pt; border-radius: 2pt; font-weight: 600; }
  .guide-pro-doc .text-center { text-align: center !important; }
  .guide-pro-doc code { background: #f1f5f9; padding: 2pt 4pt; border-radius: 2pt; 
        font-family: 'Courier New', monospace; font-size: 9pt; display: block; white-space: pre-wrap; margin: 10px 0;}
`;

const CONTENT = `
        <div class="container">
            <h1 class="text-center">CAPÍTULO 6: CARNÊ-LEÃO - DO ZERO À EXPERT</h1>
            <h3 class="text-center" style="margin-top: 0;">Domine Completamente o Recolhimento Mensal do Imposto de Renda</h3>

            <div class="box success no-break">
                <p><strong>Público-alvo:</strong> Músicos autônomos que recebem como Pessoa Física</p>
                <p><strong>Nível:</strong> Iniciante ao Avançado</p>
                <p><strong>Tempo de estudo:</strong> 3-4 horas</p>
                <p><strong>Tempo de implementação:</strong> 30 minutos/mês após dominar</p>
            </div>

            <h2>📚 SUMÁRIO DO CAPÍTULO</h2>
            <ol>
                <li>História e Fundamentos Legais</li>
                <li>Quem Deve Usar (e Quando)</li>
                <li>Sistema Carnê-Leão Web: Acesso e Navegação</li>
                <li>Lançamento de Receitas: Passo a Passo Completo</li>
                <li>Lançamento de Despesas: Guia Definitivo</li>
                <li>Cálculo do Imposto: Entendendo a Fórmula</li>
                <li>Geração e Pagamento do DARF</li>
                <li>Carnê-Leão em Atraso: Regularização</li>
                <li>Integração com a Declaração Anual</li>
                <li>15 Exercícios Práticos Resolvidos</li>
                <li>Erros Mais Comuns (e Como Evitar)</li>
                <li>Casos Complexos e Situações Especiais</li>
                <li>Checklist Mensal de Ouro</li>
                <li>Planilha de Controle Automatizada</li>
                <li>Perguntas e Respostas Avançadas</li>
            </ol>

            <div class="page-break"></div>

            <h2>1. HISTÓRIA E FUNDAMENTOS LEGAIS</h2>

            <h3>1.1. O que é o Carnê-Leão?</h3>
            <p>O <strong>Carnê-Leão</strong> é um sistema de <strong>recolhimento mensal obrigatório</strong> do Imposto de Renda instituído pela Receita Federal do Brasil para pessoas físicas que recebem rendimentos de outras pessoas físicas ou de pessoas jurídicas que não efetuam a retenção na fonte.</p>
            <p><strong>Nome oficial:</strong> Carnê-Leão - Livro Caixa</p>
            <p><strong>Base legal:</strong> Lei nº 7.713/1988 (art. 8º), Decreto nº 9.580/2018 (Regulamento do IR), Instrução Normativa RFB nº 1.500/2014</p>

            <h3>1.2. Por que "Carnê-Leão"?</h3>
            <p>O nome tem origem histórica:</p>
            <ul>
                <li><strong>Carnê:</strong> Referência ao antigo carnê de papel onde se anotavam os rendimentos mensais</li>
                <li><strong>Leão:</strong> Símbolo tradicional do Imposto de Renda no Brasil (representa o "leão" do governo que cobra impostos)</li>
            </ul>

            <h3>1.3. Evolução Histórica</h3>
            <ul>
                <li><strong>1960-1980:</strong> Carnê físico em papel</li>
                <li><strong>1990-2000:</strong> Disquetes e CD-ROMs</li>
                <li><strong>2001-2010:</strong> Download de programa para PC</li>
                <li><strong>2011-presente:</strong> Carnê-Leão Web (100% online via e-CAC)</li>
            </ul>

            <h3>1.4. Objetivo Legal</h3>
            <p>O Carnê-Leão existe para:</p>
            <ol>
                <li><strong>Antecipar o recolhimento do IR</strong> (ao invés de pagar tudo na declaração anual)</li>
                <li><strong>Facilitar a fiscalização</strong> da RFB</li>
                <li><strong>Distribuir a carga tributária</strong> ao longo do ano</li>
                <li><strong>Evitar surpresas</strong> na declaração anual</li>
            </ol>

            <h3>1.5. Natureza Jurídica</h3>
            <p>O Carnê-Leão é uma <strong>obrigação tributária acessória</strong> (dever de informar) que pode gerar uma <strong>obrigação principal</strong> (dever de pagar imposto).</p>
            
            <div class="box warning no-break">
                <p><strong>Importante:</strong> Mesmo quando não há imposto a pagar (resultado R$ 0,00), a obrigação de <strong>lançar</strong> os rendimentos no sistema continua existindo. O Músico Pro facilita todo este controle e preenchimento para você!</p>
            </div>

            <h2>2. QUEM DEVE USAR (E QUANDO)</h2>

            <h3>2.1. Regra Geral</h3>
            <p><strong>Você DEVE usar o Carnê-Leão quando:</strong></p>
            <ul>
                <li>✅ Recebe rendimentos como <strong>Pessoa Física</strong> (CPF)</li>
                <li>✅ O pagamento vem de outra <strong>Pessoa Física</strong></li>
                <li>✅ OU o pagamento vem de <strong>Pessoa Jurídica</strong> que <strong>não reteve</strong> IR na fonte</li>
                <li>✅ E o valor mensal ultrapassa a <strong>faixa de isenção</strong> (R$ 2.259,20 em 2024/2025)</li>
            </ul>

            <h3>2.2. Situações Específicas para Músicos</h3>

            <h4>✅ DEVE USAR CARNÊ-LEÃO:</h4>
            <ul>
                <li><strong>Situação 1: Show em Bar (PF pagadora)</strong><br>Você toca em bar, o Dono (Pessoa Física) te paga R$ 500 em dinheiro/Pix. <strong>Deve lançar no Carnê-Leão</strong>.</li>
                <li><strong>Situação 2: Aulas Particulares</strong><br>Você dá aulas de violão, Alunos (Pessoas Físicas) pagam R$ 200 cada. Total mensal: R$ 3.000. <strong>Deve lançar no Carnê-Leão</strong>.</li>
                <li><strong>Situação 3: Evento Particular</strong><br>Você toca em casamento, Noivo (Pessoa Física) te paga R$ 2.500. <strong>Deve lançar no Carnê-Leão</strong>.</li>
                <li><strong>Situação 4: Banda sem CNPJ</strong><br>Banda toca em festival, Produtora paga cachê para a banda, Banda divide entre membros. Cada músico <strong>deve lançar sua parte no Carnê-Leão</strong>.</li>
                <li><strong>Situação 5: Produtora PJ sem Retenção</strong><br>Produtora com CNPJ contrata você, Paga R$ 1.500 mas <strong>não retém IR</strong> (apenas INSS ou nada). <strong>Deve lançar no Carnê-Leão</strong>.</li>
            </ul>

            <h4>❌ NÃO DEVE USAR CARNÊ-LEÃO:</h4>
            <ul>
                <li><strong>Situação 1: RPA com Retenção</strong><br>Produtora com CNPJ contrata você, Paga via RPA e <strong>retém IR na fonte</strong>. Você recebe líquido. <strong>Não usa Carnê-Leão</strong> (já foi tributado).</li>
                <li><strong>Situação 2: Emprego CLT</strong><br>Você é funcionário CLT de escola de música, Recebe salário com IR retido na fonte. <strong>Não usa Carnê-Leão</strong> (é empregado).</li>
                <li><strong>Situação 3: Você tem MEI</strong><br>Você emite nota fiscal como MEI, Cliente paga para seu CNPJ. <strong>Não usa Carnê-Leão</strong> (pessoa jurídica não usa).</li>
                <li><strong>Situação 4: Direitos Autorais com Retenção</strong><br>Você recebe direitos do ECAD, ECAD retém IR na fonte. <strong>Não usa Carnê-Leão</strong>.</li>
            </ul>

            <div class="box tip no-break">
                <p>O App Músico Pro já classifica e alerta sobre essas diferentes origens de renda automaticamente. Assim, você não corre riscos de esquecer onde lança as coisas!</p>
            </div>

            <h3>2.3. Fluxograma de Decisão</h3>
            <code>
Você recebeu dinheiro/Pix/transferência?
├─ SIM → Continue
└─ NÃO → Não precisa lançar

Esse dinheiro é renda (cachê, aula, produção)?
├─ SIM → Continue
└─ NÃO → Não precisa lançar (ex: presente, empréstimo)

Você recebeu como Pessoa Física (seu CPF)?
├─ SIM → Continue
└─ NÃO → Se recebeu como MEI/Empresa, não usa Carnê-Leão

Quem pagou reteve Imposto de Renda na fonte?
├─ SIM → Não usa Carnê-Leão (já foi tributado)
└─ NÃO → DEVE USAR CARNÊ-LEÃO

O valor mensal total passou da faixa isenta?
├─ SIM → Pode haver imposto a pagar
└─ NÃO → Imposto será R$ 0, mas deve lançar mesmo assim
            </code>

            <h3>2.4. Limites e Faixas</h3>
            <table>
                <thead>
                    <tr>
                        <th>Situação</th>
                        <th>Obrigação</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Recebi abaixo da faixa de isenção no mês</td>
                        <td>Deve lançar, imposto = R$ 0</td>
                    </tr>
                    <tr>
                        <td>Recebi acima da faixa de isenção no mês</td>
                        <td>Deve lançar, pode ter imposto</td>
                    </tr>
                    <tr>
                        <td>Não recebi nada no mês</td>
                        <td>Não precisa lançar aquele mês</td>
                    </tr>
                    <tr>
                        <td>Recebi só em alguns meses do ano</td>
                        <td>Lança apenas os meses que recebeu</td>
                    </tr>
                </tbody>
            </table>

            <h3>2.5. Prazo de Lançamento</h3>
            <p><strong>Regra oficial:</strong></p>
            <ul>
                <li>Lançar até o <strong>último dia do mês</strong> em que recebeu</li>
                <li>Pagar DARF até o <strong>último dia útil do mês seguinte</strong></li>
            </ul>
            <p><strong>Exemplo:</strong> Recebeu em março: Lança até 31/março. DARF de março: Paga até último dia útil de abril.</p>

            <h2>3. SISTEMA CARNÊ-LEÃO WEB: ACESSO E NAVEGAÇÃO</h2>
            <h3>3.1. Onde Acessar</h3>
            <p><strong>URL:</strong> https://cav.receita.fazenda.gov.br</p>
            <p><strong>Caminho:</strong></p>
            <ol>
                <li>Acesse o portal e-CAC</li>
                <li>Faça login com Gov.br</li>
                <li>Menu: <strong>Declarações e Demonstrativos</strong></li>
                <li>Selecione: <strong>Carnê-Leão</strong></li>
                <li>Clique: <strong>Acessar Carnê-Leão Web</strong></li>
            </ol>

            <h3>3.2. Requisitos de Acesso</h3>
            <p><strong>Obrigatório:</strong> Conta Gov.br (nível <strong>prata</strong> ou <strong>ouro</strong>), CPF regular, Internet.</p>

            <h3>3.3. Interface do Sistema</h3>
            <ul>
                <li><strong>Receitas:</strong> Lançar cachês, aulas, etc.</li>
                <li><strong>Despesas:</strong> Lançar gastos dedutíveis.</li>
                <li><strong>Livro Caixa:</strong> Resumo mensal.</li>
                <li><strong>DARF:</strong> Gerar boleto.</li>
            </ul>

            <div class="page-break"></div>

            <h2>4. LANÇAMENTO DE RECEITAS: PASSO A PASSO COMPLETO</h2>

            <h3>4.1. Conceitos Importantes</h3>
            <p><strong>Receita bruta:</strong> Valor total recebido (antes de qualquer desconto)<br>
            <strong>Mês de competência:</strong> Mês em que você RECEBEU (não quando combinou ou fez o serviço)<br>
            <strong>Fonte pagadora:</strong> Quem te pagou (CPF ou CNPJ)</p>

            <h3>4.4. Tipos de Rendimento</h3>
            <p>O sistema oferece várias categorias. Para músicos, use:</p>
            <ul>
                <li><strong>Outros Rendimentos</strong> (mais comum): Cachês de shows, Aulas particulares, Produção musical, Participações</li>
                <li><strong>Aluguéis</strong> (se aplicável): Aluguel de instrumentos, espaço de estúdio</li>
            </ul>

            <h3>4.5. Receitas Fracionadas vs. Consolidadas</h3>
            <p><strong>Recomendação:</strong> Lance separadamente se tiver poucos shows. Consolide se tiver muitos da mesma fonte pagadora. No entanto, se você utiliza o Músico Pro, ele já irá consolidar tudo lindamente para você extrair o relatório de importar direto na plataforma da Receita!</p>

            <h3>4.6. Receitas em Dinheiro (Sem Comprovante)</h3>
            <p><strong>Situação comum:</strong> Tocou em evento, recebeu R$ 800 em dinheiro vivo.</p>
            <p>A RFB aceita lançamentos mesmo sem comprovante completo. O fundamental é <strong>declarar a renda</strong>.</p>

            <h2>5. LANÇAMENTO DE DESPESAS: GUIA DEFINITIVO</h2>

            <h3>5.1. Conceito de Despesa Dedutível</h3>
            <p><strong>Despesa dedutível</strong> é um gasto que:</p>
            <ol>
                <li>Foi <strong>necessário</strong> para obter a receita</li>
                <li>Está relacionado à sua <strong>atividade profissional</strong></li>
                <li>Possui <strong>comprovação fiscal</strong> (NF, recibo)</li>
                <li>Foi pago no mesmo mês em que está deduzindo</li>
            </ol>

            <h3>5.2. Por que Deduzir Despesas?</h3>
            <code>
Algoritmo Rápido:
Base de Cálculo = Receita Bruta - Despesas - INSS
Imposto = Base de Cálculo × Alíquota - Parcela a Deduzir
            </code>
            <p>Sem despesas, a Base de Cálculo é maior (e o imposto sobe agressivamente). Com as despesas lançadas corretamente, a Base cai e o Imposto pode até mesmo chegar a <strong>ZERO (ISENTO)!</strong></p>

            <h3>5.5. Despesas Comuns para Músicos (com Exemplos)</h3>

            <h4>🚗 Transporte</h4>
            <ul>
                <li><strong>O que PODE:</strong> Uber para show (com recibo), combustível no dia (com NF), estacionamento do local (NF).</li>
                <li><strong>O que NÃO PODE:</strong> IPVA, seguro (são do veículo).</li>
            </ul>

            <h4>🎸 Equipamentos</h4>
            <ul>
                <li><strong>O que PODE:</strong> Cordas, baquetas, manutenção (luthier), cabos.</li>
                <li><strong>O que NÃO PODE:</strong> Compra de Bens duráveis caros de uma vez como despesa de livro caixa (ex: Bateria de R$ 10.000, isso entra na ficha Bens e Direitos).</li>
            </ul>

            <h4>📢 Marketing e Divulgação</h4>
            <ul>
                <li><strong>O que PODE:</strong> Tráfego Pago, Designer de arte, fotógrafo, clipe musical. (Sempre com NFs ou faturas válidas!).</li>
            </ul>

            <div class="box tip no-break">
                <p>Dentro do App Músico Pro, você já cadastra suas despesas com tags e categorias de despesa. O App cruza as informações automaticamente ao final do mês, dizendo exatamente o que entra no Carnê-Leão e o que não entra.</p>
            </div>

            <div class="page-break"></div>

            <h2>6. CÁLCULO DO IMPOSTO: ENTENDENDO A FÓRMULA</h2>

            <h3>6.1. Fórmula Completa</h3>
            <ol>
                <li>Receita Bruta = Soma de todas as receitas do mês</li>
                <li>Despesas Dedutíveis = Soma de todas as despesas lançadas</li>
                <li>INSS = Contribuição previdenciária paga</li>
                <li>Base de Cálculo = Receita Bruta - Despesas - INSS</li>
                <li>Identificar Faixa da Tabela</li>
                <li>Aplicar Fórmula = (Base × Alíquota) - Parcela a Deduzir</li>
                <li>Imposto Devido</li>
            </ol>

            <h3>6.3. Exercício Prático 1: Caso Simples</h3>
            <p><strong>Dados:</strong> Receita: R$ 3.000 / Despesas: R$ 500 / INSS: R$ 300</p>
            <p><strong>Cálculo:</strong> Base = 3.000 - 500 - 300 = R$ 2.500</p>
            <p>Utilizando a alíquota respectiva para base 2500 (7,5%) e descontando parcela: Resulta no DARF à recolher.</p>

            <h3>6.5. Por que a "Parcela a Deduzir"?</h3>
            <p>A tabela é <strong>progressiva</strong>, não linear. Você não paga 27,5% sobre tudo. A <strong>parcela a deduzir</strong> simplifica a matemática no final, subtraindo os "créditos" das faixas mais baixas sobre as quais o percentual foi maior do que deveria ser na conta direta.</p>

            <h2>7. GERAÇÃO E PAGAMENTO DO DARF</h2>

            <p><strong>O que é DARF?</strong> DARF = Documento de Arrecadação de Receitas Federais. O "boleto" para pagar o imposto.</p>
            <ul>
                <li>Gerado através do Carnê-Leão Web após finalizar o mês.</li>
                <li><strong>Vencimento:</strong> Último dia útil do mês <strong>seguinte</strong> (recebimentos de Março vencem no final de Abril).</li>
                <li><strong>Se o Imposto for R$ 0,00?</strong> Não gera DARF e nem deve pagar nada, mas sua prestação de contas no Livro Caixa foi cumprida.</li>
            </ul>

            <div class="box warning no-break">
                <p>Guarde todo ano seus comprovantes por 5 anos (PDF do DARF e PDF da confirmação bancária).</p>
            </div>

            <h2>8. CARNÊ-LEÃO EM ATRASO: REGULARIZAÇÃO</h2>
            <p>Atrasou? É muito melhor regularizar AGORA pagando juros justos + Multa (20% limite máximo para regularização voluntária) do que ser pego na malha fina por <strong>Omissão de Receitas</strong> e pagar multa punitiva de 75%.</p>
            <p>No site <strong>Sicalc Web</strong> ou no próprio Carnê Leão, os valores atrasados são recalculados com o índice da Taxa Selic automaticamente.</p>

            <h2>9. INTEGRAÇÃO COM A DECLARAÇÃO ANUAL</h2>

            <p>Isso é a cereja do bolo! Chegando a época da Declaração de IRPF Anual, ao abrir o Programa gerador do governo, basta selecionar <strong>Importar dados do Carnê-Leão</strong> e todo ou seu sofrimento com relatórios mensais some num clique.</p>
            <p>Ou, caso use o Músico Pro de forma disciplinada, o relatório fornecido pelo App refletirá perfeitamente todas as linhas do fluxo da declaração.</p>

            <h2>10. 15 EXERCÍCIOS PRÁTICOS RESOLVIDOS</h2>
            <p>Nesta seção, consolidamos casos que acontecem com os músicos em geral:</p>

            <h3>Exercício 6: Múltiplas Fontes Pagadoras</h3>
            <p>Você tocou no Bar A, B, aulas pra João, etc. Se a receita total no mês for R$ 3.500, despesas forem de R$ 650 e INSS R$ 350. Base final: R$ 2500.</p>
            <p>Isso recai na casa dos 7,5%, fazendo pagar dezoito reais. Uma pessoa que não preencheu despesas basearia os impostos em 3150 e pagaria quase dez vezes mais!</p>

            <h3>Exercício 8: Eventos Grandes que consomem "muita grama"</h3>
            <p>Show do ano pagou R$ 8.000, mas a equipe te custou R$ 5.000 em recibos pagos (roadies, designers, aluguel de backline). Não tenha medo, deduzindo estes 5 mil no Livro-Caixa ou apontando na sua organização, a sua base do IR será apenas o saldo limpo.</p>
            <p><strong>Despesas bem documentadas reduzem drasticamente ou zeram o imposto do mês.</strong></p>

            <h3>Exercício 13: Sou CLT de dia e Músico à Noite</h3>
            <p>Essa é a pegadinha. Lance no Carnê-Leão APENAS A PARTE RELATIVA AOS SEUS SHOWS. O seu salário mensal da Empregadora (que ela pagou retenção) você colocará lá na época da declaração Anual direto no App do IR do Governo. Não misture esses dois recolhimentos todos os meses no Carnê Leão para não causar bitributação à toa na ponta do seu bolso.</p>

            <div class="page-break"></div>

            <h1 class="text-center">✅ CHECKLIST MENSAL CARNÊ-LEÃO</h1>
            <h3 class="text-center" style="margin-top: 0;">Rotina Completa do Músico Autônomo</h3>

            <h2>📅 DURANTE O MÊS (Dia a Dia)</h2>

            <h3>☑️ Toda vez que receber um pagamento:</h3>
            <ul>
                <li><strong>Anotar imediatamente</strong> os dados (Data, Valor bruto, Nome de quem pagou, CPF/CNPJ, Descrição).</li>
                <li><strong>Tirar print/foto</strong> do comprovante (Pix, extrato ou recibo).</li>
                <li><strong>Solicitar dados</strong> do pagador, caso não tenha. Diga: "Preciso do seu CPF/CNPJ para minha contabilidade".</li>
            </ul>

            <h3>☑️ Toda vez que tiver uma despesa profissional:</h3>
            <ul>
                <li><strong>Solicitar nota fiscal</strong> COM SEU CPF.</li>
                <li><strong>Se não der nota fiscal</strong>, peça um recibo completo (Nome, CPF/CNPJ, Data, Descrição, Valor e Assinatura).</li>
                <li><strong>Guardar comprovante imediatamente</strong> (Foto do cupom fiscal não pode faltar, pois ele apaga rápido).</li>
                <li><strong>Organizar:</strong> Insira o lançamento e anexe a foto da nota diretamente no Músico Pro.</li>
            </ul>

            <h2>📊 FIM DO MÊS (Dias 25-30)</h2>

            <h3>ETAPA 1: ORGANIZAR DOCUMENTOS (10 minutos)</h3>
            <ul>
                <li><strong>Conferir se está faltando algo:</strong> Algum pagamento que você recebeu mas não anotou? Alguma despesa sem nota/recibo?</li>
                <li>Se você usa o <strong>Músico Pro</strong>, tudo já estará listado, somado e organizado na palma da sua mão!</li>
            </ul>

            <h3>ETAPA 2: LANÇAR NO SISTEMA OFICIAL (15 minutos)</h3>
            <h4>🎯 Acessar o Carnê-Leão Web</h4>
            <ul>
                <li>Entrar no portal e-CAC: https://cav.receita.fazenda.gov.br</li>
                <li>Fazer Login com Gov.br (nível prata ou ouro) e menu "Declarações e Demonstrativos" → Carnê-Leão.</li>
            </ul>

            <h4>💰 Lançar Receitas / 💸 Despesas</h4>
            <p>Copie os lançamentos e totais do mês organizados no seu App Músico Pro. Insira cada item no sistema da Receita Federal preenchendo os dados do cliente ou fornecedor rigorosamente.</p>

            <h4>🏛️ Lançar INSS (se aplicável)</h4>
            <p>Se você paga INSS autônomo como contribuinte individual (NÃO CONFUNDA com INSS já retido do seu emprego como CLT), preencha o valor pago no mês.</p>

            <h3>ETAPA 3: CONFERIR E CALCULAR (5 minutos)</h3>
            <ul>
                <li>O Sistema Web governamental calculará automaticamente a sua Base de Cálculo e o Imposto Devido cruzando suas Receitas com as Despesas de Trabalho Autônomo repassadas do App Músico Pro.</li>
                <li>Se o valor for R$ 0,00 → Você está isento de pagar imposto neste mês. Seu dever fiscal acabou.</li>
            </ul>

            <h3>ETAPA 4: GERAR DARF (2 minutos)</h3>
            <ul>
                <li>Apenas se houver imposto a pagar (> R$ 0,00).</li>
                <li>Clique em "DARF", confira e gere o documento (o Vencimento cai legalmente sempre no último dia útil do mês seguinte).</li>
                <li><strong>Salve em PDF e não deixe para pagar na última hora!</strong></li>
            </ul>

            <h2>💳 MÊS SEGUINTE (Até o último dia útil)</h2>
            <h3>☑️ PAGAR O DARF e GUARDAR O COMPROVANTE</h3>
            <ul>
                <li>Pague via Internet Banking, Pix ou Lotérica.</li>
                <li><strong>SALVE O COMPROVANTE BANCÁRIO DE PAGAMENTO</strong> junto com o arquivo PDF do seu DARF gerado. Lembre-se, um arquivamento fiscal sem o comprovante de pagamento é inválido perante o Leão. Faça backup físico ou na nuvem destes pares por até 5 anos.</li>
            </ul>

            <div class="page-break"></div>

            <h2>📋 CHECKLIST RÁPIDO PARA IMPRIMIR</h2>
            <div class="box tip no-break">
                <h4>✅ DURANTE O MÊS</h4>
                <ul>
                    <li>[ ] Anotar cada recebimento (data, valor, quem pagou).</li>
                    <li>[ ] Guardar comprovantes de receitas (Pix/Extratos).</li>
                    <li>[ ] Pedir nota fiscal COM CPF em todas as despesas da atividade.</li>
                    <li>[ ] Anexar todos os recibos e comprovantes dentro do Músico Pro.</li>
                </ul>
                <h4>✅ FIM DO MÊS (Dias 25-30)</h4>
                <ul>
                    <li>[ ] Abrir os Relatórios e Transações e conferir a consolidação no Músico Pro (1 min).</li>
                    <li>[ ] Acessar Carnê-Leão Web pela Receita Federal.</li>
                    <li>[ ] Lançar receitas e despesas mensais apuradas no App na plataforma oficial.</li>
                    <li>[ ] Gerar DARF (se houver imposto finalizado) e salvar o PDF.</li>
                </ul>
                <h4>✅ MÊS SEGUINTE</h4>
                <ul>
                    <li>[ ] Pagar DARF gerado no seu banco on-line antes do último dia útil deste mês seguinte.</li>
                    <li>[ ] Salvar comprovante deste pagamento junto ao PDF da guia e fechar seu Backup na nuvem com segurança.</li>
                </ul>
            </div>

            <h2>⏰ DICAS DE ORGANIZAÇÃO: A FÓRMULA MÚSICO PRO</h2>
            <p>Esqueça perder seus recibos desbotados na mochila, sofrer montando planilhas travadas no Excel ou depender de anotações caóticas no bloco de notas do celular que são esquecidas no fim do mês.</p>
            <ol>
                <li><strong>No seu dia-a-dia:</strong> Registre as transações financeiras no Músico Pro assim que elas acontecerem. E tire a foto/Print dos anexos e cupons na hora para o fluxo.</li>
                <li><strong>No fim do mês:</strong> Em vez de gastar preciosas horas caçando comprovantes perdidos na galeria quilométrica do celular, você simplesmente abre e copia o resumo pronto e classificado pelo seu sistema nas poucas caixas de texto do Leão, gastando apenas de 15 a 20 minutos de paz na Receita Federal.</li>
                <li><strong>Fechamento Certeiro:</strong> Defina um Lembrete no seu calendário do celular para a checagem quinzenal e outra para o Repasse de Dados Fiscal (Ex: Dia 28 de todos os meses, o Dia Livre da Organização). E aproveite a vida produzindo música!</li>
            </ol>

            <div class="box success no-break">
                <h2 style="margin-top: 0; border: none;">💡 A MISSÃO DO MÚSICO PRO</h2>
                <p>Nós criamos o Músico Pro App para impedir que você tenha que decorar cada uma dessas regras na ponta da língua todos os meses.</p>
                <p>Todas as despesas que são de categoria dedutível já estão selecionadas; O cálculo de Livro-Caixa e Impostos que mostrei sendo feito à mão nas demonstrações rola sozinho, ao vivo, conforme você atualiza o Fluxo e Orçamento dentro da Plataforma.</p>
                <p>Não há mais erro matemático nem risco fiscal se você plugar seu modelo de negócios em nossa ferramenta.</p>
            </div>
        </div>
`;

export default function CarneLeaoDeepDive() {
    return (
        <div className="bg-[#f8fafc] h-full rounded-xl overflow-hidden">
            <style dangerouslySetInnerHTML={{ __html: GUIDE_PRO_STYLE }} />
            <div
                className="guide-pro-doc bg-transparent p-0 max-w-full"
                dangerouslySetInnerHTML={{ __html: CONTENT }}
            />
        </div>
    );
}
