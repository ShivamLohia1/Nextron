import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { validateEmailDomain } from '../../utils/emailValidator';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useStore();
    const navigate = useNavigate();
    const [error, setError] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const domainCheck = validateEmailDomain(email);
        if (!domainCheck.valid) {
            setError(domainCheck.error);
            return;
        }
        const result = await login(email, password);
        if (result.success) {
            navigate('/');
        } else if (result.error === 'USER_NOT_FOUND') {
            setError('No account found with this email. Please sign up first.');
        } else if (result.error === 'WRONG_PASSWORD') {
            setError('Incorrect password. Please try again.');
        } else {
            setError(result.error || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6 pt-20">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-20 left-10 w-96 h-96 bg-[var(--accent)] rounded-full blur-[120px]"></div>
            </div>

            <div className="w-full max-w-md bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-8 md:p-12 relative z-10">
                <h2 className="text-3xl font-black mb-2 text-center">WELCOME <span className="text-[var(--accent)]">BACK</span></h2>
                <p className="text-gray-400 text-center mb-8 font-mono text-sm">Log in to access your account</p>

                {error && <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-lg mb-6 text-sm text-center">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block font-mono text-xs text-gray-500 mb-2">EMAIL</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-[var(--primary)] border border-[var(--border)] rounded-lg px-4 py-3 outline-none focus:border-[var(--accent)] transition-colors text-[var(--text)]"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-mono text-xs text-gray-500 mb-2">PASSWORD</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-[var(--primary)] border border-[var(--border)] rounded-lg px-4 py-3 outline-none focus:border-[var(--accent)] transition-colors text-[var(--text)]"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full btn-primary py-4 rounded-full font-bold">
                        LOGIN
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-gray-500">
                    Don't have an account? <Link to="/signup" className="text-[var(--accent)] hover:underline">Sign Up</Link>
                </div>
                <div className="mt-4 text-center text-xs text-gray-600 font-mono">
                    Try: admin@nextron.com / admin
                </div>
            </div>
        </div>
    );
};

export default Login;
