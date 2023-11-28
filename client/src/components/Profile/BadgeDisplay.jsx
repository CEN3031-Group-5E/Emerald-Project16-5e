import "./BadgeDisplay.less";
import Badge from "./Badge";
import { handleBadgeEdit } from "../../views/Profile/Profile";

const BadgeDisplay = () => {
  return (
    <div class='badge-display-container'>
        <div class='badge-display-slot badge-display-item-border badge-display-round-large'>
            <Badge 
                imageUrl={"https://media.discordapp.net/attachments/517010400860962831/1171160597463838840/image.png"}
                name={"Complete 100 Python exercises"}
                progressPercent={99} 
            />
            
        </div>
        <button onClick={handleBadgeEdit}>Change</button>
    </div>
  )
}

export default BadgeDisplay;
