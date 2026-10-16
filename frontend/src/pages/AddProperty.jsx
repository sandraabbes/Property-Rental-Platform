import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const AddProperty = () => {
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
            await axios.post('http://localhost:5000/api/properties', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            navigate('/admin');
        } catch (err) {
            console.error(err);
            alert('Failed to add property. Please try again.');
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

                <h1 className="form-page-title">Add a property</h1>
                <p className="form-page-sub">All fields are required unless noted.</p>

                <form onSubmit={onSubmit} noValidate>
                    <p className="form-section-label">Basic information</p>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label" htmlFor="add-title">Title</label>
                            <input
                                id="add-title"
                                type="text"
                                name="title"
                                value={title}
                                onChange={onChange}
                                placeholder="e.g. Bright 3-bedroom in El Menzah"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="add-city">City</label>
                            <input
                                id="add-city"
                                type="text"
                                name="city"
                                value={city}
                                onChange={onChange}
                                placeholder="e.g. Tunis"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label" htmlFor="add-price">Monthly rent ($)</label>
                            <input
                                id="add-price"
                                type="number"
                                name="price"
                                value={price}
                                onChange={onChange}
                                placeholder="e.g. 800"
                                min="0"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="add-rooms">Number of rooms</label>
                            <input
                                id="add-rooms"
                                type="number"
                                name="rooms"
                                value={rooms}
                                onChange={onChange}
                                placeholder="e.g. 3"
                                min="1"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="add-description">Description</label>
                        <textarea
                            id="add-description"
                            name="description"
                            value={description}
                            onChange={onChange}
                            placeholder="Describe the layout, condition, nearby amenities, transport links…"
                            style={{ minHeight: '130px' }}
                            required
                        />
                    </div>

                    <p className="form-section-label">Photos</p>

                    <div className="form-group">
                        <div className="file-drop-zone">
                            <label className="file-drop-label" htmlFor="add-images">
                                <ImageIcon />
                                <span className="file-drop-text">
                                    {images.length > 0
                                        ? <><strong>{images.length} file{images.length !== 1 ? 's' : ''} selected</strong></>
                                        : <><strong>Choose photos</strong> or drag them here</>
                                    }
                                </span>
                                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-3)' }}>
                                    JPEG, PNG, WebP — multiple allowed
                                </span>
                            </label>
                            <input
                                id="add-images"
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
                        {isSubmitting ? 'Publishing…' : 'Publish listing'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProperty;
