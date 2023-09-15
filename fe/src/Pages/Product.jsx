import React, { useState, useEffect } from 'react';
import axios from "../axiosConfig";
import Navbar from "../Component/Navbar";
import ModalUpdateProduct from '../Component/Order/ModalUpdateProduct';
import ModalAddProduct from '../Component/Order/ModalAddProduct';

const Product = () => {
    const [produk, setProduk] = useState([]);
    const [imageUrl, setImageUrl] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);

    const openModal = (Id) => {
        setSelectedProductId(Id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        getProduk();
    }, []);

    const getProduk = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("/api/product", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const imageUrl = response.data.url;
            setImageUrl(imageUrl);
            setProduk(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteProduct = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`/api/product/delete/${selectedProductId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // Setelah penghapusan berhasil, perbarui daftar produk.
            getProduk();
            window.alert("Product successfully deleted!");
            closeModal(); // Tutup modal setelah penghapusan selesai.
        } catch (error) {
            console.log(error);
        }
    };

    const maxRowsToShow = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastRow = currentPage * maxRowsToShow;
    const indexOfFirstRow = indexOfLastRow - maxRowsToShow;
    const currentData = produk.slice(indexOfFirstRow, indexOfLastRow);

    const handleNextPage = () => {
        if (indexOfLastRow < produk.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className='bg-bg h-screen w-screen overflow-hidden'>
            <Navbar />
            <div className='flex flex-col items-center w-[98%] ml-[80px] pt-6'>
                <h1 className='text-[50px] font-montserrat mb-7'>List Product</h1>
                <div className="flex flex-col items-center w-[90%] bg-white px-5 py-3 shadow-md font-montserrat rounded-md">
                    <div className='flex justify-start w-[100%]'>
                        <ModalAddProduct />
                    </div>
                    <div className=" w-full">
                        <table className="table-auto w-full border-separate border-spacing-y-3">
                            <thead>
                                <tr>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">No</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Image</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Code</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Name</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Category</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Actions</th>

                                </tr>
                            </thead>
                            <tbody className=''>
                                {currentData.length === 0 ? (
                                    <div className="absolute flex justify-center items-center w-[90%]">
                                        <div className="w-full mb-10 rounded-lg bg-white p-3">
                                            <p className="font-montserrat text-xl font-semibold mb-4 text-center">
                                                Products Not Available!
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    currentData.map((product, index) => (
                                        <tr className='bg-[#F5F5F5] rounded-md shadow-md' key={product._id}>
                                            <td className="text-center w-10 px-4 py-2 rounded-l-lg">{index + indexOfFirstRow + 1}</td>
                                            <td className="text-center max-w-[25px] h-auto px-4 py-2">
                                                <img src={product.image} className="w-20 h-20 rounded-sm mx-auto" />
                                            </td>
                                            <td className="text-center w-36 px-4 py-2 rounded-l-lg">{product.kode_obat}</td>
                                            <td className="text-center px-4 py-2 max-w-[200px]">{product.name}</td>
                                            <td className="text-center px-4 py-2">{product.category.name}</td>
                                            <td className=" relative items-center px-4 py-2 rounded-r-lg">
                                                <div className='flex justify-center m-2'>
                                                    <ModalUpdateProduct ProductId={product._id} initialValues={{ name: product.name, category: product.category.name, image: product.image }} />
                                                    <button onClick={() => openModal(product._id)}>
                                                        <img alt='trash' src='./assets/trash_icon.svg'></img>
                                                    </button>
                                                    {isModalOpen && (
                                                        <div className="fixed inset-0 flex items-center justify-center z-50">
                                                            <div className="bg-white p-5 rounded-lg shadow-md">
                                                                <h3 className="text-xl font=semibold">Delete Product</h3>
                                                                <p className="text-center">Are you sure you want to delete this product?</p>
                                                                <div className="flex justify-center mt-4">
                                                                    <button className=" text-gray-700 px-4 py-2 mr-2" onClick={closeModal}>
                                                                        Cancel
                                                                    </button>
                                                                    <button className="bg-[#D94343] text-white px-4 py-2" onClick={deleteProduct}>
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}

                            </tbody>
                        </table>
                    </div>
                    <div className='flex justify-between w-[100%]'>
                        <h3 className='mt-2 py-2'>Showing {indexOfFirstRow + 1} to {indexOfLastRow} of {produk.length} entries</h3>
                        <h3 className='mt-2 py-2'>{currentPage}</h3>
                        <div className='gap-0'>
                            {currentPage > 1 && (
                                <button
                                    className="mt-2 px-1 py-2 rounded"
                                    onClick={handlePrevPage}
                                >
                                    <img alt='prev' className='w-[25px]' src='./assets/prev_icon.svg'></img>
                                </button>
                            )}
                            {indexOfLastRow < produk.length && (
                                <button
                                    className="mt-2 px-1 py-2 rounded"
                                    onClick={handleNextPage}
                                >
                                    <img alt='next' className='w-[25px]' src='./assets/next_icon.svg'></img>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
