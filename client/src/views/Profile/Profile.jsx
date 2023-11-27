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
import { getProfile, updateProfile } from "../../Utils/requests";

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
    fetchPageData();
  }, []);

  const [newBio, setNewBio] = useState("");
  const [isEditingBio, setIsEditingBio] = useState(false);

  const selectImageButtonRef = useRef();
  const [isEditingProfileImage, setIsEditingProfileImage] = useState(false);

  const [selectedBadges, setSelectedBadges] = useState([1, 2, 3, 4]);
  const [isEditingBadges, setIsEditingBadges] = useState(null);

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
