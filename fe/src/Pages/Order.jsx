import React, { useState } from 'react';
import Navbar from "../Component/Navbar";

const Order = () => {
    const data = [
        { id: 1, name: 'Oskadon SP', category: 'Category X', image: './assets/tobat_logo_2.png' },
        { id: 2, name: 'Product B', category: 'Category Y', image: './assets/tobat_logo_2.png' },
        { id: 3, name: 'Product B', category: 'Category Y', image: './assets/tobat_logo_2.png' },
        { id: 4, name: 'Product B', category: 'Category Y', image: './assets/tobat_logo_2.png' },
        { id: 5, name: 'Product B', category: 'Category Y', image: './assets/tobat_logo_2.png' },
        { id: 6, name: 'Product B', category: 'Category Y', image: './assets/tobat_logo_2.png' },
        { id: 7, name: 'Product B', category: 'Category Y', image: './assets/tobat_logo_2.png' },
        { id: 8, name: 'Product B', category: 'Category Y', image: './assets/tobat_logo_2.png' },
        { id: 9, name: 'Product B', category: 'Category Y', image: './assets/tobat_logo_2.png' },
    ];

    const maxRowsToShow = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastRow = currentPage * maxRowsToShow;
    const indexOfFirstRow = indexOfLastRow - maxRowsToShow;
    const currentData = data.slice(indexOfFirstRow, indexOfLastRow);

    const handleNextPage = () => {
        if (indexOfLastRow < data.length) {
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
                    <div className='flex justify-between w-[100%]'>
                        <button className='flex font-semibold'>
                            <img className='mr-2' src='./assets/create_icon.svg'></img>
                            Add Product
                            </button>
                        <div className='relative'>   
                            <input className='rounded-full p-1 w-[280px] px-9 border'
                                placeholder='Search product name here...'
                            ></input>
                            <img className='absolute left-2 top-1/2 transform -translate-y-1/2' src='./assets/search_icon.svg'></img>
                        </div> 
                    </div>
                    <div className=" w-full">
                        <table className="table-auto w-full border-separate border-spacing-y-3">
                            <thead>
                                <tr>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">No</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Image</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Product Name</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Category</th>
                                    <th className="px-4 py-1 border-line border-b-2 text-line font-normal">Actions</th>
                                </tr>
                            </thead>
                            <tbody className=''>
                                {currentData.slice(0, maxRowsToShow).map((item, index) => (
                                    <tr key={item.id} className={index > 0 ? 'mt-2 bg-table rounded-md ' : 'bg-table rounded-md'}>
                                        <td className="text-center w-10 px-4 py-2 rounded-l-lg">{item.id}</td>
                                        <td className="text-center max-w-[25px] h-auto px-4 py-2">
                                            <img src={item.image} alt={item.name} className="w-20 h-20 rounded-sm mx-auto" />
                                        </td>
                                        <td className="px-4 py-2 max-w-[200px]">{item.name}</td>
                                        <td className="text-center px-4 py-2">{item.category}</td>
                                        <td className="text-center px-4 py-2 rounded-r-lg">
                                            {/* Add your actions buttons or links here */}
                                            <button className="booknow text-white px-2 py-1 rounded">Book Now  </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className='flex justify-between w-[100%]'>
                        <h3 className='mt-2 py-2'>Showing {indexOfFirstRow + 1} to {indexOfLastRow} of {data.length} entries</h3>
                        <h3 className='mt-2 py-2'>{currentPage}</h3>
                        <div className='gap-0'>
                            {currentPage > 1 && (
                                <button
                                    className="mt-2 px-1 py-2 rounded"
                                    onClick={handlePrevPage}
                                >
                                    <img className='w-[25px]' src='./assets/prev_icon.svg'></img>
                                </button>
                            )}
                            {indexOfLastRow < data.length && (
                                <button
                                    className="mt-2 px-1 py-2 rounded"
                                    onClick={handleNextPage}
                                >
                                    <img className='w-[25px]' src='./assets/next_icon.svg'></img>
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