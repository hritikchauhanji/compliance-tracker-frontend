import { useState } from "react";
import { createTask } from "../api/task.api";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AddTaskForm({ clientId, onSuccess, onCancel }: any) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("GST");
  const [priority, setPriority] = useState("MEDIUM");

  const handleSubmit = async () => {
    if (!title || !dueDate) return;

    await createTask({
      client_id: clientId,
      title,
      description,
      category,
      due_date: dueDate,
      priority,
    });

    // reset form
    setTitle("");
    setDescription("");
    setDueDate("");

    onSuccess();
  };

  return (
    <div className="flex justify-center items-center m-32">
      <Card className="w-full max-w-lg shadow-lg">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-semibold text-center">Create New Task</h2>

          <Input
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex gap-3 w-full">
            <div className="flex-1">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GST">GST</SelectItem>
                  <SelectItem value="TAX">TAX</SelectItem>
                  <SelectItem value="AUDIT">AUDIT</SelectItem>
                  <SelectItem value="LEGAL">LEGAL</SelectItem>
                  <SelectItem value="OTHER">OTHER</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1">
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LOW">LOW</SelectItem>
                  <SelectItem value="MEDIUM">MEDIUM</SelectItem>
                  <SelectItem value="HIGH">HIGH</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="flex-1"
            />
          </div>

          <div className="flex gap-2">
            <Button className="flex-1" onClick={handleSubmit}>
              Create
            </Button>

            <Button className="flex-1" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
