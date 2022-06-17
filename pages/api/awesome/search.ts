import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import List from "../../../models/List";
import dbConnect from "../../../lib/db";

export default async function search (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<NextApiHandler<any> | void> {
  await dbConnect();
  if (req.method != "GET") return res.status(405).json({});
  const { q } = req.query;
  try {
    const filteredData = await List.find({
      $or: [
        {_id: {$regex: q,$options:'i'}},
        {path: {$regex: q,$options:'i'}},
        {tags: {$regex: q,$options:'i'}}
      ]
    }).skip(50).exec()
    res.setHeader("Content-Type", "application/json");
    res.send(filteredData || []);
  } catch (e) {
    console.error(e);
    res.status(404).json({ message: "repository not found" });
  }
}
