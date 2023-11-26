import "./ProfileCard.less";

const ProfileCard = ({
  editButton,
  imageUrl,
  name,
  role,
}) => {
  return (
    <>
      <div className={"profile-page-section profile-card"}>
        <img
          className={"profile-card-image profile-page-item-border"}
          src={imageUrl}
          alt={`${name}'s profile`}
        />
        {editButton}
        <div className={"profile-card-item profile-page-item-border profile-page-round-large"}>
          <h1 className={"profile-card-name"}>{name}</h1>
        </div>
        <div className={"profile-card-item profile-page-item-border profile-page-round-large"}>
          <p className={"profile-card-role"}><span className={"bold"}>Role: </span>{role}</p>
        </div>
      </div>
    </>
  )
}

export default ProfileCard;
