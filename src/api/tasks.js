//mock backend api because json-server deosn't work on vercel



import fs from "fs";
import path from "path";

let tasks = null; // stored in-memory

export default function handler(req, res) {
  // load tasks once from db.json
  if (!tasks) {
    const filePath = path.join(process.cwd(), "db.json");
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    tasks = data.tasks || [];
  }

  if (req.method === "GET") {
    res.status(200).json(tasks);

  } else if (req.method === "POST") {
    const newTask = { id: Date.now(), ...req.body };
    tasks.push(newTask);
    res.status(201).json(newTask);

  } else if (req.method === "PUT") {
    const { id } = req.query;
    const index = tasks.findIndex(t => t.id == id);
    if (index === -1) return res.status(404).json({ error: "Task not found" });
    tasks[index] = { ...tasks[index], ...req.body };
    res.status(200).json(tasks[index]);

  } else if (req.method === "DELETE") {
    const { id } = req.query;
    tasks = tasks.filter(t => t.id != id);
    res.status(200).json({ message: "Deleted" });

  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}