



import React,{useState,useRef} from "react";
import "../style/home.scss";
import{useInterview} from '../hooks/useInterview.js'
import {useNavigate} from 'react-router'


const Home = () => {
    const {loading, generateReport,reports} = useInterview()
    const[jobDescription, setJobDescription]=useState("")
    const[selfDescription,setSelfDescription]=useState("")
    const resumeInputRef = useRef()

    const navigate = useNavigate()

    const handleGenerateReport = async () =>{
        const resumeFile = resumeInputRef.current.files[0]
        const data =await generateReport({jobDescription,selfDescription,resumeFile})
        navigate(`/interview/${data._id}`)
        
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
        <h1>ACE_CV</h1>
         <h2>AI-Powered Interview Preparation</h2>

  <p>
    Upload your resume, add a job description, and get
    a personalized interview strategy tailored to you.
  </p>
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
                Click to upload or drag & drop
              </strong>

              <small>
                PDF or DOCX (Max 5MB)
              </small>
            </label>

            <input
                ref={resumeInputRef}
              hidden
              type="file"
              name="resume"
              id="resume"
              accept=".pdf,.docx"
            />

          </div>


          {/* OR */}
          <div className="divider">
            <span>OR</span>
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
            💡 Either a Resume or a Self Description is required
            to generate a personalized plan.
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