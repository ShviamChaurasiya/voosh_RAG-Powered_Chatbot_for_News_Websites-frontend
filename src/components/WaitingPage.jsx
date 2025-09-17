import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/App.scss';
import PageHeader from './PageHeader';
import { getNewSessionId } from '../api/chatService';

const WaitingPage = () => {
  const [countdown, setCountdown] = useState(10);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const warmUpServer = async () => {
      console.log('Warming up server...');
      try {
        await getNewSessionId();
        console.log('Server warmed up');
      } catch (err) {
        console.error('Error warming up server:', err);
      }
    };
    warmUpServer();

    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown > 0 ? prevCountdown - 1 : 0);
    }, 1000);

    const redirectTimer = setTimeout(() => {
      navigate('/home');
    }, 10000);

    const enableButtonTimer = setTimeout(() => {
      setIsButtonDisabled(false);
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimer);
      clearTimeout(enableButtonTimer);
    };
  }, [navigate]);

  const handleRedirectNow = () => {
    navigate('/home');
  };

  return (
    <div className="hero-section">
      <PageHeader />
      <div className="waiting-content">
        <h1>Warming up server...</h1>
        <p>Redirecting in {countdown} seconds...</p>
        <button onClick={handleRedirectNow} className="redirect-now-btn" disabled={isButtonDisabled}>
          Redirect Now
        </button>
      </div>
    </div>
  );
};

export default WaitingPage;
