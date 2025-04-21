// components/home/ProductSection.jsx
import React from 'react';
import ProductCard from '../../components/home/ProductCard';
import './ProductSection.scss';

const ProductSection = ({ dataH2, loading, dataProducts = [] }) => {
  return (
    <section className="product-section">
      {dataH2 && (<h2 className="section-title">{dataH2}</h2>)}
      {loading && <div id="loading" style={{ display: loading ? "block" : "none" }}>
        <div className="loading">
          <span className="loading-circle"></span>
          <span className="loading-circle"></span>
          <span className="loading-circle"></span>
          <span className="loading-circle-shadow"></span>
          <span className="loading-circle-shadow"></span>
          <span className="loading-circle-shadow"></span>
        </div>
      </div>}
      <div className="product-list">
        {dataProducts.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
