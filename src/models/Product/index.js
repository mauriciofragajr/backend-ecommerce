import mongoose from '../../database';

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    price: {
        type: Number,
        required: true
    },
    promotionalPrice: {
        type: Number
    },
    quantity: {
        type: Number
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
    }],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    status: {
        type: Boolean,
        default: true
    },
    shipping: {
        weight: Number,
        dimensions: {
            width: Number,
            heigth: Number,
            depth: Number
        }
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    },
    gallery: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    }],
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;