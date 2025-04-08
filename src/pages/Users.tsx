import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import DataTable from "@/components/common/DataTable";
import PageHeader from "@/components/common/PageHeader";
import FormModal from "@/components/common/FormModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
}

const initialUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
    lastLogin: "2 hours ago",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Manager",
    status: "Active",
    lastLogin: "1 day ago",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "User",
    status: "Active",
    lastLogin: "3 days ago",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    role: "User",
    status: "Inactive",
    lastLogin: "2 weeks ago",
  },
  {
    id: 5,
    name: "Charlie Green",
    email: "charlie@example.com",
    role: "User",
    status: "Pending",
    lastLogin: "Never",
  },
];

const Users = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "User",
    status: "Active",
    password: "",
    confirmPassword: "",
  });

  const columns = [
    { key: "id", label: "ID", sortable: true },
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "role", label: "Role", sortable: true },
    { 
      key: "status", 
      label: "Status", 
      sortable: true,
      render: (value: string) => {
        const colors: Record<string, string> = {
          "Active": "bg-green-100 text-green-800",
          "Inactive": "bg-gray-100 text-gray-800",
          "Pending": "bg-yellow-100 text-yellow-800",
        };
        
        return (
          <Badge className={colors[value] || ""}>{value}</Badge>
        );
      }
    },
    { key: "lastLogin", label: "Last Login", sortable: true },
  ];

  const handleAddNew = () => {
    setCurrentUser(null);
    setFormData({
      name: "",
      email: "",
      role: "User",
      status: "Active",
      password: "",
      confirmPassword: "",
    });
    setModalOpen(true);
  };

  const handleEdit = (user: User) => {
    setCurrentUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      password: "",
      confirmPassword: "",
    });
    setModalOpen(true);
  };

  const handleDelete = (user: User) => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      setUsers(users.filter((u) => u.id !== user.id));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords match for new users
    if (!currentUser && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (currentUser) {
      // Update existing user
      setUsers(
        users.map((u) =>
          u.id === currentUser.id
            ? {
                ...u,
                name: formData.name,
                email: formData.email,
                role: formData.role,
                status: formData.status,
              }
            : u
        )
      );
    } else {
      // Add new user
      const newId = Math.max(...users.map((u) => u.id), 0) + 1;
      setUsers([
        ...users,
        {
          id: newId,
          name: formData.name,
          email: formData.email,
          role: formData.role,
          status: formData.status,
          lastLogin: "Never",
        },
      ]);
    }

    setModalOpen(false);
  };

  return (
    <div>
      <PageHeader
        title="User Management"
        description="Manage user accounts and permissions"
        onAddNew={handleAddNew}
      />

      <DataTable
        columns={columns}
        data={users}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <FormModal
        title={currentUser ? "Edit User" : "Add New User"}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter full name"
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email address"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="role">Role</Label>
              <Select name="role" value={formData.role} onValueChange={(value) => handleSelectChange("role", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="User">User</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select name="status" value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {!currentUser && (
            <>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter password"
                  required={!currentUser}
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm password"
                  required={!currentUser}
                />
              </div>
            </>
          )}

          {currentUser && (
            <div>
              <Label htmlFor="password">New Password (leave blank to keep current)</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter new password"
              />
            </div>
          )}
        </div>
      </FormModal>
    </div>
  );
};

export default Users;
