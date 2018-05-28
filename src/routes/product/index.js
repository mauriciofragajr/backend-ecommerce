import express from 'express';
import Product from '../../models/Product';
import Tag from '../../models/Product/Tag';
import Category from '../../models/Product/Category';
import Image from '../../models/Image';

let productRoute = express.Router();

// GET
productRoute.get('/', async (req, res) => {
    try {
        const products = await Product.find().populate({
            path: 'tags',
            select: 'name slug'
        }).populate({
            path: 'category',
            select: 'name slug'
        });
        return res.send({
            products,
            code: 'OK'
        });
    } catch (err) {
        return res.status(400).send({
            msg: 'Get failed',
            err,
            code: 'ERROR'
        });
    };
});

productRoute.get('/tags', async (req, res) => {
    try {
        const tags = await Tag.find();
        return res.send({
            tags,
            code: 'OK'
        });
    } catch (err) {
        return res.status(400).send({
            msg: 'Get failed',
            err,
            code: 'ERROR'
        });
    };
});

productRoute.get('/categories', async (req, res) => {
    try {
        const categories = await Category.find();
        return res.send({
            categories,
            code: 'OK'
        });
    } catch (err) {
        return res.status(400).send({
            msg: 'Get failed',
            err,
            code: 'ERROR'
        });
    };
});

// CREATE
productRoute.post('/', async (req, res) => {
    try {
        let {
            image,
            gallery
        } = req.body;

        if (image) {
            image = await Image.create({
                base64_img: image
            });
            req.body.image = image._id;
        }

        if (gallery) {
            let array = [];
            gallery.map(pic => {
                array.push({
                    base64_img: pic
                })
            });
            gallery = await Image.insertMany(array);
            gallery = gallery.map(pic => pic._id);
            req.body.gallery = gallery;
        }

        const product = await Product.create(req.body);
        return res.send({
            product,
            code: 'OK'
        });
    } catch (err) {
        return res.status(400).send({
            msg: 'Creation failed',
            err,
            code: 'ERROR'
        });
    };
});

productRoute.post('/tags', async (req, res) => {
    try {
        const tag = await Tag.create(req.body);
        return res.send({
            tag,
            code: 'OK'
        });
    } catch (err) {
        return res.status(400).send({
            msg: 'Creation failed',
            err,
            code: 'ERROR'
        });
    };
});

productRoute.post('/categories', async (req, res) => {
    try {
        const category = await Category.create(req.body);
        return res.send({
            category,
            code: 'OK'
        });
    } catch (err) {
        return res.status(400).send({
            msg: 'Creation failed',
            err,
            code: 'ERROR'
        });
    };
});

// UPDATE
// productRoute.put('/', async (req, res) => {

// });

// productRoute.put('/tags', async (req, res) => {

// });

// productRoute.put('/categories', async (req, res) => {

// });

// DELETE
// productRoute.del('/', async (req, res) => {

// });

// productRoute.del('/tags', async (req, res) => {

// });

// productRoute.del('/categories', async (req, res) => {

// });

export default productRoute;