import React from "react";
import Image from "next/image";
import { User, UserSleepMarker } from "@/lib/definitions";
import { fetchUserSleepData, fetchUserById } from "@/utils/api";
import { notFound } from "next/navigation";
import { getInitials, getColorFromInitials } from "@/utils/getInitials";
import SleepDataTable from "@/components/SleepDataTable";

interface UserPageProps {
  params: { id: string };
}

const UserPage: React.FC<UserPageProps> = async ({ params }) => {
  const userId = params.id;
  const decodedUserId = decodeURIComponent(userId);

  try {
    const user: User | null = await fetchUserById(decodedUserId);
    if (!user) {
      throw new Error("User not found");
    }

    const sleepData: UserSleepMarker[] = await fetchUserSleepData(decodedUserId);

    const initials = getInitials(user.UserName);
    const backgroundColor = getColorFromInitials(initials);

    return (
      <div className="container">
        <div className="row">
          <div className="profile-nav col-md-3 text-center">
            <div className="panel">
              <div className="user-heading">
                <div
                  style={{
                    width: "75px",
                    height: "75px",
                    borderRadius: "50%",
                    backgroundColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "24px",
                    fontWeight: "bold",
                    margin: "0 auto 5px",
                  }}
                >
                  {initials}
                </div>
                <h4 className="mb-0">{user.UserName}</h4>
                <p>
                  {user.UserID} . {user.DeviceCompany}
                </p>
              </div>
            </div>
          </div>
          <SleepDataTable sleepData={sleepData} />
        </div>
      </div>
    );
  } catch (error) {
    notFound(); // Render a 404 page if an error occurs
  }
};

export default UserPage;
