Healthcare App to show user's Sleep pattern and health analysis.


## Notes

Records which Awake, Light and Deep aren't numbers, such as NaN is removed. Example: https://exam-vitalz-backend-8267f8929b82.herokuapp.com/api/getUserSleepMarker?userID=E2%3A90%3A00%3A00%3A07%3A22
```
{
    "HRVDate": "2024-04-30",
    "SleepOnset": "2024-04-29T16:16:00.000Z",
    "WakeUpTime": "2024-04-29T22:59:59.000Z",
    "Awake": "NaN",
    "Light": "NaN",
    "Deep": "NaN"
},
```
## To-dos

- Date range selectors.
- Pie chart to display how many % of the time a selected user spent sleeping for 7 hours or more, 5-6 hours, 4-5 hours and under 5 hours within the selected date range.

## Requirements

- Node.js version >= v18.17.0 is required.
- Requires the following API endpoints for data. Should the endpoints cease to function, static data will be read from json in the *data folder*.
    1. https://exam-vitalz-backend-8267f8929b82.herokuapp.com
    2. https://exam-vitalz-backend-8267f8929b82.herokuapp.com/api/getUserList
    3. https://exam-vitalz-backend-8267f8929b82.herokuapp.com/api/getUserSleepMarker?userID=111156974
    4. https://exam-vitalz-backend-8267f8929b82.herokuapp.com/api/getUserAnalysis?userID=111156974



## Getting Started

Install Dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the front page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/dnvmocs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

