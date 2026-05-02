export const loggerMiddleware = (req, res, next) => {
    next();
};

export const errorLoggerMiddleware = (err, req, res, next) => {
    next(err);
};
