import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

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

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/properties/${id}`);
                const property = res.data;
                setFormData({
                    title: property.title,
                    description: property.description,
                    price: property.price,
                    city: property.city,
                    rooms: property.rooms
                });
            } catch (err) {
                console.error(err);
            }
        };
        fetchProperty();
    }, [id]);

    const { title, description, price, city, rooms } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onFileChange = e => {
        setImages(e.target.files);
    };

    const onSubmit = async e => {
        e.preventDefault();
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
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate('/admin');
        } catch (err) {
            console.error(err);
            alert('Error updating property');
        }
    };

    return (
        <div className="auth-container">
            <div className="card auth-card" style={{ maxWidth: '600px' }}>
                <h2 className="auth-title">Edit Property</h2>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="text" name="title" value={title} onChange={onChange} placeholder="Title" required />
                    </div>
                    <div className="form-group">
                        <textarea name="description" value={description} onChange={onChange} placeholder="Description" required style={{ minHeight: '100px', resize: 'vertical' }} />
                    </div>
                    <div className="form-group">
                        <input type="number" name="price" value={price} onChange={onChange} placeholder="Price" required />
                    </div>
                    <div className="form-group">
                        <input type="text" name="city" value={city} onChange={onChange} placeholder="City" required />
                    </div>
                    <div className="form-group">
                        <input type="number" name="rooms" value={rooms} onChange={onChange} placeholder="Rooms" required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Add New Images (Optional)</label>
                        <input type="file" name="images" onChange={onFileChange} multiple accept="image/*" />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Update Property</button>
                </form>
            </div>
        </div>
    );
};

export default EditProperty;
