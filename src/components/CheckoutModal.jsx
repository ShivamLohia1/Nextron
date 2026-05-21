import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';

const CheckoutModal = () => {
    const { isCheckoutOpen, setIsCheckoutOpen, placeOrder, setIsCartOpen } = useStore();
    const [step, setStep] = useState(1);
    const [orderComplete, setOrderComplete] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '', email: '', phone: '', address: '', city: '', state: '', zipCode: '', country: '',
        cardNumber: '', cardName: '', expiryDate: '', cvv: ''
    });

    if (!isCheckoutOpen) return null;

    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (step < 3) {
            setStep(step + 1);
        } else {
            await placeOrder(formData);
            setOrderComplete(true);
            setTimeout(() => {
                setIsCheckoutOpen(false);
                setIsCartOpen(false);
                setOrderComplete(false);
                setStep(1);
                setFormData({ fullName: '', email: '', phone: '', address: '', city: '', state: '', zipCode: '', country: '', cardNumber: '', cardName: '', expiryDate: '', cvv: '' });
            }, 3000);
        }
    };

    if (orderComplete) {
        return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center">
                <div className="modal-backdrop absolute inset-0"></div>
                <div className="relative bg-[var(--primary)] border-2 border-[var(--accent)] rounded-3xl p-12 max-w-md text-center">
                    <svg className="w-24 h-24 mx-auto mb-6" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="var(--accent)" strokeWidth="4" />
                        <path className="checkmark" fill="none" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round" d="M30 50 L45 65 L70 35" />
                    </svg>
                    <h2 className="text-3xl font-black mb-4">ORDER PLACED!</h2>
                    <p className="text-gray-400 mb-2">Your order has been successfully placed.</p>
                    <p className="text-sm text-gray-500">Order ID: #{Date.now()}</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="fixed inset-0 modal-backdrop z-[60]" onClick={() => setIsCheckoutOpen(false)}></div>
            <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
                <div className="relative bg-[var(--primary)] border border-[var(--border)] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto hide-scrollbar p-8">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-black">CHECKOUT</h2>
                        <button onClick={() => setIsCheckoutOpen(false)} className="w-10 h-10 rounded-full border border-[var(--border)] hover:border-[var(--accent)] transition-colors flex items-center justify-center">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex items-center justify-between mb-8">
                        {[1, 2, 3].map(num => (
                            <React.Fragment key={num}>
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= num ? 'bg-[var(--accent)] text-[var(--primary)]' : 'bg-[var(--surface)] border border-[var(--border)]'}`}>{num}</div>
                                {num < 3 && <div className={`flex-1 h-1 mx-2 ${step > num ? 'bg-[var(--accent)]' : 'bg-[var(--surface)]'}`}></div>}
                            </React.Fragment>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit}>
                        {step === 1 && (
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold mb-4">Shipping Information</h3>
                                <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleInputChange} className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-lg px-4 py-3" required />
                                <div className="grid md:grid-cols-2 gap-4">
                                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-lg px-4 py-3" required />
                                    <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-lg px-4 py-3" required />
                                </div>
                                <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleInputChange} className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-lg px-4 py-3" required />
                                <div className="grid md:grid-cols-2 gap-4">
                                    <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleInputChange} className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-lg px-4 py-3" required />
                                    <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleInputChange} className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-lg px-4 py-3" required />
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <input type="text" name="zipCode" placeholder="ZIP Code" value={formData.zipCode} onChange={handleInputChange} className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-lg px-4 py-3" required />
                                    <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleInputChange} className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-lg px-4 py-3" required />
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div>
                                <h3 className="text-xl font-bold mb-4">Shipping Method</h3>
                                <label className="flex items-center justify-between p-4 bg-[var(--surface)] border-2 border-[var(--accent)] rounded-lg mb-4">
                                    <div className="flex items-center gap-4">
                                        <input type="radio" name="shipping" defaultChecked className="w-5 h-5" />
                                        <div><div className="font-bold">Standard Shipping</div><div className="text-sm text-gray-500">5-7 business days</div></div>
                                    </div>
                                    <div className="font-bold text-[var(--accent)]">FREE</div>
                                </label>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold mb-4">Payment Information</h3>
                                <input type="text" name="cardNumber" placeholder="Card Number" value={formData.cardNumber} onChange={handleInputChange} className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-lg px-4 py-3" required />
                                <input type="text" name="cardName" placeholder="Cardholder Name" value={formData.cardName} onChange={handleInputChange} className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-lg px-4 py-3" required />
                                <div className="grid md:grid-cols-2 gap-4">
                                    <input type="text" name="expiryDate" placeholder="MM/YY" value={formData.expiryDate} onChange={handleInputChange} className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-lg px-4 py-3" required />
                                    <input type="text" name="cvv" placeholder="CVV" value={formData.cvv} onChange={handleInputChange} className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-lg px-4 py-3" required />
                                </div>
                            </div>
                        )}

                        <div className="flex gap-4 mt-8">
                            {step > 1 && <button type="button" onClick={() => setStep(step - 1)} className="flex-1 btn-outline py-4 rounded-full font-mono text-sm">BACK</button>}
                            <button type="submit" className="flex-1 btn-primary py-4 rounded-full font-mono text-sm">{step === 3 ? 'PLACE ORDER' : 'CONTINUE'}</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CheckoutModal;
