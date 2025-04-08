
import { BarChart, Users, Package, TrendingUp } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Products",
      value: "245",
      icon: Package,
      change: "+12%",
      changeType: "positive",
    },
    {
      title: "Active Users",
      value: "120",
      icon: Users,
      change: "+8%",
      changeType: "positive",
    },
    {
      title: "Total Sales",
      value: "$12,390",
      icon: TrendingUp,
      change: "+23%",
      changeType: "positive",
    },
    {
      title: "Avg. Order Value",
      value: "$59.40",
      icon: BarChart,
      change: "+5%",
      changeType: "positive",
    },
  ];

  return (
    <div>
      <PageHeader title="Dashboard" description="Overview of your catalog and users" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
          >
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className="h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                <stat.icon size={20} />
              </div>
            </div>
            <div className="mt-3">
              <span
                className={`text-xs font-medium ${
                  stat.changeType === "positive"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {stat.change} from last month
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Recent Products</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center text-gray-500">
                    <Package size={16} />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">Product {item}</p>
                    <p className="text-xs text-gray-500">Category {item}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-500">Added 2d ago</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Recent Users</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    U{item}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">User {item}</p>
                    <p className="text-xs text-gray-500">user{item}@example.com</p>
                  </div>
                </div>
                <div className="text-sm text-gray-500">Joined 3d ago</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
