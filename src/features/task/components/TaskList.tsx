import { useEffect, useState } from "react";
import { getTasksByClient } from "../api/task.api";

export default function TaskList({ clientId }: any) {
  const [tasks, setTasks] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    if (!clientId) return;

    setLoading(true);

    try {
      const data = await getTasksByClient(clientId);

      setTasks(data.tasks);
      setStats(data.stats);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [clientId]);

  if (!clientId) {
    return <div className="text-center">Select a client to view tasks</div>;
  }

  return (
    <div className="flex flex-col h-full">
      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="p-3 border rounded">
            <div className="text-sm text-gray-500">Total</div>
            <div className="font-bold">{stats.total}</div>
          </div>

          <div className="p-3 border rounded">
            <div className="text-sm text-gray-500">Pending</div>
            <div className="font-bold text-yellow-600">{stats.pending}</div>
          </div>

          <div className="p-3 border rounded">
            <div className="text-sm text-gray-500">Completed</div>
            <div className="font-bold text-green-600">{stats.completed}</div>
          </div>

          <div className="p-3 border rounded">
            <div className="text-sm text-gray-500">Overdue</div>
            <div className="font-bold text-red-600">{stats.overdue}</div>
          </div>
        </div>
      )}

      {/* Scrollable Tasks */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="text-center">Loading tasks...</div>
        ) : tasks.length === 0 ? (
          <div className="text-center">No tasks found</div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className={`p-3 border rounded mb-2 ${
                task.isOverdue ? "border-red-500 bg-red-50" : ""
              }`}
            >
              <div className="font-semibold">{task.title}</div>
              <div>{task.category}</div>
              <div>{task.status}</div>
              <div>{new Date(task.due_date).toDateString()}</div>

              {task.isOverdue && (
                <div className="text-red-600 font-bold">Overdue</div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
