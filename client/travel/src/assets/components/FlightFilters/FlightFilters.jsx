import React from 'react';
import './FlightFilters.css';

const FlightFilters = ({ filters, updateFilters }) => {
  return (
    <aside className="filter-bar">
      <h2>Filters</h2>
      <div className="filter-section">
        <h3>Airlines</h3>
        {['Air India', 'PIA', 'Air China', 'Singapore Airlines', 'Emirates'].map((airline) => (
          <label key={airline}>
            <input
              type="checkbox"
              checked={filters.airlines.includes(airline)}
              onChange={(e) => {
                const checked = e.target.checked;
                updateFilters(
                  'airlines',
                  checked
                    ? [...filters.airlines, airline]
                    : filters.airlines.filter((a) => a !== airline)
                );
              }}
            />{' '}
            {airline}
          </label>
        ))}
      </div>
      <div className="filter-section">
        <h3>Price</h3>
        <button
          className={`filter-button ${filters.priceOrder === 'low-to-high' ? 'active' : ''}`}
          onClick={() => updateFilters('priceOrder', 'low-to-high')}
        >
          Low to High
        </button>
        <button
          className={`filter-button ${filters.priceOrder === 'high-to-low' ? 'active' : ''}`}
          onClick={() => updateFilters('priceOrder', 'high-to-low')}
        >
          High to Low
        </button>
      </div>
      <div className="filter-section">
        <h3>Other Features</h3>
        <label>
          <input
            type="checkbox"
            checked={filters.nonStop}
            onChange={(e) => updateFilters('nonStop', e.target.checked)}
          />{' '}
          Non-stop Flights
        </label>
        <label>
          <input
            type="checkbox"
            checked={filters.refundable}
            onChange={(e) => updateFilters('refundable', e.target.checked)}
          />{' '}
          Refundable
        </label>
        <label>
          <input
            type="checkbox"
            checked={filters.extraBaggage}
            onChange={(e) => updateFilters('extraBaggage', e.target.checked)}
          />{' '}
          Extra Baggage
        </label>
      </div>
    </aside>
  );
};

export default FlightFilters;