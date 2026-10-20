# Direção visual · Instituto Semear

## Status da identidade

Esta direção orienta a implementação atual do site institucional. As cores e tipografias abaixo são escolhas de interface para o projeto; não devem ser apresentadas como identidade visual oficial até validação do Instituto Semear.

## Intenção visual

Uma linguagem editorial, acolhedora e contemporânea, inspirada em crescimento, encontros e possibilidades. Usar composição assimétrica, respiro, linhas finas e ilustrações vetoriais originais. Evitar aparência de painel administrativo, estereótipos de filantropia e imagens genéricas de pessoas.

## Tokens em uso

```css
:root {
  --paper: #f6f3ed;
  --paper-deep: #ece5d9;
  --paper-white: #fbfaf7;
  --ink: #29322b;
  --muted: #74766e;
  --green: #344539;
  --green-deep: #26362c;
  --green-soft: #879078;
  --clay: #a5573b;
  --clay-light: #c27a57;
}
```

Os títulos usam `DM Serif Display`; corpo e interface usam `DM Sans`. Aplicar itálico com parcimônia em palavras de ênfase, sem comprometer legibilidade.

## Componentes e interação

- Cabeçalho fixo com navegação por âncoras e menu móvel acessível.
- Hero editorial com ilustração vetorial original do projeto.
- Seções institucionais para atuação, programas, parcerias, histórias, transparência e formas de apoio.
- Estados de hover discretos, foco visível e alvos de toque adequados.
- Revelações de conteúdo ao rolar e movimento sutil na ilustração, sempre respeitando `prefers-reduced-motion`.

## Conteúdo e uso de ativos

- Usar somente fatos institucionais confirmados pelo Instituto.
- Não inventar métricas, depoimentos, parceiros, canais de contato ou destinos de doação.
- Não usar logotipos, fotografias ou histórias identificáveis sem autorização.
- Preferir ilustrações originais e elementos decorativos que não simulem imagens documentais.

## Responsividade e acessibilidade

- Validar em telas móveis, tablet e desktop.
- Preservar hierarquia de títulos, contraste, navegação por teclado e rótulos acessíveis.
- Não esconder informações essenciais atrás de animações.
- Manter conteúdo compreensível quando fontes externas ou animações não carregarem.
