import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const [properties, setProperties] = useState([]);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const propRes = await axios.get('http://localhost:5000/api/properties');
                setProperties(propRes.data);

                const msgRes = await axios.get('http://localhost:5000/api/messages');
                setMessages(msgRes.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await axios.delete(`http://localhost:5000/api/properties/${id}`);
                setProperties(properties.filter(p => p._id !== id));
            } catch (err) {
                console.error(err);
            }
        }
    };



    if (!user || user.role !== 'admin') return <p>Access Denied</p>;

    return (
        <div className="container" style={{ padding: '2rem' }}>
            <h2>Admin Dashboard</h2>
            <Link to="/admin/add-property" className="btn btn-primary" style={{ marginBottom: '1rem' }}>Add New Property</Link>

            <h3>Properties</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2rem' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Title</th>
                        <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Price</th>
                        <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {properties.map(property => (
                        <tr key={property._id}>
                            <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{property.title}</td>
                            <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>${property.price}</td>
                            <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>
                                <Link to={`/admin/edit-property/${property._id}`} style={{ marginRight: '1rem', color: 'blue', textDecoration: 'none' }}>Edit</Link>
                                <button onClick={() => handleDelete(property._id)} style={{ color: 'red', cursor: 'pointer', border: 'none', background: 'none' }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3>Messages</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {messages.map(msg => (
                    <li key={msg._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '0.5rem' }}>
                        <div>
                            <strong>Property:</strong> {msg.propertyId ? msg.propertyId.title : 'Unknown'} <br />
                            <strong>From:</strong> {msg.userEmail} <br />
                            <strong>Message:</strong> {msg.message}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;
