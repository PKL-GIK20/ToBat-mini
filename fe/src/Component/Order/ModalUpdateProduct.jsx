import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";


const ModalUpdateProduct = ({ initialValues, ProductId }) => {
    const [name, setName] = useState(initialValues.name);
    const [category, setCategory] = useState(initialValues.category);
    const [image, setImage] = useState(initialValues.image);
    const [categoryOptions, setCategoryOptions] = useState([]);

    console.log(categoryOptions)

    console.log(category)

    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("image", image);
        formData.append("name", name);
        formData.append("category", category.value);

        try {
            const token = localStorage.getItem("token");
            await axios.put(`/api/product/update/${ProductId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            setShowModal(false);
            window.alert("Product Successfully Updated!");
            window.location.reload();
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const handleImage = (event) => {
        const file = event.target.files[0];
    
        if (!file) {
            return;
        }

        const allowedFormats = ["jpeg", "jpg", "png"];
        const fileExtension = file.name.split(".").pop().toLowerCase();
    
        if (!allowedFormats.includes(fileExtension)) {
            window.alert("Invalid file format. Please select a valid image (jpeg, jpg, png).");
            event.target.value = "";
            setImage(null);
            return;
        }
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
                _id : category._id,
                name : `${category.name}`
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
            ><img className='mr-2' alt="create_icon" src='./assets/edit_icon.svg'></img>
            </button>
            {showModal ? (
                <>
                    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-6xl mt-24">
                            <div className="border-0 rounded-lg shadow relative flex flex-col w-full bg-white outline-none focus:outline-none px-10 font-montserrat">
                                <div className="flex items-start justify-between p-5 rounded-t ">
                                    <h3 className="text-xl font=semibold">Update Product</h3>
                                </div>
                                <div className="relative px-6 flex-auto">
                                    <form className="rounded w-full">
                                        <label className="block text-black text-sm mb-1">
                                            Product Name
                                        </label>
                                        <input
                                            className="shadow appearance-none border border-line rounded w-full p-2 text-black"
                                            placeholder="Input Product Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)} />
                                        <label className="block text-black text-sm mt-4 mb-1">
                                            Category
                                        </label>
                                        <Select
                                            getOptionLabel={selectedOption => selectedOption.name}
                                            getOptionValue={selectedOption => selectedOption.name}
                                            className=" appearance-none rounded w-full text-black"
                                            placeholder="Select Category"
                                            options={categoryOptions}
                                            value={category}
                                            onChange={(selectedOption) => {console.log(selectedOption); setCategory(selectedOption)}}
                                        />
                                        <label className="block text-black text-sm mt-4 mb-1">
                                            Image
                                        </label>
                                        <input
                                            type="file"
                                            className="shadow appearance-none border border-line rounded w-full p-2 text-black"
                                            accept="image/*"
                                            onChange={handleImage} />
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
                                        Update Product
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

export default ModalUpdateProduct;