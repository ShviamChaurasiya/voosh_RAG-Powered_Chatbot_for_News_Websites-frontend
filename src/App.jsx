import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WaitingPage from './components/WaitingPage';
import HeroSection from './components/HeroSection';
import ChatbotOverlay from './components/ChatbotOverlay';
import * as chatService from './api/chatService';
import './styles/App.scss';

/**
 * Main application component for the chatbot frontend.
 * Manages chat state, session, message handling, and UI components.
 */
function App() {
  const [messages, setMessages] = React.useState([]);
  const [sessionId, setSessionId] = React.useState(null);
  const [isTyping, setIsTyping] = React.useState(false);
  const [isChatOpen, setIsChatOpen] = React.useState(false);

  React.useEffect(() => {
    const initializeSession = async () => {
      let currentSessionId = sessionStorage.getItem('sessionId');
      if (!currentSessionId) {
        try {
          currentSessionId = await chatService.getNewSessionId();
          sessionStorage.setItem('sessionId', currentSessionId);
        } catch (error) {
          console.error("Failed to get new session ID:", error);
        }
      } else {
        try {
          const history = await chatService.getSessionHistory(currentSessionId);
          setMessages(history);
        } catch (error) {
          console.error("Failed to get session history:", error);
        }
      }
      setSessionId(currentSessionId);
    };

    initializeSession();
  }, []);

  const handleSendMessage = async (inputText) => {
    setMessages((prev) => [...prev, { sender: 'user', text: inputText }]);
    setIsTyping(true);

    try {
      const response = await chatService.postMessage(sessionId, inputText);
      setMessages((prev) => [...prev, { sender: 'bot', text: response.response }]);
    } catch (error) {
      console.error("Failed to send message:", error);
      setMessages((prev) => [...prev, { sender: 'bot', text: "Error: Could not get a response. Please try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleResetSession = async () => {
    try {
      await chatService.clearSessionHistory(sessionId);
      setMessages([]);
      sessionStorage.removeItem('sessionId');
      const newSessionId = await chatService.getNewSessionId();
      setSessionId(newSessionId);
      sessionStorage.setItem('sessionId', newSessionId);
    } catch (error) {
      console.error("Failed to reset session:", error);
    }
  };

  const MainContent = () => (
    <div className="app-wrapper">
      <HeroSection onBookDemoClick={() => setIsChatOpen(true)} />
      <ChatbotOverlay
        isChatOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        messages={messages}
        isTyping={isTyping}
        onSendMessage={handleSendMessage}
        onReset={handleResetSession}
      />
    </div>
  );

  return (
    <Routes>
      <Route path="/" element={<WaitingPage />} />
      <Route path="/home" element={<MainContent />} />
    </Routes>
  );
}

export default App;