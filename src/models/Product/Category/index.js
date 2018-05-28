import mongoose from '../../../database';

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    }
});

const Category = mongoose.model('Category', CategorySchema);

export default Category;