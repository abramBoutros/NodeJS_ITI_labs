const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
	{
		title: {
			type: String,
			trim: true,
			required: true,
			minLength: 5,
			maxLength: 20,
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		status: {
			type: String,
			trim: true,
			lowercase: true,
			required: false,
			default: "to-do",
			enum: ["to-do", "in progress", "done"],
		},
		tags: [
			{
				type: String,
				required: false,
				maxLength: 10,
			},
		],

		createdAt: { type: Date, immutable: true, default: () => new Date() },
		updatedAt: { type: Date, default: () => new Date() },
	},
	{ timestamps: true }
);

const TodoModel = mongoose.model("Todo", todoSchema);

module.exports = TodoModel;

// TodoModel.create({ title: "hello1   " });
