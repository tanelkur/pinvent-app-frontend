import React, { useEffect, useState } from "react";
import "./Profile.scss";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { useDispatch } from "react-redux";
import { getUserProfile } from "../../services/authService";
import { SET_USER } from "../../redux/features/auth/authSlice";
import { SET_NAME } from "../../redux/features/auth/authSlice";
import { SpinnerImage } from "../../components/loader/Loader";
import Card from "../../components/card/Card";
import { Link } from "react-router-dom";

const Profile = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function getUserData() {
      const data = await getUserProfile();
      setProfile(data);
      setIsLoading(false);
      await dispatch(SET_USER(data));
      await dispatch(SET_NAME(data.name));
    }
    getUserData();
  }, [dispatch]);

  return (
    <div className="profile --my2">
      {isLoading && <SpinnerImage />}
      <>
        {!isLoading && profile === null ? (
          <p>Something went wrong</p>
        ) : (
          <Card cardClass={"card --flex-dir-column"}>
            <span className="profile-photo">
              <img src={profile?.photo} alt="Profile" />
            </span>
            <span className="profile-data">
              <p>
                <b>Name:</b> {profile?.name}
              </p>
              <p>
                <b>Email:</b> {profile?.email}
              </p>
              <p>
                <b>Phone:</b> {profile?.phone}
              </p>
              <p>
                <b>Bio:</b> {profile?.bio}
              </p>
              <div>
                <Link to="/edit-profile">
                  <button className="--btn --btn-primary">Edit Profile</button>
                </Link>
              </div>
            </span>
          </Card>
        )}
      </>
    </div>
  );
};

export default Profile;
