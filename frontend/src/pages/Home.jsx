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
        <main>
            <div className="container">
                <header className="page-header">
                    <p className="page-header__eyebrow">Rental listings</p>
                    <h1 className="page-header__title">
                        Find a property that fits your life — not just your budget.
                    </h1>
                </header>

                <FilterBar onFilter={fetchProperties} />

                {loading ? (
                    <p className="loading-row">Loading properties…</p>
                ) : properties.length === 0 ? (
                    <p className="loading-row">No properties match your filters.</p>
                ) : (
                    <>
                        <div className="section-row">
                            <h2 className="section-title">Available now</h2>
                            <span className="section-count">{properties.length} listing{properties.length !== 1 ? 's' : ''}</span>
                        </div>
                        <div className="property-grid">
                            {properties.map(property => (
                                <PropertyCard key={property._id} property={property} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </main>
    );
};

export default Home;
