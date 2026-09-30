# Менеджер задач (React + Apollo Client)

## Запуск

1. Запустить Python GraphQL-сервер из темы 2.2:

   uvicorn main:app --reload

2. Установить зависимости и запустить React-приложение:

   npm install
   npm run dev

Приложение: http://localhost:5173
GraphQL-сервер по умолчанию: http://localhost:8000/graphql

Адрес сервера можно изменить через переменную VITE_GRAPHQL_URL (см. .env.example).

В CORSMiddleware сервера должен быть разрешён origin http://localhost:5173.

## Структура

- src/apolloClient.js - ApolloClient
- src/main.jsx - ApolloProvider
- src/graphql/queries.js - запросы
- src/graphql/mutations.js - мутации (createTask, completeTask)
- src/components/TaskList.jsx - useQuery, loading и error
- src/components/TaskForm.jsx - useMutation, refetchQueries
- src/components/TaskItem.jsx - мутация completeTask
