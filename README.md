Healthcare App to show user's Sleep pattern and health analysis.

## Requirements

- Node.js version >= v18.17.0 is required.
- Requires the following API endpoints for data. Should the endpoints cease to function, use static data by uncommenting the corresponding *CONST*.
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

