import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { validateEmailDomain } from '../../utils/emailValidator';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const { signup } = useStore();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }
        const domainCheck = validateEmailDomain(formData.email);
        if (!domainCheck.valid) {
            setError(domainCheck.error);
            return;
        }

        const result = await signup(formData.email, formData.password, formData.name);
        if (result.success) {
            navigate('/');
        } else if (result.error === 'EMAIL_EXISTS') {
            setError('An account with this email already exists. Please log in instead.');
        } else {
            setError(result.error || 'Signup failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6 pt-20">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--accent-2)] rounded-full blur-[120px]"></div>
            </div>

            <div className="w-full max-w-md bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-8 md:p-12 relative z-10">
                <h2 className="text-3xl font-black mb-2 text-center">CREATE <span className="text-[var(--accent)]">ACCOUNT</span></h2>
                <p className="text-gray-400 text-center mb-8 font-mono text-sm">Join the future of tech</p>

                {error && <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-lg mb-6 text-sm text-center">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-mono text-xs text-gray-500 mb-2">FULL NAME</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-[var(--primary)] border border-[var(--border)] rounded-lg px-4 py-3 outline-none focus:border-[var(--accent)] transition-colors text-[var(--text)]"
                            placeholder="John Doe"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-mono text-xs text-gray-500 mb-2">EMAIL</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-[var(--primary)] border border-[var(--border)] rounded-lg px-4 py-3 outline-none focus:border-[var(--accent)] transition-colors"
                            placeholder="user@nextron.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-mono text-xs text-gray-500 mb-2">PASSWORD</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-[var(--primary)] border border-[var(--border)] rounded-lg px-4 py-3 outline-none focus:border-[var(--accent)] transition-colors"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-mono text-xs text-gray-500 mb-2">CONFIRM PASSWORD</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full bg-[var(--primary)] border border-[var(--border)] rounded-lg px-4 py-3 outline-none focus:border-[var(--accent)] transition-colors"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full btn-primary py-4 rounded-full font-bold mt-4">
                        SIGN UP
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-gray-500">
                    Already have an account? <Link to="/login" className="text-[var(--accent)] hover:underline">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
