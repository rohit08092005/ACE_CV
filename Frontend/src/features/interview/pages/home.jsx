



import React,{useState,useRef} from "react";
import "../style/home.scss";
import{useInterview} from '../hooks/useInterview.js'
import {useNavigate} from 'react-router'
import { useAuth } from '../../auth/hooks/useAuth.js'

const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 B"

    const units = ["B", "KB", "MB", "GB"]
    const unitIndex = Math.floor(Math.log(bytes) / Math.log(1024))
    const size = bytes / (1024 ** unitIndex)

    return `${size.toFixed(unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`
}

const getFileType = (file) => {
    const extension = file.name.split(".").pop()?.toLowerCase()

    if (extension === "pdf") return "PDF Document"

    return file.type || "Document"
}

const Home = () => {
    const {loading, generateReport,reports} = useInterview()
    const { loading: authLoading, handleLogout } = useAuth()
    const[jobDescription, setJobDescription]=useState("")
    const[selfDescription,setSelfDescription]=useState("")
    const [logoutError, setLogoutError] = useState("")
    const [selectedResume, setSelectedResume] = useState(null)
    const resumeInputRef = useRef()

    const navigate = useNavigate()

    const handleGenerateReport = async () =>{
        const data =await generateReport({jobDescription,selfDescription,resumeFile:selectedResume})
        navigate(`/interview/${data._id}`)
        
    }

    const handleResumeChange = (e) => {
        setSelectedResume(e.target.files[0] || null)
    }

    const handleRemoveResume = () => {
        setSelectedResume(null)
        resumeInputRef.current.value = ""
    }

    const handleLogoutClick = async () => {
        setLogoutError("")

        try {
            await handleLogout()
            navigate('/login')
        } catch (error) {
            setLogoutError(error.response?.data?.message || "Unable to log out. Please try again.")
        }
    }

    if(loading){
        return(
            <main className="loading-screen">
            <h1>Loading your interview plan...</h1>
            </main>
        )
    }

  return (
    <main className="home">

      {/* Header */}
      <header className="home-header">
        <div className="home-header__top">
          <h1>ACE_CV</h1>
          <button
            className="button logout-button"
            type="button"
            onClick={handleLogoutClick}
            disabled={authLoading}
          >
            {authLoading ? "Logging out..." : "Logout"}
          </button>
        </div>
         <h2>AI-Powered Interview Preparation</h2>

  <p>
    Upload your resume, add a job description, and get
    a personalized interview strategy tailored to you.
  </p>
      {logoutError && <p className="logout-error" role="alert">{logoutError}</p>}
      </header>


      {/* Interview Input */}
      <section className="interview-input-group">

        {/* Left Side */}
        <div className="left">

          <div className="section-title">
            <label htmlFor="jobDescription">
              💼 Target Job Description
            </label>

            <span className="required">
              Required
            </span>
          </div>

          <textarea
            onChange={(e)=>{setJobDescription(e.target.value)}}
            name="jobDescription"
            id="jobDescription"
            placeholder="Paste the full job description here...
e.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'"
          />

          <span className="character-count">
            0 / 5000 chars
          </span>

        </div>


        {/* Right Side */}
        <div className="right">

          {/* Profile Heading */}
          <div className="section-title">
            <h3>👤 Your Profile</h3>
          </div>


          {/* Resume */}
          <div className="input-group">

            <label htmlFor="resume">
              Upload Resume
              <small>(Recommended)</small>
            </label>

            <label
              className="file-label"
              htmlFor="resume"
            >
              <span className="upload-icon">
                ☁
              </span>

              <strong>
                Click to upload the file.
              </strong>

              <small>
                PDF (Max 5MB)
              </small>
            </label>

            <input
                ref={resumeInputRef}
              onChange={handleResumeChange}
              hidden
              type="file"
              name="resume"
              id="resume"
              accept=".pdf"
            />

            {selectedResume && (
              <div className="selected-resume">
                <div className="selected-resume__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="8" y1="13" x2="16" y2="13" />
                    <line x1="8" y1="17" x2="13" y2="17" />
                  </svg>
                </div>

                <div className="selected-resume__details">
                  <strong title={selectedResume.name}>{selectedResume.name}</strong>
                  <span>{formatFileSize(selectedResume.size)} · {getFileType(selectedResume)}</span>
                </div>

                <button
                  className="selected-resume__remove"
                  type="button"
                  onClick={handleRemoveResume}
                  aria-label={`Remove ${selectedResume.name}`}
                >
                  ×
                </button>
              </div>
            )}

          </div>


          {/* OR */}
          <div className="divider">
            {/* <span>OR</span> */}
          </div>


          {/* Self Description */}
          <div className="input-group">

            <label htmlFor="selfDescription">
              Quick Self-Description
            </label>

            <textarea
            onChange={(e)=>{setSelfDescription(e.target.value)}}
              name="selfDescription"
              id="selfDescription"
              placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
            />

          </div>


          {/* Info */}
          <div className="info-message">
  💡 A Resume or Self Description is required to generate a personalized plan.
  <br></br>
  💡For the best and most accurate results, use both.
</div>

        </div>

      </section>


      {/* Generate */}
      <section className="generate-section">

        <p>
          AI-Powered Strategy Generation
          <span>•</span>
          Approx 30s
        </p>

        <button
        onClick ={handleGenerateReport}
         className="button primary-button">
          ✨ Generate My Interview Strategy
        </button>

      </section>

      {/*Recent Reports List*/}
         {reports.length > 0 && (
                <section className='recent-reports'>
                    <h2>My Recent Interview Plans</h2>
                    <ul className='reports-list'>
                        {reports.map(report => (
                            <li key={report._id} className='report-item' onClick={() => navigate(`/interview/${report._id}`)}>
                                <h3>{report.title || 'Untitled Position'}</h3>
                                <p className='report-meta'>Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                                <p className={`match-score ${report.matchScore >= 80 ? 'score--high' : report.matchScore >= 60 ? 'score--mid' : 'score--low'}`}>Match Score: {report.matchScore}%</p>
                            </li>
                        ))}
                    </ul>
                </section>
         )}

 <footer className="footer">
    <span>ACE_CV</span>
    <p>AI-powered interview preparation</p>
    <small>© 2026</small>
</footer>

    </main>
  );
};

export default Home;
