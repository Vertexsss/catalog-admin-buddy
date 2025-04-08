import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import DataTable from "@/components/common/DataTable";
import PageHeader from "@/components/common/PageHeader";
import FormModal from "@/components/common/FormModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  stock: number;
  status: string;
  description?: string;
}

const initialProducts: Product[] = [
  {
    id: 1,
    name: "T-Shirt",
    category: "Clothing",
    price: "$19.99",
    stock: 43,
    status: "Active",
  },
  {
    id: 2,
    name: "Jeans",
    category: "Clothing",
    price: "$49.99",
    stock: 32,
    status: "Active",
  },
  {
    id: 3,
    name: "Sneakers",
    category: "Footwear",
    price: "$79.99",
    stock: 12,
    status: "Low Stock",
  },
  {
    id: 4,
    name: "Watch",
    category: "Accessories",
    price: "$129.99",
    stock: 8,
    status: "Low Stock",
  },
  {
    id: 5,
    name: "Backpack",
    category: "Accessories",
    price: "$59.99",
    stock: 0,
    status: "Out of Stock",
  },
];

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    status: "Active",
  });

  const columns = [
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

  const handleAddNew = () => {
    setCurrentProduct(null);
    setFormData({
      name: "",
      category: "",
      price: "",
      stock: "",
      description: "",
      status: "Active",
    });
    setModalOpen(true);
  };

  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.replace("$", ""),
      stock: product.stock.toString(),
      description: product.description || "",
      status: product.status,
    });
    setModalOpen(true);
  };

  const handleDelete = (product: Product) => {
    if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
      setProducts(products.filter((p) => p.id !== product.id));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let status = "Active";
    const stockNum = parseInt(formData.stock);
    if (stockNum === 0) {
      status = "Out of Stock";
    } else if (stockNum <= 10) {
      status = "Low Stock";
    }

    if (currentProduct) {
      setProducts(
        products.map((p) =>
          p.id === currentProduct.id
            ? {
                ...p,
                name: formData.name,
                category: formData.category,
                price: `$${formData.price}`,
                stock: parseInt(formData.stock),
                description: formData.description,
                status,
              }
            : p
        )
      );
    } else {
      const newId = Math.max(...products.map((p) => p.id), 0) + 1;
      setProducts([
        ...products,
        {
          id: newId,
          name: formData.name,
          category: formData.category,
          price: `$${formData.price}`,
          stock: parseInt(formData.stock),
          description: formData.description,
          status,
        },
      ]);
    }

    setModalOpen(false);
  };

  return (
    <div>
      <PageHeader
        title="Catalog Management"
        description="Manage your product catalog"
        onAddNew={handleAddNew}
      />

      <DataTable
        columns={columns}
        data={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <FormModal
        title={currentProduct ? "Edit Product" : "Add New Product"}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter product name"
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              placeholder="Enter product category"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="0.00"
                required
              />
            </div>
            <div>
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleInputChange}
                placeholder="0"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter product description"
              rows={3}
            />
          </div>
        </div>
      </FormModal>
    </div>
  );
};

export default Catalog;
