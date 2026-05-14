# CareerCraft - AI Resume Builder

CareerCraft is a full-stack AI-powered resume builder built with the MERN stack. It helps users create professional resumes, improve resume content with AI, upload an existing PDF resume for data extraction, customize templates and colors, share public resume links, and download resumes in PDF or MS Word format.

The app is designed for students, freshers, job seekers, and professionals who need a clean, customizable, ATS-friendly resume builder.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Installation](#installation)
- [Run Locally](#run-locally)
- [Available Scripts](#available-scripts)
- [API Overview](#api-overview)
- [Resume Builder Sections](#resume-builder-sections)
- [Export Options](#export-options)
- [AI Features](#ai-features)
- [Deployment Notes](#deployment-notes)

## Features

### Core Resume Builder

- Create new resumes from scratch.
- Upload existing PDF resumes and extract resume data using AI.
- Edit resume title.
- Delete resumes.
- Save resume changes to MongoDB.
- Live resume preview while editing.
- Multiple resume templates.
- Custom resume accent color.
- Public/private resume visibility.
- Share public resume link.
- Download resume as PDF.
- Download resume as MS Word `.docx`.

### Resume Content Sections

- Personal information.
- Professional summary.
- Work experience.
- Education.
- Projects.
- Skills.
- Certifications.
- Additional custom sections.

### Additional Sections Support

Users can add extra resume sections for real-world resume needs:

- Languages.
- Awards.
- Achievements.
- Interests.
- References.
- Any custom section title.
- Multiple items inside each custom section.

### AI-Powered Features

- Enhance professional summary.
- Enhance job descriptions.
- Extract resume data from uploaded PDF text.
- Uses Groq SDK for AI chat completions.
- Supports Groq env variables with fallback support for older OpenAI-style env names.

### Template and Design Features

- Multiple resume templates:
  - Classic.
  - Modern.
  - Minimal Image.
  - Minimal.
  - Minimalist.
  - Creative Visual.
  - Modern Pro.
  - Corporate ATS.
- Brand color: `#8e51ff`.
- 10 preset accent colors.
- Custom hex color input.
- Native color picker support.
- Responsive landing page.
- Updated dashboard UI.
- Updated header/navbar UI.
- Trusted logo section on landing page.

### Authentication and User Flow

- User registration.
- User login.
- JWT-based authentication.
- Protected dashboard and builder routes.
- User-specific resume storage.

### File and Media Support

- PDF upload for resume parsing.
- Profile image upload.
- Optional background removal for uploaded profile image.
- ImageKit integration for image hosting.

## Tech Stack

### Frontend

- React 19.
- Vite.
- Tailwind CSS 4.
- React Router DOM.
- Redux Toolkit.
- React Redux.
- Axios.
- Lucide React.
- React Hot Toast.
- React PDF to Text.
- docx.
- file-saver.

### Backend

- Node.js.
- Express.js.
- MongoDB.
- Mongoose.
- JWT.
- bcrypt.
- CORS.
- dotenv.
- Multer.
- ImageKit Node SDK.
- Groq SDK.
- Nodemon.

### Database and Services

- MongoDB Atlas or local MongoDB.
- ImageKit for image upload/storage.
- Groq for AI resume assistance.

## Project Structure

```txt
Resume-Builder/
├─ backend/
│  ├─ configs/
│  │  ├─ ai.js
│  │  ├─ db.js
│  │  ├─ imageKit.js
│  │  └─ multer.js
│  ├─ controllers/
│  │  ├─ aiController.js
│  │  ├─ resumeController.js
│  │  └─ userController.js
│  ├─ middlewares/
│  │  └─ authMiddleware.js
│  ├─ models/
│  │  ├─ Resume.js
│  │  └─ User.js
│  ├─ routes/
│  │  ├─ aiRoutes.js
│  │  ├─ resumeRoutes.js
│  │  └─ userRoutes.js
│  ├─ .env
│  ├─ package.json
│  └─ server.js
├─ frontend/
│  ├─ public/
│  ├─ src/
│  │  ├─ app/
│  │  ├─ assets/
│  │  │  └─ templates/
│  │  ├─ components/
│  │  │  ├─ home/
│  │  │  └─ *.jsx
│  │  ├─ configs/
│  │  │  └─ api.js
│  │  ├─ pages/
│  │  ├─ utils/
│  │  │  └─ exportResume.js
│  │  ├─ App.jsx
│  │  ├─ index.css
│  │  └─ main.jsx
│  ├─ .env
│  ├─ package.json
│  └─ vite.config.js
└─ README.md
```

## Environment Variables

### Backend `.env`

Create a `.env` file inside the `backend` folder.

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint

GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=openai/gpt-oss-120b
```

The backend currently also supports older fallback names:

```env
OPENAI_API_KEY=your_groq_api_key
OPENAI_BASE_URL=https://api.groq.com/openai/v1
OPENAI_MODEL=openai/gpt-oss-120b
```

Recommended names for new setup are `GROQ_API_KEY` and `GROQ_MODEL`.

### Frontend `.env`

Create a `.env` file inside the `frontend` folder.

```env
VITE_BASE_URL=http://localhost:3000
```

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd Resume-Builder
```

Install backend dependencies:

```bash
cd backend
npm install
```

Install frontend dependencies:

```bash
cd ../frontend
npm install
```

## Run Locally

Start the backend server:

```bash
cd backend
npm run server
```

Start the frontend dev server:

```bash
cd frontend
npm run dev
```

Default local URLs:

```txt
Frontend: http://localhost:5173
Backend:  http://localhost:3000
```

## Available Scripts

### Frontend

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

### Backend

```bash
npm run server
npm start
```

## API Overview

### User Routes

Base path:

```txt
/api/users
```

Endpoints:

```txt
POST /api/users/register
POST /api/users/login
GET  /api/users/data
GET  /api/users/resumes
```

### Resume Routes

Base path:

```txt
/api/resumes
```

Endpoints:

```txt
POST   /api/resumes/create
GET    /api/resumes/get/:resumeId
GET    /api/resumes/public/:resumeId
PUT    /api/resumes/update
DELETE /api/resumes/delete/:resumeId
```

### AI Routes

Base path:

```txt
/api/ai
```

Endpoints:

```txt
POST /api/ai/enhance-pro-sum
POST /api/ai/enhance-job-desc
POST /api/ai/upload-resume
```

## Resume Builder Sections

The resume builder supports structured data for:

- Personal info:
  - Full name.
  - Profession.
  - Email.
  - Phone.
  - Location.
  - LinkedIn.
  - GitHub.
  - Website.
  - Profile image.
- Professional summary.
- Experience:
  - Company.
  - Position.
  - Start date.
  - End date.
  - Current role.
  - Description.
- Education:
  - Institution.
  - Degree.
  - Field.
  - Graduation date.
  - GPA.
- Projects:
  - Name.
  - Type.
  - Link.
  - Description.
- Skills.
- Certifications:
  - Certificate name.
  - Issuer.
  - Issue date.
  - Credential URL.
  - Description.
- Additional sections:
  - Section title.
  - Item title.
  - Description.
  - Date or level.

## Export Options

### PDF Export

PDF export uses the browser print flow instead of converting the resume into an image. This keeps the PDF text selectable and sharper when zooming.

To export:

1. Click `Download`.
2. Select `PDF`.
3. In the browser print dialog, choose `Save as PDF`.

### MS Word Export

The app can generate a real `.docx` file from the resume data.

To export:

1. Click `Download`.
2. Select `MS Word (.docx)`.
3. The Word file downloads automatically.

## AI Features

The AI features are powered by Groq:

- Professional summary enhancement.
- Job description enhancement.
- Resume PDF text extraction into structured resume fields.

The backend AI client is configured in:

```txt
backend/configs/ai.js
```

AI controllers are handled in:

```txt
backend/controllers/aiController.js
```

## Deployment Notes

For production deployment:

- Set all backend environment variables on the backend hosting platform.
- Set `VITE_BASE_URL` in the frontend hosting platform to the deployed backend URL.
- Make sure CORS allows requests from the deployed frontend domain.
- Use MongoDB Atlas for production database hosting.
- Use ImageKit credentials for profile image upload.
- Use a valid Groq API key and model name.

## Build Checks

Frontend production build:

```bash
cd frontend
npm run build
```

Frontend lint:

```bash
cd frontend
npm run lint
```

Backend start:

```bash
cd backend
npm start
```

## Notes

- PDF export is text-based through browser printing, not image-based.
- Word export is generated from structured resume data.
- The app uses JWT authentication, so protected API routes require an authorization token.
- Existing resumes without `additional_sections` still work because the frontend falls back to empty arrays.
- For Groq model errors, confirm the model name in `.env` is available for your Groq account and does not include extra quotes.

