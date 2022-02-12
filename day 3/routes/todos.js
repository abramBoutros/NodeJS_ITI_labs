const express = require("express");

const {
	createTodo,
	deleteTodo,
	getTodos,
	findOne,
	updateTodo,
} = require("../controllers/todos");

const router = express.Router();

router.get("", async function (req, res) {
	const { filter, limit, skip } = req.query;
	const r = await getTodos(filter, limit, skip);
	if (!r) {
		res.status(401).send("skip is greater than todos saved");
	}
	res.send(r);
});

router.get("/:id", (req, res) => {
	const { id } = req.params;
	findOne(id)
		.then((todo) => {
			if (!todo) {
				res.status(404).end();
				return;
			}
			res.json(todo);
		})
		.catch((err) => res.status(500).json(err));
});

router.post("/", async (req, res) => {
	const { title, tags, userId } = req.body;

	if (!title && !tags) {
		res.status(422).send("title not found, please add data").end();
	}
	try {
		const todo = await createTodo(title, tags, userId);
		res.status(200).json(todo);
	} catch (e) {
		res.status(500).json(e);
	}
});

router.delete("/:id", async function (req, res) {
	const id = req.params.id;
	const r = await deleteTodo(id);
	if (!r) {
		res.status(404).send("todo was not found").end();
	}
	res.status(200).json(r);
});

router.patch("/:id", (req, res) => {
	const { title, userId, status, tags } = req.body;

	const todo = await updateTodo(req.params.id, title, userId, status, tags);
	if (!todo) {
		res.status(404).send("todo not found");
	}
	res.statusMessage = "todo updated successfully";
	res.status(201).json(user);
});

module.exports = router;
