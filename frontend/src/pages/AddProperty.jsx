import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

            await axios.post('http://localhost:5000/api/properties', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate('/admin');
        } catch (err) {
            console.error(err);
            alert('Error adding property');
        }
    };

    return (
        <div className="auth-container">
            <div className="card auth-card" style={{ maxWidth: '600px' }}>
                <h2 className="auth-title">Add Property</h2>
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
                        <input type="file" name="images" onChange={onFileChange} multiple accept="image/*" />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Add Property</button>
                </form>
            </div>
        </div>
    );
};

export default AddProperty;
