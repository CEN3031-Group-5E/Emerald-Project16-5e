import "./Profile.less";
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import ProfileCard from "../../components/Profile/ProfileCard";
import Badge from "../../components/Profile/Badge";
import ProgressBar from "../../components/Profile/ProgressBar";
import NavBar from "../../components/NavBar/NavBar";
import ProjectSection from "../../components/Profile/ProjectSection";
import BadgeTable from "../../components/Profile/BadgeTable";
import BadgeDisplay from "../../components/Profile/BadgeDisplay";
import { getProfile } from "../../Utils/requests";

const Profile = () => {
  //const userId = 55; // Todo Get from url params
  //const isStudent = true; // Todo Get from url params
  const { userId, isStudent } = useParams();

  const [pageData, setPageData] = useState({
    status: "loading",
  });

  const refreshPageData = async () => {
    try {
      const getProfileResponse = await getProfile(userId, isStudent);
      const newPageData = {
        status: "loaded",
        profileImage: "https://media.discordapp.net/attachments/517010400860962831/1171160597463838840/image.png",
      }

      if (getProfileResponse.data.profile.type === "user") {
        newPageData.name = getProfileResponse.data.profile.user.username;
        newPageData.role = getProfileResponse.data.profile.user.role.name;
      } else {
        newPageData.name = getProfileResponse.data.profile.student.name;
        newPageData.role = "Student";
      }

      setPageData(newPageData);
    } catch (e) {
      setPageData({
        status: "errored",
        error: e,
      })
    }
  }

  useEffect(() => {
    refreshPageData();
  }, [userId, isStudent]);

  const [bio, setBio] = useState('Your bio text goes here');
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [selectedBadges, setSelectedBadges] = useState([1, 2, 3, 4]);
  const [isEditingBadges, setIsEditingBadges] = useState(null);

  const handleBioEdit = () => {
    setIsEditingBio(true);
  };

  const handleBioSave = () => {
    setIsEditingBio(false);
    // You can save the updated bio to your backend or state management system here
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleBadgeEdit = (badgeIndex) => {
    // Toggle the editing state for the selected badge
    setIsEditingBadges(badgeIndex);
  };

  const handleBadgeSave = (badgeIndex, newBadgeID) => {
    // Save the changes and update the selected badge
    setSelectedBadges((prevBadges) => {
      const updatedBadges = [...prevBadges];
      updatedBadges[badgeIndex] = newBadgeID;
      return updatedBadges;
    });
    setIsEditingBadges(null);
  };

  return (
    <div className='profile-page-grid nav-padding'>
      <NavBar />
      <ProfileCard
        imageUrl={pageData.profileImage}
        name={pageData.name}
        role={pageData.role}
      />
      <div className="profile-biography-section profile-page-section">
        <h2>User Biography</h2>
        {isEditingBio ? (
          <div>
            <textarea
              value={bio}
              onChange={handleBioChange}
              rows="4"
              cols="50"
            />
            <button onClick={handleBioSave}>Done</button>
          </div>
        ) : (
          <div>
            <p>{bio}</p>
            <button onClick={handleBioEdit}>Edit</button>
          </div>
        )}
      </div>
      <div className='profile-badge-display profile-page-section'>
        <h2>Badge Display</h2>
        <div className='profile-badge-display-container nav-padding'>
        
        <BadgeDisplay />
        <BadgeDisplay />
        <BadgeDisplay />

        </div>
      </div>
      <ProjectSection/>
      <div className='profile-available-badges profile-page-section'>
        <h2>Available Badges</h2>
        <div>
          <ProgressBar progress={20} />
          <ProgressBar progress={50} />
          <ProgressBar progress={90} />
        

        </div>

        <div className='badge-table'>
          <BadgeTable />
        </div>
      </div>
    </div>
  )
}

export default Profile;
