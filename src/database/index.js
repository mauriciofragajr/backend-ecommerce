import mongoose from 'mongoose';

const NAME_DATABASE = 'ecommerce'

mongoose.connect(`mongodb://localhost/${NAME_DATABASE}`, (err, db) => {
    if (err) throw err;
    console.log('db connect..');
});

export default mongoose;