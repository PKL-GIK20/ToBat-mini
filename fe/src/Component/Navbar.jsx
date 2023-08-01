import React, { useState, useEffect } from "react";

export default function Navbar() {

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
                    <img
                        className="w-[30%] my-4 outline-none"
                        src={"./assets/home_icon.svg"}
                        alt="Icon"
                    />
                </li>
                <li className="flex justify-center">
                    <img
                        className="w-[35%] my-4"
                        src={"./assets/product_icon.svg"}
                        alt="Icon"
                    />
                </li>
                <li className="flex justify-center">
                    <img
                        className="w-[30%] my-4"
                        src={"./assets/batch_icon.svg"}
                        alt="Icon"
                    />
                </li>
                <li className="flex justify-center">
                    <img
                        className="w-[30%] my-4"
                        src={"./assets/order_icon.svg"}
                        alt="Icon"
                    />
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