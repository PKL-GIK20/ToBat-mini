import React, { useState, useEffect } from 'react';
import axios from "../axiosConfig";
import Navbar from "../Component/Navbar";
import moment from 'moment';

const Batch = () => {
    // const data = [
    //     { id: 1, code:"T001", name: 'Oskadon SP', category: 'Category X', qtyma : "12", qtymi : "120", pricema: "12.000", pricemi: "120.000", expired_at: "31/12/2023", buy_at: "31/12/2023" },
    //     { id: 2, code:"T002", name: 'Oskadon SD', category: 'Category X', qtyma : "12", qtymi : "120", pricema: "12.000", pricemi: "120.000", expired_at: "31/12/2023", buy_at: "31/12/2023" },
    // ];
    const [produk, setProduk] = useState([]);
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        getProduk();
    }, []);

    const getProduk = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("/api/stockProduct", {
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

    const maxRowsToShow = 8;
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
                <h1 className='text-[50px] font-montserrat mb-7'>STOCK OPNAME</h1>
                <div className="flex flex-col items-center w-[90%] bg-white px-5 py-3 shadow-md font-montserrat rounded-md">
                    <div className=" w-full">
                        <table className="table-auto w-full border-separate border-spacing-y-3">
                            <thead>
                                <tr>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">No</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Code</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Name</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Category</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Qty. Mi</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Price. Ma</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Price. Mi</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Buy. Date</th>
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
                                    currentData.map((produks, index) => (
                                        <tr className='bg-[#F5F5F5] rounded-lg shadow-md' key={produks._id}>
                                            <td className="text-center px-4 py-2 rounded-l-lg">{index + indexOfFirstRow + 1}</td>
                                            <td className="text-center px-4 py-2">{produks.stock.product.kode_obat}</td>
                                            <td className="text-center px-4 py-2">{produks.stock.product.name}</td>
                                            <td className="text-center px-4 py-2">{produks.stock.product.category.name}</td>
                                            <td className="text-center px-4 py-2">{produks.quantity_micro}</td>
                                            <td className="text-center px-4 py-2">Rp {produks.stock.fix_price}</td>
                                            <td className="text-center px-4 py-2">Rp {produks.price}</td>
                                            <td className="text-center px-4 py-2 rounded-r-lg">{moment(produks.stock.created_at).format("YYYY-MM-DD")}</td>
                                        </tr>
                                    ))
                                )}

                            </tbody>
                        </table>
                    </div>
                    <div className='flex justify-between w-[100%]'>
                        <h3 className='mt-2 py-2'>Showing {indexOfFirstRow + 1} to {indexOfLastRow} of {currentData.length} entries</h3>
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
                            {indexOfLastRow < currentData.length && (
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

export default Batch;