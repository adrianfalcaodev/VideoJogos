# VideoJogos

Projeto criado como prova para a matéria de React. A aplicação apresenta jogos em páginas de detalhes e permite consultar e pesquisar jogos obtidos pela API RAWG.

## Objetivos de aprendizagem

O projeto foi desenvolvido para praticar:

- **Reutilização de componentes:** uso de componentes como botão e estrutura de navegação em diferentes páginas.
- **Estado com `useState`:** controle do texto de pesquisa, dos jogos carregados, do jogo selecionado e dos estados de carregamento e erro.
- **Efeitos com `useEffect`:** carregamento dos dados da API quando a página de jogos é aberta.
- **Manipulação de dados:** combinação de resultados paginados, remoção de duplicados, filtragem de uma lista de objetos e apresentação dos detalhes de cada jogo.
- **Navegação em React:** rotas para a página inicial, a lista de jogos e páginas de detalhes.

## Tecnologias

- React
- Vite
- React Router
- API RAWG

## Executar localmente

Requisitos: Node.js e npm.

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Crie uma chave de API no serviço RAWG e copie `.env.example` para `.env`.
3. Preencha `VITE_RAWG_API_KEY` no arquivo `.env` com sua chave.
4. Inicie o servidor local:

   ```bash
   npm run dev
   ```

O arquivo `.env` está no `.gitignore` e não deve ser enviado ao GitHub. Se a variável não estiver configurada, a página de jogos informa que falta configurar a chave.

> **Atenção:** variáveis com prefixo `VITE_` são incluídas no código enviado ao navegador. A chave não é secreta quando usada desta forma; use uma chave de demonstração e revogue/rotacione qualquer chave que tenha sido publicada ou comprometida. Uma aplicação publicada que precise manter a chave privada deve acessar a API por um backend.

## Comandos

```bash
npm run dev      # inicia o servidor de desenvolvimento
npm run lint     # executa o ESLint
npm run build    # gera a versão de produção em dist/
npm run preview  # pré-visualiza a versão de produção
```

## Organização do projeto

- `src/components/`: componentes reutilizáveis e layout.
- `src/data/`: dados auxiliares usados nas páginas.
- `src/pages/`: páginas e conteúdo da aplicação.
- `src/App.jsx`: configuração das rotas.
- `.env.example`: modelo da variável de ambiente necessária à API.
