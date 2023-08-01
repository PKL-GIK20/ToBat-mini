import React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const navigate = useNavigate();

    function togglePasswordVisibility() {
        setIsPasswordVisible((prevState) => !prevState);
    }

    return (
        <div className="flex justify-center items-center h-screen bg-[#FCF9F9]">
            <div className="flex rounded-lg overflow-hidden shadow-md w-[80%] h-[80%] m-[5%]">
                <div className="bg-primary p-4 w-1/2 flex flex-col items-center">
                    <img className='h-[331px] w-[331px] mt-20' src={"./assets/drug_image.png"}></img>
                    <h2 className='slogan w-[331px] text-white'>Medicine Made Simple, Quick and Easy!</h2>
                </div>
                <div className="bg-white p-4 w-1/2">
                    <div className='flex justify-center mt-5'>
                        <img className='h-[35%] w-[35%]' src={"./assets/tobat_logo.png"} alt="Logo" />
                    </div>
                    <form className='px-[50px]'>
                        <div className='py-[75px] flex flex-col font-montserrat'>
                            <label className="pt-3 font-normal tracking-wider text-[#898989]">Username</label>
                            <input
                                className="border-b-[3px] border-b-primary outline-none hover:border-b-hovercolor focus:border-b-hovercolor"
                                type="text"
                                placeholder="Username"
                            />
                            <label className="pt-3 tracking-wider text-[#898989]">Password</label>
                            <div className='relative'>
                                <input
                                    className="w-full border-b-[3px] border-b-primary outline-none hover:border-b-hovercolor focus:border-b-hovercolor"
                                    type={isPasswordVisible ? "text" : "password"}
                                    placeholder="Password"
                                />
                                <button
                                    className="absolute inset-y-0 right-0 flex items-center text-black pb-2"
                                    onClick={togglePasswordVisibility}
                                    type="button"
                                >
                                    {isPasswordVisible ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            <label className="pt-3 tracking-wider text-[#898989]">Confirm Password</label>
                            <div className='relative'>
                                <input
                                    className="w-full border-b-[3px] border-b-primary outline-none hover:border-b-hovercolor focus:border-b-hovercolor"
                                    type={isPasswordVisible ? "text" : "password"}
                                    placeholder="Password"
                                />
                                <button
                                    className="absolute inset-y-0 right-0 flex items-center text-black pb-2"
                                    onClick={togglePasswordVisibility}
                                    type="button"
                                >
                                    {isPasswordVisible ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className='flex justify-center'>
                            <button
                                className="mt-[20px] text-xl text-white w-[40%] border-2 bg-primary hover:bg-hovercolor rounded-full py-1 "
                                type="submit"
                            >
                                Register
                            </button>
                        </div>
                        <h3 className='mt-9 font-normal'>Already have an account? <a href='/' className='underline'>Login Here</a> </h3>

                    </form>
                </div>
            </div>
        </div>

    );
};

export default Register;