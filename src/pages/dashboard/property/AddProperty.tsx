import { useFormik } from "formik";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { useEffect, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import ImageUpload from "@/components/ImageUpload";
import {
  useEditPropertyMutation,
  useGetAPropertyQuery,
  usePostPropertyMutation,
} from "@/features/properties/api";
import { alert } from "@/utils/alert";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loader from "@/components/Loader";
import { PropertyPayload } from "@/features/properties/interfaces";

const categoryOptions = [
  {
    value: "house",
    label: "House",
  },
  {
    value: "condos",
    label: "Condos",
  },
  {
    value: "duplexes",
    label: "Duplexes",
  },
  {
    value: "studios",
    label: "Studios",
  },
  {
    value: "apartments",
    label: "Apartments",
  },
  {
    value: "villas",
    label: "Villas",
  },
  {
    value: "offices",
    label: "Offices",
  },
  {
    value: "shops",
    label: "Shops",
  },
  {
    value: "warehouses",
    label: "Warehouses",
  },
  {
    value: "others",
    label: "Others",
  },
];

const AddProperty = () => {
  const [facilities, setFacilities] = useState<string[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const { data: getProperty } = useGetAPropertyQuery(id, { skip: !id });
  const [addProperty, { isLoading }] = usePostPropertyMutation();
  const [editProperty, { isLoading: isEditing }] = useEditPropertyMutation();
  const propertyData = getProperty?.data;

  useEffect(() => {
    if (propertyData) {
      setImageUrls(propertyData?.images || []);
      setFacilities(propertyData?.facilities || []);
    }
  }, [id, propertyData]);

  const handleFilesChange = (files: string[]) => {
    console.log("Uploaded Images: ", files);
    setImageUrls(files);
  };

  const {
    handleSubmit,
    values,
    setFieldValue,
    errors,
    touched,
    getFieldProps,
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: propertyData?.title || "",
      description: propertyData?.description || "",
      price: propertyData?.price || "",
      location: propertyData?.location || "",
      category: propertyData?.category || "",
      status: propertyData?.status || "",
      bedrooms: propertyData?.bedrooms || "",
      priceDuration: propertyData?.priceDuration || "",
    },
    // validationSchema:,
    onSubmit: (values: PropertyPayload) => {
      const payload = {
        ...values,
        facilities,
        images: imageUrls,
      };
      console.log(payload);
      if (id) {
        editProperty({ payload, id })
          .unwrap()
          .then((res) => {
            console.log(res);
            if (res?.error) {
              console.log(res?.message);
              return;
            }
            alert({
              type: "success",
              message: "Property Updated successfully",
              timer: 2000,
              cb: () => navigate(`/dashboard/properties`),
            });
          })
          .catch((err) => {
            console.log(err);
            alert({
              type: "error",
              message: err?.data?.message || "An error occurred",
              timer: 3000,
            });
          });
      } else {
        addProperty(payload)
          .unwrap()
          .then((res) => {
            console.log(res);
            if (res?.error) {
              console.log(res?.message);
              return;
            }
            alert({
              type: "success",
              message: "Property Added successfully",
              timer: 2000,
              cb: () => navigate(`/dashboard/properties`),
            });
          })
          .catch((err) => {
            console.log(err);
            alert({
              type: "error",
              message: err?.data?.message || "An error occurred",
              timer: 3000,
            });
          });
      }
    },
  });
  const handleFacilitiesChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
      e.preventDefault();
      setFacilities([...facilities, e.currentTarget.value.trim()]);
      setFieldValue("facilities", "");
    }
  };

  const handleRemoveFacility = (index: number) => {
    setFacilities(facilities.filter((_, i) => i !== index));
  };

  return (
    <div className="py-20 px-5">
      <h1 className="text-2xl font-bold mb-4">Add Property</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 grid grid-cols-2 gap-5"
      >
        <div className="col-span-2">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            {...getFieldProps("title")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {touched.title && errors.title && (
            <div className="text-red-500 text-sm">{errors.title}</div>
          )}
        </div>

        <div className="col-span-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <ReactQuill
            value={values.description}
            onChange={(value) => setFieldValue("description", value)}
            className="mt-1"
          />
          {touched.description && errors.description && (
            <div className="text-red-500 text-sm">{errors.description}</div>
          )}
        </div>

        <div className="col-span-1">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            {...getFieldProps("price")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {touched.price && errors.price && (
            <div className="text-red-500 text-sm">{errors.price}</div>
          )}
        </div>

        {/* duration */}
        <div className="col-span-1">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price Duration
          </label>

          <select
            {...getFieldProps("priceDuration")}
            id="priceDuration"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">--SELECT PRICE DURATION--</option>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>
          {touched.priceDuration && errors.priceDuration && (
            <div className="text-red-500 text-sm">{errors.priceDuration}</div>
          )}
        </div>

        <div className="col-span-1">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            {...getFieldProps("location")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {touched.location && errors.location && (
            <div className="text-red-500 text-sm">{errors.location}</div>
          )}
        </div>

        {/* categories */}
        <div className="col-span-1">
          <label
            htmlFor="bedrooms"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            {...getFieldProps("category")}
            id="category"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">--SELECT CATEGORY--</option>
            {categoryOptions.map((category, index) => (
              <option key={index} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
          {touched.category && errors.category && (
            <div className="text-red-500 text-sm">{errors.category}</div>
          )}
        </div>

        {/* status */}
        <div className="col-span-1">
          <label
            htmlFor="bedrooms"
            className="block text-sm font-medium text-gray-700"
          >
            Status
          </label>
          <select
            {...getFieldProps("status")}
            id="status"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">--SELECT STATUS--</option>
            <option value="rent">Rent</option>
            <option value="sale">Sale</option>
          </select>
          {touched.status && errors.status && (
            <div className="text-red-500 text-sm">{errors.status}</div>
          )}
        </div>

        {/* bedrooms */}
        <div className="col-span-1">
          <label
            htmlFor="bedrooms"
            className="block text-sm font-medium text-gray-700"
          >
            Bedrooms(Optional)
          </label>
          <input
            type="number"
            id="bedrooms"
            {...getFieldProps("bedrooms")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* facilities */}
        <div className="col-span-2">
          <label
            htmlFor="facilities"
            className="block text-sm font-medium text-gray-700"
          >
            Facilities
          </label>
          <div className="mt-1 flex flex-wrap items-center border border-gray-300 rounded-md shadow-sm px-3 py-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
            {facilities?.map((facility, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-200 rounded-full px-2 py-1 mr-2 mb-2"
              >
                <span className="text-sm">{facility}</span>
                <button
                  type="button"
                  className="h-4 w-4 ml-1 flex items-center cursor-pointer"
                  onClick={() => handleRemoveFacility(index)}
                >
                  <MdOutlineCancel />
                </button>
              </div>
            ))}
            <input
              type="text"
              id="facilities"
              {...getFieldProps("facilities")}
              onKeyDown={handleFacilitiesChange}
              className="flex-1 border-none focus:ring-0 outline-0 sm:text-sm"
              placeholder="Enter facilities and press Enter"
            />
          </div>
          {touched.facilities && errors.facilities && (
            <div className="text-red-500 text-sm">{errors.facilities}</div>
          )}
        </div>

        <div className="col-span-2">
          <ImageUpload
            labelName={
              " Upload at least 1 and max of 5 images of the Property."
            }
            required={true}
            onFilesChange={handleFilesChange}
            existingImages={imageUrls}
          />
        </div>

        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            {id ? (
              isEditing ? (
                <Loader />
              ) : (
                "Update"
              )
            ) : isLoading ? (
              <Loader />
            ) : (
              "Add Property"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProperty;
