
import React from 'react'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import "../auth.form.scss"

const Register = () => {

    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { loading, handleRegister } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleRegister({ username, email, password })
        navigate('/')
    }

    if (loading) {
        return (
            <main>
                <h1>Loading..........</h1>
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
                            <div className="workflow-icon">
                                ▧
                            </div>
                            <p>Resume</p>
                        </div>

                        <div className="arrow">
                            →
                        </div>

                        <div className="workflow-item active">
                            <div className="workflow-icon">
                                ✣
                            </div>
                            <p>ACE_CV AI</p>
                        </div>

                        <div className="arrow">
                            →
                        </div>

                        <div className="workflow-item">
                            <div className="workflow-icon">
                                ▥
                            </div>
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

                        <h2>
                            Create Account
                        </h2>

                        <p className="login-subtitle">
                            Create your account to start preparing smarter.
                        </p>


                        <form onSubmit={handleSubmit}>

                            <div className="input-group">

                                <label htmlFor="username">
                                    Username
                                </label>

                                <input
                                    onChange={(e) => {
                                        setUsername(e.target.value)
                                    }}
                                    type="text"
                                    id="username"
                                    name="username"
                                    placeholder="Enter username"
                                    required
                                />

                            </div>


                            <div className="input-group">

                                <label htmlFor="email">
                                    Email Address
                                </label>

                                <input
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                    }}
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="name@company.com"
                                    required
                                />

                            </div>


                            <div className="input-group">

                                <label htmlFor="password">
                                    Password
                                </label>

                                <input
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                    }}
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Create a password"
                                    required
                                />

                            </div>


                            <button
                                className="button primary-button login-button"
                                type="submit"
                            >
                                Create Account →
                            </button>

                        </form>


                        <p className="register-text">
                            Already have an account?{" "}
                            <Link to="/login">
                                Sign in
                            </Link>
                        </p>

                    </div>

                </section>

            </div>

        </main>
    )
}

export default Register