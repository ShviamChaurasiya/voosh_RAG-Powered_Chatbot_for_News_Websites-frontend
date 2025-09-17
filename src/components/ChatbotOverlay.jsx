import React from 'react';
import Header from './Header';
import ChatWindow from './ChatWindow';
import MessageInput from './MessageInput';
import TypingIndicator from './TypingIndicator';
import SessionHistory from './SessionHistory'; // Import the new component

/**
 * ChatbotOverlay component displays the chatbot interface as an overlay.
 * It manages the visibility of the chat and integrates various chat components.
 * @param {object} props - The component props.
 * @param {boolean} props.isChatOpen - Controls the visibility of the chat overlay.
 * @param {function} props.onClose - Callback function to close the chat overlay.
 * @param {Array<object>} props.messages - List of messages to display in the chat window.
 * @param {boolean} props.isTyping - Indicates if the bot is currently typing.
 * @param {function} props.onSendMessage - Callback function to send a new message.
 * @param {Array<object>} props.sessionList - List of session objects { id, preview }.
 * @param {string} props.activeSessionId - The ID of the currently active session.
 * @param {function} props.onNewChat - Callback to start a new chat session.
 * @param {function} props.onResumeSession - Callback to resume a specific chat session.
 * @param {function} props.onDeleteSession - Callback to delete a specific chat session.
 */
const ChatbotOverlay = ({
  isChatOpen,
  onClose,
  messages,
  isTyping,
  onSendMessage,
  sessionList,
  activeSessionId,
  onNewChat,
  onResumeSession,
  onDeleteSession,
}) => {
  // If the chat is not open, render nothing
  if (!isChatOpen) return null;

  return (
    <div className="chatbot-overlay">
      <div className="chatbot-container">
        <SessionHistory
          sessionList={sessionList}
          activeSessionId={activeSessionId}
          onNewChat={onNewChat}
          onResumeSession={onResumeSession}
          onDeleteSession={onDeleteSession}
        />
        <div className="chat-main-content"> {/* New wrapper for chat window and input */}
          {/* Header component with reset and close functionality */}
          <Header onReset={() => onDeleteSession(activeSessionId)} onClose={onClose} />
          {/* Chat window to display messages */}
          <ChatWindow messages={messages} />
          {/* Typing indicator, shown only when the bot is typing */}
          {isTyping && <TypingIndicator />}
          {/* Message input component for sending new messages */}
          <MessageInput onSendMessage={onSendMessage} isTyping={isTyping} />
        </div>
      </div>
    </div>
  );
};

export default ChatbotOverlay;