import { FC } from "react";

type DashBoardTableComponentProps = {
  id: string;
  image: string;
  name: string;
  price: number;
};

export const DashBoardTableComponent: FC<DashBoardTableComponentProps> = ({
  id,
  name,
  price,
  image,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 shadow-md">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {/* Sample row, replace this with your data */}
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">John Doe</td>
            <td className="px-6 py-4 whitespace-nowrap">10</td>
            <td className="px-6 py-4 whitespace-nowrap">Admin</td>
            <td className="px-6 py-4 whitespace-nowrap">
              {/* Actions */}
              <button className="text-blue-600 hover:text-blue-900">
                Edit
              </button>
              <button className="text-red-600 hover:text-red-900 ml-2">
                Delete
              </button>
            </td>
          </tr>
          {/* More rows can be added here */}
        </tbody>
      </table>
    </div>
  );
};
