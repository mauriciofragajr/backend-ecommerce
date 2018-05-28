import mongoose from '../../database';

const ImageSchema = new mongoose.Schema({
    base64_img: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Image = mongoose.model('Image', ImageSchema);

export default Image;