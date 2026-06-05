# GitHub Explorer

A modern GitHub profile and repository explorer built with React, Express, and the GitHub API.

## Features

- Search GitHub users by username
- View user profile information
  - Avatar
  - Name
  - Bio
  - Followers
  - Following
  - Public repositories
- Browse repositories
- Sort repositories by:
  - Stars
  - Name
  - Last Updated
- Responsive dark-themed UI
- Error handling for invalid usernames

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Axios
- React Icons

### Backend
- Node.js
- Express.js

### API
- GitHub REST API

## Installation

### Clone the repository

```bash
git clone https://github.com/priyanshupundir/github-explorer.git
cd github-explorer
```

### Install frontend dependencies

```bash
cd client
npm install
```

### Install backend dependencies

```bash
cd ../server
npm install
```

### Run the backend

```bash
npm start
```

### Run the frontend

```bash
cd ../client
npm run dev
```

## Project Structure

```text
github-explorer/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── utils/
│   │   └── App.jsx
│
├── server/
│   ├── routes/
│   └── server.js
│
└── README.md
```

## API Endpoint

```http
GET /api/github/:username
```

Returns:

```json
{
  "user": {},
  "repos": []
}
```

## Future Improvements

- Server-side caching
- Repository pagination
- Language statistics charts
- Recently searched users
- Repository detail expansion

## Author

Priyanshu Pundir

GitHub: https://github.com/priyanshupundir