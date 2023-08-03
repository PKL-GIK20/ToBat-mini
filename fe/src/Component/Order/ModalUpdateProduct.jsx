import React, { useState } from "react";
import Select from "react-select";

const ModalUpdateProduct = () => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <button
                className="flex font-semibold"
                type="button"
                onClick={() => setShowModal(true)}
            ><img className='mr-2' src='./assets/edit_icon.svg'></img>
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
                                        <label className="flex justify-start text-black text-sm mb-1">
                                            Product Name
                                        </label>
                                        <input
                                            required
                                            className="shadow appearance-none border border-line rounded w-full p-2 text-black"
                                            placeholder="Input Product Name" />
                                        <label className="flex justify-start text-black text-sm mt-4 mb-1">
                                            Category
                                        </label>
                                        <Select
                                            required
                                            className="text-start appearance-none rounded w-full text-black"
                                            placeholder="Select Category"
                                            options={options} />
                                        <label className="flex justify-start text-black text-sm mt-4 mb-1">
                                            Image
                                        </label>
                                        <input type="file" className="shadow appearance-none border border-line rounded w-full p-2 text-black" />
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
                                        onClick={() => setShowModal(false)}
                                    >
                                        Update
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