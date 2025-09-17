import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'; // For generating unique session IDs
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
  const navigate = useNavigate();
  const [messages, setMessages] = React.useState([]);
  const [sessionList, setSessionList] = React.useState([]); // Stores [{ id, preview }]
  const [activeSessionId, setActiveSessionId] = React.useState(null);
  const [isTyping, setIsTyping] = React.useState(false);
  const [isChatOpen, setIsChatOpen] = React.useState(false);

  // Effect to initialize sessions from localStorage
  React.useEffect(() => {
    const initializeSessions = async () => {
      const storedSessions = JSON.parse(localStorage.getItem('sessionList')) || [];

      if (storedSessions.length > 0) {
        setSessionList(storedSessions);
        const initialActiveSessionId = storedSessions[0].id;
        setActiveSessionId(initialActiveSessionId);
        try {
          const history = await chatService.getSessionHistory(initialActiveSessionId);
          setMessages(history);
        } catch (error) {
          console.error("Failed to get session history for initial session:", error);
          setMessages([]); // Clear messages if history fetch fails
        }
      } else {
        // No sessions found, create a new one
        await handleNewChat(false); // Create new chat without clearing existing messages
      }
    };

    initializeSessions();
  }, []); // Run only once on component mount

  // Effect to fetch messages when activeSessionId changes
  React.useEffect(() => {
    const fetchActiveSessionHistory = async () => {
      if (activeSessionId) {
        try {
          const history = await chatService.getSessionHistory(activeSessionId);
          setMessages(history);
        } catch (error) {
          console.error(`Failed to get session history for ${activeSessionId}:`, error);
          setMessages([]); // Clear messages if history fetch fails
        }
      } else {
        setMessages([]); // Clear messages if no active session
      }
    };

    fetchActiveSessionHistory();
  }, [activeSessionId]);

  // Function to create a new chat session
  const handleNewChat = async (shouldClearMessages = true) => {
    try {
      const newSessionId = await chatService.getNewSessionId();
      const newSession = { id: newSessionId, preview: "New Chat" };

      setSessionList(prev => {
        const updatedList = [newSession, ...prev];
        localStorage.setItem('sessionList', JSON.stringify(updatedList));
        return updatedList;
      });
      setActiveSessionId(newSessionId);
      if (shouldClearMessages) {
        setMessages([]);
      }
    } catch (error) {
      console.error("Failed to create new session:", error);
    }
  };

  // Function to resume an existing chat session
  const handleResumeSession = async (id) => {
    if (id === activeSessionId) return; // Already active
    setActiveSessionId(id);
    // Messages will be fetched by the useEffect hook when activeSessionId changes
  };

  // Function to delete a chat session
  const handleDeleteSession = async (idToDelete) => {
    try {
      await chatService.clearSessionHistory(idToDelete); // Clear backend history

      setSessionList(prev => {
        const updatedList = prev.filter(session => session.id !== idToDelete);
        localStorage.setItem('sessionList', JSON.stringify(updatedList));
        return updatedList;
      });

      if (idToDelete === activeSessionId) {
        // If the active session was deleted, switch to another or create new
        const updatedSessionList = JSON.parse(localStorage.getItem('sessionList')) || [];
        if (updatedSessionList.length > 0) {
          setActiveSessionId(updatedSessionList[0].id);
        } else {
          await handleNewChat(); // Create a new session if list is empty
        }
      }
    } catch (error) {
      console.error(`Failed to delete session ${idToDelete}:`, error);
    }
  };

  const handleSendMessage = async (inputText) => {
    if (!activeSessionId) {
      console.error("No active session to send message.");
      return;
    }

    const userMessage = { sender: 'user', text: inputText };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Update session preview if it's still "New Chat"
    setSessionList(prev => {
      const updatedList = prev.map(session =>
        session.id === activeSessionId && session.preview === "New Chat"
          ? { ...session, preview: inputText }
          : session
      );
      localStorage.setItem('sessionList', JSON.stringify(updatedList));
      return updatedList;
    });

    try {
      const response = await chatService.postMessage(activeSessionId, inputText);
      setMessages((prev) => [...prev, { sender: 'bot', text: response.response }]);
    } catch (error) {
      console.error("Failed to send message:", error);
      setMessages((prev) => [...prev, { sender: 'bot', text: "Error: Could not get a response. Please try again." }]);
    } finally {
      setIsTyping(false);
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
        // Pass multi-session props
        sessionList={sessionList}
        activeSessionId={activeSessionId}
        onNewChat={handleNewChat}
        onResumeSession={handleResumeSession}
        onDeleteSession={handleDeleteSession}
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
