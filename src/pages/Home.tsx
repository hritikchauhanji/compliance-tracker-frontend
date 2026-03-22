import { useState } from "react";
import ClientList from "@/features/client/components/ClientList";
import TaskList from "@/features/task/components/TaskList";
import AddTaskForm from "@/features/task/components/AddTaskForm";
import AddClientForm from "@/features/client/components/AddClientForm";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [selectedClient, setSelectedClient] = useState<string | null>(null);

  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showClientForm, setShowClientForm] = useState(false);

  const [refreshKey, setRefreshKey] = useState(0);
  const [clientRefreshKey, setClientRefreshKey] = useState(0);

  return (
    <div className="flex h-screen">
      {/* 🔹 Sidebar */}
      <div className="w-1/4 border-r p-4 h-full overflow-y-auto">
        <ClientList key={clientRefreshKey} onSelect={setSelectedClient} />
      </div>

      {/* 🔹 Main Content */}
      <div className="flex-1 p-4 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 shrink-0">
          <h2 className="font-bold text-lg">Tasks</h2>

          <div className="flex gap-2">
            <Button
              onClick={() => {
                setShowClientForm(true);
                setShowTaskForm(false);
              }}
            >
              + New Client
            </Button>

            {selectedClient && !showTaskForm && (
              <Button
                onClick={() => {
                  setShowTaskForm(true);
                  setShowClientForm(false);
                }}
              >
                + New Task
              </Button>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 min-h-0 overflow-hidden">
          {/* PRIORITY ORDER MATTERS */}

          {showClientForm ? (
            <AddClientForm
              onSuccess={() => {
                setShowClientForm(false);
                setClientRefreshKey((prev) => prev + 1);
              }}
              onCancel={() => setShowClientForm(false)}
            />
          ) : showTaskForm ? (
            <AddTaskForm
              clientId={selectedClient}
              onSuccess={() => {
                setShowTaskForm(false);
                setRefreshKey((prev) => prev + 1);
              }}
              onCancel={() => setShowTaskForm(false)}
            />
          ) : !selectedClient ? (
            <div className="h-full flex items-center justify-center text-gray-500">
              Select a client to view tasks
            </div>
          ) : (
            <TaskList key={refreshKey} clientId={selectedClient} />
          )}
        </div>
      </div>
    </div>
  );
}
