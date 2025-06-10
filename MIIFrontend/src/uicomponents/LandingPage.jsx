import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="overlay">
        <div className="content">
          <h1>Welcome To Medi-Caps University Mentor - Mentee Portal</h1>
          <p>
            Empowering growth through meaningful connections - where mentors guide and mentees thrive.
            Unlock your potential with personalized mentorship that inspires success.
          </p>
          <button className="login-button">Login</button>
        </div>
      </div>
      {/* Image positioned at the bottom right */}
      <img src={require('../assets/student_medicaps.png')} alt="Medi-Caps" className="bottom-right-image" />
    </div>
  );
};

export default LandingPage;
