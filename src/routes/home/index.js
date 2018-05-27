import express from 'express';
import User from '../../models/User';
let homeRoute = express.Router();

homeRoute.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users).status(200);
    } catch (err) {
        res.send(err).status(500);
    }
});

export default homeRoute;