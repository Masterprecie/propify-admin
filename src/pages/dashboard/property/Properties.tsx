import TableComponent from "@/components/TableComponent";
import {
  useDeletePropertyMutation,
  useGetAllPropertiesQuery,
} from "@/features/properties/api";
import { useDebounce } from "@/hooks/useDebounce";
import { alert } from "@/utils/alert";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const columns = [
  { header: "Name", key: "title" },
  { header: "Location", key: "location" },
  { header: "Category", key: "category" },
  { header: "Price", key: "price" },
  { header: "Duration", key: "priceDuration" },
  { header: "Date Created", key: "createdAt" },
];
const Properties = () => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const [deleteProperty] = useDeletePropertyMutation();

  const { data: getProperties, isLoading } = useGetAllPropertiesQuery({
    page: currentPage,
    limit: rowsPerPage,
    search: debouncedSearchQuery,
  });

  const propertyDetails = getProperties?.data?.docs;

  const totalPages = Math.ceil(
    (getProperties?.data?.totalDocs || 0) / rowsPerPage
  );

  console.log("Property Details:", propertyDetails);

  const handleEdit = (id: string) => {
    console.log("Edit user with id:", id);
    navigate(`/dashboard/property?id=${id}`);
  };

  const handleDelete = (id: string) => {
    console.log("Delete user with id:", id);
    deleteProperty(id)
      .unwrap()
      .then((res) => {
        console.log(res);
        alert({
          type: "success",
          message: `Property Deleted successfully`,
          timer: 2000,
        });
      })
      .catch((error) => {
        alert({
          type: "error",
          message: error?.data?.message || "An error occurred",
          timer: 2000,
        });
      });
  };

  const handleView = (id: string) => {
    console.log("View user with id:", id);
    // Implement view functionality
  };
  return (
    <div className="py-10 px-5">
      <h1 className="text-2xl font-bold mb-4">User Table</h1>
      <TableComponent
        columns={columns}
        data={propertyDetails || []}
        loading={isLoading}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        totalPages={totalPages}
        searchQuery={searchQuery}
        searchable={true}
        isAddButton={true}
        addItem="Add Property"
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        onPageChange={setCurrentPage}
        onRowsPerPageChange={setRowsPerPage}
        onSearchChange={setSearchQuery}
      />
    </div>
  );
};
export default Properties;
