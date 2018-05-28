import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import chalk from 'chalk';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

const authMiddleware = (req, res, next) => {
    console.log(chalk.inverse('================ AUTH ================'));
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).send({
            error: "No token provided",
            code: "TOKEN"
        });

    //Bearer cafdsfsd7f987sdf8a7df89sdfdsf7af
    const parts = authHeader.split(' ');

    if (!parts.length === 2)
        return res.status(401).send({
            error: "Token error",
            code: "TOKEN"
        });

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({
            error: 'Token malformatted',
            code: "TOKEN"
        });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).send({
            error: 'Token invalid',
            code: "TOKEN"
        });

        req.userId = decoded.params.id;
        req.userEmail = decoded.params.email;
        console.log(decoded.params);

        return next();
    });
};

export default authMiddleware;