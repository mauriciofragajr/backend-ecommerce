import mongoose from '../../database';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date(),
    }
});

const User = mongoose.model('User', UserSchema);

export default User;