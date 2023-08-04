import React, { useState, useEffect } from 'react';
import axios from "../axiosConfig";
import Navbar from "../Component/Navbar";

const Product = () => {
    // const data = [
    //     { id: 1, name: 'Oskadon SP', code:"T001", expired : '2002-02-22', price: '123123', qty : '12' ,category: 'Category X', image: './assets/tobat_logo_2.png' },
    //     { id: 2, name: 'Product B', code:"T001" , category: 'Category Y', image: './assets/tobat_logo_2.png' },
    //     { id: 3, name: 'Product B', code:"T001" , category: 'Category Y', image: './assets/tobat_logo_2.png' },
    //     { id: 4, name: 'Product B', code:"T001" , category: 'Category Y', image: './assets/tobat_logo_2.png' },
    //     { id: 5, name: 'Product B', code:"T001" , category: 'Category Y', image: './assets/tobat_logo_2.png' },
    //     { id: 6, name: 'Product B', code:"T001" , category: 'Category Y', image: './assets/tobat_logo_2.png' },
    //     { id: 7, name: 'Product B', code:"T001" , category: 'Category Y', image: './assets/tobat_logo_2.png' },
    //     { id: 8, name: 'Product B', code:"T001" , category: 'Category Y', image: './assets/tobat_logo_2.png' },
    //     { id: 9, name: 'Product B' ,code:"T001" , category: 'Category Y', image: './assets/tobat_logo_2.png' },
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
                    <div className='flex justify-end w-[100%]'>
                        <div className='relative'>
                            <input className='rounded-full p-1 w-[280px] px-9 border'
                                placeholder='Search product name here...'
                            ></input>
                            <img alt='search' className='absolute left-2 top-1/2 transform -translate-y-1/2' src='./assets/search_icon.svg'></img>
                        </div>
                    </div>
                    <div className=" w-full">
                        <table className="table-auto w-full border-separate border-spacing-y-3">
                            <thead>
                                <tr>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">No</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Image</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Code</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Name</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Exp. Date</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Category</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Price</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Qty</th>
                                </tr>
                            </thead>
                            <tbody className=''>
                                {produk.length === 0 ? (
                                    <div className="absolute flex justify-center items-center w-[90%]">
                                        <div className="w-full mb-10 rounded-lg bg-white p-3">
                                            <p className="font-montserrat text-xl font-semibold mb-4 text-center">
                                                Products Not Available!
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    produk.slice(0, maxRowsToShow).map((produks) => (
                                        <tr key={produks._id}>
                                            <td className="text-center w-10 px-4 py-2 rounded-l-lg">{produks.product.productId}</td>
                                            <td className="text-center max-w-[25px] h-auto px-4 py-2">
                                                <img src={`url(${produks.product.image})`} alt={produks.product.name} className="w-20 h-20 rounded-sm mx-auto" />
                                            </td>
                                            <td className="text-center w-36 px-4 py-2 rounded-l-lg">{produks.product.kode_obat}</td>
                                            <td className="text-center px-4 py-2 w-96">{produks.product.name}</td>
                                            <td className="text-center w-40 px-4 py-2">{produks.expired_at}</td>
                                            <td className="text-center px-4 py-2">{produks.product.category.name}</td>
                                            <td className="text-center px-4 py-2">{produks.price}</td>
                                            <td className="text-center px-4 py-2">{produks.quantity_micro}</td>
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