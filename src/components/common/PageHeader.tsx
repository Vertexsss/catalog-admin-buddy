
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  onAddNew?: () => void;
}

const PageHeader = ({ title, description, onAddNew }: PageHeaderProps) => {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
      </div>
      {onAddNew && (
        <Button onClick={onAddNew}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add New
        </Button>
      )}
    </div>
  );
};

export default PageHeader;
