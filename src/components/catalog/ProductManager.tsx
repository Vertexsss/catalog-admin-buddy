
import { useState } from "react";
import { Product, ProductFormData } from "@/types/product";
import DataTable from "@/components/common/DataTable";
import PageHeader from "@/components/common/PageHeader";
import FormModal from "@/components/common/FormModal";
import ProductForm from "./ProductForm";
import { getProductColumns } from "./productColumns";
import { initialCategories, Category } from "@/data/initialCategories";
import CategoryManager from "./CategoryManager";

interface ProductManagerProps {
  initialProducts: Product[];
}

const ProductManager = ({ initialProducts }: ProductManagerProps) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    status: "Active",
  });

  const columns = getProductColumns();

  const handleAddNew = () => {
    setCurrentProduct(null);
    setFormData({
      name: "",
      category: categories.length > 0 ? categories[0].name : "",
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

  const handleSelectChange = (name: string, value: string) => {
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
        extraButton={<CategoryManager categories={categories} setCategories={setCategories} />}
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
        <ProductForm 
          formData={formData}
          onChange={handleInputChange}
          categories={categories}
          onSelectChange={handleSelectChange}
        />
      </FormModal>
    </div>
  );
};

export default ProductManager;
