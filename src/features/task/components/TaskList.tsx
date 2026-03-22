import { useEffect, useState } from "react";
import { getTasksByClient, updateTaskStatus } from "../api/task.api";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function TaskList({ clientId }: any) {
  const [tasks, setTasks] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const [status, setStatus] = useState<string | undefined>(undefined);
  const [category, setCategory] = useState<string | undefined>(undefined);

  const fetchTasks = async () => {
    if (!clientId) return;

    setLoading(true);
    try {
      const data = await getTasksByClient(clientId, {
        status: status === "OVERDUE" ? undefined : status,
        category,
      });

      let filteredTasks = data.tasks;

      if (status === "OVERDUE") {
        filteredTasks = data.tasks.filter((task: any) => task.isOverdue);
      }

      setTasks(filteredTasks);
      setStats(data.stats);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (taskId: string) => {
    setUpdatingId(taskId);
    try {
      await updateTaskStatus(taskId);
      fetchTasks();
    } finally {
      setUpdatingId(null);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [clientId, status, category]);

  if (!clientId) {
    return <div className="text-center">Select a client to view tasks</div>;
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header + Filters */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          {/* Status Filter */}
          <Select
            onValueChange={(value) => {
              if (value === "ALL") {
                setStatus(undefined);
              } else if (value === "OVERDUE") {
                setStatus("OVERDUE");
              } else {
                setStatus(value);
              }
            }}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
              <SelectItem value="OVERDUE">Overdue</SelectItem>
            </SelectContent>
          </Select>

          {/* Category Filter */}
          <Select
            onValueChange={(value) =>
              setCategory(value === "ALL" ? undefined : value)
            }
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All</SelectItem>
              <SelectItem value="GST">GST</SelectItem>
              <SelectItem value="TAX">TAX</SelectItem>
              <SelectItem value="AUDIT">AUDIT</SelectItem>
              <SelectItem value="LEGAL">LEGAL</SelectItem>
              <SelectItem value="OTHER">OTHER</SelectItem>
            </SelectContent>
          </Select>

          {/* Reset */}
          <Button
            variant="outline"
            onClick={() => {
              setStatus(undefined);
              setCategory(undefined);
            }}
          >
            Reset
          </Button>
        </div>
      </div>

      {/* 🔥 Stats */}
      {stats && (
        <div className="grid grid-cols-4 gap-4 mb-4">
          <Card>
            <CardContent className="p-3">
              <div className="text-sm text-gray-500">Total</div>
              <div className="font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3">
              <div className="text-sm text-gray-500">Pending</div>
              <div className="font-bold text-yellow-600">{stats.pending}</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3">
              <div className="text-sm text-gray-500">Completed</div>
              <div className="font-bold text-green-600">{stats.completed}</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3">
              <div className="text-sm text-gray-500">Overdue</div>
              <div className="font-bold text-red-600">{stats.overdue}</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 🔥 Task List */}
      <div className="flex-1 min-h-0 overflow-y-auto pr-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          {loading ? (
            <div className="col-span-2 text-center">Loading tasks...</div>
          ) : tasks.length === 0 ? (
            <div className="col-span-2 text-center text-gray-500">
              No tasks found
            </div>
          ) : (
            tasks.map((task) => (
              <Card
                key={task.id}
                className={`self-start transition hover:shadow-md ${
                  task.isOverdue ? "border-red-500 bg-red-50" : ""
                }`}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="flex justify-between items-center text-base">
                    <span>{task.title}</span>

                    {task.status === "PENDING" ? (
                      <Button
                        size="sm"
                        onClick={() => handleUpdate(task.id)}
                        disabled={updatingId === task.id}
                      >
                        {updatingId === task.id
                          ? "Updating..."
                          : "Mark Complete"}
                      </Button>
                    ) : (
                      <Button size="sm" variant="secondary" disabled>
                        Completed
                      </Button>
                    )}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-2 text-sm">
                  <div className="text-gray-600">{task.category}</div>

                  {/* Status Badge */}
                  <Badge
                    variant={
                      task.status === "COMPLETED"
                        ? "default"
                        : task.isOverdue
                          ? "destructive"
                          : "secondary"
                    }
                    className="w-fit"
                  >
                    {task.isOverdue ? "OVERDUE" : task.status}
                  </Badge>

                  {/* Due Date */}
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{new Date(task.due_date).toDateString()}</span>

                    {task.isOverdue && (
                      <span className="text-red-500 font-semibold">• Late</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
