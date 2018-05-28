import mongoose from '../../../database';

const TagSchema = new mongoose.Schema({
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

const Tag = mongoose.model('Tag', TagSchema);

export default Tag;