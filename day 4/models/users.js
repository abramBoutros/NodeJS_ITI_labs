const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const saltRounds = 10;

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
		// hash: "",
	},
	{ timestamps: true }
);

userSchema.methods.comparePasswords = async function (password) {
	return await bcrypt.compare(password, this.password);
};

// I didn't use this middleware because it was being called twice which mutates the password twice
// I don't fully understand why this happens
// userSchema.pre("save", function () {
// 	const salt = bcrypt.genSaltSync(saltRounds);
// 	// console.log(salt);
// 	this.password = bcrypt.hashSync(this.password, salt);
// 	console.log(this.password);
// 	// todo: Fix This
// 	// bcrypt.hash(this.password, saltRounds, function (err, hash) {
// 	// 	this.hash = hash;
// 	// });
// 	// bcrypt.hash(myPlaintextPassword, saltRounds).then(function (hash) {
// 	// 	this.password = hash;
// 	// });
// });

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
