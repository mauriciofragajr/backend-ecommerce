import chalk from 'chalk';

const log = (req, res, next) => {
    console.log(chalk.italic.gray("Chamando Api", new Date()));
    next();
};

export default log;