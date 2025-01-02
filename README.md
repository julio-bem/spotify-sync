# Spotify Sync Application

This project is a web application built with TypeScript, React, and Vite that interacts with the Spotify API to provide synchronization and display of user statistics. The application includes several key features, such as authentication with Spotify, a PWA setup for offline functionality, and a responsive design. This project was deployed and is currently live at https://spotify-app-nine-sable.vercel.app/.

## Table of Contents
0. [Challenge Requirements](#challenge-requirements)
1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Running the Application](#running-the-application)
4. [Project Structure](#project-structure)
5. [Technology Choices](#technology-choices)
6. [Architectural Patterns](#architectural-patterns)
7. [Key Features](#key-features)
8. [Extra Informations](#extra-informations)
9. [Author](#author)

## Challenge Requirements

### Requisitos obrigatórios
- [X] Seguimentação de commits
- [X] Lint
- [X] Autenticação via Spotify
- [X] Listar artistas
- [X] Listar albuns de um artista
- [X] Utilizar paginação (scroll infinito ou não)
- [X] Funcionamento offline
- [X] Testes unitários
- [X] Deploy da aplicação
### Bônus
- [X] Testes E2E
- [ ] Integração com Sentry
- [X] CI/CD
- [X] Responsividade (celular e tablet)
- [ ] Qualidade de código (Sonarqube)
- [X] PWA

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js (version 14 or higher)
- npm (version 6 or higher) or yarn (version 1.22 or higher)
- Spotify Developer account with a registered application to obtain the Client ID

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/spotify-sync.git
   cd spotify-sync
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root of the project and add the following:
   ```plaintext
   VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id
   VITE_SPOTIFY_AUTHORIZE_ENDPOINT=https://accounts.spotify.com/authorize
   VITE_SPOTIFY_REDIRECT_URI=user-read-currently-playing user-read-playback-state user-read-private user-read-email user-top-read playlist-read-private playlist-modify-public playlist-modify-private
   ```

## Running the Application

1. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The application will be available at `http://localhost:3000`.

2. **Build the application for production:**
   ```bash
   npm run build
   # or
   yarn build
   ```

3. **Serve the built application:**
   ```bash
   npm run serve
   # or
   yarn serve
   ```

## Project Structure

The project structure is organized as follows:

```
spotify-sync/
├── public/
│   ├── pwa-64x64.png
│   ├── pwa-192x192.png
│   ├── pwa-512x512.png
│   └── maskable-icon-512x512.png
├── src/
│   ├── assets/
│   ├── components/
│   ├── contexts/
│   ├── hooks/
│   ├── pages/
│   ├── tests/
│   ├── App.tsx
│   └── index.tsx
│   └── GlobalStyles.ts
├── .env
├── package.json
├── tsconfig.json
├── vite.config.ts
└── vitest.config.ts
```

## Technology Choices

1. **React**: A popular JavaScript library for building user interfaces, chosen for its component-based architecture and performance.

2. **TypeScript**: A superset of JavaScript that adds static types, which helps catch errors during development and improves code quality.

3. **Vite**: A build tool that provides a fast development server and optimized build process, chosen for its speed and efficiency.

4. **styled-components**: A library for styling React components using tagged template literals, chosen for its CSS-in-JS approach which allows for scoped styling.

5. **Vitest**: A Vite-native unit testing framework, chosen for its seamless integration with Vite and fast testing capabilities.

6. **VitePWA**: A plugin for Vite to easily configure Progressive Web App (PWA) features, enabling offline functionality and improved performance.

## Architectural Patterns

1. **Component-based Architecture**: The application is divided into reusable components, promoting modularity and maintainability.

2. **Context API**: Used for managing global state, such as authentication status, providing a centralized way to manage state and avoid prop drilling.

3. **Service Worker and Caching**: Configured using the VitePWA plugin to cache API responses and static assets, allowing the application to work offline.

## Key Features

1. **Authentication with Spotify**: Users can log in with their Spotify account to access their data.

2. **Top Artists Display**: The application fetches and displays the user's top artists from the Spotify API.

3. **Pagination**: Implemented to navigate through paginated data from the Spotify API.

4. **PWA Setup**: The application is configured as a Progressive Web App, providing offline functionality and improved performance.

5. **Responsive Design**: The application is designed to be responsive, providing a good user experience across different devices.

## Extra Informations

1. ⚠️ Since 2023, Spotify has a [quota limit for authentication](#https://developer.spotify.com/documentation/web-api/concepts/quota-modes). Newly-created apps begin in development mode and only users registered in the app's allowlist can access the application. To extend the quota mode and remove this limit, it would be needed to contact Spotify's app review team to take a look at the app and evaluate it for compliance, what could take from several weeks to months. IF needed, contact me with the email associated with the Spotify account and I will input it in the allowlist.

2. Chosen Authorization Method: Spotify's API has 4 different Authorization methods. For this app, it was chosen the **Authorization Code with PKCE Flow**, since it is carried out only on the client side and it does not involve secret keys, what is ideal for the purpose of this application.

## Author

- [Júlio Bem](https://www.linkedin.com/in/juliobem/)

---------------------------------------

I appreciate the time given for my project's evaluation. I had a really great time developing it.
