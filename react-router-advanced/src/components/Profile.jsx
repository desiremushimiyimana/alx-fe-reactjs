import React from "react";
import { Route, Routes, Link } from "react-router-dom";

const ProfileDetails = () => <h2>Profile Details</h2>;
const ProfileSettings = () => <h2>Profile Settings</h2>;

const Profile = () => {
  return (
    <div>
      <h1>Profile</h1>
      <nav>
        <ul>
          <li>
            <Link to="">Details</Link>
          </li>
          <li>
            <Link to="settings">Settings</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="" element={<ProfileDetails />} />
        <Route path="settings" element={<ProfileSettings />} />
      </Routes>
    </div>
  );
};

export default Profile;
