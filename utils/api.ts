export async function fetchUserList() {
  const res = await fetch(
    "https://exam-vitalz-backend-8267f8929b82.herokuapp.com/api/getUserList"
  );
  return res.json();
}

//   [
//     {
//     "UserName": "Lew hon Kean",
//     "UserID": "E2:90:00:00:07:22",
//     "DeviceCompany": "SBRing"
//     },
//     {
//     "UserName": "Ming Teck Lim",
//     "UserID": "121166543",
//     "DeviceCompany": "JCRing"
//     }
//     ]

export async function fetchUserAnalysis(userID: string) {
  const res = await fetch(
    `https://exam-vitalz-backend-8267f8929b82.herokuapp.com/api/getUserAnalysis?userID=${userID}`
  );
  return res.json();
}

//   [
//     {
//     "HRVDate": "2024-06-20",
//     "VitalzScore": "56.75675675675675675700",
//     "ScoreType": "MildStress",
//     "StressorIndex": "40"
//     },
//     {
//     "HRVDate": "2024-06-19",
//     "VitalzScore": "45.94594594594594594600",
//     "ScoreType": "MildStress",
//     "StressorIndex": "18"
//     },
//     {
//     "HRVDate": "2024-06-18",
//     "VitalzScore": "56.75675675675675675700",
//     "ScoreType": "MildStress",
//     "StressorIndex": "59"
//     },
// ...
//]

export async function fetchUserSleepData(userID: string) {
  const res = await fetch(
    `https://exam-vitalz-backend-8267f8929b82.herokuapp.com/api/getUserSleepMarker?userID=${userID}`
  );
  return res.json();
}

//   [
//     {
//     "HRVDate": "2024-05-05",
//     "SleepOnset": "2024-05-04T16:36:01.000Z",
//     "WakeUpTime": "2024-05-04T23:26:04.000Z",
//     "Awake": "20",
//     "Light": "52",
//     "Deep": "27"
//     },
//     {
//     "HRVDate": "2024-05-18",
//     "SleepOnset": "2024-05-17T15:59:01.000Z",
//     "WakeUpTime": "2024-05-17T22:57:59.000Z",
//     "Awake": "20",
//     "Light": "53",
//     "Deep": "26"
//     },
//     ...
//   ]
