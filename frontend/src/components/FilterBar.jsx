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

    const handleReset = () => {
        const cleared = { city: '', minPrice: '', maxPrice: '', rooms: '' };
        setFilters(cleared);
        onFilter(cleared);
    };

    return (
        <form onSubmit={handleSubmit} className="filter-bar" role="search" aria-label="Filter properties">
            <label>
                <span>City</span>
                <input
                    type="text"
                    name="city"
                    placeholder="e.g. Tunis"
                    value={filters.city}
                    onChange={handleChange}
                    className="filter-input"
                    aria-label="Filter by city"
                />
            </label>
            <label>
                <span>Min price</span>
                <input
                    type="number"
                    name="minPrice"
                    placeholder="0"
                    value={filters.minPrice}
                    onChange={handleChange}
                    className="filter-input"
                    aria-label="Minimum price"
                />
            </label>
            <label>
                <span>Max price</span>
                <input
                    type="number"
                    name="maxPrice"
                    placeholder="Any"
                    value={filters.maxPrice}
                    onChange={handleChange}
                    className="filter-input"
                    aria-label="Maximum price"
                />
            </label>
            <label>
                <span>Min rooms</span>
                <input
                    type="number"
                    name="rooms"
                    placeholder="Any"
                    value={filters.rooms}
                    onChange={handleChange}
                    className="filter-input"
                    aria-label="Minimum rooms"
                />
            </label>
            <button type="submit" className="btn btn-primary filter-btn">Apply</button>
            <button type="button" className="btn btn-ghost filter-btn" onClick={handleReset}>Clear</button>
        </form>
    );
};

export default FilterBar;
