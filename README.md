# ACE_CV

ACE_CV is an AI-powered interview preparation platform designed to give you a competitive edge. By analyzing your resume, a target job description, and a brief self-description, it generates a comprehensive, personalized interview strategy to help you practice smarter and interview better.

---

## Features

- **AI-Powered Analysis** — Leverages Google's Gemini AI to analyze your profile against a specific job role.
- **Personalized Interview Report** — Generates a detailed report that includes:
  - **Match Score** — A percentage score indicating how well your profile aligns with the job description.
  - **Technical & Behavioral Questions** — A curated list of potential interview questions, complete with the interviewer's likely intention and model answers.
  - **Skill Gap Analysis** — Identifies key skills you might be missing and categorizes their severity (low, medium, high).
  - **Custom Preparation Plan** — A day-by-day roadmap with actionable tasks to help you prepare effectively.
- **AI Resume Generator** — Creates a professional, ATS-friendly resume in PDF format, tailored specifically to the job you're applying for.
- **User Dashboard** — Securely register and log in to access and review all your previously generated interview plans.

---

## Tech Stack

| Category    | Technology |
|-------------|------------|
| **Frontend** | React, React Router, SASS, Vite, Axios |
| **Backend**  | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **AI**       | Google Gemini API (`@google/genai`) |
| **Auth**     | JSON Web Tokens (JWT), bcryptjs |
| **Utilities**| Multer (file uploads), pdf-parse (PDF reading), Puppeteer (PDF generation) |

---

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

- Node.js (v20.19.0 or later)
- npm (Node Package Manager)
- A MongoDB database instance (local or cloud-based like MongoDB Atlas)
- A Google Gemini API Key

### Installation & Setup

**1. Clone the repository**

```sh
git clone https://github.com/rohit08092005/ACE_CV.git
cd ACE_CV
```

**2. Backend Setup**

Navigate to the `Backend` directory:

```sh
cd Backend
```

Install the dependencies:

```sh
npm install
```

Create a `.env` file in the `Backend` directory and add the following environment variables:

```env
MONGO_URI="your_mongodb_connection_string"
JWT_SECRET="your_jwt_secret_key"
PORT=3000
FRONTEND_URL="http://localhost:5173"
GOOGLE_GENAI_API_KEY="your_gemini_api_key"
```

Start the backend server:

```sh
npm run dev
```

The server will be running on `http://localhost:3000`.

**3. Frontend Setup**

Open a new terminal and navigate to the `Frontend` directory:

```sh
cd Frontend
```

Install the dependencies:

```sh
npm install
```

Create a `.env.local` file in the `Frontend` directory and add the following environment variable to proxy API requests to your backend:

```env
VITE_API_URL="http://localhost:3000"
```

Start the frontend development server:

```sh
npm run dev
```

The application will be available at `http://localhost:5173`.

---

## How It Works

1. **Register/Login** — Create an account or sign in to access the platform.
2. **Provide Input** — On the main page, paste the target job description. Then, either upload your resume (PDF) or write a brief self-description.
3. **Generate Strategy** — Click the **"Generate My Interview Strategy"** button.
4. **Review Report** — The AI processes your inputs and redirects you to a detailed report page, where you'll find your match score, skill gaps, tailored questions, and a preparation roadmap.
5. **Download Resume** — From the report page, download a new, AI-generated resume tailored for the job.
6. **Access History** — Your past interview plans are saved and can be accessed from the homepage.
