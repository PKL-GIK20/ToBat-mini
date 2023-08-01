import React from 'react';

const Login = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex rounded-lg overflow-hidden shadow-md w-[80%] h-[80%] m-[5%]">
                <div className="bg-primary p-4 w-1/2 flex justify-center">
                    <p>a</p>
                </div>
                <div className="bg-white p-4 w-1/2">
                    <div>
                    </div>
                    <form className='px-[50px]'>
                        <div className='flex flex-col font-montserrat'>
                            <label className="pt-3 text-[#898989]">Username</label>
                            <input
                                className="border-b-2 border-b-primary outline-none hover:border-b-hovercolor focus:border-b-hovercolor"
                                type="text"
                                placeholder="username"
                            />

                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default Login;