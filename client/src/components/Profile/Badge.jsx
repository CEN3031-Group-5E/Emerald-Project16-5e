import "./Badge.less";
import ProgressBar from './ProgressBar';


const Badge = ({ imageUrl, name, progressPercent }) => {
  // Interpolate between grayscale and full color based on progressPercent
  const badgeStyle = {
    filter: `grayscale(${100 - progressPercent}%)`,
  };

  return (
    <div className="badge-page-section badge-card">
      <img
        className="badge-card-image badge-page-item-border"
        src={imageUrl}
        style={badgeStyle}
      />
      <div className="badge-card-item badge-page-item-border badge-page-round-large">
        <h1 className="badge-card-name">{name}</h1>
        {progressPercent < 100 && (
          <div className="badge-progress-container">
            <p className="badge-card-role"><span className="bold">Progress: </span>{progressPercent}%</p>
            <ProgressBar progress={progressPercent} />
          </div>
        )}
      </div>
    </div>
  );
  
  
  
}

export default Badge;

