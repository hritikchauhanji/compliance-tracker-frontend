import { useState } from "react";
import ClientList from "@/features/client/components/ClientList";
import TaskList from "@/features/task/components/TaskList";
import AddTaskForm from "@/features/task/components/AddTaskForm";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-1/4 border-r p-4 h-full overflow-hidden">
        <ClientList onSelect={setSelectedClient} />
      </div>

      {/* Main */}
      <div className="flex-1 p-4 h-full overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg">Tasks</h2>

          {selectedClient && !showForm && (
            <Button onClick={() => setShowForm(true)}>+ New Task</Button>
          )}
        </div>

        {!selectedClient ? (
          <div>Select a client</div>
        ) : showForm ? (
          <AddTaskForm
            clientId={selectedClient}
            onSuccess={() => {
              setShowForm(false);
              setRefreshKey((prev) => prev + 1);
            }}
            onCancel={() => setShowForm(false)}
          />
        ) : (
          <TaskList key={refreshKey} clientId={selectedClient} />
        )}
      </div>
    </div>
  );
}
