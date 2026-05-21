import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

const Trending = () => {
    const [trendingProducts, setTrendingProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/products/trending')
            .then(res => res.json())
            .then(data => {
                setTrendingProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching trending products:', err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="pt-24 min-h-screen px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black mb-4">
                            TRENDING <span className="text-[var(--accent)]">NOW</span>
                        </h1>
                        <p className="text-gray-400 font-mono text-sm max-w-xl">
                            Discover the most sought-after tech in our community right now. 
                            These items are flying off the digital shelves.
                        </p>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="w-10 h-10 border-4 border-[var(--border)] border-t-[var(--accent)] rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {trendingProducts.length > 0 ? (
                            trendingProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        ) : (
                            <p className="col-span-full text-center text-gray-500 font-mono py-20">
                                No trending products found.
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Trending;
