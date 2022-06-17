import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import List from "../../../models/List";
import dbConnect from "../../../lib/db";

export default async function list (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<NextApiHandler<any> | void> {
  await dbConnect();
  if (req.method != "GET") return res.status(405).json({});
  const { repo } = req.query;
  const repoName = repo === "Home" ? process.env['DEFAULT_AWESOME_LIST'] : repo;
  try {
    const filteredData = await List.findById((repoName as string)?.replace('/', '_'), {list: {$slice: [50, 9999]}}).exec()
    res.setHeader("Content-Type", "application/json");
    res.send(filteredData?.list || []);
  } catch (e) {
    console.error(e);
    res.status(404).json({ message: "repository not found" });
  }
}
