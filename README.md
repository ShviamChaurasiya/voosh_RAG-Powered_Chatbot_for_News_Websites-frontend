# Voosh Chatbot Frontend

## Project Overview

This project is the frontend for the Voosh Chatbot, a RAG (Retrieval-Augmented Generation) powered news chatbot application. Developed with React and SCSS, it offers an intuitive interface for users to interact with the chatbot, view conversation history, and manage chat sessions. The application is designed to be fully responsive, ensuring a consistent and seamless experience across various devices, from mobile phones to desktop computers.

## Features

*   **Interactive Chat Interface:** Engage with the chatbot by sending messages and receiving instant responses.
*   **Conversation History:** Easily review past interactions within the current chat session.
*   **Session Management:**
    *   **Automatic Session Creation:** A new chat session is automatically initiated upon the first load.
    *   **Session Persistence:** Session IDs and conversation history are persistently stored using `sessionStorage` for continuity.
    *   **Session Reset:** Option to clear the current chat history and start a fresh session.
*   **Typing Indicator:** Provides visual feedback to the user when the chatbot is processing a response.
*   **Responsive Design:** The layout and styling dynamically adapt to provide an optimal viewing and interaction experience on desktop, tablet, and mobile devices.

## Technologies Used

*   **Framework:** React (utilizing Vite for a fast development experience)
*   **Styling:** SCSS (Sass) for powerful and maintainable stylesheets
*   **HTTP Client:** Axios for efficient API requests
*   **Language:** JavaScript (ES6+)

## Setup & Installation

Follow these steps to set up and run the Voosh Chatbot Frontend on your local machine.

### Prerequisites

*   **Node.js:** Latest LTS version recommended.
*   **npm:** Node Package Manager, typically installed with Node.js.

### 1. Clone the Repository

First, clone the repository to your local machine and navigate into the project directory:

```bash
git clone <your-repository-url>
cd voosh-chatbot-frontend
```

### 2. Install Dependencies

Install all necessary project dependencies using npm:

```bash
npm install
```

### 3. Configure API Base URL

The frontend communicates with a backend API. You need to specify the base URL for these API calls.

Create a file named `src/config.js` (if it doesn't already exist) in your `src` directory and add the following content:

```javascript
// src/config.js
export const API_BASE_URL = "/api"; // This uses a proxy for local development
```

**Note on Local Development (CORS Proxy):**
During local development, to circumvent Cross-Origin Resource Sharing (CORS) issues, the project is configured to proxy API requests through the Vite development server. This means any requests originating from the frontend to `/api` will be redirected to your specified backend server.

Ensure your `vite.config.js` includes the following proxy configuration within the `server` object:

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://backend.com', // **IMPORTANT: Replace with your actual backend URL**
        changeOrigin: true,
        secure: false, // Set to true if your backend uses a valid SSL certificate
      },
    },
  },
})
```
**Important:** Remember to replace `https://backend.com` with the actual URL of your deployed backend API.

### 4. Run the Development Server

Start the Vite development server to run the application locally:

```bash
npm run dev
```

The application will typically be accessible at `http://localhost:5173` in your web browser (or another port if 5173 is already in use).

### 5. Build for Production

To create a production-ready build of the application, run:

```bash
npm run build
```

This command compiles and optimizes your application for deployment.

### 6. Preview Production Build

You can preview the production build locally using:

```bash
npm run preview
```

## Project Structure

The `src/` directory is thoughtfully organized to maintain modularity and readability: 

```
src/
├── api/
│   └── chatService.js       # Centralized logic for interacting with the backend API.
├── assets/
│   └── react.svg            # Static assets like images or icons.
├── components/
│   ├── ChatbotOverlay.jsx   # The main overlay component for the chatbot interface.
│   ├── ChatWindow.jsx       # Displays the conversation messages.
│   ├── Header.jsx           # Application header, often including session reset functionality.
│   ├── HeroSection.jsx      # The initial hero section of the application.
│   ├── MessageInput.jsx     # Input field and send button for user messages.
│   └── TypingIndicator.jsx  # Visual component indicating when the bot is typing.
├── styles/
│   ├── _variables.scss      # SCSS variables for consistent theming (colors, fonts, etc.).
│   ├── App.scss             # Main application-specific SCSS styles, including layout and responsiveness.
│   └── main.scss            # Global SCSS styles applied across the application.
├── App.jsx                  # The main application component, managing overall state and component orchestration.
├── config.js                # Configuration file for API endpoints and other settings.
├── index.css                # Base CSS styles.
├── main.jsx                 # The entry point for the React application, rendering the root component.
└── ...                      # Other potential files or directories.
```

## API Endpoints

The frontend interacts with the following backend API endpoints:

*   **`GET /api/session/new`**: Used to fetch a new, unique session ID for a new chat conversation.
*   **`POST /api/chat`**: Sends a user's message to the backend and receives the chatbot's response.
    *   **Payload:** `{ sessionId: string, message: string }`
*   **`GET /api/history/{sessionId}`**: Retrieves the complete conversation history for a specified session ID.
*   **`POST /api/session/clear`**: Clears the conversation history associated with a given session ID on the backend.
    *   **Payload:** `{ sessionId: string }`

## Responsiveness

The application is developed with a mobile-first philosophy, incorporating media queries within `src/styles/App.scss` to ensure optimal display and usability across a wide range of screen sizes:

*   **Mobile (Portrait):** Features a compact layout with stacked input and buttons for easy interaction.
*   **Tablet / Small Desktop:** Adjusts padding and expands the content area for improved readability.
*   **Desktop / Landscape:** Provides an expanded content area, optimized for larger displays and enhanced user experience.

## Contributing

Contributions to the Voosh Chatbot Frontend are highly encouraged! If you have suggestions, bug reports, or would like to contribute code, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
