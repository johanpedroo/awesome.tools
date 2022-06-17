import mongoose from "mongoose";

const RepoSchema = new mongoose.Schema(
  {
    _id: String,
    repo: String,
    type: String,
    name: String,
    description: String,
    url: String,
    path: String,
    category: String,
    author: String,
  },
  { strict: false }
);

const Repo = mongoose.models.Repo || mongoose.model("Repo", RepoSchema);
export default Repo;
