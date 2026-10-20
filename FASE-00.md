# FASE 00 · Preparação do projeto

## 1. Alvo e propósito

- **Organização:** Instituto Semear Paz e Bem, uma ONG.
- **CNPJ:** 28.555.767/0001-04.
- **WhatsApp institucional:** (41) 99848-2595 (`https://wa.me/5541998482595`).
- **E-mail institucional:** `ongpazebem@gmail.com`.
- **Chave PIX informada:** `institutopazbem@gmail.com` (titularidade a confirmar pelo Instituto).
- **Referência institucional informada:** [semearpazebem.antoniobandeira.com.br](https://semearpazebem.antoniobandeira.com.br).
- **Produto deste projeto:** site institucional público para apresentar a organização e seus programas, aproximar a comunidade e divulgar formas oficiais de apoio, parceria e contato.
- **Princípio de conteúdo:** publicar somente informações confirmadas e aprovadas pelo Instituto. Métricas, nomes de parceiros, histórias, imagens, documentos e instruções de doação não devem ser presumidos. Os dados de contato e CNPJ acima foram fornecidos para publicação.
- **Base funcional:** [PRD-INSTITUTO-SEMEAR.md](./PRD-INSTITUTO-SEMEAR.md), fonte de escopo e critérios de aceite.

## 2. Mensagem e temas institucionais

- **Tríade de desenvolvimento:** suporte financeiro contínuo, mentoria com líderes experientes e inserção em redes de alto impacto.
- **Rede de parcerias:** empresas e instituições que acreditam no impacto social, divulgadas mediante autorização.
- **Histórias reais:** vozes que moldam a trajetória, publicadas com consentimento e contexto.
- **Transparência e notícias:** conteúdos institucionais e documentos aprovados, com data e contexto.

Esses temas orientam a apresentação do site; não implicam a existência de sistemas de doação, mentoria, seleção ou gestão interna.

## 3. Recorte do produto

### Dentro do escopo

1. Página institucional responsiva com navegação por seções.
2. Apresentação do Instituto, sua atuação e a tríade de desenvolvimento.
3. Seções informativas para programas, parcerias, histórias, transparência e notícias.
4. Fluxo informativo de doação PIX: valor/frequência, dados do doador em memória de sessão e instrução de pagamento manual; cartão e boleto encaminham ao WhatsApp.
5. Encaminhamento para canais oficiais confirmados pelo Instituto, incluindo WhatsApp e e-mail institucional.
6. Seções editoriais para histórias e transparência, sem publicar depoimentos não autorizados nem prometer balancetes ou indicadores em tempo real.
7. Metadados básicos para busca e compartilhamento, navegação por teclado e suporte a movimento reduzido.

### Fora do escopo

- Checkout integrado, processamento ou conciliação de doações e confirmação automática.
- Inscrição, seleção, triagem ou armazenamento de dados de beneficiários e voluntários.
- Matching, agendamento ou acompanhamento operacional de mentorias.
- CRM, gestão contábil, dashboards internos ou painel administrativo.
- Cadastro de newsletter, automações de e-mail, webhooks e analytics não aprovados.
- Publicação de conteúdo, indicadores, depoimentos, marcas ou documentos sem validação.

## 4. Base técnica atual

- **Interface:** HTML semântico, CSS e JavaScript modular.
- **Build e desenvolvimento local:** Vite 6.
- **Dependências de execução:** nenhuma dependência de aplicação além do runtime do navegador.
- **Dados e serviços externos:** sem banco de dados, autenticação, processamento de pagamentos ou envio automático de formulários nesta versão. Dados do doador ficam apenas no navegador enquanto o diálogo está aberto e são apagados ao fechá-lo.
- **Transparência:** conteúdo institucional encaminha para canais oficiais; não há balancetes ou indicadores de atendimento em tempo real no site.
- **Conteúdo visual:** ilustrações vetoriais originais do projeto; não usar fotos ou logotipos de terceiros sem autorização.
- **Build de produção:** `pnpm run build`.

## 5. Princípios de privacidade e integridade

- Minimizar coleta e não criar formulários sem necessidade, destino e responsável definidos.
- Validar com o Instituto a necessidade dos campos de nome, e-mail e CPF/CNPJ; não transmitir nem persistir esses dados sem canal, finalidade e aviso de privacidade aprovados.
- Não incluir nomes, números de telefone, endereços de e-mail ou dados financeiros que não tenham sido confirmados para publicação.
- Obter autorização para divulgar marcas, fotografias e histórias identificáveis.
- Apresentar indicadores com fonte, período e contexto depois de aprovados pela organização.
- Revisar aviso de privacidade e eventuais ferramentas de medição antes de ativar qualquer coleta de dados.
- Manter conformidade aplicável com a LGPD (Lei nº 13.709/2018).

## 6. Dependências e questões em aberto

- Descrição oficial, missão e texto institucional aprovados.
- Programas atualmente ativos, público atendido e orientações públicas para participação.
- Confirmar titularidade, nome e cidade da chave PIX `institutopazbem@gmail.com` antes da publicação.
- Definir processo oficial de confirmação de doação e emissão de recibos; o site não gera recibos nem confirma pagamentos.
- URL de checkout oficial para cartão/boleto, se houver; até lá, consultas são encaminhadas ao WhatsApp informado.
- Responsáveis por contato geral e parcerias nos canais institucionais.
- Notícias, documentos de transparência e métricas que podem ser publicados.
- Autorizações para histórias, imagens, nomes e marcas.
- Consentimento para depoimento identificado; o material encaminhado sem consentimento não será publicado.
- Fonte confiável e integração necessárias antes de oferecer balancetes ou indicadores em tempo real.
- Processo e responsáveis pela atualização futura do conteúdo.
- Necessidade de CMS ou outro fluxo editorial de publicação.

Até que esses pontos sejam confirmados, o site deve sinalizar a dependência ou encaminhar para a referência institucional sem simular operações.

## 7. Critérios de saída

- O build de produção termina sem erros.
- A navegação interna não tem links quebrados e funciona em celular e desktop.
- Todas as ilustrações locais carregam sem erro.
- O menu móvel é operável por teclado e informa seu estado a tecnologias assistivas.
- Animações respeitam `prefers-reduced-motion`.
- O site não contém credenciais, dados de teste, formulários de demonstração ou alegações institucionais não verificadas.
- O conteúdo é revisado pelo Instituto antes da publicação definitiva.
