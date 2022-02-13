const User = require("../models/users");
const Todo = require("../models/todos");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function deleteUser(id) {
	const user = await User.findById(id);
	if (!user) {
		return;
	}
	const res = await User.deleteOne({ id });
	return res;
}
async function createUser(userName, password, firstName, lastName, dob) {
	// i used create then save to make the entity pass throw the validation
	const user = await User.create({
		userName,
		password,
		firstName,
		lastName,
		dob,
	});

	// i generated the hashed password here because the middleware was being called twice
	// so it was mutating the password twice
	const salt = bcrypt.genSaltSync(10);
	user.password = bcrypt.hashSync(user.password, salt);
	user.save();
	return user;
}

async function updateUser(id, userName, password, firstName, lastName, dob) {
	const user = await User.findById(id);
	if (!user) {
		return;
	}
	if (userName) {
		user.userName = userName;
	}
	if (password) {
		user.password = password;
	}
	if (firstName) {
		user.firstName = firstName;
	}
	if (lastName) {
		user.lastName = lastName;
	}
	if (dob) {
		user.dob = dob;
	}

	user.save();
	return user;
}

async function getAllUsers() {
	return await User.find({}, { _id: 0, firstName: 1 });
}

async function getUserTodos(id) {
	return await Todo.find({ userId: id });
}
async function getOneUser(id) {
	return await User.find({ _id: id });
}

const { SECRET } = process.env;

async function login(userName, password) {
	const user = await User.findOne({ userName });

	const valid = await user.comparePasswords(password);
	if (!valid) throw "UN_AUTH";

	return jwt.sign(
		{
			userName,
			userId: user.id,
		},
		SECRET,
		{ expiresIn: "9h" }
	);
}
module.exports = {
	deleteUser,
	createUser,
	getAllUsers,
	getOneUser,
	updateUser,
	getUserTodos,
	login,
};
