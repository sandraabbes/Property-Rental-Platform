import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

/* ---- SVG Icons (Lucide-style, 16px, stroke-width 1.75) ---- */
const PlusIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
);

const PencilIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
);

const TrashIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="3 6 5 6 21 6"/>
        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
        <path d="M10 11v6"/><path d="M14 11v6"/>
        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
    </svg>
);

const InboxIcon = () => (
    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/>
        <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 17.93 4H6.07a2 2 0 0 0-1.62.83z"/>
    </svg>
);

const HomeIcon = () => (
    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
);

const LockIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
);

/* ------------------------------------------------------------ */

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const [properties, setProperties] = useState([]);
    const [messages, setMessages] = useState([]);
    const [activeTab, setActiveTab] = useState('properties');
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [propRes, msgRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/properties'),
                    axios.get('http://localhost:5000/api/messages')
                ]);
                setProperties(propRes.data);
                setMessages(msgRes.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this property? This cannot be undone.')) return;
        setDeletingId(id);
        try {
            await axios.delete(`http://localhost:5000/api/properties/${id}`);
            setProperties(prev => prev.filter(p => p._id !== id));
        } catch (err) {
            console.error(err);
        } finally {
            setDeletingId(null);
        }
    };

    if (!user || user.role !== 'admin') {
        return (
            <div className="access-denied">
                <LockIcon />
                <h1 className="access-denied__title">Access denied</h1>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-3)' }}>
                    This page is restricted to administrators.
                </p>
            </div>
        );
    }

    const avgPrice = properties.length > 0
        ? Math.round(properties.reduce((s, p) => s + Number(p.price), 0) / properties.length)
        : null;

    return (
        <div className="container">
            <div className="admin-page">

                {/* Top row */}
                <div className="admin-top">
                    <div>
                        <h1 className="admin-page-title">Dashboard</h1>
                        <p className="admin-page-sub">
                            Manage listings and review tenant messages.
                        </p>
                    </div>
                    <Link to="/admin/add-property" className="btn btn-primary">
                        <PlusIcon />
                        Add listing
                    </Link>
                </div>

                {/* Stat strip */}
                <div className="admin-stats">
                    <div className="admin-stat">
                        <span className="admin-stat__value">{properties.length}</span>
                        <span className="admin-stat__label">Active listings</span>
                    </div>
                    <div className="admin-stat">
                        <span className="admin-stat__value">{messages.length}</span>
                        <span className="admin-stat__label">Messages received</span>
                    </div>
                    {avgPrice !== null && (
                        <div className="admin-stat">
                            <span className="admin-stat__value">${avgPrice.toLocaleString()}</span>
                            <span className="admin-stat__label">Average rent / mo</span>
                        </div>
                    )}
                </div>

                {/* Tabs */}
                <div className="admin-tabs" role="tablist">
                    <button
                        role="tab"
                        aria-selected={activeTab === 'properties'}
                        className={`admin-tab${activeTab === 'properties' ? ' admin-tab--active' : ''}`}
                        onClick={() => setActiveTab('properties')}
                    >
                        Listings
                        <span className="admin-tab-badge">{properties.length}</span>
                    </button>
                    <button
                        role="tab"
                        aria-selected={activeTab === 'messages'}
                        className={`admin-tab${activeTab === 'messages' ? ' admin-tab--active' : ''}`}
                        onClick={() => setActiveTab('messages')}
                    >
                        Messages
                        <span className="admin-tab-badge">{messages.length}</span>
                    </button>
                </div>

                {/* --- Properties tab --- */}
                {activeTab === 'properties' && (
                    properties.length === 0 ? (
                        <div className="admin-empty">
                            <HomeIcon className="admin-empty__icon" />
                            <p className="admin-empty__text">No listings yet. Add your first property.</p>
                        </div>
                    ) : (
                        <div className="admin-table-wrap">
                            <table className="admin-table" aria-label="Property listings">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Title</th>
                                        <th>City</th>
                                        <th>Rent / mo</th>
                                        <th>Rooms</th>
                                        <th><span className="sr-only">Actions</span></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {properties.map((property, idx) => (
                                        <tr
                                            key={property._id}
                                            className={deletingId === property._id ? 'admin-row--deleting' : ''}
                                        >
                                            <td className="td-num">{idx + 1}</td>
                                            <td className="td-title">{property.title}</td>
                                            <td className="td-city">{property.city || '—'}</td>
                                            <td className="td-price">
                                                ${Number(property.price).toLocaleString()}
                                            </td>
                                            <td className="td-rooms">
                                                {property.rooms
                                                    ? `${property.rooms} room${property.rooms !== 1 ? 's' : ''}`
                                                    : '—'}
                                            </td>
                                            <td>
                                                <div className="td-actions">
                                                    <Link
                                                        to={`/admin/edit-property/${property._id}`}
                                                        className="action-btn action-btn--edit"
                                                        aria-label={`Edit ${property.title}`}
                                                    >
                                                        <PencilIcon />
                                                        Edit
                                                    </Link>
                                                    <button
                                                        className="action-btn action-btn--delete"
                                                        onClick={() => handleDelete(property._id)}
                                                        disabled={deletingId === property._id}
                                                        aria-label={`Delete ${property.title}`}
                                                    >
                                                        <TrashIcon />
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )
                )}

                {/* --- Messages tab --- */}
                {activeTab === 'messages' && (
                    messages.length === 0 ? (
                        <div className="admin-empty">
                            <InboxIcon className="admin-empty__icon" />
                            <p className="admin-empty__text">No messages yet.</p>
                        </div>
                    ) : (
                        <div className="admin-messages">
                            {messages.map((msg) => (
                                <div key={msg._id} className="msg-card">
                                    <div className="msg-avatar" aria-hidden="true">
                                        {(msg.userEmail || 'U')[0].toUpperCase()}
                                    </div>
                                    <div>
                                        <div className="msg-header">
                                            <span className="msg-email">{msg.userEmail}</span>
                                            <span className="msg-re">
                                                re: {msg.propertyId ? msg.propertyId.title : 'Unknown listing'}
                                            </span>
                                        </div>
                                        <p className="msg-body">{msg.message}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                )}

            </div>
        </div>
    );
};

export default AdminDashboard;
