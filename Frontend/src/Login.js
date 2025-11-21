import React, { useState } from "react";
import { Eye, EyeOff, Lock, Mail, User, Bell } from "lucide-react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!form.email || !form.password) {
      setMessage("Please enter email and password");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.success) {
        // Note: localStorage not available in this environment
        console.log("Login successful, token:", data.data);
        setMessage("Login successful!");
      } else {
        setMessage("Invalid credentials");
      }
    } catch {
      setMessage("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
      top: '15%',
      left: '10%',
      width: '250px',
      height: '250px',
      background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
      borderRadius: '50%',
      filter: 'blur(50px)',
      animation: 'float 6s ease-in-out infinite'
    },

    lightOrb2: {
      position: 'absolute',
      bottom: '20%',
      right: '15%',
      width: '180px',
      height: '180px',
      background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
      borderRadius: '50%',
      filter: 'blur(40px)',
      animation: 'float 8s ease-in-out infinite reverse'
    },

    lightLine: {
      position: 'absolute',
      top: '50%',
      left: 0,
      right: 0,
      height: '1px',
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
      transform: 'translateY(-50%)'
    },

    formContainer: {
      position: 'relative',
      zIndex: 10,
      maxWidth: '400px',
      width: '100%'
    },

    formCard: {
      backgroundColor: 'rgba(255,255,255,0.05)',
      backdropFilter: 'blur(15px)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '20px',
      padding: '40px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
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
      background: 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
      borderRadius: '50%',
      zIndex: -1,
      filter: 'blur(10px)'
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
      opacity: 0.8
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

    forgotPasswordContainer: {
      textAlign: 'right',
      marginBottom: '24px'
    },

    forgotPasswordLink: {
      color: '#ffffff',
      fontSize: '13px',
      textDecoration: 'none',
      fontWeight: '500',
      opacity: 0.8,
      transition: 'all 0.3s ease',
      position: 'relative'
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
      overflow: 'hidden'
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
      marginTop: '16px',
      textAlign: 'center'
    },

    successMessage: {
      color: '#4ade80',
      fontSize: '14px',
      fontWeight: '500'
    },

    errorMessage: {
      color: '#f87171',
      fontSize: '14px',
      fontWeight: '500'
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
      50% { transform: translateY(-20px); }
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

    .forgot-link:hover {
      opacity: 1 !important;
      text-shadow: 0 0 10px rgba(255,255,255,0.5);
      transform: translateY(-1px);
    }

    .forgot-link::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 1px;
      background: linear-gradient(90deg, #ffffff, transparent);
      transition: width 0.3s ease;
    }

    .forgot-link:hover::after {
      width: 100%;
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
          <div style={styles.formCard} className="form-card">
            {/* Header */}
            <div style={styles.header}>
              <div style={styles.iconContainer}>
                <div style={styles.iconGlow}></div>
                <Lock size={32} color="#ffffff" />
              </div>
              <h2 style={styles.title}>Welcome Back</h2>
              <p style={styles.subtitle}>Sign in to your account</p>
            </div>

            {/* Form */}
            <div onSubmit={handleSubmit}>
              {/* Email Field */}
              <div style={styles.fieldContainer}>
                <label style={styles.label}>Email</label>
                <div style={styles.inputContainer}>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    style={styles.input}
                    className="input"
                  />
                  <Mail style={styles.inputIcon} />
                </div>
              </div>

              {/* Password Field */}
              <div style={styles.fieldContainer}>
                <label style={styles.label}>Password</label>
                <div style={styles.inputContainer}>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter your password"
                    style={{ ...styles.input, paddingRight: '50px' }}
                    className="input"
                  />
                  <Lock style={styles.inputIcon} />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    style={styles.eyeButton}
                    className="eye-button"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div style={styles.forgotPasswordContainer}>
                <a href="/forget" style={styles.forgotPasswordLink} className="forgot-link">
                  Forgot your password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                style={styles.submitButton}
                className="submit-button"
              >
                <div style={styles.buttonGlow} className="button-glow"></div>
                {isLoading ? "Signing In..." : "Sign In"}
              </button>

              {/* Message */}
              {message && (
                <div style={styles.messageContainer}>
                  <p style={message.includes("successful") ? styles.successMessage : styles.errorMessage}>
                    {message}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}