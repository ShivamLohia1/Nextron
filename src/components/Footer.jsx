import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-[var(--surface)] border-t border-[var(--border)] pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                <div>
                    <Link to="/" className="text-3xl font-black tracking-tighter mb-6 block">
                        NEXTRON<span className="text-[var(--accent)]">.</span>
                    </Link>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                        Pioneering the future of consumer electronics.
                        Premium quality, sustainable design, and unmatched performance.
                    </p>
                    <div className="flex gap-4">
                        {/* Social Icons */}
                        {['twitter', 'instagram', 'linkedin', 'github'].map(social => (
                            <a key={social} href={`#${social}`} className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center hover:bg-[var(--accent)] hover:text-black transition-all">
                                <span className="sr-only">{social}</span>
                                <div className="w-4 h-4 bg-current rounded-sm"></div>
                            </a>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="font-bold mb-6 text-lg">SHOP</h3>
                    <ul className="space-y-4 text-gray-400 text-sm">
                        <li><Link to="/products" className="hover:text-[var(--accent)] transition-colors">All Products</Link></li>
                        <li><Link to="/products?category=laptops" className="hover:text-[var(--accent)] transition-colors">Laptops</Link></li>
                        <li><Link to="/products?category=audio" className="hover:text-[var(--accent)] transition-colors">Audio</Link></li>
                        <li><Link to="/new-arrivals" className="hover:text-[var(--accent)] transition-colors">New Arrivals</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold mb-6 text-lg">SUPPORT</h3>
                    <ul className="space-y-4 text-gray-400 text-sm">
                        <li><Link to="/contact" className="hover:text-[var(--accent)] transition-colors">Contact Us</Link></li>
                        <li><Link to="/faq" className="hover:text-[var(--accent)] transition-colors">FAQs</Link></li>
                        <li><Link to="/shipping" className="hover:text-[var(--accent)] transition-colors">Shipping & Returns</Link></li>
                        <li><Link to="/warranty" className="hover:text-[var(--accent)] transition-colors">Warranty</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold mb-6 text-lg">STAY UPDATED</h3>
                    <p className="text-gray-400 text-sm mb-4">Subscribe to our newsletter for early access to drops.</p>
                    <form className="flex gap-2">
                        <input
                            type="email"
                            placeholder="Email address"
                            className="bg-[var(--primary)] border border-[var(--border)] rounded-lg px-4 py-3 text-sm flex-1 focus:border-[var(--accent)] transition-colors text-[var(--text)]"
                        />
                        <button type="submit" className="bg-[var(--accent)] text-black px-4 py-3 rounded-lg font-bold text-sm hover:bg-[var(--accent-2)] transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-mono">
                <p>&copy; 2026 NEXTRON. All rights reserved.</p>
                <div className="flex gap-8 mt-4 md:mt-0">
                    <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
