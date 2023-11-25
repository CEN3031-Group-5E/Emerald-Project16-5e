import "./Profile.less";

import { server } from '../../Utils/hosts';
import React, { useEffect, useState } from 'react';
import ProfileCard from "../../components/Profile/ProfileCard";
import Badge from "../../components/Profile/Badge";
import ProgressBar from "../../components/Profile/ProgressBar";
import NavBar from "../../components/NavBar/NavBar";
import ProjectSection from "../../components/Profile/ProjectSection";
import BadgeTable from "../../components/Profile/BadgeTable";
import BadgeDisplay from "../../components/Profile/BadgeDisplay";
import { getProfile } from "../../Utils/requests";

const defaultProfileImageUrl = "/images/default_profile.png"

const Profile = () => {
  const userId = 1; // Todo Get from url params
  const isStudent = false; // Todo Get from url params
  const isOwnProfile = true; // Todo Check if profile belongs to logged in user

  const [pageData, setPageData] = useState({
    status: "loading",
  });

  const refreshPageData = async () => {
    try {
      const getProfileResponse = await getProfile(userId, isStudent);
      const newPageData = {
        status: "loaded",
        profileImage: `${server}${getProfileResponse.data.profile.profileImage?.url}` ?? defaultProfileImageUrl,
        biography: getProfileResponse.data.profile.biography ?? "User does not have a biography..."
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
  }, []);

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
            <button onClick={handleBioSave}>Save</button>
          </div>
        ) : (
          <div>
            <p>{pageData.biography}</p>
            {isOwnProfile && (
              <button onClick={handleBioEdit}>Edit</button>
            )}
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
