import React, { useState } from "react";
import AdminNav from "../components/AdminNav";
import { URL } from "../config";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

function AdminAdd() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    size: "",
    price: null,
    image: null,
  });

  const role = useSelector((state) => state.app.role);

  function changeHandler(event) {
    setFormData((prevState) => {
      return {
        ...prevState,
        [event.target.name]:
          event.target.type === "file"
            ? event.target.files[0]
            : event.target.value,
      };
    });
  }

  async function submitHandler(event) {
    event.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append("name", formData.name);
    formDataObj.append("size", formData.size);
    formDataObj.append("price", formData.price);
    formDataObj.append("image", formData.image);

    try {
      setIsLoading(true);
      const response = await axios.post(`${URL}/create`, formDataObj, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials:true,
      });

      toast.success("Item Added Successfully");
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      {role !== "Admin" && <div>Forbidden Access</div>}

      {role === "Admin" && (
        <div className="w-full min-h-screen">
          <AdminNav />
          <div className="bg-secondary min-h-[90vh] pt-20 flex flex-col items-center">
            <h1 className="mb-4 text-xl md:text-2xl font-extrabold leading-none tracking-tight text-gray-900">
              Add A Pizza!
            </h1>
            <form
              className="w-[90%] max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8"
              onSubmit={submitHandler}
            >
              <div className="mb-5">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={changeHandler}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-primary block w-full p-2.5"
                  placeholder="Enter here"
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="size"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Size
                </label>
                <input
                  type="text"
                  id="size"
                  name="size"
                  value={formData.size}
                  onChange={changeHandler}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-primary block w-full p-2.5"
                  placeholder="Enter here"
                  required
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={changeHandler}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-primary block w-full p-2.5"
                  placeholder="Enter here"
                  required
                />
              </div>

              <div className="mb-5">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900"
                  htmlFor="image"
                >
                  Upload Image
                </label>
                <input
                  name="image"
                  className="block w-full text-sm text-gray-900 cursor-pointer bg-gray-50"
                  id="imager"
                  type="file"
                  files={formData.image}
                  onChange={changeHandler}
                  required
                />
              </div>

              <button
                type="submit"
                className="text-white bg-primary hover:bg-primary_hover font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
              >
                {isLoading ? "uploading..." : "submit"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminAdd;
