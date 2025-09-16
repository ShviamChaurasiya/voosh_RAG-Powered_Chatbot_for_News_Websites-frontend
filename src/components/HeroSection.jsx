import React, { useState, useEffect, useRef } from 'react';

/**
 * HeroSection component displays the main landing section of the application.
 * It includes a header with navigation, a hero content area with a typewriter effect,
 * and a metrics section.
 * @param {object} props - The component props.
 * @param {function} props.onBookDemoClick - Callback function triggered when the "Use Chatbot" button is clicked.
 */
const HeroSection = ({ onBookDemoClick }) => {
  // State for the animated text in the hero section title
  const [animatedText, setAnimatedText] = useState('');
  // Array of words to be animated by the typewriter effect
  const words = ["understand  ", "discovery  ", "insights  ", "support  "];
  // Refs to manage the state of the typewriter effect across renders
  const wordIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const isDeletingRef = useRef(false);
  const delayRef = useRef(150);

  useEffect(() => {
    /**
     * Implements the typewriter effect by typing and deleting words.
     */
    const typeWriter = () => {
      const currentWord = words[wordIndexRef.current];
      // Determine if the effect is currently deleting or typing
      if (isDeletingRef.current) {
        // If deleting, remove characters one by one
        setAnimatedText(currentWord.substring(0, charIndexRef.current - 1));
        charIndexRef.current--;
      } else {
        // If typing, add characters one by one
        setAnimatedText(currentWord.substring(0, charIndexRef.current + 1));
        charIndexRef.current++;
      }

      // Check if typing is complete for the current word
      if (!isDeletingRef.current && charIndexRef.current === currentWord.length) {
        // Pause after typing a word, then start deleting
        delayRef.current = 75; // Longer delay before deleting
        isDeletingRef.current = true;
      } else if (isDeletingRef.current && charIndexRef.current === 0) {
        // If deleting is complete, move to the next word and start typing
        isDeletingRef.current = false;
        wordIndexRef.current = (wordIndexRef.current + 1) % words.length; // Cycle through words
        delayRef.current = 100; // Shorter delay before typing next word
      }

      // Schedule the next step of the typewriter effect
      setTimeout(typeWriter, delayRef.current);
    };

    // Start the typewriter effect when the component mounts
    const timeoutId = setTimeout(typeWriter, delayRef.current);
    // Cleanup function to clear the timeout when the component unmounts
    return () => clearTimeout(timeoutId); 
  }, []); // Empty dependency array to run once on mount

  return (
    <div className="hero-section">
      <header className="header">
        <a href="#" className="logo">RAG News AI</a>
        <nav>
          <ul>
            {/* Platform Dropdown */}
            <li className="dropdown">
              <a href="#">Platform</a>
              <div className="dropdown-content">
                <a href="#">Features</a>
                <a href="#">Use Cases</a>
              </div>
            </li>
            {/* Customers Dropdown */}
            <li className="dropdown">
              <a href="#">Customers</a>
              <div className="dropdown-content">
                <a href="#">Testimonials</a>
                <a href="#">Case Studies</a>
              </div>
            </li>
            {/* Resources Dropdown */}
            <li className="dropdown">
              <a href="#">Resources</a>
              <div className="dropdown-content">
                <a href="#">Blog</a>
                <a href="#">Whitepapers</a>
                <a href="#">FAQs</a>
              </div>
            </li>
            {/* Company Dropdown */}
            <li className="dropdown">
              <a href="#">Company</a>
              <div className="dropdown-content">
                <a href="#">About Us</a>
                <a href="#">Careers</a>
                <a href="#">Contact</a>
              </div>
            </li>
          </ul>
        </nav>
        <div className="buttons">
          <a href="#" className="button partners-button">Partners</a>
          {/* Button to open the chatbot, triggers onBookDemoClick callback */}
          <a href="#" className="button demo-button" onClick={onBookDemoClick}>Use Chatbot</a>
        </div>
      </header>

      <div className="hero-content">
        <div className="tag">#1 AI Chatbot for News Websites</div>
        <h1>
          <span className="line-one">Automate news&nbsp;</span>
          {/* Animated text for the typewriter effect */}
          <span className="animated-text-line">&nbsp;{animatedText}&nbsp;</span>
          <span className="line-three"> in minutes.</span>
        </h1>
        <p>Enhance reader engagement, provide instant summaries, and answer questions across your news content, articles, and archives.</p>
        {/* Call to action button to open the chatbot */}
        <a href="#" className="cta-button" onClick={onBookDemoClick}>
          Use Chatbot
          {/* SVG icon for the arrow */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 5L16 12L9 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
        <div className="small-text">
          No credit card required <span>|</span> <span style={{ color: '#4CAF50' }}>✔️</span> Saved reader time with our clients
        </div>
      </div>

      <div className="metrics-section">
        {/* Metric Card 1: Engagement Manager */}
        <div className="metric-card">
          <h3>Engagement Manager</h3>
          <div className="metric-value">
            30% more time
            <span className="icon" style={{ color: '#4CAF50' }}>↑</span>
          </div>
          <div className="metric-description">Average time on site this week</div>
        </div>
        {/* Metric Card 2: Instant Summaries & Q&A */}
        <div className="metric-card">
          <h3>Instant Summaries & Q&A</h3>
          <div className="metric-value">
            15% lower
            <span className="icon" style={{ color: '#F44336' }}>↓</span>
          </div>
          <div className="metric-description">Reduced bounce rate across key articles</div>
        </div>
        {/* Metric Card 3: Content Insights */}
        <div className="metric-card">
          <h3>Content Insights</h3>
          <div className="metric-value">
            20% more clicks
            <span className="icon" style={{ color: '#4CAF50' }}>↑</span>
          </div>
          <div className="metric-description">To related articles via chatbot</div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
