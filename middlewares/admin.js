const admin = async (req, res, next) => {
    const role = req.user.role

    if (role === "admin") next();
    else return res.status(401).send("Process failed: Invalid Role");
}

module.exports = admin