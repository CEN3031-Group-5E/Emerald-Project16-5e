import "./BadgeDisplay.less";
import Badge from "./Badge";

const BadgeDisplay = ({ imageUrl, name, progressPercent}) => {
  return (
    <div class='badge-display-container'>
        <div class='badge-display-slot badge-display-item-border badge-display-round-large'>
            <Badge 
                //imageUrl={"https://media.discordapp.net/attachments/517010400860962831/1171160597463838840/image.png"}
                //name={"Complete 100 Python exercises"}
                imageUrl = {imageUrl}
                name = {name}
                progressPercent={progressPercent} 
            />

            
        </div>
        <h3 class='profile-badge-display-change-button badge-display-round-large badge-display-item-border'>Change</h3>
    </div>
  )
}

export default BadgeDisplay;
