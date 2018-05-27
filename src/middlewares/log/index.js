const log = (req, res, next) => {
    console.log("Chamando Api", new Date());
    next();
}

export default log;