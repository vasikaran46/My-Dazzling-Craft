import { FiSearch } from 'react-icons/fi';

export function SearchBar({ value, onChange, placeholder = 'Search jewelry...' }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.5rem',
      border: '1.5px solid #e7b9d4', borderRadius: '4px',
      padding: '0.5rem 0.75rem', flex: 1, maxWidth: '340px',
      background: '#fff', transition: 'border-color 0.2s',
    }}
      onFocus={e => e.currentTarget.style.borderColor = '#b04a9f'}
      onBlur={e => e.currentTarget.style.borderColor = '#e7b9d4'}
    >
      <FiSearch size={16} color="#aaa" />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          border: 'none', outline: 'none',
          fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem',
          color: '#333', width: '100%', background: 'transparent',
        }}
      />
    </div>
  );
}

export function Filters({ categories, selectedCategory, onCategoryChange, maxPrice, onMaxPriceChange, inStockOnly, onInStockChange }) {
  return (
    <aside>
      {/* Category Filter */}
      <div style={{ background: '#fff', border: '1px solid #e7b9d4', borderRadius: '8px', padding: '1.25rem', marginBottom: '1rem' }}>
        <div style={{ fontSize: '0.78rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#999', marginBottom: '0.75rem' }}>
          Categories
        </div>
        <div>
          {['All', ...categories.map(c => c.name)].map(cat => (
            <label key={cat} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', cursor: 'pointer' }}>
              <input
                type="radio"
                name="category"
                value={cat}
                checked={selectedCategory === cat}
                onChange={() => onCategoryChange(cat)}
                style={{ accentColor: '#b04a9f', cursor: 'pointer' }}
              />
              <span style={{ fontSize: '0.85rem', color: '#333' }}>{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div style={{ background: '#fff', border: '1px solid #e7b9d4', borderRadius: '8px', padding: '1.25rem', marginBottom: '1rem' }}>
        <div style={{ fontSize: '0.78rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#999', marginBottom: '0.75rem' }}>
          Max Price
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem' }}>
          <span style={{ color: '#aaa' }}>₹0</span>
          <input
            type="range" min="0" max="8000" step="100"
            value={maxPrice}
            onChange={e => onMaxPriceChange(parseInt(e.target.value))}
            style={{ flex: 1, accentColor: '#b04a9f' }}
          />
          <span style={{ color: '#7f246f', fontWeight: 500, minWidth: '55px', textAlign: 'right' }}>₹{maxPrice.toLocaleString()}</span>
        </div>
      </div>

      {/* Availability */}
      <div style={{ background: '#fff', border: '1px solid #e7b9d4', borderRadius: '8px', padding: '1.25rem' }}>
        <div style={{ fontSize: '0.78rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#999', marginBottom: '0.75rem' }}>
          Availability
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={e => onInStockChange(e.target.checked)}
            style={{ accentColor: '#b04a9f', cursor: 'pointer' }}
          />
          <span style={{ fontSize: '0.85rem', color: '#333' }}>In Stock Only</span>
        </label>
      </div>
    </aside>
  );
}
