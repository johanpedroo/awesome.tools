import mongoose from "mongoose";

const ListSchema = new mongoose.Schema(
  {
    _id: String,
    name: String,
    author: String,
    title: String,
    description: String,
    url: String,
    tags: [String],
    stars: String,
    list: [Object],
  },
  { strict: false }
);

const List = mongoose.models.List || mongoose.model("List", ListSchema);

export default List;
