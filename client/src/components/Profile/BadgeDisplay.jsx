import React, { useState } from 'react';
import Badge from './Badge';
import './BadgeDisplay.less'; // Make sure to adjust the path based on your project structure

const BadgeDisplay = ({ imageUrl, name, progressPercent }) => {
  const [buttonText, setButtonText] = useState('Remove');
  const [buttonHeight, setButtonHeight] = useState(40); // Initial button height
  const [showBadge, setShowBadge] = useState(true);

  const toggleTextAndBadge = () => {
    setButtonText((prevText) => (prevText === 'Remove' ? 'Add' : 'Remove'));
    setButtonHeight((prevHeight) => (prevHeight === 40 ? 268 : 40)); // Adjust height based on text change
    setShowBadge((prevShowBadge) => !prevShowBadge); // Toggle the visibility of the Badge
  };

  return (
    <div className='badge-display-container'>
      {showBadge && ( // Conditionally render Badge based on showBadge state
        <div className='badge-display-slot badge-display-item-border badge-display-round-large'>
          <Badge imageUrl={imageUrl} name={name} progressPercent={progressPercent} />
        </div>
      )}

      <button
        className='btn'
        onClick={toggleTextAndBadge}
        style={{ height: buttonHeight + 'px' }} // Apply height dynamically
      >
        {buttonText}
      </button>
    </div>
  );
};

export default BadgeDisplay;