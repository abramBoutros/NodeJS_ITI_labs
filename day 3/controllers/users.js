const User = require("../models/users");
const Todo = require("../models/todos");

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
module.exports = {
	deleteUser,
	createUser,
	getAllUsers,
	getOneUser,
	updateUser,
	getUserTodos,
};
