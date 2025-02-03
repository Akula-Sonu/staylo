module.exports = func => {
    return (req, res, next) => {
        func(req, res, next).catch(err => {
            console.error('Error caught by catchAsync:', err);
            next(err);
        });
    };
};
