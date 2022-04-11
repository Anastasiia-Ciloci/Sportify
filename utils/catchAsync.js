module.exports = (fn) => {
    console.log(-1)
    return (req, res, next) => {
        fn(req, res, next).catch(err => console.log(err));
    };
};
