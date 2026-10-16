import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

/* SVG icons — consistent 16px, stroke-width 1.5 */
const ArrowLeftIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="19" y1="12" x2="5" y2="12"/>
        <polyline points="12 19 5 12 12 5"/>
    </svg>
);

const MapPinIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
    </svg>
);

const DoorOpenIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M13 4H3v18h10V4z"/>
        <path d="M21 20V8l-8-4"/>
        <circle cx="16" cy="12" r="1" fill="currentColor"/>
    </svg>
);

const CheckIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="20 6 9 17 4 12"/>
    </svg>
);

const PropertyDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [property, setProperty] = useState(null);
    const [message, setMessage] = useState('');
    const [msgSent, setMsgSent] = useState(false);
    const [sending, setSending] = useState(false);

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
        setSending(true);
        try {
            await axios.post('http://localhost:5000/api/messages', {
                propertyId: id,
                userEmail: user ? user.email : 'guest@example.com',
                message
            });
            setMsgSent(true);
            setMessage('');
        } catch (err) {
            console.error(err);
        } finally {
            setSending(false);
        }
    };

    if (!property) {
        return (
            <div className="container">
                <p className="loading-row">Loading listing…</p>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="detail-page">
                <button
                    type="button"
                    className="detail-back"
                    onClick={() => navigate(-1)}
                    aria-label="Back to listings"
                >
                    <ArrowLeftIcon />
                    All listings
                </button>

                <div className="detail-grid">
                    {/* Left: image */}
                    <div className="detail-image-wrap">
                        {property.images && property.images.length > 0 ? (
                            <img
                                src={property.images[0]}
                                alt={property.title}
                                className="detail-image"
                            />
                        ) : (
                            <div className="detail-no-image">No photo available</div>
                        )}
                    </div>

                    {/* Right: info */}
                    <div className="detail-info">
                        <p className="detail-city">
                            <MapPinIcon />
                            {property.city}
                        </p>

                        <h1 className="detail-title">{property.title}</h1>

                        <p className="detail-price">
                            ${Number(property.price).toLocaleString()}
                            <span> / month</span>
                        </p>

                        <div className="detail-pills">
                            <span className="detail-pill">
                                <DoorOpenIcon />
                                {property.rooms} {property.rooms === 1 ? 'room' : 'rooms'}
                            </span>
                            <span className="detail-pill">
                                <MapPinIcon />
                                {property.city}
                            </span>
                        </div>

                        <div>
                            <p className="detail-desc-label">About this property</p>
                            <p className="detail-desc" style={{ marginTop: '0.5rem' }}>{property.description}</p>
                        </div>

                        <div className="contact-section">
                            <h2 className="contact-title">Send a message to the owner</h2>

                            {msgSent && (
                                <div className="message-success">
                                    <CheckIcon />
                                    Message sent. The owner will contact you by email.
                                </div>
                            )}

                            <form onSubmit={handleSendMessage} noValidate>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="contact-message">Your message</label>
                                    <textarea
                                        id="contact-message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Hi, I'm interested in this property and would like to arrange a viewing…"
                                        style={{ minHeight: '110px' }}
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-block"
                                    style={{ padding: '0.7rem' }}
                                    disabled={sending || msgSent}
                                >
                                    {sending ? 'Sending…' : msgSent ? 'Message sent' : 'Send message'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetails;
