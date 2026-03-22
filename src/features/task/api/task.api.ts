import { api } from "@/api/api";

export const getTasksByClient = async (clientId: string) => {
  const res = await api.get(`/task/${clientId}`);
  return {
    tasks: res.data.data.tasks,
    stats: res.data.data.stats,
  };
};

export const createTask = async (data: any) => {
  const res = await api.post("/task", data);
  return res.data;
};
