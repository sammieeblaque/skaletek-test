import { useState, useCallback, useMemo } from "react";
import ActivityTable from "./components/ActivityTable";
import { Activity } from "./@types";

export default function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  /**
   * Kindly note taht use of useCallback & useMemo can be categorized right now as premature optimization as the application is still small
   */

  const addActivity = useCallback(async () => {
    try {
      // The url can definitely be extracted to be an environment variable, for the purpose of this project just left it in there
      const response = await fetch(
        "https://bored.api.lewagon.com/api/activity"
      );
      const activityData = await response.json();
      setActivities((prevActivities) => [...prevActivities, activityData]);
    } catch (error) {
      console.error("Failed to fetch activity:", error);
    }
  }, []);

  const onDelete = useCallback((key: string) => {
    setActivities((prevActivities) =>
      prevActivities.filter((item) => item.key !== key)
    );
  }, []);

  const filteredActivities = useMemo(
    () =>
      activities.filter((item) =>
        item.activity.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [activities, searchTerm]
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex mb-8 gap-4">
          <input
            type="text"
            placeholder="Search activities..."
            className="flex-grow bg-gray-800 text-gray-100 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <button
            onClick={addActivity}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md transition duration-300 ease-in-out text-sm font-medium"
          >
            Add Activity
          </button>
        </div>

        <ActivityTable activities={filteredActivities} onDelete={onDelete} />
      </div>
    </div>
  );
}
