import React, { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS_DATA } from '../data';

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState(PRODUCTS_DATA);

    // Fetch all products on load
    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                if (data && data.length > 0) {
                    setProducts(data);
                }
            })
            .catch(console.error);
    }, []);

    // UI State
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isWishlistOpen, setIsWishlistOpen] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [isAdminMode, setIsAdminMode] = useState(false);

    // Auth State
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('nextron_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    
    // Automatically set admin mode on load if user is admin
    useEffect(() => {
        if (user && user.role === 'admin') {
            setIsAdminMode(true);
        } else {
            setIsAdminMode(false);
        }
    }, [user]);

    // Fetch User Data (cart, wishlist, orders) from MongoDB
    useEffect(() => {
        if (user) {
            const token = localStorage.getItem('nextron_token');
            if (token) {
                fetch('/api/user/data', {
                    headers: { 'x-auth-token': token }
                })
                .then(res => res.json())
                .then(data => {
                    if (data.cart) setCart(data.cart);
                    if (data.wishlist) setWishlist(data.wishlist);
                    if (data.orders) setOrders(data.orders);
                })
                .catch(console.error);
            }
        } else {
            // Clear data if logged out
            setCart([]);
            setWishlist([]);
            setOrders([]);
        }
    }, [user]);

    // Theme State
    const [theme, setTheme] = useState(() => localStorage.getItem('nextron_theme') || 'dark');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('nextron_theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

    const navigate = useNavigate();

    const navigateToCategory = (categoryId) => {
        navigate(`/products?category=${categoryId}`);
    };

    const syncCart = async (newCart) => {
        if (user) {
            const token = localStorage.getItem('nextron_token');
            if (token) {
                await fetch('/api/user/cart', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
                    body: JSON.stringify({ cart: newCart })
                }).catch(console.error);
            }
        }
    };

    const syncWishlist = async (newWishlist) => {
        if (user) {
            const token = localStorage.getItem('nextron_token');
            if (token) {
                await fetch('/api/user/wishlist', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
                    body: JSON.stringify({ wishlist: newWishlist })
                }).catch(console.error);
            }
        }
    };

    const addToCart = (product) => {
        const existing = cart.find(item => item.id === product.id);
        let newCart;
        if (existing) {
            newCart = cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
        } else {
            newCart = [...cart, { ...product, quantity: 1 }];
        }
        setCart(newCart);
        setIsCartOpen(true);
        syncCart(newCart);
    };

    const removeFromCart = (productId) => {
        const newCart = cart.filter(item => item.id !== productId);
        setCart(newCart);
        syncCart(newCart);
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity === 0) {
            removeFromCart(productId);
            return;
        }
        const newCart = cart.map(item => item.id === productId ? { ...item, quantity } : item);
        setCart(newCart);
        syncCart(newCart);
    };

    const addToWishlist = (product) => {
        if (!wishlist.find(item => item.id === product.id)) {
            const newWishlist = [...wishlist, product];
            setWishlist(newWishlist);
            syncWishlist(newWishlist);
        }
    };

    const removeFromWishlist = (productId) => {
        const newWishlist = wishlist.filter(item => item.id !== productId);
        setWishlist(newWishlist);
        syncWishlist(newWishlist);
    };

    const placeOrder = async (orderData) => {
        const orderPayload = {
            items: cart,
            total: cartTotal,
            customerInfo: orderData,
            date: new Date().toISOString()
        };

        if (user) {
            const token = localStorage.getItem('nextron_token');
            try {
                const response = await fetch('/api/user/order', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
                    body: JSON.stringify(orderPayload)
                });
                if (response.ok) {
                    const newOrder = await response.json();
                    setOrders([newOrder, ...orders]);
                    
                    // Update local product stock
                    setProducts(prevProducts => prevProducts.map(p => {
                        const cartItem = cart.find(item => item.id === p.id);
                        if (cartItem) {
                            return { ...p, stock: p.stock - cartItem.quantity };
                        }
                        return p;
                    }));

                    setCart([]);
                    return newOrder;
                }
            } catch (err) {
                console.error(err);
            }
        }

        // Fallback for guest or if request fails
        const newOrder = {
            id: Date.now(),
            ...orderPayload,
            status: 'Processing'
        };
        setOrders([newOrder, ...orders]);
        
        // Update local product stock
        setProducts(prevProducts => prevProducts.map(p => {
            const cartItem = cart.find(item => item.id === p.id);
            if (cartItem) {
                return { ...p, stock: p.stock - cartItem.quantity };
            }
            return p;
        }));

        setCart([]);
        return newOrder;
    };

    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    // ─── Auth helpers ─────────────────────────────────────────────────────────

    /**
     * Register a new user.
     * @returns {{ success: boolean, error?: string }}
     */
    const signup = async (email, password, name) => {
        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                return { success: false, error: data.error || 'Signup failed' };
            }

            // Save token and user details
            localStorage.setItem('nextron_token', data.token);
            localStorage.setItem('nextron_user', JSON.stringify(data.user));
            
            setUser(data.user);
            return { success: true };
        } catch (error) {
            console.error('Signup error:', error);
            return { success: false, error: 'Network error. Please try again later.' };
        }
    };

    /**
     * Log in an existing user.
     * @returns {{ success: boolean, error?: string }}
     */
    const login = async (email, password) => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                return { success: false, error: data.error || 'Login failed' };
            }

            // Save token and user details
            localStorage.setItem('nextron_token', data.token);
            localStorage.setItem('nextron_user', JSON.stringify(data.user));

            setUser(data.user);
            return { success: true };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: 'Network error. Please try again later.' };
        }
    };

    const logout = () => {
        localStorage.removeItem('nextron_token');
        localStorage.removeItem('nextron_user');
        setUser(null);
        setIsAdminMode(false);
    };

    return (
        <StoreContext.Provider value={{
            cart, wishlist, orders, products,
            isCartOpen, isWishlistOpen, isCheckoutOpen, isAdminMode, user,
            theme, toggleTheme,
            setProducts, addToCart, removeFromCart, updateQuantity,
            addToWishlist, removeFromWishlist, setIsCartOpen, setIsWishlistOpen,
            setIsCheckoutOpen, setIsAdminMode, cartTotal, cartCount, placeOrder,
            login, logout, signup, navigateToCategory
        }}>
            {children}
        </StoreContext.Provider>
    );
};
