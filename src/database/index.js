import mongoose from 'mongoose';
import chalk from 'chalk';
const NAME_DATABASE = 'ecommerce'

mongoose.connect(`mongodb://localhost/${NAME_DATABASE}`, (err, db) => {
    if (err) throw err;
    console.log(chalk.green('mongo db connected..'));
});

export default mongoose;