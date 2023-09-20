import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const isHome = location.pathname === '/home';
    const isProduct = location.pathname == '/product';
    const isBatch = location.pathname == '/batch';
    const isOrder = location.pathname == '/order'

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoggedOut, setIsLoggedOut] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');

        setIsLoggedOut(true);

        navigate('/');
    }

    return (
        <nav className="fixed w-[127px] bg-white h-full shadow-md">
            <div className="flex justify-center">
                <img
                    className="w-[60%] my-7"
                    src={"./assets/tobat_logo_2.png"}
                    alt="Icon"
                />
            </div>
            <div className="flex justify-center">
                <hr className="w-[60%] h-1 border-line"></hr>
            </div>
            <ul className="mt-5 h-[70%]">
                <li className="flex justify-center">
                    {isHome ? <img
                        className="w-[45%] my-4 outline-none"
                        src={"./assets/home_icon_hover.svg"}
                        alt="Icon"
                    /> : <a href="/home" className="w-[30%] my-4 outline-none">
                        <img
                            src={"./assets/home_icon.svg"}
                            alt="Icon"
                            href="/home"
                        /></a>}

                </li>
                <li className="flex justify-center">
                    {isProduct ? <img
                        className="w-[45%] my-4 outline-none"
                        src={"./assets/product_icon_hover.svg"}
                        alt="Icon"
                    /> : <a className="w-[35%] my-4 outline-none" href="/product">
                        <img
                            src={"./assets/product_icon.svg"}
                            alt="Icon"
                        /></a>}
                </li>
                <li className="flex justify-center">
                    {isBatch ? <img
                        className="w-[45%] my-4 outline-none"
                        src={"./assets/stock_icon_hover.svg"}
                        alt="Icon"
                    /> :
                        <a href="/batch" className="w-[30%] my-4 outline-none">
                            <img
                                src={"./assets/stock_icon.svg"}
                                alt="Icon"
                            /></a>}
                </li>
                <li className="flex justify-center">
                    {isOrder ? <img
                        className="w-[45%] my-4 outline-none"
                        src={"./assets/receipt_icon_hover.svg"}
                        alt="Icon"
                    /> : <a href="/order" className="w-[40%] my-4 outline-none">
                        <img
                            src={"./assets/receipt_icon.svg"}
                            alt="Icon"
                        /></a>}
                </li>
                <li className="flex justify-center absolute inset-x-0 bottom-6">
                    <button onClick={openModal} className="w-[30%] my-4 outline-none">
                        <img
                            src={"./assets/sign_out_icon.svg"}
                            alt="Icon"
                        />
                    </button>
                </li>
            </ul>
            {/* Logout Confirmation Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white p-10 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-3">Logout</h3>
                        <p className="text-center">Are you sure you want to log out?</p>
                        <div className="flex justify-center mt-7">
                            <button className="bg-gray-300 text-gray-700 px-4 py-2" onClick={closeModal}>
                                Cancel
                            </button>
                            <button className="bg-[#D94343] text-white px-4 py-2 ml-2 rounded-sm" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Display a message after successful logout */}
            {isLoggedOut && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white p-5 rounded-lg shadow-md">
                        <p className="text-center">You have been successfully logged out.</p>
                        <div className="flex justify-center mt-4">
                            <button className="bg-blue-500 text-white px-4 py-2" onClick={closeModal}>
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );

}