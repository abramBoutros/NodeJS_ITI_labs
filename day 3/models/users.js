const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
	{
		userName: {
			type: String,
			trim: true,
			required: true,
			minLength: 8,
			lowercase: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
		},
		firstName: {
			type: String,
			required: true,
			minLength: 3,
			maxLength: 15,
		},
		lastName: {
			type: String,
			required: true,
			minLength: 3,
			maxLength: 15,
		},
		dob: {
			required: false,
			type: Date,
		},
		createdAt: { type: Date, immutable: true, default: () => new Date() },
		updatedAt: { type: Date, default: () => new Date() },
	},
	{ timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
