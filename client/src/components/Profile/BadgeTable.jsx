  import React from 'react';
  import Badge from './Badge';
  import './BadgeTable.less';
  import ProgressBar from './ProgressBar';

  // Component to display a table of badges
  const BadgeTable = ({ badgeProgress }) => {
    const inProgressBadges = badgeProgress.filter(badge => badge.progress < 100);

    // Define the number of rows and columns for the badge table
   // const numRows = 4;
    //const numColumns = 4;
    const numRows = 4; 
    const numColumns = Math.ceil(inProgressBadges.length / numRows);
    

    // Create a 2D array to represent the badge data in rows and columns
    const data = Array.from({ length: numRows }, () =>
      Array.from({ length: numColumns }, () => 'Badge')
    );

    return (
      // Render the grid table
      <div className="grid-table">
        {/*{data.map((row, rowIndex) =>
          row.map((cell, cellIndex) => (
            <div className="grid-cell " key={`cell-${rowIndex}-${cellIndex}`}>
              <Badge 
                  imageUrl={"https://media.discordapp.net/attachments/517010400860962831/1171160597463838840/image.png"}
                  name={"Complete 100 Python exercises"}
                  progressPercent={100}  
              />
            </div>
          ))
        )}*/}
        {Array.from({ length: numRows }, (_, rowIndex) =>
          Array.from({ length: numColumns }, (_, colIndex) => {
            const badgeIndex = rowIndex * numColumns + colIndex;
            const badge = inProgressBadges[badgeIndex];

            return badge ? (
              <div className="grid-cell" key={`cell-${rowIndex}-${colIndex}`}>
                <Badge 
                  imageUrl={badge.imageUrl}
                  name={badge.name}
                  progressPercent={badge.progress}  
                />
                <ProgressBar progress={badge.progress} />
              </div>
            ) : null;
          })
        )}
      </div>
    );
  };

  export default BadgeTable;
