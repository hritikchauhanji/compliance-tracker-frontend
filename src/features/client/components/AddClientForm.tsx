import { useState } from "react";
import { createClient } from "../api/client.api";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const entityTypes = [
  "PVT_LTD",
  "PUBLIC_LTD",
  "LLP",
  "PARTNERSHIP",
  "SOLE_PROP",
  "OPC",
];

export default function AddClientForm({ onSuccess, onCancel }: any) {
  const [company_name, setCompanyName] = useState("");
  const [country, setCountry] = useState("");
  const [entity_type, setEntityType] = useState("PVT_LTD");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!company_name || !country || !entity_type) return;

    setLoading(true);

    try {
      await createClient({
        company_name,
        country,
        entity_type,
      });

      onSuccess();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center m-32">
      <Card className="w-full max-w-lg shadow-lg">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-semibold text-center">
            Create New Client
          </h2>

          <Input
            placeholder="Company Name"
            value={company_name}
            onChange={(e) => setCompanyName(e.target.value)}
          />

          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                className="w-full"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>

            <div className="flex-1">
              <Select value={entity_type} onValueChange={setEntityType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Entity Type" />
                </SelectTrigger>
                <SelectContent>
                  {entityTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.replace("_", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button className="flex-1" onClick={handleSubmit}>
              {loading ? "Creating..." : "Create"}
            </Button>

            <Button className="flex-1" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
