import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const { email, password } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            console.error(err);
            setError('Incorrect email or password. Try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            {/* Left panel */}
            <div className="auth-panel" aria-hidden="true">
                <p className="auth-panel-title">
                    Real homes.<br />
                    <em>Direct contact.</em><br />
                    No middlemen.
                </p>
                <p className="auth-panel-sub">
                    Browse verified listings across Tunisia.
                    Message owners without going through an agency.
                </p>
            </div>

            {/* Right form */}
            <div className="auth-form-side">
                <div className="auth-form-box">
                    <h1 className="auth-title">Sign in</h1>
                    <p className="auth-subtitle">Enter your credentials to access your account.</p>

                    {error && (
                        <p role="alert" style={{
                            fontSize: 'var(--text-sm)',
                            color: 'var(--err)',
                            background: 'var(--err-bg)',
                            padding: '0.6rem 0.875rem',
                            borderRadius: 'var(--r-md)',
                            marginBottom: 'var(--s4)'
                        }}>
                            {error}
                        </p>
                    )}

                    <form onSubmit={onSubmit} noValidate>
                        <div className="form-group">
                            <label className="form-label" htmlFor="login-email">Email address</label>
                            <input
                                id="login-email"
                                type="email"
                                name="email"
                                value={email}
                                onChange={onChange}
                                placeholder="you@example.com"
                                required
                                autoComplete="email"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="login-password">Password</label>
                            <input
                                id="login-password"
                                type="password"
                                name="password"
                                value={password}
                                onChange={onChange}
                                placeholder="Your password"
                                required
                                autoComplete="current-password"
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary btn-block"
                            style={{ padding: '0.7rem', marginTop: 'var(--s2)' }}
                            disabled={loading}
                        >
                            {loading ? 'Signing in…' : 'Sign in'}
                        </button>
                    </form>

                    <p className="auth-link">
                        Don't have an account?{' '}
                        <Link to="/register">Create one</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
