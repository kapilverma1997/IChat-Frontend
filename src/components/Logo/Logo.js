import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import styles from './Logo.module.css';

export default function Logo({ size = 'large', showIcon = true, className = '' }) {
    const { theme } = useTheme();
    
    return (
        <div className={`${styles.logoContainer} ${styles[theme]} ${styles[size]} ${className}`}>
            {showIcon && (
                <div className={styles.iconWrapper}>
                    <svg 
                        className={styles.chatIcon} 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path 
                            d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        />
                        <circle cx="7" cy="10" r="1" fill="currentColor" />
                        <circle cx="12" cy="10" r="1" fill="currentColor" />
                        <circle cx="17" cy="10" r="1" fill="currentColor" />
                    </svg>
                </div>
            )}
            <span className={styles.logoText}>
                <span className={styles.logoLetter}>I</span>
                <span className={styles.logoWord}>Chat</span>
            </span>
            <div className={styles.glowEffect}></div>
        </div>
    );
}

