import { api } from "@/api/api";

type Query = {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: "asc" | "desc";
};

export const getClients = async (query: Query) => {
  const res = await api.get("/client", {
    params: query,
  });

  return res.data;
};

export const createClient = async (data: any) => {
  const res = await api.post("/client", data);
  return res.data;
};
