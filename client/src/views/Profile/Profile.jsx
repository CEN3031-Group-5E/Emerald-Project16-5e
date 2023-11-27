import "./Profile.less";

import { useParams } from 'react-router-dom';
import { server } from "../../Utils/hosts";
import React, { Fragment, useEffect, useState, useRef } from "react";
import ProfileCard from "../../components/Profile/ProfileCard";
import ProgressBar from "../../components/Profile/ProgressBar";
import NavBar from "../../components/NavBar/NavBar";
import ProjectSection from "../../components/Profile/ProjectSection";
import BadgeTable from "../../components/Profile/BadgeTable";
import BadgeDisplay from "../../components/Profile/BadgeDisplay";
import { getBadges, getProfile, updateProfile } from "../../Utils/requests";

const defaultProfileImageUrl = "/images/default_profile.png"

const Profile = () => {
  const params = useParams();
  let userId = params.userId;
  let isStudent = Boolean(JSON.parse(params.isStudent ?? "false"));
  const loggedInUser = JSON.parse(sessionStorage.getItem('user'));

  if (!userId) {
    // Parameters aren't provided, use current user
    userId = String(loggedInUser.id);
    isStudent = Boolean(loggedInUser.isStudent);
  }

  const [pageData, setPageData] = useState({
    status: "loading",
  });

  const fetchPageData = async () => {
    try {
      const getProfileResponse = await getProfile(userId, isStudent);
      const getBadgesResponse = await getBadges();
      const newPageData = {
        status: "loaded",
        profileImage: `${server}${getProfileResponse.data.profile.profileImage?.url}` ?? defaultProfileImageUrl,
        biography: getProfileResponse.data.profile.biography ?? "User does not have a biography...",
        badges: getBadgesResponse.data,
      }
      //log of badges
      console.log(getBadgesResponse.data);

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
    fetchPageData();
  }, []);

  const [newBio, setNewBio] = useState("");
  const [isEditingBio, setIsEditingBio] = useState(false);

  const selectImageButtonRef = useRef();
  const [isEditingProfileImage, setIsEditingProfileImage] = useState(false);

  const [selectedBadges, setSelectedBadges] = useState([1, 2, 3, 4]);
  //const [isEditingBadges, setIsEditingBadges] = useState(null);
  const [badgeProgress, setBadgeProgress] = useState([
    { id: 1, progress: 100, name: "1 Month", imageUrl: "https://cdn.discordapp.com/attachments/1163871478014554142/1178351638906408991/1monthbadge.png?ex=6575d47b&is=65635f7b&hm=78777dc5a28d30c57f9226676ea84f9786718b3911207216789be238e8e1b94d&" },
    { id: 2, progress: 33.33, name: "3 Month", imageUrl: "https://cdn.discordapp.com/attachments/1163871478014554142/1178351637799129108/3monthbadge.png?ex=6575d47b&is=65635f7b&hm=b98a59f95dfa3f8d5578fcf27f9d7e4766a0cd6ed9722de0592eeda54cb52f93&" },
    { id: 3, progress: 16.67, name: "6 Month", imageUrl: "https://cdn.discordapp.com/attachments/1163871478014554142/1178351637404856330/6monthbadge.png?ex=6575d47b&is=65635f7b&hm=a1d8c52aee335fdabba01dbab3164884aeb00f90a2d1904a0a9ce1ce2425a82a&" },
    { id: 4, progress: 8.33, name: "1 Year", imageUrl: "https://cdn.discordapp.com/attachments/1163871478014554142/1178351637119635528/1yearbadge.png?ex=6575d47b&is=65635f7b&hm=39c8a82d57730cf9b53140a332b9dfad2027921c37ff19b36b30373f5ea6f945&" },
    { id: 5, progress: 4.167, name: "2 Year", imageUrl: "https://cdn.discordapp.com/attachments/1163871478014554142/1178351636851216425/2yearbadge.png?ex=6575d47a&is=65635f7a&hm=92f19b1f5400a3b8b539d5c05262601f7d51d34c3a2cc3b9c6223def0e3ff804&" },
    { id: 6, progress: 2.78, name: "3+ Years", imageUrl: "https://cdn.discordapp.com/attachments/1163871478014554142/1178351636565995520/3yearbadge.png?ex=6575d47a&is=65635f7a&hm=e08d34ac60519331baa525a21d65ea761d6a55319569965178d46fd963d7e4c3&" },
    { id: 7, progress: 100, name: "50 Likes/Views", imageUrl: "https://cdn.discordapp.com/attachments/1163871478014554142/1178372577803116614/50likesbadge.png?ex=6575e7fb&is=656372fb&hm=0efd9b56e2bbf25977b6a6cc0147190403ba43717ad64a398ede7719065e4877&" },
    { id: 8, progress: 50, name: "100 Likes/Views", imageUrl: "https://cdn.discordapp.com/attachments/1163871478014554142/1178372577450790953/100likesbadge.png?ex=6575e7fb&is=656372fb&hm=9258818704392822315c9cee9c725ec0e0d3d9551c50635b7e9b36a382e49314&" },
    { id: 9, progress: 20, name: "250 Likes/Views", imageUrl: "https://cdn.discordapp.com/attachments/1163871478014554142/1178372577085898862/250likesbadge.png?ex=6575e7fb&is=656372fb&hm=35067678501562adf8f53d34e28934130338ce31de8474a1aba1cc58d7a52d89&" },
    { id: 10, progress: 10, name: "500 Likes/Views", imageUrl: "https://cdn.discordapp.com/attachments/1163871478014554142/1178372576737759293/500likebadge.png?ex=6575e7fb&is=656372fb&hm=7881b6ef5569f0607b3dbd5e6568d2501b3159f75f0478b18c9ca960d2e7871c&" },
    { id: 11, progress: 5, name: "1000 Likes/Views", imageUrl: "https://cdn.discordapp.com/attachments/1163871478014554142/1178372576104423484/1000likesbadge.png?ex=6575e7fb&is=656372fb&hm=4ad75f9b3956340cd0bdd84a607f7f552699fe45ffb79c0764a85a4f4aca18ad&" },

  ]);
  const [isEditingBadges, setIsEditingBadges] = useState(null);

  const renderBadgeDisplays = () => {
    return badgeProgress
      .filter(badge => badge.progress < 100)
      .map(badge => (
        <BadgeDisplay
          key={badge.id}
          imageUrl={badge.imageUrl}
          name={badge.name}
          progressPercent={badge.progress}
        />
      ));
  };

  const renderFullyAchievedBadges = () => {
    return badgeProgress
      .filter(badge => badge.progress === 100)
      .map(badge => (
        <BadgeDisplay
          key={badge.id}
          imageUrl={badge.imageUrl}
          name={badge.name}
          progressPercent={badge.progress}
        />
      ));
  }

  return (
    <div className='profile-page-grid nav-padding'>
      <NavBar />
      <ProfileCard
        imageUrl={pageData.profileImage}
        name={pageData.name}
        role={pageData.role}
        editButton={(
          <>
            {isOwnProfile && (
              isEditingProfileImage ? (
                <form
                  className={"profile-edit-profile-image-form"}
                  onSubmit={(e) => {
                    e.preventDefault();

                    setIsEditingProfileImage(false);

                    const rawFormData = new FormData(e.target);
                    const profileImage = rawFormData.get("profileImage");
                    if (profileImage.size === 0) {
                      return;
                    }

                    const data = new FormData();
                    data.append("data", "{}")
                    data.append("files.profileImage", profileImage)

                    updateProfile(userId, isStudent, data)
                      .then(() => {
                        fetchPageData();
                      });
                  }
                }>
                  <div>
                    <button
                      className={"profile-page-round profile-page-item-border profile-page-button"}
                      type={"button"}
                      onClick={() => {
                        selectImageButtonRef.current.click();
                      }}
                    >
                      Select Image
                    </button>
                    <input
                      ref={selectImageButtonRef}
                      name={"profileImage"} type={"file"}
                    />
                  </div>
                  <div>
                    <button
                      className={"profile-page-round profile-page-item-border profile-page-button"}
                      type={"submit"}
                      onClick={() => {
                        setIsEditingProfileImage(false);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className={"profile-page-round profile-page-item-border profile-page-button"}
                      type={"submit"}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  className={"profile-page-round profile-page-item-border profile-page-button"}
                  onClick={() => {
                    setIsEditingProfileImage(true);
                  }}
                >
                  Edit
                </button>
              )
            )}
          </>
        )}
      />
      <div className="profile-biography-section profile-page-section">
        <h2>User Biography</h2>
        {isEditingBio ? (
          <form
            className={"profile-edit-biography-form"}
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <textarea
              className={"profile-page-item-border profile-page-round"}
              value={newBio}
              onChange={(e) => {
                setNewBio(e.target.value)
              }}
              rows="4"
              cols="50"
            />
            <div>
              {/* Cancel */}
              <button
                className={"profile-page-round profile-page-item-border profile-page-button"}
                type={"button"}
                onClick={() => {
                  setIsEditingBio(false);
                }
                }>
                Cancel
              </button>
              {/* Save */}
              <button
                className={"profile-page-round profile-page-item-border profile-page-button"}
                type={"button"}
                onClick={() => {
                  setIsEditingBio(false);

                  updateProfile(userId, isStudent, {
                    biography: newBio,
                  }).then(() => {
                    fetchPageData();
                  });
                }
                }>
                Save
              </button>
            </div>
          </form>
        ) : (
          <div>
            <p>{pageData.biography}</p>
            {/* Edit */}
            {isOwnProfile && (
              <button
                className={"profile-page-round profile-page-item-border profile-page-button"}
                onClick={() => {
                  setIsEditingBio(true);
                  setNewBio(pageData.biography);
                }
              }>
                Edit
              </button>
            )}
          </div>
        )}
      </div>
      <div className='profile-badge-display profile-page-section'>
        <h2>Badge Display</h2>
        <div className='profile-badge-display-container nav-padding'>
          {renderFullyAchievedBadges()}
        </div>
      </div>
      <ProjectSection/>
      <div className='profile-available-badges profile-page-section'>
        <h2>Available Badges</h2>
        <div className='profile-badge-display-container'>
          {renderBadgeDisplays()}
        </div>
      </div>

    </div>
  );
};

export default Profile;
