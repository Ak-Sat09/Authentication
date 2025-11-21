import React, { useState } from "react";
import { Eye, EyeOff, Lock, Mail, User, Bell, UserPlus } from "lucide-react";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setMessage("Error: Please fill all fields!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setMessage("Error: Please enter a valid email address!");
      return;
    }

    if (form.password.length < 6) {
      setMessage("Error: Password must be at least 6 characters long!");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("Registration successful! Please login.");
        // Reset form
        setForm({ name: "", email: "", password: "" });
      } else {
        setMessage(data.message || "Registration failed");
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again!");
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
      top: '10%',
      left: '15%',
      width: '220px',
      height: '220px',
      background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)',
      borderRadius: '50%',
      filter: 'blur(45px)',
      animation: 'float 7s ease-in-out infinite'
    },

    lightOrb2: {
      position: 'absolute',
      bottom: '15%',
      right: '10%',
      width: '180px',
      height: '180px',
      background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)',
      borderRadius: '50%',
      filter: 'blur(35px',
      animation: 'float 9s ease-in-out infinite reverse'
    },

    lightOrb3: {
      position: 'absolute',
      top: '60%',
      left: '5%',
      width: '140px',
      height: '140px',
      background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
      borderRadius: '50%',
      filter: 'blur(30px)',
      animation: 'float 5s ease-in-out infinite'
    },

    lightLine: {
      position: 'absolute',
      top: '45%',
      left: 0,
      right: 0,
      height: '1px',
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
      transform: 'translateY(-50%)'
    },

    formContainer: {
      position: 'relative',
      zIndex: 10,
      maxWidth: '420px',
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
      marginBottom: '16px'
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
      borderRadius: '8px',
      padding: '12px',
      backdropFilter: 'blur(10px)'
    },

    errorMessage: {
      color: '#f87171',
      fontSize: '14px',
      fontWeight: '500',
      backgroundColor: 'rgba(248, 113, 113, 0.1)',
      border: '1px solid rgba(248, 113, 113, 0.2)',
      borderRadius: '8px',
      padding: '12px',
      backdropFilter: 'blur(10px)'
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
    },

    passwordStrength: {
      marginTop: '8px',
      fontSize: '12px',
      color: '#999999'
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
  `;

  const getPasswordStrength = (password) => {
    if (password.length === 0) return "";
    if (password.length < 6) return "Too weak - needs at least 6 characters";
    if (password.length < 8) return "Weak - try adding more characters";
    if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) return "Strong password!";
    return "Good - add numbers and uppercase for stronger security";
  };

  const getStrengthColor = (password) => {
    if (password.length < 6) return "#f87171";
    if (password.length < 8) return "#fbbf24";
    if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) return "#4ade80";
    return "#60a5fa";
  };

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
                <UserPlus size={32} color="#ffffff" />
              </div>
              <h2 style={styles.title}>Create Account</h2>
              <p style={styles.subtitle}>Join our coupon marketplace today</p>
            </div>

            {/* Form */}
            <div>
              {/* Message */}
              {message && (
                <div style={styles.messageContainer}>
                  <p style={message.includes("successful") ? styles.successMessage : styles.errorMessage}>
                    {message}
                  </p>
                </div>
              )}

              {/* Name Field */}
              <div style={styles.fieldContainer}>
                <label style={styles.label}>Full Name</label>
                <div style={styles.inputContainer}>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    style={styles.input}
                    className="input"
                  />
                  <User style={styles.inputIcon} />
                </div>
              </div>

              {/* Email Field */}
              <div style={styles.fieldContainer}>
                <label style={styles.label}>Email Address</label>
                <div style={styles.inputContainer}>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
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
                    placeholder="Create a strong password"
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
                {form.password && (
                  <div style={{ ...styles.passwordStrength, color: getStrengthColor(form.password) }}>
                    {getPasswordStrength(form.password)}
                  </div>
                )}
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
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>

              {/* Login Section */}
              <div style={styles.loginSection}>
                <p style={styles.loginText}>Already have an account?</p>
                <a href="/login" style={styles.loginLink} className="login-link">
                  Sign In Here
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}