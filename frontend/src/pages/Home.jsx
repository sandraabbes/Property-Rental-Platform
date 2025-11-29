import { useState, useEffect } from 'react';
import axios from 'axios';
import PropertyCard from '../components/PropertyCard';
import FilterBar from '../components/FilterBar';

const Home = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProperties = async (filters = {}) => {
        setLoading(true);
        try {
            const params = new URLSearchParams(filters).toString();
            const res = await axios.get(`http://localhost:5000/api/properties?${params}`);
            setProperties(res.data);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    return (
        <div className="container">
            <FilterBar onFilter={fetchProperties} />
            {loading ? (
                <p style={{ textAlign: 'center', fontSize: '1.2rem', color: 'var(--text-secondary)' }}>Loading properties...</p>
            ) : (
                <div className="property-grid">
                    {properties.map(property => (
                        <PropertyCard key={property._id} property={property} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
