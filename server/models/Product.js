import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 },
    trending: { type: Boolean, default: false }
});

const Product = mongoose.model('Product', productSchema);

export default Product;
