// get express and create instance
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/newDB", () => {
	console.log("connected to db");
});

const todosRoutes = require("./routes/todos");
const usersRoutes = require("./routes/users");

const app = express();

//middleware
app.use(express.static("public"));
app.use(cors());

// parse all data to json
app.use(express.json());

app.use("/todos", todosRoutes);
app.use("/users", usersRoutes);

app.use("*", (req, res) => {
	res.status(404).json({ error: "Not_Found" });
});

app.use((err, req, res, next) => {
	res.json(err);
});

const port = 8888;

app.listen(port, () => {
	console.log(`app is live on port: ${port}`);
});
