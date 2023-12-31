import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";

const ModalAddProduct = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !category) {
      window.alert("Please fill out all fields.");
      return; // Stop form submission
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category.value);

    // Hanya jika gambar telah dipilih, tambahkan gambar ke formData
    if (image) {
      formData.append("image", image);
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post("/api/product/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      window.alert("Product Successfully Added!");
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // HTTP 409 indicates a conflict, meaning the name is not unique
        window.alert("Product name is already taken. Please choose a different name.");
      } else {
        console.error("Error creating product:", error);
      }
    }
  };

  const handleImage = (event) => {
    const file = event.target.files[0];

    // Check if a file was selected
    if (!file) {
      return;
    }

    // Define allowed file formats (e.g., jpeg, jpg, png)
    const allowedFormats = ["jpeg", "jpg", "png"];

    // Get the file extension
    const fileExtension = file.name.split(".").pop().toLowerCase();

    // Check if the file format is allowed
    if (!allowedFormats.includes(fileExtension)) {
      // Show an alert for invalid file format
      window.alert("Invalid file format. Please select a valid image (jpeg, jpg, png).");
      // Clear the input field
      event.target.value = "";
      // Clear the image state variable
      setImage(null);
      return;
    }

    if (file.size > 512000) {
      window.alert("Invalid file size. File size should not exceed 500KB.");
      // Clear the input field
      event.target.value = "";
      // Clear the image state variable
      setImage(null);
      return;
    }

    // If the file format is allowed, update the image state
    setImage(file);
  };

  useEffect(() => {
    fetchCategoryList();
  }, []);

  const fetchCategoryList = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/category", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = response.data;
      console.log(responseData);

      const categoryList = responseData.map((category) => ({
        value: category._id,
        label: `${category.name}`,
      }));

      setCategoryOptions(categoryList);

      console.log(categoryList);
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  return (
    <>
      <button
        className="flex font-semibold"
        type="button"
        onClick={() => setShowModal(true)}
      >
        <img className="mr-2" alt="create_icon" src="./assets/create_icon.svg" />
        Add Product
      </button>
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-6xl mt-24">
              <div className="border-0 rounded-lg shadow relative flex flex-col w-full bg-white outline-none focus:outline-none px-10 font-montserrat">
                <div className="flex items-start justify-between p-5 rounded-t">
                  <h3 className="text-xl font=semibold">Add Product</h3>
                </div>
                <div className="relative px-6 flex-auto">
                  <form className="rounded w-full">
                    <label className="block text-black text-sm mb-1">Product Name</label>
                    <input
                      required
                      className="shadow appearance-none border border-line rounded w-full p-2 text-black"
                      placeholder="Input Product Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <label className="block text-black text-sm mt-4 mb-1">Category</label>
                    <Select
                      required
                      className=" appearance-none rounded w-full text-black"
                      placeholder="Select Category"
                      options={categoryOptions}
                      onChange={setCategory}
                    />
                    <label className="block text-black text-sm mt-4 mb-1">Image</label>
                    <input
                      required
                      type="file"
                      className="shadow appearance-none border border-line rounded w-full p-2 text-black"
                      accept="image/*"
                      onChange={handleImage}
                    />
                  </form>
                </div>
                <div className="flex items-center justify-between p-6 rounded-b">
                  <button
                    className="background-transparent px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-white bg-[#20BFAA] text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Add Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default ModalAddProduct;
