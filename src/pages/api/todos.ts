import { NextApiRequest, NextApiResponse } from "next";
import connectDatabase from "@/lib/mongodb";
import Todo from "@/models/Todo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDatabase();

  if (req.method === "POST") {
    const { text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ message: "Task cannot be empty" });
    }
    const todo = await Todo.create({
      text,
    });
    res.status(201).json(todo);
  } else if (req.method === "GET") {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } else if (req.method === "DELETE") {
    const { id } = req.body;
    await Todo.findByIdAndDelete(id);
    res.status(200).json({ message: `Todo with id ${id} deleted` });
  } else if (req.method === "PUT") {
    const { id, text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ message: "Task cannot be empty" });
    }
    const todo = await Todo.findByIdAndUpdate(id, { text }, { new: true });
    res.status(200).json(todo);
  } else {
    res.setHeader("Allow", ["POST", "GET", "DELETE", "PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
