import React, { useState } from "react";
import Select from "react-select";

const ModalBook = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button
                className="flex font-semibold"
                type="button"
                onClick={() => setShowModal(true)}
            >
                <img alt='booknow' src='./assets/book_now_button.svg'></img>
            </button>
            {showModal ? (
                <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-6xl mt-24">
                        <div className="border-0 rounded-lg shadow relative flex flex-col w-full bg-white outline-none focus:outline-none px-10 font-montserrat">
                            <div className="flex items-start justify-between p-5 rounded-t">
                                <h3 className="text-xl font-semibold">Add New Receipt</h3>
                            </div>
                            <div className="relative px-6 flex-auto flex flex-wrap">
                                {/* Kolom Kiri */}
                                <div className="w-full lg:w-1/2 px-4 mb-4">
                                    <label className="flex justify-start text-black text-sm mb-1">
                                        Product Name
                                    </label>
                                    <input
                                        required
                                        className="shadow appearance-none border border-line rounded w-full p-2 text-black"
                                        placeholder="Input Product Name" />
                                </div>
                                <div className="w-full lg:w-1/2 px-4 mb-4">
                                    <label className="flex justify-start text-black text-sm mt-4 mb-1">
                                        Quantity Macro
                                    </label>
                                    <input
                                        required
                                        type="number"
                                        className="shadow appearance-none border border-line rounded w-full p-2 text-black"
                                        placeholder="Input Quantity Macro" />
                                </div>
                                <div className="w-full lg:w-1/2 px-4 mb-4">
                                    <label className="flex justify-start text-black text-sm mt-4 mb-1">
                                        Price
                                    </label>
                                    <input
                                        required
                                        type="number"
                                        step="0.01"
                                        className="shadow appearance-none border border-line rounded w-full p-2 text-black"
                                        placeholder="Input Price" />
                                </div>

                                {/* Kolom Kanan */}
                                <div className="w-full lg:w-1/2 px-4 mb-4">
                                    <label className="flex justify-start text-black text-sm mb-1">
                                        Discount
                                    </label>
                                    <input
                                        required
                                        type="number"
                                        step="0.01"
                                        className="shadow appearance-none border border-line rounded w-full p-2 text-black"
                                        placeholder="Input Discount" />
                                </div>
                                <div className="w-full lg:w-1/2 px-4 mb-4">
                                    <label className="flex justify-start text-black text-sm mt-4 mb-1">
                                        Tax
                                    </label>
                                    <input
                                        required
                                        type="number"
                                        step="0.01"
                                        className="shadow appearance-none border border-line rounded w-full p-2 text-black"
                                        placeholder="10%" />
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
                                        onClick={() => setShowModal(false)}
                                    >
                                        Add Receipt
                                    </button>
                                </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default ModalBook;
