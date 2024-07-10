// app/user/[id].tsx
import React from "react";
import Image from "next/image";
interface UserSleepMarker {
  HRVDate: string;
  SleepOnset: string;
  WakeUpTime: string;
  Awake: string;
  Light: string;
  Deep: string;
  UserID: string;
}

const userSleepMarker: UserSleepMarker[] = [
  {
    HRVDate: "2024-05-05",
    SleepOnset: "2024-05-04T16:36:01.000Z",
    WakeUpTime: "2024-05-04T23:26:04.000Z",
    Awake: "20",
    Light: "52",
    Deep: "27",
    UserID: "E2:90:00:00:07:22",
  },
  {
    HRVDate: "2024-05-18",
    SleepOnset: "2024-05-17T15:59:01.000Z",
    WakeUpTime: "2024-05-17T22:57:59.000Z",
    Awake: "20",
    Light: "53",
    Deep: "26",
    UserID: "E2:90:00:00:07:22",
  },
  {
    HRVDate: "2024-05-18",
    SleepOnset: "2024-05-17T15:59:01.000Z",
    WakeUpTime: "2024-05-17T22:57:59.000Z",
    Awake: "20",
    Light: "53",
    Deep: "26",
    UserID: "121166543",
  },
];

// Type guard to check if an object is a UserSleepMarker
function isUserSleepMarker(obj: any): obj is UserSleepMarker {
  return (
    typeof obj === "object" &&
    typeof obj.HRVDate === "string" &&
    typeof obj.SleepOnset === "string" &&
    typeof obj.WakeUpTime === "string" &&
    typeof obj.Awake === "string" &&
    typeof obj.Light === "string" &&
    typeof obj.Deep === "string" &&
    typeof obj.UserID === "string"
  );
}


const UserPage = ({ params }: { params: { id: string } }) => {
  const userId = params.id;
  const decodedUserId = decodeURIComponent(params.id);
  
  // Filter and validate sleep data
  const sleepData = userSleepMarker
    .filter((marker) => isUserSleepMarker(marker) && marker.UserID === decodedUserId)
    .map((marker) => marker as UserSleepMarker);


  return (
    <div className="container">
      <div className="row">
        <div className="profile-nav col-md-3 text-center">
          <div className="panel">
            <div className="user-heading">
              <Image
                priority
                src="https://bootdey.com/img/Content/avatar/avatar3.png"
                className="rounded-circle"
                height={75}
                width={75}
                alt=""
              />
              <h1>Camila Smith</h1>
              <p>deydey@theEmail.com</p>
            </div>
          </div>
        </div>
        {/* <h1>User Sleep Data for {decodedUserId}</h1> */}
        <div className="sleepdata-nav col-md-9">
          {sleepData.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">HRV Date</th>
                  {/* <th scope="col">Sleep Onset</th>
                <th scope="col">Wake Up Time</th> */}
                  <th scope="col">Awake</th>
                  <th scope="col">Light</th>
                  <th scope="col">Deep</th>
                </tr>
              </thead>
              <tbody>
                {sleepData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.HRVDate}</td>
                    {/* <td>{new Date(data.SleepOnset).toLocaleString()}</td>
                  <td>{new Date(data.WakeUpTime).toLocaleString()}</td> */}
                    <td>{data.Awake}</td>
                    <td>{data.Light}</td>
                    <td>{data.Deep}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No sleep data available for this user.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
