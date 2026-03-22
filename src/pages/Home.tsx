import { useState } from "react";
import ClientList from "@/features/client/components/ClientList";

export default function Home() {
  const [selectedClient, setSelectedClient] = useState<string | null>(null);

  return (
    <div className="flex h-screen">
      
      {/* Sidebar */}
      <div className="w-1/4 border-r p-4">
        <ClientList onSelect={setSelectedClient} />
      </div>

      {/* Main */}
      <div className="flex-1 p-4">
        <h2 className="font-bold">Tasks</h2>
        {selectedClient && <div>Selected: {selectedClient}</div>}
      </div>

    </div>
  );
}