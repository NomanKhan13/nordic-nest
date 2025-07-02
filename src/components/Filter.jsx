import { useState } from 'react';

// components/Filters.jsx
const Filters = ({ onFilter, filtersApplied }) => {
  const [filters, setFilters] = useState(filtersApplied);
  const updateFilters = (e) =>
    setFilters((prevFilters) => {
      if (e.target.name === 'location') {
        const isChecked = e.target.checked;
        const value = e.target.value;
        return {
          ...prevFilters,
          location: isChecked
            ? [...prevFilters.location, value] // add
            : prevFilters.location.filter((loc) => loc !== value), // remove
        };
      }

      if (
        e.target.name === 'superhost' ||
        e.target.name === 'wifi' ||
        e.target.name === 'petAllowed'
      ) {
        return {
          ...prevFilters,
          [e.target.name]: e.target.checked,
        };
      }

      return {
        ...prevFilters,
        [e.target.name]: e.target.value,
      };
    });

  const handleReset = () => {
    const defaultFilters = {
      location: [],
      superhost: false,
      wifi: false,
      petAllowed: false,
      bedrooms: 'any',
      bathrooms: 'any',
      price: '0-Infinity',
    };
    setFilters(defaultFilters);
    onFilter(defaultFilters); // Apply immediately (optional)
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 text-sm">
      {/* Bedrooms */}
      <div className="flex flex-col gap-2">
        <label htmlFor="bedrooms">🛏️ Bedrooms</label>
        <select
          id="bedrooms"
          name="bedrooms"
          value={filters['bedrooms']}
          onChange={updateFilters}
          className="bg-white rounded p-2"
          data-active={false}
        >
          <option value="any">Any</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>

      {/* Bathrooms */}
      <div className="flex flex-col gap-2">
        <label htmlFor="bathrooms">🛁 Bathrooms</label>
        <select
          id="bathrooms"
          name="bathrooms"
          value={filters['bathrooms']}
          className="bg-white rounded p-2"
          onChange={updateFilters}
        >
          <option value="any">Any</option>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
      </div>

      {/* Price Range */}
      <div className="flex flex-col gap-2 col-span-2">
        <label htmlFor="price">💵 Price</label>
        <select
          id="price"
          name="price"
          value={filters['price']}
          className="bg-white rounded p-2"
          onChange={updateFilters}
        >
          <option value="0-Infinity">Any</option>
          <option value="0-100">Below $100</option>
          <option value="100-199">$100 to $199</option>
          <option value="200-299">$200 to $299</option>
          <option value="300-500">Above $300</option>
        </select>
      </div>

      {/* Superhost */}
      <div className="flex flex-col gap-2 col-span-2">
        <p>🌟 Features</p>
        <div className="bg-white rounded p-2 space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="w-4 h-4 accent-[#4A5A40] rounded-sm"
              id="superhost"
              name="superhost"
              checked={filters['superhost']}
              onChange={updateFilters}
            />
            Superhost only
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="w-4 h-4 accent-[#4A5A40] rounded-sm"
              id="wifi"
              name="wifi"
              checked={filters['wifi']}
              onChange={updateFilters}
            />
            WiFi available
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="w-4 h-4 accent-[#4A5A40] rounded-sm"
              id="petAllowed"
              name="petAllowed"
              checked={filters['petAllowed']}
              onChange={updateFilters}
            />
            Pet Friendly
          </label>
        </div>
      </div>

      {/* Locations */}
      <div className="flex flex-col gap-2 col-span-2">
        <p>📍 Location</p>
        <div className="bg-white rounded p-2 space-y-2">
          {[
            'Norway',
            'Finland',
            'Sweden',
            'Switzerland',
            'Denmark',
            'Iceland',
          ].map((loc) => (
            <label key={loc} className="flex items-center gap-2">
              <input
                onChange={updateFilters}
                type="checkbox"
                className="w-4 h-4 accent-[#4A5A40] rounded-sm"
                name="location"
                value={loc}
                checked={filters.location.includes(loc)}
              />
              {loc}
            </label>
          ))}
        </div>
      </div>
      
      <button
        type="button"
        onClick={handleReset}
        className="border border-gray-300 text-gray-700 font-medium col-span-2 text-center p-4 rounded-md hover:bg-gray-100 transition"
      >
        Reset Filters
      </button>

      <button
        type="submit"
        className="flex items-center justify-center gap-2 bg-[#4A5A40] text-white font-medium col-span-2 text-center p-4 rounded-md cursor-pointer hover:bg-[#3a4932] transition"
      >
        Apply Filters
      </button>
    </form>
  );
};

export default Filters;
