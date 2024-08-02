import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	image: {
		type: String,
	},
	requests: [
		{
			from: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
				required: true,
			},
			message: {
				type: String,
				required: true,
			},
			status: {
				type: String,
				enum: ["pending", "accepted", "rejected"],
				default: "pending",
			},
		},
	],
	friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
})

export const User = mongoose.model("User", userSchema)
