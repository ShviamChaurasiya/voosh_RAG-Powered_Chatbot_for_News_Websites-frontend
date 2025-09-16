import React, { useEffect, useRef } from 'react';

/**
 * ChatWindow component displays the list of messages in the chat.
 * It automatically scrolls to the bottom when new messages are added.
 * @param {object} props - The component props.
 * @param {Array<object>} props.messages - An array of message objects, each with a 'sender' and 'text' property.
 */
const ChatWindow = ({ messages }) => {
  // Ref to automatically scroll to the latest message
  const messagesEndRef = useRef(null);

  /**
   * Scrolls the chat window to the bottom.
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Effect hook to scroll to bottom whenever messages array changes
  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Dependency array includes messages, so it runs on message updates

  return (
    <div className="chat-window">
      {/* Map through messages and render each one */}
      {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.sender}-message`}>
          <p>{msg.text}</p>
        </div>
      ))}
      {/* Empty div at the end of messages to scroll into view */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatWindow;
