import React, { useState, useEffect } from 'react';
import axios from "../axiosConfig";
import Navbar from "../Component/Navbar";
import ModalAddStock from '../Component/Order/ModalAddStock';
import ModalUpdateProduct from '../Component/Order/ModalUpdateProduct';
import ModalBook from '../Component/Order/ModalBook';
import moment from 'moment';


const Order = () => {
    // const data = [
    //     { id: 1, name: 'Oskadon SP', code:"T001" , category: 'Category X', image: './assets/tobat_logo_2.png' },
    //     { id: 2, name: 'Product B', code:"T001" , category: 'Category Y', image: './assets/tobat_logo_2.png' },
    //     { id: 3, name: 'Product B', code:"T001" , category: 'Category Y', image: './assets/tobat_logo_2.png' },
    //     { id: 4, name: 'Product B', code:"T001" , category: 'Category Y', image: './assets/tobat_logo_2.png' },
    //     { id: 5, name: 'Product B', code:"T001" , category: 'Category Y', image: './assets/tobat_logo_2.png' },
    //     { id: 6, name: 'Product B', code:"T001" , category: 'Category Y', image: './assets/tobat_logo_2.png' },
    //     { id: 7, name: 'Product B', code:"T001" , category: 'Category Y', image: './assets/tobat_logo_2.png' },
    //     { id: 8, name: 'Product B', code:"T001" , category: 'Category Y', image: './assets/tobat_logo_2.png' },
    //     { id: 9, name: 'Product B' ,code:"T001" , category: 'Category Y', image: './assets/tobat_logo_2.png' },
    // ];
    const [products, setProduct] = useState([]);
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
        getProduct();
    }, []);

    const getProduct = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("/api/stock", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const imageUrl = response.data.url;
            setImageUrl(imageUrl);
            setProduct(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const preprocessData = (data) => {
        const groupedData = {};
        data.forEach(item => {
            const kode_obat = item.product.kode_obat;
            if (!groupedData[kode_obat]) {
                groupedData[kode_obat] = { ...item };
            } else {
                groupedData[kode_obat].available_macro += item.available_macro;
                groupedData[kode_obat].quantity_micro += item.quantity_micro;
            }
        });
        return Object.values(groupedData);
    };


    const maxRowsToShow = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastRow = currentPage * maxRowsToShow;
    const indexOfFirstRow = indexOfLastRow - maxRowsToShow;
    const currentData = preprocessData(products).slice(indexOfFirstRow, indexOfLastRow);

    const handleNextPage = () => {
        if (indexOfLastRow < products.length) {
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
                <h1 className='text-[50px] font-montserrat mb-7'>MEDICINE RECEIPT TRANSACTION</h1>
                <div className="flex flex-col items-center w-[90%] bg-white px-5 py-3 shadow-md font-montserrat rounded-md">
                    <div className='flex justify-start w-[100%]'>
                        <ModalAddStock />
                    </div>
                    <div className=" w-full">
                        <table className="table-auto w-full border-separate border-spacing-y-3">
                            <thead>
                                <tr>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">No</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Image</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Product Code</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Product Name</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Qty. Ma</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Category</th>
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
                                    currentData.map((stock, index) => (
                                        <tr className='bg-[#F5F5F5] rounded-md shadow-md' key={stock.product._id}>
                                            <td className="text-center w-10 px-4 py-2 rounded-l-lg">{index + indexOfFirstRow + 1}</td>
                                            <td className="text-center max-w-[25px] h-auto px-4 py-2">
                                                <img src={stock.product.image} className="w-20 h-20 rounded-sm mx-auto" />
                                            </td>
                                            <td className="text-center w-36 px-4 py-2">{stock.product.kode_obat}</td>
                                            <td className="text-center px-4 py-2 max-w-[200px]">{stock.product.name}</td>
                                            <td className="text-center px-4 py-2">{stock.quantity_macro}</td>
                                            <td className="text-center px-4 py-2 rounded-r-lg">{stock.product.category.name}</td>
                                        </tr>
                                    ))
                                )}

                            </tbody>
                        </table>
                    </div>
                    <div className='flex justify-between w-[100%]'>
                        <h3 className='mt-2 py-2'>Showing {indexOfFirstRow + 1} to {indexOfLastRow} of {products.length} entries</h3>
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
                            {indexOfLastRow < products.length && (
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

export default Order;