# ✅ Todo List — TDD/BDD Practice

A small single-page React application built with React, TypeScript, Redux Toolkit, Jest, and React Testing Library — focused on practicing TDD/BDD.

## 🚀 Features

- 🧩 Add, toggle, and delete tasks

- 🧲 Filter: show only incomplete tasks (switch)

- ⏱️ Business rule: no more than 10 incomplete tasks

- 🔔 Notifier

- ♿ Accessible queries in tests (roles/labels)

## 🧭 App Overview
- 🏠 Main Screen

- Header + Filter switch (“Только невыполненные”)

- NewTaskBar with validation (min/max length)

- TaskList (list of Items)

- Notifier (auto-hide)

## 🧪 TDD/BDD Highlights

- BDD story for filtering:

- As a user, I want to enable “Only incomplete” so that completed tasks are hidden.

- TDD for the “≤ 10 incomplete” rule:

- Unit tests for selector/reducer

- Integration tests for UI behavior

## 🔧 Technologies

- React 18, TypeScript

- Redux Toolkit, React-Redux

- Webpack 5 (dev server)

- Jest 29, @testing-library/react 14, @testing-library/user-event 14

- jest-dom, ts-jest

## 📦 Project Setup

### Install dependencies
```bash
pnpm install
# or
yarn install
# or
npm install
```

### Run development server
```bash
npm start
# http://localhost:3000
```

### Build
```bash
npm run build
```

### Run Tests
```bash
# all tests once
npm test

# watch mode
npm test -- --watch
```



