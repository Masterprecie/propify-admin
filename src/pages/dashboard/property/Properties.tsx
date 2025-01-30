import TableComponent from "@/components/TableComponent";
import { useGetAllPropertiesQuery } from "@/features/properties/api";
import { useDebounce } from "@/hooks/useDebounce";
import { useState } from "react";

const Properties = () => {
  const columns = [
    { header: "First Name", key: "firstName" },
    { header: "Last Name", key: "lastName" },
    { header: "Phone Number", key: "phoneNumber" },
    { header: "Email", key: "email" },
    { header: "Date Created", key: "createdAt" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

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
    // Implement edit functionality
  };

  const handleDelete = (id: string) => {
    console.log("Delete user with id:", id);
    // Implement delete functionality
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
