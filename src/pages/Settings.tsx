
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageHeader from "@/components/common/PageHeader";
import { toast } from "sonner";
import { useTheme } from "@/context/ThemeProvider";

const Settings = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  
  const [apiSettings, setApiSettings] = useState({
    apiUrl: "http://localhost:8000/api/v1/",
    apiKey: "demo-api-key-12345",
    timeout: "30",
  });

  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Catalog Admin",
    itemsPerPage: "10",
    enableNotifications: true,
    darkMode: isDarkMode,
  });

  const handleApiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setApiSettings({ ...apiSettings, [name]: value });
  };

  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setGeneralSettings({ ...generalSettings, [name]: checked });
    } else {
      setGeneralSettings({ ...generalSettings, [name]: value });
    }
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    if (name === "darkMode") {
      toggleDarkMode();
      setGeneralSettings({ ...generalSettings, darkMode: checked });
    } else {
      setGeneralSettings({ ...generalSettings, [name]: checked });
    }
  };

  const handleApiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("API settings saved successfully!");
  };

  const handleGeneralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("General settings saved successfully!");
  };

  return (
    <div>
      <PageHeader
        title="Settings"
        description="Configure your application settings"
      />

      <div className={`rounded-lg border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <Tabs defaultValue="general" className="w-full">
          <TabsList className={`w-full border-b ${isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'}`}>
            <TabsTrigger value="general" className="flex-1">General</TabsTrigger>
            <TabsTrigger value="api" className="flex-1">API Configuration</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="p-6">
            <form onSubmit={handleGeneralSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    name="siteName"
                    value={generalSettings.siteName}
                    onChange={handleGeneralChange}
                    placeholder="Enter site name"
                  />
                </div>

                <div>
                  <Label htmlFor="itemsPerPage">Items Per Page</Label>
                  <Input
                    id="itemsPerPage"
                    name="itemsPerPage"
                    type="number"
                    value={generalSettings.itemsPerPage}
                    onChange={handleGeneralChange}
                    placeholder="10"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enableNotifications">Enable Notifications</Label>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Receive email notifications for important events</p>
                  </div>
                  <Switch
                    id="enableNotifications"
                    checked={generalSettings.enableNotifications}
                    onCheckedChange={(checked) => handleSwitchChange("enableNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="darkMode">Dark Mode</Label>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Use dark theme for the admin interface</p>
                  </div>
                  <Switch
                    id="darkMode"
                    checked={isDarkMode}
                    onCheckedChange={(checked) => handleSwitchChange("darkMode", checked)}
                  />
                </div>
              </div>

              <Button type="submit">Save Settings</Button>
            </form>
          </TabsContent>
          
          <TabsContent value="api" className="p-6">
            <form onSubmit={handleApiSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="apiUrl">API URL</Label>
                  <Input
                    id="apiUrl"
                    name="apiUrl"
                    value={apiSettings.apiUrl}
                    onChange={handleApiChange}
                    placeholder="Enter API URL"
                  />
                  <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    The base URL for the Django API
                  </p>
                </div>

                <div>
                  <Label htmlFor="apiKey">API Key</Label>
                  <Input
                    id="apiKey"
                    name="apiKey"
                    value={apiSettings.apiKey}
                    onChange={handleApiChange}
                    placeholder="Enter API Key"
                    type="password"
                  />
                </div>

                <div>
                  <Label htmlFor="timeout">Request Timeout (seconds)</Label>
                  <Input
                    id="timeout"
                    name="timeout"
                    type="number"
                    value={apiSettings.timeout}
                    onChange={handleApiChange}
                    placeholder="30"
                  />
                </div>

                <div className="pt-4">
                  <h3 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : ''}`}>Connection Test</h3>
                  <Button type="button" variant="outline">
                    Test Connection
                  </Button>
                </div>
              </div>

              <Button type="submit">Save API Settings</Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
