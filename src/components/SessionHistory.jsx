import React from 'react';
import '../styles/SessionHistory.scss'; // We will create this SCSS file next

/**
 * SessionHistory component displays a list of chat sessions.
 * Allows users to start new chats, resume existing ones, and delete sessions.
 * @param {object} props - The component props.
 * @param {Array<object>} props.sessionList - List of session objects { id, preview }.
 * @param {string} props.activeSessionId - The ID of the currently active session.
 * @param {function} props.onNewChat - Callback to start a new chat session.
 * @param {function} props.onResumeSession - Callback to resume a specific chat session.
 * @param {function} props.onDeleteSession - Callback to delete a specific chat session.
 */
const SessionHistory = ({ sessionList, activeSessionId, onNewChat, onResumeSession, onDeleteSession }) => {
  return (
    <div className="session-history">
      <button className="new-chat-button" onClick={() => onNewChat(true)}>
        + New Chat
      </button>
      <div className="session-list">
        {sessionList.map((session) => (
          <div
            key={session.id}
            className={`session-item ${session.id === activeSessionId ? 'active' : ''}`}
          >
            <span className="session-preview" onClick={() => onResumeSession(session.id)}>
              {session.preview}
            </span>
            <button className="delete-session-button" onClick={() => onDeleteSession(session.id)}>
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SessionHistory;
