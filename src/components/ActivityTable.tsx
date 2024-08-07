import { IActivity } from "../@types";

interface ActivityTableProps {
  activities: IActivity[];
  onDelete: (key: string) => void;
}

const ActivityTable: React.FC<ActivityTableProps> = ({
  activities,
  onDelete,
}) => {
  if (activities.length === 0) {
    return <p className="text-center text-gray-400">No activities to show</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-gray-800 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-700 text-left text-xs uppercase">
            <th className="px-6 py-3 font-medium">Activity</th>
            <th className="px-6 py-3 font-medium">Type</th>
            <th className="px-6 py-3 font-medium">Participants</th>
            <th className="px-6 py-3 font-medium">Price</th>
            <th className="px-6 py-3 font-medium">Accessibility</th>
            <th className="px-6 py-3 font-medium">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {activities.map(
            ({ key, activity, type, participants, price, accessibility }) => (
              <tr
                key={key}
                className="hover:bg-gray-750 transition duration-150 ease-in-out"
              >
                <td className="px-6 py-4 whitespace-nowrap">{activity}</td>
                <td className="px-6 py-4 whitespace-nowrap">{type}</td>
                <td className="px-6 py-4 whitespace-nowrap">{participants}</td>
                <td className="px-6 py-4 whitespace-nowrap">{price}</td>
                <td className="px-6 py-4 whitespace-nowrap">{accessibility}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => onDelete(key)}
                    className="bg-gray-700 hover:bg-red-600 px-3 py-1 rounded text-xs font-medium transition duration-300 ease-in-out"
                  >
                    Del
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityTable;
