import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

export default function Navbar() {
    const location = useLocation();
    const isHome = location.pathname === '/home';
    const isProduct = location.pathname == '/product';
    const isBatch = location.pathname == '/batch';
    const isOrder = location.pathname == '/order'

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
                        src={"./assets/batch_icon_hover.svg"}
                        alt="Icon"
                        /> : 
                        <a href="/batch" className="w-[30%] my-4 outline-none">
                        <img
                        src={"./assets/batch_icon.svg"}
                        alt="Icon"
                    /></a>}
                </li>
                <li className="flex justify-center">
                    {isOrder ? <img
                        className="w-[45%] my-4 outline-none"
                        src={"./assets/order_icon_hover.svg"}
                        alt="Icon"
                    /> : <a href="/order" className="w-[30%] my-4 outline-none">
                        <img
                        src={"./assets/order_icon.svg"}
                        alt="Icon"
                    /></a>}
                </li>
                <li className="flex justify-center absolute inset-x-0 bottom-6">
                    <img
                        className="w-[20%] my-4"
                        src={"./assets/sign_out_icon.svg"}
                        alt="Icon"
                    />
                </li>
            </ul>
        </nav>
    );

}