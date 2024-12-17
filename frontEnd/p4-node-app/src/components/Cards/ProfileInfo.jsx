import React from "react";
import { getInitials } from "../../utils/helper";

const ProfileInfo = ({ userInfo, onLogout }) => {
  return (
    userInfo && (
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-white">
          {getInitials(userInfo ? userInfo.fullName : "")}
        </div>

        <div>
          <p className="text-sm text-white font-medium">{userInfo.fullName || ""}</p>
          <button
            className="text-sm text-white underline"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </div>
    )
  );
};

export default ProfileInfo;
