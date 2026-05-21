import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

const Navbar = () => {
    const {
        cartCount, wishlist, setIsCartOpen, setIsWishlistOpen,
        user, logout, isAdminMode, setIsAdminMode, theme, toggleTheme
    } = useStore();
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'navbar-blur' : ''}`}>
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-12">
                        <Link to="/" className="text-2xl font-black tracking-tighter cursor-pointer glitch">
                            NEXTRON<span className="text-[var(--accent)]">.</span>
                        </Link>
                        <div className="hidden md:flex space-x-8 font-mono text-sm">
                            <NavLink to="/" end className={({ isActive }) => `hover:text-[var(--accent)] transition-colors ${isActive ? 'text-[var(--accent)]' : ''}`}>HOME</NavLink>
                            <NavLink to="/products" className={({ isActive }) => `hover:text-[var(--accent)] transition-colors ${isActive ? 'text-[var(--accent)]' : ''}`}>ALL PRODUCTS</NavLink>
                            <NavLink to="/trending" className={({ isActive }) => `hover:text-[var(--accent)] transition-colors ${isActive ? 'text-[var(--accent)]' : ''}`}>TRENDING</NavLink>
                            <NavLink to="/new-arrivals" className={({ isActive }) => `hover:text-[var(--accent)] transition-colors ${isActive ? 'text-[var(--accent)]' : ''}`}>NEW ARRIVALS</NavLink>
                            <NavLink to="/about" className={({ isActive }) => `hover:text-[var(--accent)] transition-colors ${isActive ? 'text-[var(--accent)]' : ''}`}>ABOUT</NavLink>
                        </div>
                    </div>
                    <div className="flex items-center space-x-6">
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <Link to="/profile" className="text-sm font-mono text-gray-400 hover:text-[var(--accent)] transition-colors">Hi, {user.name.split(' ')[0]}</Link>
                                <button onClick={logout} className="text-xs font-mono border border-[var(--border)] px-3 py-1 hover:border-[var(--accent)] rounded transition-colors">
                                    LOGOUT
                                </button>
                                {user.role === 'admin' && (
                                    <Link to="/admin" className="text-xs font-mono border border-[var(--accent)] text-[var(--accent)] px-3 py-1 rounded transition-colors">
                                        ADMIN
                                    </Link>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link to="/login" className="text-sm font-mono hover:text-[var(--accent)] transition-colors">LOGIN</Link>
                                <Link to="/signup" className="text-sm font-mono btn-primary px-4 py-2 rounded-full text-[var(--primary)]">SIGNUP</Link>
                            </div>
                        )}

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                            className="hover:text-[var(--accent)] transition-colors"
                        >
                            {theme === 'dark' ? (
                                // Sun icon
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="5" strokeWidth={2} strokeLinecap="round" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                                </svg>
                            ) : (
                                // Moon icon
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                                </svg>
                            )}
                        </button>

                        <button onClick={() => setIsWishlistOpen(true)} className="relative hover:text-[var(--accent)] transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            {wishlist.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[var(--accent-2)] text-[var(--primary)] text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">{wishlist.length}</span>
                            )}
                        </button>
                        <button onClick={() => setIsCartOpen(true)} className="relative hover:text-[var(--accent)] transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[var(--accent)] text-[var(--primary)] text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold badge-pulse">{cartCount}</span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
