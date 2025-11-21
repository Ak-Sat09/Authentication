import React, { useState } from 'react';
import { ShoppingBag, Tag, TrendingUp, Star, Search, User, Bell } from 'lucide-react';

const CouponMarketplace = () => {
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const styles = {
        container: {
            minHeight: '100vh',
            backgroundColor: '#000000',
            color: '#ffffff',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            position: 'relative',
            overflow: 'hidden'
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
            left: '5%',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
            animation: 'float 6s ease-in-out infinite'
        },

        lightOrb2: {
            position: 'absolute',
            bottom: '10%',
            right: '5%',
            width: '250px',
            height: '250px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(50px)',
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

        header: {
            position: 'sticky',
            top: 0,
            backgroundColor: 'rgba(0,0,0,0.9)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            zIndex: 50,
            padding: '0'
        },

        nav: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '64px'
        },

        logo: {
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#ffffff',
            textDecoration: 'none'
        },

        navLinks: {
            display: 'none',
            alignItems: 'center',
            gap: '32px'
        },

        navLink: {
            color: '#cccccc',
            textDecoration: 'none',
            transition: 'color 0.3s ease',
            fontSize: '16px'
        },

        navActions: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
        },

        searchContainer: {
            position: 'relative',
            display: 'none'
        },

        searchInput: {
            backgroundColor: 'rgba(255,255,255,0.1)',
            border: isSearchFocused ? '1px solid rgba(255,255,255,0.4)' : '1px solid rgba(255,255,255,0.2)',
            borderRadius: '25px',
            paddingLeft: '40px',
            paddingRight: '16px',
            paddingTop: '8px',
            paddingBottom: '8px',
            fontSize: '14px',
            color: '#ffffff',
            outline: 'none',
            width: '200px',
            transition: 'border-color 0.3s ease'
        },

        searchIcon: {
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#999999',
            width: '16px',
            height: '16px'
        },

        actionButton: {
            padding: '8px',
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '50%',
            color: '#ffffff',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
        },

        hero: {
            position: 'relative',
            zIndex: 10,
            minHeight: '100vh',         // full height
            display: 'flex',            // use flexbox
            flexDirection: 'column',    // stack title, description, buttons
            alignItems: 'center',       // center horizontally
            justifyContent: 'center',   // center vertically
            textAlign: 'center',
            padding: '0 24px',
            // remove top padding
        }
        ,

        heroContainer: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: 0,   // remove side padding
        }
        ,

        heroTitle: {
            fontSize: 'clamp(48px, 8vw, 96px)',
            fontWeight: 'bold',
            marginBottom: '24px',
            lineHeight: '1.1'
        },

        heroSubtitle: {
            background: 'linear-gradient(45deg, #ffffff, #cccccc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
        },

        heroDescription: {
            fontSize: '20px',
            color: '#cccccc',
            marginBottom: '40px',
            maxWidth: '600px',
            margin: '0 auto 40px'
        },

        buttonContainer: {
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            alignItems: 'center',
            marginBottom: '60px'
        },

        primaryButton: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '16px 32px',
            backgroundColor: '#ffffff',
            color: '#000000',
            border: 'none',
            borderRadius: '25px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textDecoration: 'none'
        },

        secondaryButton: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '16px 32px',
            backgroundColor: 'transparent',
            color: '#ffffff',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '25px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textDecoration: 'none'
        },

        adminCard: {
            backgroundColor: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '320px',
            margin: '0 auto'
        },

        adminImage: {
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            border: '2px solid rgba(255,255,255,0.2)',
            margin: '0 auto 16px',
            display: 'block',
            objectFit: 'cover'
        },

        adminTitle: {
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '8px',
            color: '#ffffff'
        },

        adminDescription: {
            fontSize: '14px',
            color: '#999999',
            marginBottom: '16px'
        },

        rating: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px'
        },

        ratingText: {
            fontSize: '14px',
            color: '#cccccc',
            marginLeft: '8px'
        },

        statsSection: {
            position: 'relative',
            zIndex: 10,
            padding: '60px 0',
            borderTop: '1px solid rgba(255,255,255,0.1)'
        },

        statsContainer: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 24px'
        },

        statsGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px'
        },

        statCard: {
            backgroundColor: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            padding: '24px',
            textAlign: 'center',
            transition: 'all 0.3s ease'
        },

        statIcon: {
            width: '32px',
            height: '32px',
            margin: '0 auto 16px',
            color: '#ffffff'
        },

        statValue: {
            fontSize: '32px',
            fontWeight: 'bold',
            marginBottom: '8px',
            color: '#ffffff'
        },

        statLabel: {
            fontSize: '14px',
            color: '#999999'
        },

        footer: {
            position: 'relative',
            zIndex: 10,
            borderTop: '1px solid rgba(255,255,255,0.1)',
            padding: '60px 0',
            textAlign: 'center'
        },

        footerContainer: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 24px'
        },

        footerLogo: {
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '16px',
            color: '#ffffff'
        },

        footerDescription: {
            fontSize: '16px',
            color: '#999999',
            marginBottom: '24px'
        },

        footerLine: {
            width: '100px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
            margin: '0 auto 24px'
        },

        copyright: {
            fontSize: '12px',
            color: '#666666'
        }
    };

    // Add responsive styles
    const mediaQueries = `
    @media (min-width: 768px) {
      .nav-links { display: flex !important; }
      .search-container { display: block !important; }
      .button-container { flex-direction: row !important; }
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
    }

    .primary-button:hover {
      background-color: #f0f0f0 !important;
      transform: scale(1.05);
    }

    .secondary-button:hover {
      border-color: rgba(255,255,255,0.6) !important;
      background-color: rgba(255,255,255,0.05) !important;
      transform: scale(1.05);
    }

    .action-button:hover {
      background-color: rgba(255,255,255,0.1) !important;
    }

    .nav-link:hover {
      color: #ffffff !important;
    }

    .stat-card:hover {
      background-color: rgba(255,255,255,0.1) !important;
      transform: translateY(-4px);
    }
  `;

    const stats = [
        { label: 'Active Sellers', value: '10K+', icon: Tag },
        { label: 'Happy Buyers', value: '50K+', icon: User },
        { label: 'Success Rate', value: '99.9%', icon: TrendingUp },
        { label: 'Avg. Savings', value: '$127', icon: ShoppingBag },
    ];

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

                {/* Header */}
                <header style={styles.header}>
                    <nav style={styles.nav}>
                        <a href="#" style={styles.logo}>CouponHub</a>

                        <div className="nav-links" style={styles.navLinks}>
                            <a href="#" style={styles.navLink} className="nav-link">Browse</a>
                            <a href="#" style={styles.navLink} className="nav-link">Sell</a>
                            <a href="#" style={styles.navLink} className="nav-link">About</a>
                        </div>

                        <div style={styles.navActions}>
                            <div className="search-container" style={styles.searchContainer}>
                                <Search style={styles.searchIcon} />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    style={styles.searchInput}
                                    onFocus={() => setIsSearchFocused(true)}
                                    onBlur={() => setIsSearchFocused(false)}
                                />
                            </div>
                            <button style={styles.actionButton} className="action-button">
                                <Bell size={20} />
                            </button>
                            <button style={styles.actionButton} className="action-button">
                                <User size={20} />
                            </button>
                        </div>
                    </nav>
                </header>

                {/* Hero Section */}
                <section style={styles.hero}>
                    <div style={styles.heroContainer}>
                        <h1 style={styles.heroTitle}>
                            Buy & Sell<br />
                            <span style={styles.heroSubtitle}>Coupons</span>
                        </h1>

                        <p style={styles.heroDescription}>
                            The premium marketplace for digital vouchers and discount coupons.
                            Trade securely with verified sellers and buyers.
                        </p>




                        {/* Admin Section */}
                        <div style={styles.adminCard}>
                            <img
                                src="https://media.licdn.com/dms/image/v2/D5603AQHim0f_zcQFGQ/profile-displayphoto-shrink_400_400/B56Za0iENvGoAg-/0/1746785553277?e=1761782400&v=beta&t=RbVT6dchKJZi5BBcXuP2FP6DgY4CeP547yXjVu_MKzs"
                                alt="Admin"
                                style={styles.adminImage}
                            />
                            <h3 style={styles.adminTitle}>Meet Your Admin</h3>
                            <p style={styles.adminDescription}>
                                Ensuring secure and reliable transactions
                            </p>
                            <div style={styles.rating}>
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} fill="#ffffff" color="#ffffff" />
                                ))}
                                <span style={styles.ratingText}>5.0 Rating</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section style={styles.statsSection}>
                    <div style={styles.statsContainer}>
                        <div style={styles.statsGrid}>
                            {stats.map((stat, index) => (
                                <div key={index} style={styles.statCard} className="stat-card">
                                    <stat.icon style={styles.statIcon} />
                                    <div style={styles.statValue}>{stat.value}</div>
                                    <div style={styles.statLabel}>{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer style={styles.footer}>
                    <div style={styles.footerContainer}>
                        <div style={styles.footerLogo}>CouponHub</div>
                        <p style={styles.footerDescription}>
                            Premium marketplace for digital vouchers and discount coupons
                        </p>
                        <div style={styles.footerLine}></div>
                        <p style={styles.copyright}>
                            © 2025 CouponHub. All rights reserved.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default CouponMarketplace;