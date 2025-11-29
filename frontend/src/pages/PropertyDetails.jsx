import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const PropertyDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [property, setProperty] = useState(null);
    const [message, setMessage] = useState('');
    const [msgSent, setMsgSent] = useState(false);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/properties/${id}`);
                setProperty(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchProperty();
    }, [id]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/messages', {
                propertyId: id,
                userEmail: user ? user.email : 'guest@example.com', // Fallback or require login
                message
            });
            setMsgSent(true);
            setMessage('');
        } catch (err) {
            console.error(err);
        }
    };

    if (!property) return <p>Loading...</p>;

    return (
        <div className="container">
            <div className="property-details-grid">
                <div className="property-image-wrapper">
                    {property.images.length > 0 ? (
                        <img src={property.images[0]} alt={property.title} className="property-detail-image" />
                    ) : (
                        <div style={{ height: '400px', backgroundColor: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ color: '#9ca3af' }}>No Image Available</span>
                        </div>
                    )}
                </div>

                <div className="property-info-wrapper">
                    <div>
                        <h2 className="property-title">{property.title}</h2>
                        <p className="property-location" style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>{property.city}</p>
                        <p className="property-price">${property.price} <span style={{ fontSize: '1rem', fontWeight: 'normal', color: 'var(--text-secondary)' }}>/ month</span></p>
                    </div>

                    <div className="property-meta">
                        <span>{property.rooms} Rooms</span>
                        <span>{property.city}</span>
                    </div>

                    <div className="property-description">
                        <p>{property.description}</p>
                    </div>

                    <div className="contact-section">
                        <h3 className="contact-title">Contact Owner</h3>
                        {msgSent && <div className="message-success">Message sent successfully!</div>}
                        <form onSubmit={handleSendMessage}>
                            <div className="form-group">
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="I'm interested in this property..."
                                    className="form-control"
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', minHeight: '120px', resize: 'vertical' }}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">Send Message</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetails;
