import React from 'react';

/**
 * Header component for the chatbot overlay.
 * Displays the chatbot title and provides actions like resetting the session and closing the chat.
 * @param {object} props - The component props.
 * @param {function} props.onReset - Callback function to reset the chat session.
 * @param {function} props.onClose - Callback function to close the chatbot overlay.
 */
const Header = ({ onReset, onClose }) => {
  return (
    <header>
      <h1>News Chatbot</h1>
      <div className="header-actions">
        {/* Button to reset the chat session */}
        <button onClick={onReset}>Reset Session</button>
        {/* Close button, only rendered if onClose prop is provided */}
        {onClose && <button onClick={onClose} className="close-button">X</button>}
      </div>
    </header>
  );
};

export default Header;