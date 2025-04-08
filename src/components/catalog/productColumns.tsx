
import { Badge } from "@/components/ui/badge";

export const getProductColumns = () => [
  { key: "id", label: "ID", sortable: true },
  { key: "name", label: "Name", sortable: true },
  { key: "category", label: "Category", sortable: true },
  { key: "price", label: "Price", sortable: true },
  { key: "stock", label: "Stock", sortable: true },
  { 
    key: "status", 
    label: "Status", 
    sortable: true,
    render: (value: string) => {
      const colors: Record<string, string> = {
        "Active": "bg-green-100 text-green-800",
        "Low Stock": "bg-yellow-100 text-yellow-800",
        "Out of Stock": "bg-red-100 text-red-800",
      };
      
      return (
        <Badge className={colors[value] || ""}>{value}</Badge>
      );
    }
  },
];
