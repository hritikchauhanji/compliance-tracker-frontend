import { api } from "@/api/api";

export const getTasksByClient = async (
  clientId: string,
  filters?: { status?: string; category?: string },
) => {
  const params = new URLSearchParams();

  if (filters?.status) params.append("status", filters.status);
  if (filters?.category) params.append("category", filters.category);

  const res = await api.get(`/task/${clientId}?${params.toString()}`);

  return {
    tasks: res.data.data.tasks,
    stats: res.data.data.stats,
  };
};

export const createTask = async (data: any) => {
  const res = await api.post("/task", data);
  return res.data;
};

export const updateTaskStatus = async (taskId: string) => {
  const res = await api.patch(`/task/${taskId}`, {
    status: "COMPLETED",
  });

  return res.data;
};
