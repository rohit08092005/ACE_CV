
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from "../hooks/useAuth"

const Login = () => {

    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleLogin({email, password})
        navigate('/')
    }

    if (loading) {
        return (
            <main>
                <h1>Loading.........</h1>
            </main>
        )
    }

    return (
        <main className="login-page">

            <div className="login-container">

                {/* LEFT SIDE */}
                <section className="login-showcase">

                    <div className="brand">
                        <span className="brand-icon">▣</span>
                        <span>ACE_CV</span>
                    </div>

                    <div className="ai-badge">
                        AI-POWERED INTERVIEW PREPARATION
                    </div>

                    <h1>
                        Turn Your Resume
                        <br />
                        Into
                        <br />
                        Your <span>Interview</span>
                        <br />
                        <span>Strategy</span>
                    </h1>

                    <div className="workflow">

                        <div className="workflow-item">
                            <div className="workflow-icon">▧</div>
                            <p>Resume</p>
                        </div>

                        <div className="arrow">→</div>

                        <div className="workflow-item active">
                            <div className="workflow-icon">✣</div>
                            <p>ACE_CV AI</p>
                        </div>

                        <div className="arrow">→</div>

                        <div className="workflow-item">
                            <div className="workflow-icon">▥</div>
                            <p>Strategy</p>
                        </div>

                    </div>

                    <p className="tagline">
                        Practice smarter. Interview better. ACE your CV.
                    </p>

                </section>


                {/* RIGHT SIDE */}
                <section className="login-form-section">

                    <div className="login-form-wrapper">

                        <h2>Welcome Back</h2>

                        <p className="login-subtitle">
                            Sign in to continue refining your professional edge.
                        </p>

                        <form onSubmit={handleSubmit}>

                            <div className="input-group">

                                <label htmlFor="email">
                                    Email Address
                                </label>

                                <input
                                    onChange={(e) => {setEmail(e.target.value)}}
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Enter your email address"
                                    required
                                />

                            </div>


                            <div className="input-group">

                                <div className="password-label">

                                    <label htmlFor="password">
                                        Password
                                    </label>

                                    

                                </div>

                                <input
                                    onChange={(e) => {setPassword(e.target.value)}}
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    required
                                />

                            </div>


                

                            <button
                                className="button primary-button login-button"
                                type="submit"
                            >
                                Login →
                            </button>

                        </form>


                        <div className="divider">
                            <span></span>
                            <span></span>
                        </div>


                        <p className="register-text">
                            New to ACE_CV?{" "}
                            <Link to="/register">
                                Create an account
                            </Link>
                        </p>

                    </div>

                </section>

            </div>

        </main>
    )
}

export default Login