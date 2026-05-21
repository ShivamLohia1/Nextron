import React from 'react';
import gsap from 'gsap';

const Contact = () => {
    React.useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from('.contact-content', { y: 30, opacity: 0, duration: 1, stagger: 0.2, ease: 'power3.out' });
        });
        return () => ctx.revert();
    }, []);

    return (
        <div className="min-h-screen pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20">
                <div className="contact-content">
                    <h1 className="text-5xl md:text-6xl font-black mb-8">GET IN <span className="text-[var(--accent)]">TOUCH</span></h1>
                    <p className="text-xl text-gray-400 mb-12 leading-relaxed">
                        Have a question about our products? Need support with an order?
                        Our team is here to help you experience the future of tech.
                    </p>

                    <div className="space-y-8">
                        {[
                            { title: 'EMAIL US', value: 'support@nextron.com', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
                            { title: 'CALL US', value: '+1 (555) 123-4567', icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' },
                            { title: 'VISIT US', value: '123 Innovation Dr, Tech City, CA 90210', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' }
                        ].map((item, index) => (
                            <div key={index} className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] shrink-0">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-[var(--accent-2)] text-sm mb-1">{item.title}</h3>
                                    <p className="text-lg font-mono">{item.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="contact-content bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-8 md:p-12">
                    <form className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold mb-2 ml-1">NAME</label>
                                <input type="text" className="w-full bg-[var(--primary)] border border-[var(--border)] rounded-xl px-4 py-3 focus:border-[var(--accent)] transition-colors" placeholder="John Doe" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2 ml-1">EMAIL</label>
                                <input type="email" className="w-full bg-[var(--primary)] border border-[var(--border)] rounded-xl px-4 py-3 focus:border-[var(--accent)] transition-colors" placeholder="john@example.com" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2 ml-1">SUBJECT</label>
                            <select className="w-full bg-[var(--primary)] border border-[var(--border)] rounded-xl px-4 py-3 focus:border-[var(--accent)] transition-colors appearance-none">
                                <option>General Inquiry</option>
                                <option>Order Support</option>
                                <option>Product Information</option>
                                <option>Partnership</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2 ml-1">MESSAGE</label>
                            <textarea rows="5" className="w-full bg-[var(--primary)] border border-[var(--border)] rounded-xl px-4 py-3 focus:border-[var(--accent)] transition-colors" placeholder="How can we help you?"></textarea>
                        </div>
                        <button type="submit" className="w-full btn-primary py-4 rounded-xl font-bold tracking-wide">
                            SEND MESSAGE
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
