import React, { useState, useEffect } from 'react';
import HeroSection from './components/HeroSection';
import ChatbotOverlay from './components/ChatbotOverlay';
import * as chatService from './api/chatService';
import './styles/App.scss';

/**
 * Main application component for the chatbot frontend.
 * Manages chat state, session, message handling, and UI components.
 */
function App() {
  // State to store chat messages (both user and bot)
  const [messages, setMessages] = useState([]);
  // State to store the current session ID for the chatbot
  const [sessionId, setSessionId] = useState(null);
  // State to indicate if the bot is currently typing a response
  const [isTyping, setIsTyping] = useState(false);
  // State to control the visibility of the chatbot overlay
  const [isChatOpen, setIsChatOpen] = useState(false);

  /**
   * useEffect hook to initialize the chat session when the component mounts.
   * It tries to retrieve an existing session ID from localStorage or creates a new one.
   * If a session exists, it fetches the chat history.
   */
  useEffect(() => {
    const initializeSession = async () => {
      let currentSessionId = localStorage.getItem('sessionId');
      if (!currentSessionId) {
        // If no session ID exists, get a new one from the chat service
        try {
          currentSessionId = await chatService.getNewSessionId();
          localStorage.setItem('sessionId', currentSessionId);
        } catch (error) {
          console.error("Failed to get new session ID:", error);
          // TODO: Implement user-friendly error handling
        }
      } else {
        // If a session ID exists, fetch the chat history for that session
        try {
          const history = await chatService.getSessionHistory(currentSessionId);
          setMessages(history);
        } catch (error) {
          console.error("Failed to get session history:", error);
          // TODO: Implement user-friendly error handling
        }
      }
      setSessionId(currentSessionId);
    };

    initializeSession();
  }, []); // Empty dependency array ensures this runs only once on mount

  /**
   * Handles sending a new message from the user to the chatbot.
   * Updates messages state, sets typing indicator, calls the chat service,
   * and updates messages with the bot's response.
   * @param {string} inputText - The message text entered by the user.
   */
  const handleSendMessage = async (inputText) => {
    // Add user's message to the chat
    setMessages((prev) => [...prev, { sender: 'user', text: inputText }]);
    setIsTyping(true); // Show typing indicator

    try {
      // Send message to the chat service and get bot's response
      const response = await chatService.postMessage(sessionId, inputText);
      // Add bot's response to the chat
      setMessages((prev) => [...prev, { sender: 'bot', text: response.text }]);
    } catch (error) {
      console.error("Failed to send message:", error);
      // Display an error message if the API call fails
      setMessages((prev) => [...prev, { sender: 'bot', text: "Error: Could not get a response. Please try again." }]);
    } finally {
      setIsTyping(false); // Hide typing indicator
    }
  };

  /**
   * Handles resetting the chat session.
   * Clears messages, removes session ID from localStorage, and creates a new session.
   */
  const handleResetSession = async () => {
    try {
      // Clear session history on the backend
      await chatService.clearSessionHistory(sessionId);
      setMessages([]); // Clear messages in the UI
      localStorage.removeItem('sessionId'); // Remove session ID from local storage
      // Get a new session ID
      const newSessionId = await chatService.getNewSessionId();
      setSessionId(newSessionId);
      localStorage.setItem('sessionId', newSessionId); // Store new session ID
    } catch (error) {
      console.error("Failed to reset session:", error);
      // TODO: Implement user-friendly error handling
    }
  };

  return (
    <div className="app-wrapper">
      {/* Hero section component with a callback to open the chat */}
      <HeroSection onBookDemoClick={() => setIsChatOpen(true)} />
      {/* Chatbot overlay component, visible based on isChatOpen state */}
      <ChatbotOverlay
        isChatOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)} // Callback to close the chat
        messages={messages} // Pass current chat messages
        isTyping={isTyping} // Pass typing indicator state
        onSendMessage={handleSendMessage} // Callback for sending messages
        onReset={handleResetSession} // Callback for resetting the session
      />
    </div>
  );
}

export default App;
