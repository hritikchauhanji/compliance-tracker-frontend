import { useState } from "react";
import ClientList from "@/features/client/components/ClientList";
import TaskList from "@/features/task/components/TaskList";

export default function Home() {
  const [selectedClient, setSelectedClient] = useState<string | null>(null);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-1/4 border-r p-4 h-full overflow-hidden">
        <ClientList onSelect={setSelectedClient} />
      </div>

      {/* Main */}
      <div className="flex-1 p-4 h-full overflow-hidden">
        <h2 className="font-bold text-lg mb-4">Tasks</h2>

        {/* Wrap TaskList */}
        <div className="h-full">
          <TaskList clientId={selectedClient} />
        </div>
      </div>
    </div>
  );
}
