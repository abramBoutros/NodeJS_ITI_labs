// jwt.verify(token, "shhhhh", function (err, decoded) {
// 	console.log(decoded.foo); // bar
// });

const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { getOneUser } = require("../controllers/users");
const verify = promisify(jwt.verify);

const { SECRET } = process.env;

const auth = async (req, res, next) => {
	const { authorization } = req.headers;
	const user = await verify(authorization, SECRET).catch((e) =>
		res.status(401).end()
	);

	req.user = await getOneUser(user.id);
	next();
};

module.exports = auth;
