import React, { useState, useEffect } from "react";
import axios from "../../axiosConfig";
import { useNavigate } from "react-router-dom";

const ModalBook = ({ stockId }) => {
  const [availableMacro, setAvailableMacro] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("stock", stockId);
    formData.append("available_macro", availableMacro);

    try {
      const token = localStorage.getItem("token");
      await axios.post(`/api/stockProduct/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      window.alert("StockProd Successfully Added!");
      window.location.reload();
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  useEffect(() => {
    fetchProductList();
  }, []);

  const fetchProductList = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/product", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = response.data;
      console.log(responseData);
      // ...

    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  return (
    <>
      <button
        className="flex font-semibold"
        type="button"
        onClick={() => setShowModal(true)}
      >
        <img className="mr-2" alt="create_icon" src="./assets/book_now_button.svg" />
      </button>
      {showModal ? (
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-6xl mt-24">
            <div className="border-0 rounded-lg shadow relative flex flex-col w-full bg-white outline-none focus:outline-none px-10 font-montserrat">
              <div className="flex items-start justify-between p-5 rounded-t">
                <h3 className="text-xl font-semibold">Add New Receipt</h3>
              </div>
              <div className="relative px-6 flex-auto flex flex-wrap">
                <label className="flex justify-start text-black text-sm mt-4 mb-1">
                  Availability Macro
                </label>
                <input
                  required
                  className="shadow appearance-none border border-line rounded w-full p-2 text-black"
                  placeholder="Input Quantity Macro"
                  value={availableMacro}
                  onChange={(e) => setAvailableMacro(e.target.value)}
                />
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
                  onClick={handleSubmit}
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
