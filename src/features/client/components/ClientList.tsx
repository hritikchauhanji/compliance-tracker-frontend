import { useEffect, useState } from "react";
import { getClients } from "../api/client.api";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ClientList({ onSelect }: any) {
  const [clients, setClients] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchClients();
  }, [page]);

  const fetchClients = async (query = {}) => {
    setLoading(true);

    try {
      const res = await getClients({
        search,
        page,
        limit: 10,
        sortBy: "company_name",
        order: "asc",
        ...query,
      });

      setClients(res.data);
      setTotalPages(res.meta.totalPages);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-bold mb-4">Clients</h2>

      {/* Search */}
      <div className="flex gap-2 mb-3">
        <Input
          placeholder="Search client..."
          value={search}
          onChange={(e) => {
            const value = e.target.value;
            setSearch(value);

            // cleared - fetch all clients again
            if (value === "") {
              setPage(1);
              fetchClients({ search: "", page: 1 });
            }
          }}
        />
        <Button
          onClick={() => {
            setPage(1);
            fetchClients({ page: 1 });
          }}
        >
          Search
        </Button>
      </div>

      {/* Scrollable List */}
      <div className="flex-1 overflow-y-auto space-y-2">
        {/* Loading */}
        {loading ? (
          <div className="text-center mt-10 text-gray-500">
            Loading clients...
          </div>
        ) : clients.length === 0 ? (
          /* Empty State */
          <div className="text-center mt-10 text-gray-500">
            No clients found
          </div>
        ) : (
          clients.map((client) => (
            <Card
              key={client.id}
              onClick={() => onSelect(client.id)}
              className="p-3 cursor-pointer hover:bg-gray-100"
            >
              {client.company_name}
            </Card>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="mt-4 pt-2 border-t flex items-center justify-between">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Prev
        </Button>

        <span className="text-sm">
          Page {page} of {totalPages}
        </span>

        <Button
          variant="outline"
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
