const express = require("express");
const {
	deleteUser,
	createUser,
	getAllUsers,
	getOneUser,
	updateUser,
	getUserTodos,
	login,
} = require("../controllers/users");

const router = express.Router();

router.get("", async function (req, res) {
	const allUsers = await getAllUsers();
	res.json(allUsers);
});

router.get("/:id", async function (req, res) {
	const user = await getOneUser(req.params.id);
	if (!user) {
		res.status(404).send("user not found");
	}
	res.status(200).json(user);
});

router.get("/:id/todos", async function (req, res) {
	const todos = await getUserTodos(req.params.id);
	if (!todos) {
		res.status(404).send("todos not found");
	}
	res.status(200).json(todos);
});

router.delete("/:id", async function (req, res) {
	const userId = req.params.id;
	const r = await deleteUser(userId);
	if (!r) {
		res.status(404).send("user was not found").end();
	}
	res.status(200).json(r);
});

router.post("/", async function (req, res) {
	const { userName, password, firstName, lastName, dob } = req.body;
	try {
		const user = await createUser(
			userName,
			password,
			firstName,
			lastName,
			dob
		);
		res.status(200).json(user);
	} catch (e) {
		res.status(500).json(e);
	}
});

router.patch("/:id", async function (req, res) {
	const { userName, password, firstName, lastName, dob } = req.body;

	const user = await updateUser(
		req.params.id,
		userName,
		password,
		firstName,
		lastName,
		dob
	);
	if (!user) {
		res.status(404).send("user not found");
	}
	res.statusMessage = "user updated successfully";
	res.status(201).json(user);
});

router.post("/login", async (req, res) => {
	const { userName, password } = req.body;
	const r = await login(userName, password);
	res.status(200).json(r);
});

module.exports = router;
