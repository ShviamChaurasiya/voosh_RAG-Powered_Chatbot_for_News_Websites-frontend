import React, { useState } from 'react';

/**
 * MessageInput component provides an input field and a send button for users to type and send messages.
 * It handles the input state and triggers the onSendMessage callback when a message is submitted.
 * @param {object} props - The component props.
 * @param {function} props.onSendMessage - Callback function to send the message text to the parent component.
 * @param {boolean} props.isTyping - Indicates if the bot is currently typing, used to disable input.
 */
const MessageInput = ({ onSendMessage, isTyping }) => {
  // State to hold the current value of the input field
  const [inputText, setInputText] = useState('');

  /**
   * Handles the form submission event.
   * Prevents default form submission, sends the message if valid, and clears the input.
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // Only send message if input is not empty and bot is not typing
    if (inputText.trim() !== '' && !isTyping) {
      onSendMessage(inputText); // Call the parent's send message function
      setInputText(''); // Clear the input field after sending
    }
  };

  return (
    <form onSubmit={handleSubmit} className="message-input-form">
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)} // Update input state on change
        placeholder="Type your message..."
        disabled={isTyping} // Disable input when bot is typing
        aria-label="Type your message"
      />
      <button type="submit" disabled={isTyping || inputText.trim() === ''}> {/* Disable button if typing or input is empty */}
        Send
      </button>
    </form>
  );
};

export default MessageInput;
