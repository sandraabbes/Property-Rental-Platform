import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ArrowLeftIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="19" y1="12" x2="5" y2="12"/>
        <polyline points="12 19 5 12 12 5"/>
    </svg>
);

const ImageIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
    </svg>
);

const EditProperty = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        city: '',
        rooms: ''
    });
    const [images, setImages] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/properties/${id}`);
                const p = res.data;
                setFormData({
                    title: p.title,
                    description: p.description,
                    price: p.price,
                    city: p.city,
                    rooms: p.rooms
                });
            } catch (err) {
                console.error(err);
            }
        };
        fetchProperty();
    }, [id]);

    const { title, description, price, city, rooms } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onFileChange = e => setImages(e.target.files);

    const onSubmit = async e => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const data = new FormData();
            data.append('title', title);
            data.append('description', description);
            data.append('price', price);
            data.append('city', city);
            data.append('rooms', rooms);
            for (let i = 0; i < images.length; i++) {
                data.append('images', images[i]);
            }
            await axios.put(`http://localhost:5000/api/properties/${id}`, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            navigate('/admin');
        } catch (err) {
            console.error(err);
            alert('Failed to update property. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="form-centered">
            <div className="form-centered-box">
                <button
                    type="button"
                    className="form-back-btn"
                    onClick={() => navigate('/admin')}
                    aria-label="Back to dashboard"
                >
                    <ArrowLeftIcon />
                    Back to dashboard
                </button>

                <h1 className="form-page-title">Edit property</h1>
                <p className="form-page-sub">Modify the fields below and save when done.</p>

                <form onSubmit={onSubmit} noValidate>
                    <p className="form-section-label">Basic information</p>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label" htmlFor="edit-title">Title</label>
                            <input
                                id="edit-title"
                                type="text"
                                name="title"
                                value={title}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="edit-city">City</label>
                            <input
                                id="edit-city"
                                type="text"
                                name="city"
                                value={city}
                                onChange={onChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label" htmlFor="edit-price">Monthly rent ($)</label>
                            <input
                                id="edit-price"
                                type="number"
                                name="price"
                                value={price}
                                onChange={onChange}
                                min="0"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="edit-rooms">Number of rooms</label>
                            <input
                                id="edit-rooms"
                                type="number"
                                name="rooms"
                                value={rooms}
                                onChange={onChange}
                                min="1"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="edit-description">Description</label>
                        <textarea
                            id="edit-description"
                            name="description"
                            value={description}
                            onChange={onChange}
                            style={{ minHeight: '130px' }}
                            required
                        />
                    </div>

                    <p className="form-section-label">Replace photos <span style={{ textTransform: 'none', fontWeight: 400, letterSpacing: 0, color: 'var(--ink-3)' }}>(optional)</span></p>

                    <div className="form-group">
                        <div className="file-drop-zone">
                            <label className="file-drop-label" htmlFor="edit-images">
                                <ImageIcon />
                                <span className="file-drop-text">
                                    {images.length > 0
                                        ? <><strong>{images.length} file{images.length !== 1 ? 's' : ''} selected</strong></>
                                        : <><strong>Choose new photos</strong> or leave blank to keep existing ones</>
                                    }
                                </span>
                                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-3)' }}>
                                    JPEG, PNG, WebP — multiple allowed
                                </span>
                            </label>
                            <input
                                id="edit-images"
                                type="file"
                                name="images"
                                onChange={onFileChange}
                                multiple
                                accept="image/*"
                                style={{ display: 'none' }}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="form-submit-btn"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Saving…' : 'Save changes'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProperty;
