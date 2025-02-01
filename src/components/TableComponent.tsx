import React from "react";
import { formatDate } from "@/utils/helpers";
import Pagination from "@/components/Pagination";
import { User } from "@/features/users/interfaces";
import { Property } from "@/features/properties/interfaces";
import { useNavigate } from "react-router-dom";

interface Column {
  header: string;
  key: string;
}

interface TableComponentProps {
  columns: Column[];
  data: User[] | Property[];
  rowsPerPage: number;
  loading: boolean;
  currentPage: number;
  totalPages: number;
  searchQuery: string;
  searchable?: boolean;
  isAddButton?: boolean;
  addItem?: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
  onSearchChange: (query: string) => void;
}

const TableComponent: React.FC<TableComponentProps> = ({
  columns,
  data,
  loading,
  rowsPerPage,
  currentPage,
  totalPages,
  searchQuery,
  searchable = false,
  isAddButton = false,
  addItem = "",
  onEdit,
  onDelete,
  onView,
  onPageChange,
  onRowsPerPageChange,
  onSearchChange,
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
    onPageChange(1); // Reset to the first page on new search
  };
  const navigate = useNavigate();

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = data?.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="w-full overflow-auto">
      <div className="flex justify-between items-center mb-2">
        {searchable && (
          <div className="">
            <input
              type="text"
              placeholder="Search with name or location"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-md px-4 py-2 border outline-none rounded"
            />
          </div>
        )}
        {isAddButton && (
          <div className=" ">
            <button
              onClick={() => navigate("/dashboard/property")}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {addItem}
            </button>
          </div>
        )}
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="py-2 px-4 border-b text-sm text-black font-medium bg-gray-200 border-gray-200 text-left"
              >
                {column.header}
              </th>
            ))}
            <th className="py-2 px-4 border-b text-sm text-black font-medium bg-gray-200 border-gray-200 text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <>Loading...</>
          ) : (
            currentData?.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className="py-2 px-4 border-b text-sm border-gray-200"
                  >
                    {column.key === "createdAt"
                      ? formatDate(row[column.key])
                      : row[column.key]}
                  </td>
                ))}
                <td className="py-2 px-4 border-b text-sm border-gray-200">
                  <button
                    onClick={() => onView(row._id)}
                    className="text-blue-500 mr-2 cursor-pointer"
                  >
                    View
                  </button>
                  <button
                    onClick={() => onEdit(row._id)}
                    className="text-yellow-500 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(row._id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </div>
  );
};

export default TableComponent;
