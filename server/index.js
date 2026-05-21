import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './models/User.js';
import Order from './models/Order.js';
import Product from './models/Product.js';
import authMiddleware from './middleware/auth.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

connectDB();

// Routes
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: 'EMAIL_EXISTS', message: 'User already exists with this email.' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        user = new User({
            name,
            email,
            password: hashedPassword,
        });

        await user.save();

        // Generate JWT
        const payload = {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET || 'nextron_super_secret_jwt_key_change_in_production',
            { expiresIn: '7d' },
            (err, token) => {
                if (err) throw err;
                res.status(201).json({ token, user: payload.user });
            }
        );
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Handle hardcoded admin for testing (optional but keeping to match existing logic)
        if (email === 'admin@nextron.com' && password === 'admin') {
            const adminUser = { id: 'admin', name: 'Admin User', email, role: 'admin' };
            const token = jwt.sign(
                { user: adminUser },
                process.env.JWT_SECRET || 'nextron_super_secret_jwt_key_change_in_production',
                { expiresIn: '7d' }
            );
            return res.json({ token, user: adminUser });
        }

        // Check for user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'USER_NOT_FOUND', message: 'No account found with this email.' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'WRONG_PASSWORD', message: 'Incorrect password.' });
        }

        // Generate JWT
        const payload = {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET || 'nextron_super_secret_jwt_key_change_in_production',
            { expiresIn: '7d' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, user: payload.user });
            }
        );
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// User Data Routes
app.get('/api/user/data', authMiddleware, async (req, res) => {
    try {
        // Exclude hardcoded admin
        if (req.user.id === 'admin') {
            return res.json({ cart: [], wishlist: [], orders: [] });
        }
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ msg: 'User not found' });

        const orders = await Order.find({ user: req.user.id }).sort({ date: -1 });

        res.json({
            cart: user.cart,
            wishlist: user.wishlist,
            orders
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.put('/api/user/cart', authMiddleware, async (req, res) => {
    try {
        if (req.user.id === 'admin') return res.json({ msg: 'Cart updated (admin skip)' });
        const { cart } = req.body;
        await User.findByIdAndUpdate(req.user.id, { cart });
        res.json({ msg: 'Cart updated' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.put('/api/user/wishlist', authMiddleware, async (req, res) => {
    try {
        if (req.user.id === 'admin') return res.json({ msg: 'Wishlist updated (admin skip)' });
        const { wishlist } = req.body;
        await User.findByIdAndUpdate(req.user.id, { wishlist });
        res.json({ msg: 'Wishlist updated' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.post('/api/user/order', authMiddleware, async (req, res) => {
    try {
        if (req.user.id === 'admin') {
            const fakeOrder = { ...req.body, id: Date.now(), status: 'Processing' };
            // Decrement stock for each item for admin test user
            for (const item of fakeOrder.items) {
                await Product.findOneAndUpdate(
                    { id: item.id },
                    { $inc: { stock: -item.quantity } }
                );
            }
            return res.json(fakeOrder);
        }
        const { items, total, customerInfo, date } = req.body;

        const newOrder = new Order({
            user: req.user.id,
            items,
            total,
            customerInfo,
            date
        });

        const order = await newOrder.save();

        // Decrement stock for each item
        for (const item of items) {
            await Product.findOneAndUpdate(
                { id: item.id },
                { $inc: { stock: -item.quantity } }
            );
        }

        // Clear cart
        await User.findByIdAndUpdate(req.user.id, { cart: [] });

        res.json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Product Routes
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/api/products/trending', async (req, res) => {
    try {
        const trendingProducts = await Product.find({ trending: true });
        res.json(trendingProducts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
