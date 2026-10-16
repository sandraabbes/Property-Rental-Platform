import { Link } from 'react-router-dom';

/* Inline SVG icons — consistent 16px, stroke-width 1.5 */
const MapPinIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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

const PropertyCard = ({ property }) => {
    const hasImage = property.images && property.images.length > 0;

    return (
        <article className="property-card">
            <div className="card-image-container">
                {hasImage ? (
                    <img
                        src={property.images[0]}
                        alt={property.title}
                        className="card-image"
                        loading="lazy"
                    />
                ) : (
                    <div className="card-no-image">No photo</div>
                )}
            </div>

            <div className="card-content">
                <p className="card-city">
                    <MapPinIcon />
                    {property.city}
                </p>
                <h3 className="card-title">{property.title}</h3>
                <p className="card-price">
                    ${Number(property.price).toLocaleString()}
                    <span> / month</span>
                </p>
                <div className="card-meta">
                    <span className="card-meta-item">
                        <DoorOpenIcon />
                        {property.rooms} {property.rooms === 1 ? 'room' : 'rooms'}
                    </span>
                </div>
            </div>

            <div className="card-footer">
                <Link
                    to={`/properties/${property._id}`}
                    className="btn btn-outline btn-block"
                >
                    View listing
                </Link>
            </div>
        </article>
    );
};

export default PropertyCard;
