import React from 'react';

const About = () => {
    return (
        <div className="min-h-screen px-6 py-32">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-5xl md:text-6xl font-black mb-8">ABOUT <span className="text-[var(--accent)]">NEXTRON</span></h2>
                <div className="space-y-6 text-lg text-gray-400">
                    <p>We're not just another electronics store. We're curators of innovation, bringing you the most cutting-edge technology.</p>
                    <p>Founded in 2020, NEXTRON has become the go-to destination for tech enthusiasts who demand more from their devices.</p>
                    <p>Our mission is simple: democratize access to premium technology and make the future available today.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-center">
                    <div className="p-8 border border-[var(--border)] rounded-2xl bg-[var(--surface)]">
                        <div className="text-4xl font-bold text-[var(--accent)] mb-2">2020</div>
                        <div className="text-gray-500 font-mono text-sm">ESTABLISHED</div>
                    </div>
                    <div className="p-8 border border-[var(--border)] rounded-2xl bg-[var(--surface)]">
                        <div className="text-4xl font-bold text-[var(--accent)] mb-2">50+</div>
                        <div className="text-gray-500 font-mono text-sm">COUNTRIES</div>
                    </div>
                    <div className="p-8 border border-[var(--border)] rounded-2xl bg-[var(--surface)]">
                        <div className="text-4xl font-bold text-[var(--accent)] mb-2">24/7</div>
                        <div className="text-gray-500 font-mono text-sm">SUPPORT</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
