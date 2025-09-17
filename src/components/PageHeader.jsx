import React from 'react';

const PageHeader = ({ onBookDemoClick }) => {
  return (
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
  );
};

export default PageHeader;
