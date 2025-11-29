import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const { name, email, password, role } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            await register(name, email, password, role);
            navigate('/');
        } catch (err) {
            console.error(err);
            alert('Registration failed');
        }
    };

    return (
        <div className="auth-container">
            <div className="card auth-card">
                <h2 className="auth-title">Register</h2>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label className="form-label">Name</label>
                        <input type="text" name="name" value={name} onChange={onChange} required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input type="email" name="email" value={email} onChange={onChange} required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input type="password" name="password" value={password} onChange={onChange} required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Role</label>
                        <select name="role" value={role} onChange={onChange}>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
