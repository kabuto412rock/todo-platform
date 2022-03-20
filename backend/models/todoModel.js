const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const todoSchema = mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    description: {
      type: String,
      required: [true, "Please intput some description of the issue"],
    },
    status: {
      type: String,
      required: true,
      enum: ["private", "public", "closed"],
      default: "public",
    },
    category: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);
todoSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("todo", todoSchema);
