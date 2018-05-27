import express from 'express';
let homeRoute = express.Router();

homeRoute.get('/', (req, res) => {
    res.status(200).send({
        result: 'OK'
    })
});

export default homeRoute;