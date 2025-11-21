import React, { useState } from "react";
import { Eye, EyeOff, Lock, Shield, User, Bell, Key, CheckCircle, AlertCircle } from "lucide-react";

export default function ChangePassword() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async () => {
        // Validation
        if (!oldPassword.trim() || !newPassword.trim()) {
            setMsg("Please fill in both password fields");
            setIsSuccess(false);
            return;
        }

        if (newPassword.length < 6) {
            setMsg("New password must be at least 6 characters long");
            setIsSuccess(false);
            return;
        }

        if (newPassword === oldPassword) {
            setMsg("New password must be different from old password");
            setIsSuccess(false);
            return;
        }

        if (confirmPassword && newPassword !== confirmPassword) {
            setMsg("New password and confirm password don't match");
            setIsSuccess(false);
            return;
        }

        setIsLoading(true);
        setMsg("");

        try {
            // Note: localStorage not available in this environment, using placeholder
            const token = "placeholder-token"; // localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:8080/api/users/change-password?oldPassword=${oldPassword}&newPassword=${newPassword}`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            const data = await response.json();

            if (response.ok) {
                setMsg("Password changed successfully!");
                setIsSuccess(true);
                // Clear form on success
                setOldPassword("");
                setNewPassword("");
                setConfirmPassword("");
            } else {
                setMsg(data.message || "Failed to change password");
                setIsSuccess(false);
            }
        } catch (err) {
            setMsg("Network error. Please try again later.");
            setIsSuccess(false);
        } finally {
            setIsLoading(false);
        }
    };

    const getPasswordStrength = (password) => {
        if (password.length === 0) return { text: "", color: "#666666" };
        if (password.length < 6) return { text: "Too weak - needs at least 6 characters", color: "#f87171" };
        if (password.length < 8) return { text: "Weak - try adding more characters", color: "#fbbf24" };
        if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
            return { text: "Strong password!", color: "#4ade80" };
        }
        return { text: "Good - add numbers and uppercase for stronger security", color: "#60a5fa" };
    };

    const passwordMatch = confirmPassword && newPassword === confirmPassword;
    const passwordMismatch = confirmPassword && newPassword !== confirmPassword;

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
            top: '15%',
            left: '8%',
            width: '220px',
            height: '220px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(45px)',
            animation: 'float 6s ease-in-out infinite'
        },

        lightOrb2: {
            position: 'absolute',
            bottom: '20%',
            right: '12%',
            width: '180px',
            height: '180px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(35px)',
            animation: 'float 8s ease-in-out infinite reverse'
        },

        lightOrb3: {
            position: 'absolute',
            top: '70%',
            left: '20%',
            width: '120px',
            height: '120px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(25px)',
            animation: 'float 7s ease-in-out infinite'
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
            maxWidth: '450px',
            width: '100%'
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

        inputSuccess: {
            borderColor: 'rgba(74, 222, 128, 0.5)',
            backgroundColor: 'rgba(74, 222, 128, 0.05)'
        },

        inputError: {
            borderColor: 'rgba(248, 113, 113, 0.5)',
            backgroundColor: 'rgba(248, 113, 113, 0.05)'
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

        eyeButton: {
            position: 'absolute',
            right: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            color: '#cccccc',
            opacity: 0.7,
            transition: 'opacity 0.3s ease'
        },

        validationIcon: {
            position: 'absolute',
            right: '50px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '18px',
            height: '18px'
        },

        passwordStrength: {
            marginTop: '8px',
            fontSize: '12px',
            fontWeight: '500'
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
            marginTop: '8px',
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
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        },

        securityTips: {
            backgroundColor: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            padding: '16px',
            marginTop: '20px'
        },

        tipsTitle: {
            fontSize: '14px',
            fontWeight: '600',
            color: '#ffffff',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        },

        tipsList: {
            fontSize: '13px',
            color: '#cccccc',
            lineHeight: '1.5',
            opacity: 0.8,
            paddingLeft: '0',
            listStyle: 'none'
        },

        tipItem: {
            marginBottom: '4px',
            paddingLeft: '16px',
            position: 'relative'
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

        .eye-button:hover {
            opacity: 1 !important;
        }

        .decorative-button:hover {
            background-color: rgba(255,255,255,0.2) !important;
            transform: scale(1.1);
        }

        .form-card {
            animation: slideUp 0.8s ease-out;
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

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .loading {
            animation: pulse 1.5s ease-in-out infinite;
        }

        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }
    `;

    const strengthInfo = getPasswordStrength(newPassword);

    return (
        <>
            <style>{mediaQueries}</style>
            <div style={styles.container}>
                {/* Background */}
                <div style={styles.backgroundLayer}>
                    <div style={styles.lightOrb1}></div>
                    <div style={styles.lightOrb2}></div>
                    <div style={styles.lightOrb3}></div>
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
                    <div style={styles.formCard} className="form-card">
                        {/* Header */}
                        <div style={styles.header}>
                            <div style={styles.iconContainer}>
                                <div style={styles.iconGlow}></div>
                                <Key size={32} color="#ffffff" />
                            </div>
                            <h2 style={styles.title}>Change Password</h2>
                            <p style={styles.subtitle}>
                                Update your password to keep your account secure
                            </p>
                        </div>

                        {/* Message */}
                        {msg && (
                            <div style={styles.messageContainer}>
                                <div style={isSuccess ? styles.successMessage : styles.errorMessage}>
                                    {isSuccess ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                                    {msg}
                                </div>
                            </div>
                        )}

                        {/* Form */}
                        <div>
                            {/* Old Password Field */}
                            <div style={styles.fieldContainer}>
                                <label style={styles.label}>Current Password</label>
                                <div style={styles.inputContainer}>
                                    <input
                                        type={showOldPassword ? "text" : "password"}
                                        placeholder="Enter your current password"
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        style={styles.input}
                                        className="input"
                                        disabled={isLoading}
                                    />
                                    <Lock style={styles.inputIcon} />
                                    <button
                                        type="button"
                                        onClick={() => setShowOldPassword(!showOldPassword)}
                                        style={styles.eyeButton}
                                        className="eye-button"
                                    >
                                        {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            {/* New Password Field */}
                            <div style={styles.fieldContainer}>
                                <label style={styles.label}>New Password</label>
                                <div style={styles.inputContainer}>
                                    <input
                                        type={showNewPassword ? "text" : "password"}
                                        placeholder="Enter your new password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        style={{
                                            ...styles.input,
                                            paddingRight: '50px'
                                        }}
                                        className="input"
                                        disabled={isLoading}
                                    />
                                    <Shield style={styles.inputIcon} />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        style={styles.eyeButton}
                                        className="eye-button"
                                    >
                                        {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                {newPassword && (
                                    <div style={{ ...styles.passwordStrength, color: strengthInfo.color }}>
                                        {strengthInfo.text}
                                    </div>
                                )}
                            </div>

                            {/* Confirm New Password Field */}
                            <div style={styles.fieldContainer}>
                                <label style={styles.label}>Confirm New Password</label>
                                <div style={styles.inputContainer}>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirm your new password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        style={{
                                            ...styles.input,
                                            paddingRight: '80px',
                                            ...(passwordMatch ? styles.inputSuccess : {}),
                                            ...(passwordMismatch ? styles.inputError : {})
                                        }}
                                        className="input"
                                        disabled={isLoading}
                                    />
                                    <Lock style={styles.inputIcon} />
                                    {confirmPassword && (
                                        <div style={styles.validationIcon}>
                                            {passwordMatch ? (
                                                <CheckCircle size={18} color="#4ade80" />
                                            ) : (
                                                <AlertCircle size={18} color="#f87171" />
                                            )}
                                        </div>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        style={styles.eyeButton}
                                        className="eye-button"
                                    >
                                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
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
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <Shield size={16} />
                                        Change Password
                                    </>
                                )}
                            </button>

                            {/* Security Tips */}
                            <div style={styles.securityTips}>
                                <div style={styles.tipsTitle}>
                                    <Shield size={16} />
                                    Security Tips
                                </div>
                                <ul style={styles.tipsList}>
                                    <li style={styles.tipItem}>• Use at least 8 characters with mixed case</li>
                                    <li style={styles.tipItem}>• Include numbers and special characters</li>
                                    <li style={styles.tipItem}>• Avoid using personal information</li>
                                    <li style={styles.tipItem}>• Don't reuse passwords from other accounts</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}