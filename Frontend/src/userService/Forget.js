import React, { useState } from "react";
import { Mail, ArrowLeft, Send, Shield, User, Bell } from "lucide-react";

export default function ForgetPassword() {
    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async () => {
        if (!email.trim()) {
            setMsg("Please enter your email address");
            setIsSuccess(false);
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setMsg("Please enter a valid email address");
            setIsSuccess(false);
            return;
        }

        setIsLoading(true);
        setMsg("");

        try {
            // Simulating API call since axios isn't available
            const response = await fetch(`http://localhost:8080/api/users/forget-password?email=${email}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (response.ok) {
                setMsg("Password reset link sent to your email!");
                setIsSuccess(true);
                setEmail(""); // Clear email after success
            } else {
                setMsg(data.message || "Failed to send reset link");
                setIsSuccess(false);
            }
        } catch (err) {
            setMsg("Network error. Please try again later.");
            setIsSuccess(false);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    const styles = {
        container: {
            minHeight: '100vh',
            backgroundColor: '#000000',
            color: '#ffffff',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        },

        backgroundLayer: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
            background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)'
        },

        lightOrb1: {
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(40px)',
            animation: 'float 6s ease-in-out infinite'
        },

        lightOrb2: {
            position: 'absolute',
            bottom: '25%',
            right: '15%',
            width: '160px',
            height: '160px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(35px)',
            animation: 'float 8s ease-in-out infinite reverse'
        },

        lightLine: {
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
            transform: 'translateY(-50%)'
        },

        formContainer: {
            position: 'relative',
            zIndex: 10,
            maxWidth: '400px',
            width: '100%'
        },

        backButton: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#cccccc',
            textDecoration: 'none',
            fontSize: '14px',
            marginBottom: '24px',
            padding: '8px 0',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
        },

        formCard: {
            backgroundColor: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '20px',
            padding: '40px',
            boxShadow: '0 25px 50px rgba(0,0,0,0.4)'
        },

        header: {
            textAlign: 'center',
            marginBottom: '32px'
        },

        iconContainer: {
            width: '70px',
            height: '70px',
            backgroundColor: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            position: 'relative'
        },

        iconGlow: {
            position: 'absolute',
            inset: '-2px',
            background: 'linear-gradient(45deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))',
            borderRadius: '50%',
            zIndex: -1,
            filter: 'blur(12px)'
        },

        title: {
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#ffffff',
            marginBottom: '8px',
            background: 'linear-gradient(135deg, #ffffff, #cccccc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
        },

        subtitle: {
            color: '#cccccc',
            fontSize: '16px',
            opacity: 0.8,
            lineHeight: '1.5'
        },

        fieldContainer: {
            marginBottom: '24px'
        },

        label: {
            display: 'block',
            fontSize: '14px',
            fontWeight: '600',
            color: '#ffffff',
            marginBottom: '8px',
            opacity: 0.9
        },

        inputContainer: {
            position: 'relative'
        },

        input: {
            width: '100%',
            padding: '14px 16px 14px 50px',
            backgroundColor: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '12px',
            fontSize: '16px',
            color: '#ffffff',
            outline: 'none',
            boxSizing: 'border-box',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)'
        },

        inputIcon: {
            position: 'absolute',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#cccccc',
            width: '20px',
            height: '20px',
            opacity: 0.7
        },

        submitButton: {
            width: '100%',
            backgroundColor: isLoading ? 'rgba(255,255,255,0.3)' : '#ffffff',
            color: '#000000',
            padding: '14px 20px',
            borderRadius: '12px',
            border: 'none',
            fontSize: '16px',
            fontWeight: '600',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 8px 25px rgba(255,255,255,0.2)',
            position: 'relative',
            overflow: 'hidden',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
        },

        buttonGlow: {
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            transition: 'left 0.5s ease'
        },

        messageContainer: {
            marginBottom: '20px',
            textAlign: 'center'
        },

        successMessage: {
            color: '#4ade80',
            fontSize: '14px',
            fontWeight: '500',
            backgroundColor: 'rgba(74, 222, 128, 0.1)',
            border: '1px solid rgba(74, 222, 128, 0.2)',
            borderRadius: '12px',
            padding: '16px',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
        },

        errorMessage: {
            color: '#f87171',
            fontSize: '14px',
            fontWeight: '500',
            backgroundColor: 'rgba(248, 113, 113, 0.1)',
            border: '1px solid rgba(248, 113, 113, 0.2)',
            borderRadius: '12px',
            padding: '16px',
            backdropFilter: 'blur(10px)'
        },

        infoSection: {
            backgroundColor: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            padding: '16px',
            marginTop: '20px'
        },

        infoTitle: {
            fontSize: '14px',
            fontWeight: '600',
            color: '#ffffff',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        },

        infoText: {
            fontSize: '13px',
            color: '#cccccc',
            lineHeight: '1.5',
            opacity: 0.8
        },

        loginSection: {
            textAlign: 'center',
            marginTop: '24px',
            paddingTop: '24px',
            borderTop: '1px solid rgba(255,255,255,0.1)'
        },

        loginText: {
            color: '#cccccc',
            fontSize: '14px',
            marginBottom: '8px'
        },

        loginLink: {
            color: '#ffffff',
            fontWeight: '600',
            textDecoration: 'none',
            padding: '8px 16px',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '25px',
            transition: 'all 0.3s ease',
            display: 'inline-block'
        },

        brandContainer: {
            position: 'absolute',
            top: '20px',
            left: '20px',
            zIndex: 20
        },

        brandLogo: {
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#ffffff',
            textDecoration: 'none'
        },

        decorativeElements: {
            position: 'absolute',
            top: '20px',
            right: '20px',
            display: 'flex',
            gap: '12px',
            zIndex: 20
        },

        decorativeButton: {
            width: '40px',
            height: '40px',
            backgroundColor: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
        }
    };

    const mediaQueries = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
        }

        .submit-button:hover:not(:disabled) {
            background-color: #f0f0f0 !important;
            transform: translateY(-2px);
            box-shadow: 0 12px 35px rgba(255,255,255,0.3) !important;
        }

        .submit-button:hover .button-glow {
            left: 100% !important;
        }

        .input:focus {
            border-color: rgba(255,255,255,0.4) !important;
            background-color: rgba(255,255,255,0.12) !important;
            box-shadow: 0 0 20px rgba(255,255,255,0.1);
        }

        .back-button:hover {
            color: #ffffff !important;
            transform: translateX(-4px);
        }

        .decorative-button:hover {
            background-color: rgba(255,255,255,0.2) !important;
            transform: scale(1.1);
        }

        .form-card {
            animation: slideUp 0.8s ease-out;
        }

        .login-link:hover {
            background-color: rgba(255,255,255,0.1) !important;
            border-color: rgba(255,255,255,0.4) !important;
            transform: translateY(-1px);
        }

        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }

        .loading {
            animation: pulse 1.5s ease-in-out infinite;
        }
    `;

    return (
        <>
            <style>{mediaQueries}</style>
            <div style={styles.container}>
                {/* Background */}
                <div style={styles.backgroundLayer}>
                    <div style={styles.lightOrb1}></div>
                    <div style={styles.lightOrb2}></div>
                    <div style={styles.lightLine}></div>
                </div>

                {/* Brand */}
                <div style={styles.brandContainer}>
                    <a href="#" style={styles.brandLogo}>CouponHub</a>
                </div>

                {/* Decorative Elements */}
                <div style={styles.decorativeElements}>
                    <div style={styles.decorativeButton} className="decorative-button">
                        <Bell size={18} color="#ffffff" />
                    </div>
                    <div style={styles.decorativeButton} className="decorative-button">
                        <User size={18} color="#ffffff" />
                    </div>
                </div>

                {/* Form Container */}
                <div style={styles.formContainer}>
                    {/* Back Button */}
                    <a href="/login" style={styles.backButton} className="back-button">
                        <ArrowLeft size={16} />
                        Back to Login
                    </a>

                    <div style={styles.formCard} className="form-card">
                        {/* Header */}
                        <div style={styles.header}>
                            <div style={styles.iconContainer}>
                                <div style={styles.iconGlow}></div>
                                <Shield size={32} color="#ffffff" />
                            </div>
                            <h2 style={styles.title}>Reset Password</h2>
                            <p style={styles.subtitle}>
                                Enter your email address and we'll send you a link to reset your password
                            </p>
                        </div>

                        {/* Message */}
                        {msg && (
                            <div style={styles.messageContainer}>
                                <div style={isSuccess ? styles.successMessage : styles.errorMessage}>
                                    {isSuccess && <Send size={16} />}
                                    {msg}
                                </div>
                            </div>
                        )}

                        {/* Form */}
                        <div>
                            {/* Email Field */}
                            <div style={styles.fieldContainer}>
                                <label style={styles.label}>Email Address</label>
                                <div style={styles.inputContainer}>
                                    <input
                                        type="email"
                                        placeholder="Enter your registered email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        style={styles.input}
                                        className="input"
                                        disabled={isLoading}
                                    />
                                    <Mail style={styles.inputIcon} />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                onClick={handleSubmit}
                                disabled={isLoading}
                                style={styles.submitButton}
                                className={`submit-button ${isLoading ? 'loading' : ''}`}
                            >
                                <div style={styles.buttonGlow} className="button-glow"></div>
                                {isLoading ? (
                                    <>
                                        <div style={{
                                            width: '16px',
                                            height: '16px',
                                            border: '2px solid #000000',
                                            borderTop: '2px solid transparent',
                                            borderRadius: '50%',
                                            animation: 'spin 1s linear infinite'
                                        }}></div>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send size={16} />
                                        Send Reset Link
                                    </>
                                )}
                            </button>

                            {/* Info Section */}
                            <div style={styles.infoSection}>
                                <div style={styles.infoTitle}>
                                    <Shield size={16} />
                                    What happens next?
                                </div>
                                <p style={styles.infoText}>
                                    We'll send a secure password reset link to your email. Click the link to create a new password. The link will expire in 1 hour for security.
                                </p>
                            </div>

                            {/* Login Section */}
                            <div style={styles.loginSection}>
                                <p style={styles.loginText}>Remember your password?</p>
                                <a href="/login" style={styles.loginLink} className="login-link">
                                    Back to Login
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </>
    );
}