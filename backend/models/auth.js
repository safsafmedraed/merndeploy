module.exports = {
    ensureAuthentificated: function (req, res, next) {
        if (req.isAuthetificated()) {
            return next();
        }
        console.log("please login to view this resource")
    }
}