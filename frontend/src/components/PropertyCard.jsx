import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => {
    return (
        <div className="card property-card">
            <div className="card-image-container">
                {property.images.length > 0 ? (
                    <img src={property.images[0]} alt={property.title} className="card-image" />
                ) : (
                    <div className="card-image" style={{ backgroundColor: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: '#9ca3af' }}>No Image</span>
                    </div>
                )}
            </div>
            <div className="card-content">
                <h3 className="card-title">{property.title}</h3>
                <p className="card-location">{property.city}</p>
                <p className="card-price">${property.price} <span style={{ fontSize: '0.9rem', fontWeight: 'normal', color: 'var(--text-secondary)' }}>/ month</span></p>
                <div className="card-details">
                    <span>{property.rooms} Rooms</span>
                </div>
                <div className="card-footer">
                    <Link to={`/properties/${property._id}`} className="btn btn-outline btn-block">View Details</Link>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;
