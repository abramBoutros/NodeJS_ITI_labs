const Todo = require("../models/todos");
const User = require("../models/users");

const findOne = (id) => {
	const todo = Todo.findById(id).populate("userId");
	return todo;
};

async function deleteTodo(id) {
	const todo = await Todo.findById(id);
	if (!todo) {
		return;
	}
	const res = await Todo.deleteOne({ id });
	return res;
}

async function getTodos(filter, limitTodos, skipTodos) {
	const allTodos = await Todo.count({});
	if (skipTodos >= allTodos) {
		return;
	}
	return await Todo.find({ filter }).skip(skipTodos).limit(limitTodos);
}

async function createTodo(title, tags, userId) {
	// check if the user id exists
	const user = await User.findById(userId);
	if (!user) {
		return;
	}
	const todo = await Todo.create({
		tags,
		title,
		userId,
	});
	todo.save();
	return todo;
}

async function updateTodo(id, title, userId, status, tags) {
	const todo = await Todo.findById(id);
	if (!todo) {
		return;
	}
	if (title) {
		todo.title = title;
	}
	if (userId) {
		todo.userId = userId;
	}
	if (status) {
		todo.status = status;
	}
	if (tags) {
		todo.tags = tags;
	}

	todo.save();
	return todo;
}

module.exports = {
	createTodo,
	deleteTodo,
	getTodos,
	findOne,
	updateTodo,
};
