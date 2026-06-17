import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { SearchBar, Filters } from '../components/SearchBar';
import { categories } from '../data/categories';
import { useStore } from '../hooks/useStore';

export default function Shop() {
  const [searchParams] = useSearchParams();
  const { products } = useStore();
  const initCat = searchParams.get('category') || 'All';

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initCat);
  const [maxPrice, setMaxPrice] = useState(8000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState('latest');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    const cat = searchParams.get('category') || 'All';
    setSelectedCategory(cat);
  }, [searchParams]);

  const filtered = useMemo(() => {
    let list = products.filter(p => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.category.toLowerCase().includes(search.toLowerCase())) return false;
      if (p.price > maxPrice) return false;
      if (inStockOnly && !p.available) return false;
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
      return true;
    });

    if (sort === 'low') list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === 'high') list = [...list].sort((a, b) => b.price - a.price);
    else if (sort === 'popular') list = [...list].sort((a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0));

    return list;
  }, [products, search, selectedCategory, maxPrice, inStockOnly, sort]);

  return (
    <section className="shop-section">
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '0.75rem' }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: '#170014' }}>
            Shop Our <em style={{ color: '#b04a9f' }}>Collection</em>
          </h1>
        </div>
        <p style={{ textAlign: 'center', color: '#777', fontSize: '0.9rem', marginBottom: '2rem' }}>
          Discover {products.length}+ handcrafted jewelry pieces
        </p>

        {/* Horizontal Category Scroll for Mobile */}
        <div className="mobile-category-scroll no-scrollbar">
          {['All', ...categories.map(c => c.name)].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                display: 'inline-block',
                padding: '0.45rem 1rem',
                borderRadius: '20px',
                border: `1.5px solid ${selectedCategory === cat ? '#b04a9f' : '#e7b9d4'}`,
                background: selectedCategory === cat ? '#b04a9f' : '#fff',
                color: selectedCategory === cat ? '#fff' : '#333',
                fontSize: '0.78rem',
                fontWeight: selectedCategory === cat ? 600 : 400,
                fontFamily: "'DM Sans', sans-serif",
                cursor: 'pointer',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setShowMobileFilters(v => !v)}
          style={{
            display: 'none', background: '#fff2f8', border: '1px solid #e7b9d4',
            padding: '0.6rem 1rem', borderRadius: '4px', cursor: 'pointer',
            fontSize: '0.85rem', color: '#333', marginBottom: '1rem',
            fontFamily: "'DM Sans', sans-serif",
          }}
          className="mobile-filter-btn"
        >
          🔧 {showMobileFilters ? 'Hide' : 'Show'} Extra Filters
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '2rem', alignItems: 'start' }} className="shop-grid">
          {/* Filters */}
          <div className={showMobileFilters ? 'filters-visible' : 'filters-hidden-mobile'}>
            <Filters
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              maxPrice={maxPrice}
              onMaxPriceChange={setMaxPrice}
              inStockOnly={inStockOnly}
              onInStockChange={setInStockOnly}
            />
          </div>

          {/* Products */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
              <SearchBar value={search} onChange={setSearch} />
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                style={{
                  border: '1.5px solid #e7b9d4', borderRadius: '4px',
                  padding: '0.5rem 0.75rem', fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.85rem', color: '#333', outline: 'none',
                  background: '#fff', cursor: 'pointer',
                }}
              >
                <option value="latest">Latest</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="popular">Popular</option>
              </select>
            </div>

            <p style={{ fontSize: '0.82rem', color: '#aaa', marginBottom: '1rem' }}>
              {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
              {selectedCategory !== 'All' && ` in "${selectedCategory}"`}
            </p>

            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ textAlign: 'center', padding: '4rem 2rem', color: '#aaa' }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                <p style={{ fontSize: '1rem' }}>No products found.</p>
                <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>Try adjusting your filters or search term.</p>
              </motion.div>
            ) : (
              <div className="shop-product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
                {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .shop-section {
          padding: 3rem 2rem 5rem;
        }
        .mobile-category-scroll {
          display: none;
        }
        @media (max-width: 768px) {
          .shop-section {
            padding: 2rem 1.25rem 4rem !important;
          }
          .shop-grid { grid-template-columns: 1fr !important; }
          .mobile-filter-btn { display: block !important; }
          .filters-hidden-mobile { display: none; }
          .filters-visible { display: block; }
          .mobile-category-scroll {
            display: flex !important;
            gap: 0.5rem;
            overflow-x: auto;
            padding: 0.25rem 0.25rem 0.75rem;
            margin-bottom: 1.25rem;
            -webkit-overflow-scrolling: touch;
          }
        }
        @media (max-width: 640px) {
          .shop-product-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.75rem !important;
          }
        }
      `}</style>
    </section>
  );
}
