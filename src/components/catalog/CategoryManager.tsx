
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Category } from "@/data/initialCategories";
import { Folder, Edit, Trash, X, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

interface CategoryManagerProps {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
}

const CategoryManager = ({ categories, setCategories }: CategoryManagerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      toast({
        title: "Error",
        description: "Category name cannot be empty",
        variant: "destructive",
      });
      return;
    }

    // Check if category already exists
    if (categories.some((cat) => cat.name.toLowerCase() === newCategory.toLowerCase())) {
      toast({
        title: "Error",
        description: "Category already exists",
        variant: "destructive",
      });
      return;
    }

    const newId = Math.max(0, ...categories.map((c) => c.id)) + 1;
    setCategories([...categories, { id: newId, name: newCategory }]);
    setNewCategory("");
    toast({
      title: "Success",
      description: "Category added successfully",
    });
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setNewCategory(category.name);
  };

  const handleUpdateCategory = () => {
    if (!newCategory.trim() || !editingCategory) return;

    // Check if new name already exists (excluding the current category)
    if (categories.some((cat) => 
      cat.id !== editingCategory.id && 
      cat.name.toLowerCase() === newCategory.toLowerCase())
    ) {
      toast({
        title: "Error",
        description: "Category already exists",
        variant: "destructive",
      });
      return;
    }

    setCategories(
      categories.map((cat) =>
        cat.id === editingCategory.id ? { ...cat, name: newCategory } : cat
      )
    );
    setEditingCategory(null);
    setNewCategory("");
    toast({
      title: "Success",
      description: "Category updated successfully",
    });
  };

  const handleDeleteCategory = (id: number) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((cat) => cat.id !== id));
      toast({
        title: "Success",
        description: "Category deleted successfully",
      });
    }
  };

  const handleCancel = () => {
    setEditingCategory(null);
    setNewCategory("");
  };

  return (
    <>
      <Button 
        variant="outline" 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2"
      >
        <Folder className="h-4 w-4" />
        Manage Categories
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manage Categories</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 my-4">
            <div className="flex gap-2">
              <Input
                placeholder="Category name"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
              {editingCategory ? (
                <div className="flex gap-1">
                  <Button onClick={handleUpdateCategory} size="icon" variant="default">
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button onClick={handleCancel} size="icon" variant="outline">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button onClick={handleAddCategory}>Add</Button>
              )}
            </div>

            <div className="border rounded-md p-4">
              <h3 className="text-sm font-medium mb-2">Current Categories</h3>
              {categories.length === 0 ? (
                <p className="text-sm text-muted-foreground">No categories added yet</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Badge 
                      key={category.id} 
                      className="flex items-center gap-1 px-2 py-1"
                      variant="outline"
                    >
                      {category.name}
                      <button 
                        onClick={() => handleEditCategory(category)}
                        className="hover:text-blue-500 ml-1"
                      >
                        <Edit className="h-3 w-3" />
                      </button>
                      <button 
                        onClick={() => handleDeleteCategory(category.id)}
                        className="hover:text-red-500 ml-1"
                      >
                        <Trash className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CategoryManager;
