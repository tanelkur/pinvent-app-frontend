import React, { useEffect, useState } from "react";
import "./Profile.scss";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";
import Card from "../../components/card/Card";
import { useNavigate } from "react-router-dom";

import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { toast } from "react-toastify";
import { updateProfile } from "../../services/authService";
import ChangePassword from "../../components/changePassword/ChangePassword";

const EditProfile = () => {
  useRedirectLoggedOutUser("/login");

  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const { email } = user;
  const initialState = {
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    bio: user?.bio,
    photo: user?.photo,
  };
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState(initialState);
  const [profileImage, setProfileImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const saveProfile = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      // Handle image upload
      let imageURL;
      if (
        profileImage &&
        (profileImage.type === "image/jpeg" ||
          profileImage.type === "image/jpg" ||
          profileImage.type === "image/png")
      ) {
        const image = new FormData();
        image.append("file", profileImage);
        image.append("cloud_name", "dir8rxnbp");
        image.append("upload_preset", "n7zcj48y");

        // First upload image to cloudinary
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dir8rxnbp/image/upload",
          { method: "post", body: image }
        );
        const imageData = await response.json();
        imageURL = imageData.url.toString();
      }
      // Save profile
      const formData = {
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        bio: profile.bio,
        photo: profileImage ? imageURL : profile.photo,
      };
      await updateProfile(formData);
      toast.success("Profile changes saved");
      navigate("/profile");

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
      console.log(error.message);
    }
  };

  //If user refreshes page, and we lose redux data
  useEffect(() => {
    if (!email) navigate("/profile");
  }, [email, navigate]);

  return (
    <div className="profile --my2">
      {isLoading && <Loader />}
      <Card cardClass={"card --flex-dir-column"}>
        <span className="profile-photo">
          <img src={user?.photo || ""} alt="Profile" />
        </span>
        <form className="--form-control --m" onSubmit={saveProfile}>
          <span className="profile-data">
            <p>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={profile?.name || ""}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label>Email:</label>
              <input
                type="text"
                name="email"
                value={profile?.email || ""}
                disabled
              />

              <code>Email cannot be changed</code>
            </p>
            <p>
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={profile?.phone || ""}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label>Bio:</label>
              <br />
              <textarea
                name="bio"
                value={profile?.bio || ""}
                onChange={handleInputChange}
                cols="30"
                rows="10"
              ></textarea>
            </p>
            <p>
              <label>Photo:</label>
              <input type="file" name="image" onChange={handleImageChange} />
            </p>
            <div>
              <button type="submit" className="--btn --btn-primary">
                Save Changes
              </button>
            </div>
          </span>
        </form>
      </Card>
      <br />
      <ChangePassword />
    </div>
  );
};

export default EditProfile;
