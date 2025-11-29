import { useState } from 'react';

const FilterBar = ({ onFilter }) => {
    const [filters, setFilters] = useState({
        city: '',
        minPrice: '',
        maxPrice: '',
        rooms: ''
    });

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilter(filters);
    };

    return (
        <form onSubmit={handleSubmit} className="filter-bar">
            <input type="text" name="city" placeholder="City" value={filters.city} onChange={handleChange} className="filter-input" />
            <input type="number" name="minPrice" placeholder="Min Price" value={filters.minPrice} onChange={handleChange} className="filter-input" />
            <input type="number" name="maxPrice" placeholder="Max Price" value={filters.maxPrice} onChange={handleChange} className="filter-input" />
            <input type="number" name="rooms" placeholder="Min Rooms" value={filters.rooms} onChange={handleChange} className="filter-input" />
            <button type="submit" className="btn btn-primary filter-btn">Filter</button>
        </form>
    );
};

export default FilterBar;
