import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            console.error(err);
            alert('Login failed');
        }
    };

    return (
        <div className="auth-container">
            <div className="card auth-card">
                <h2 className="auth-title">Login</h2>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input type="email" name="email" value={email} onChange={onChange} required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input type="password" name="password" value={password} onChange={onChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
