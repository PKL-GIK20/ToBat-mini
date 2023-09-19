import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";


const ModalAddStock = () => {
    const [productOptions, setProductOptions] = useState([]);
    const [product, setProduct] = useState("");
    const [expiredAt, setExpiredAt] = useState("");
    const [quantityMacro, setQuantityMacro] = useState("");
    const [price, setPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [tax, setTax] = useState("10");



    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!/^\d+$/.test(price) || price == 0) {
            window.alert("Please enter a valid numeric value for Price.");
            return; // Stop form submission
        }
        if (!/^\d+$/.test(quantityMacro) || quantityMacro == 0) {
            window.alert("Please enter a valid numeric value for Quantity Macro.");
            return; // Stop form submission
        }
        if (!/^\d+$/.test(discount) || discount == 0 ) {
            window.alert("Please enter a valid numeric value for Discount.");
            return; // Stop form submission
        }


        if (!product || !quantityMacro || !price || !discount || !tax || !expiredAt) {
            window.alert("Please fill out all fields.");
            return;
        }

        const formData = new FormData();
        formData.append("product", product.value);
        formData.append("quantity_macro", quantityMacro);
        formData.append("total_price", price);
        formData.append("discount", discount);
        formData.append("tax", tax);
        formData.append("expired_at", expiredAt);

        try {
            const token = localStorage.getItem("token");
            await axios.post('/api/stock/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                }
            })
            window.alert("Stock Succesfully Added!");
            window.location.reload();
        } catch (error) {
            console.error("Error creating note:", error);
        }
    };
    useEffect(() => {
        fetchProductList();
    }, []);

    const fetchProductList = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("/api/product", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const responseData = response.data;
            console.log(responseData);

            const productList = responseData.map((product) => ({
                value: product._id,
                label: `${product.name}`
            }));

            setProductOptions(productList);

            console.log(productList);
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    };

    return (
        <>
            <button
                className="flex font-semibold"
                type="button"
                onClick={() => setShowModal(true)}
            ><img className='mr-2' alt="create_icon" src='./assets/create_icon.svg'></img>
                Add Stock
            </button>
            {showModal ? (
                <>
                    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-6xl mt-24">
                            <div className="border-0 rounded-lg shadow relative flex flex-col w-full bg-white outline-none focus:outline-none px-10 font-montserrat">
                                <div className="flex items-start justify-between p-5 rounded-t">
                                    <h3 className="text-xl font-semibold">Add New Receipt</h3>
                                </div>
                                <div className="relative px-6 flex-auto flex flex-wrap">
                                    {/* Kolom Kiri */}
                                    <div className="w-full lg:w-1/2 px-4 mb-4">
                                        <form className="rounded w-full">
                                            <label className="block text-black text-sm mt-4 mb-1">
                                                Product
                                            </label>
                                            <Select
                                                required
                                                className=" appearance-none rounded w-full text-black"
                                                placeholder="Select Product"
                                                options={productOptions}
                                                onChange={setProduct}
                                            />
                                        </form>
                                    </div>
                                    <div className="w-full lg:w-1/2 px-4 mb-4">
                                        <label className="flex justify-start text-black text-sm mt-4 mb-1">
                                            Quantity Macro (Box)
                                        </label>
                                        <input
                                            required
                                            className="shadow appearance-none border border-line rounded w-full p-2 text-black"
                                            placeholder="Input Quantity Macro"
                                            value={quantityMacro}
                                            onChange={(e) => setQuantityMacro(e.target.value)} />
                                    </div>
                                    <div className="w-full lg:w-1/2 px-4 mb-4">
                                        <label className="flex justify-start text-black text-sm mt-4 mb-1">
                                            Price (Rp)
                                        </label>
                                        <input
                                            required
                                            className="shadow appearance-none border border-line rounded w-full p-2 text-black"
                                            placeholder="Input Product Price"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)} />
                                    </div>

                                    {/* Kolom Kanan */}
                                    <div className="w-full lg:w-1/2 px-4 mb-4">
                                        <label className="flex justify-start text-black text-sm mt-4 mb-1">
                                            Discount (%)
                                        </label>
                                        <input
                                            required
                                            className="shadow appearance-none border border-line rounded w-full p-2 text-black"
                                            placeholder="Input Product Discount"
                                            value={discount}
                                            onChange={(e) => setDiscount(e.target.value)} />
                                    </div>
                                    <div className="w-full lg:w-1/2 px-4 mb-4">
                                        <label className="flex justify-start text-black text-sm mt-4 mb-1">
                                            Tax (%)
                                        </label>
                                        <input
                                            disabled
                                            className="shadow appearance-none border border-line rounded w-full p-2 text-black"
                                            placeholder="Input Product Tax"
                                            value={tax}
                                        />
                                    </div>
                                    <div className="w-full lg:w-1/2 px-4 mb-4">
                                        <label className="flex justify-start text-black text-sm mt-4 mb-1">
                                            Expired Date (YYYY-MM-DD)
                                        </label>
                                        <input
                                            required
                                            type="text" // Gunakan tipe teks untuk format yy-mm-dd
                                            className="shadow appearance-none border border-line rounded w-full p-2 text-black"
                                            placeholder="Input Expired Date"
                                            onChange={(e) => setExpiredAt(e.target.value)} // Simpan nilai ke dalam state
                                        />
                                    </div>
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
                                        Add Receipt
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

export default ModalAddStock;