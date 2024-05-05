import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";
import {
  borrowStatus,
  delBorrowItem,
  deleteItem,
  getUserItems,
  itemStatus,
} from "../../../API/Item";
import { borrowerProfile, lenderProfile } from "../../../API/Profile";

function MyStuff() {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);
  const [userPin, setUserPin] = useState(0);

  useEffect(() => {
    getUserItems(user?.email).then((data) => setData(data));
  }, [user, reload]);

  const handleAccept = (id, caution) => {
    const setStatus = {
      status: "Confirmed",
      pin: Math.floor(100000 + Math.random() * 900000),
    };

    itemStatus(id, setStatus);
    borrowStatus(id, setStatus);
    borrowerProfile(id, caution, "deduct");
    setTimeout(() => {
      setReload(!reload);
    }, 800);
  };

  const handleReject = (id) => {
    const setStatus = {
      status: "Available",
    };
    itemStatus(id, setStatus);
    setTimeout(() => {
      setReload(!reload);
    }, 800);
  };

  const handlePinSubmit = (id, caution, userEmail) => {
    const setStatus = {
      status: "Returned",
    };

    itemStatus(id, setStatus);
    borrowStatus(id, setStatus);
    borrowerProfile(id, caution, "return");
    lenderProfile(userEmail, caution);
    setTimeout(() => {
      setReload(!reload);
    }, 800);
  };

  const handleAvailable = (id) => {
    const setStatus = {
      status: "Available",
    };
    itemStatus(id, setStatus);
    delBorrowItem(id);
    setTimeout(() => {
      setReload(!reload);
    }, 800);
  };

  const handleDelete = (id) => {
    deleteItem(id);
    setTimeout(() => {
      setReload(!reload);
    }, 800);
  };

  return (
    <>
      <p className="text-center font-bold text-5xl tracking-tight pt-10 font-serif dark:text-white">
        My Stuffs
      </p>
      <div className="max-w-[75%] mx-auto mt-8 pb-16">
        <div className="relative overflow-x-auto sm:rounded-lg">
          <div className="flex justify-between items-center">
            <div className="pb-4 bg-white dark:bg-gray-900">
              <label htmlFor="table-search" className="sr-only">
                Search
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search"
                  className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
                  placeholder="Search for items"
                />
              </div>
            </div>
            <button className="py-2 px-4 bg-emerald-500 text-white rounded-lg">
              Sort by
            </button>
          </div>
          {data.length === 0 ? (
            <div className="text-[150px] text-center mt-20 text-[#f4f5f6]">
              Not Available
            </div>
          ) : (
            <div className="flex flex-col gap-4 justify-center items-center my-8">
              {data.map((item) => (
                <div
                  key={item._id}
                  className="w-full flex border shadow-md rounded-xl"
                >
                  <img className="h-40 rounded-s-xl" src={item.photos} alt="" />
                  <div className="px-3 pt-4">
                    <span className="bg-[#ccf1ee] p-1.5 mt-5 rounded-full w-auto">
                      <p className="text-[#00b8a8] font-semibold tracking-wide inline-block">
                        {item.status}
                      </p>
                    </span>
                    <p className="font-bold text-2xl">{item.name}</p>
                    <p>
                      {item.description.slice(0, 80)}
                      {item.description.length >= 80 && "..."}
                    </p>
                    <p className="font-bold text-xl">৳{item.caution}</p>
                    <p className="font-light text-[#00B8A8]">Safety Money</p>
                  </div>
                  {item.status === "Pending" ? (
                    <div className="ms-auto my-auto p-5">
                      <div>
                        <button
                          onClick={() => handleAccept(item._id, item.caution)}
                          className="text-center py-2 w-20 rounded-full font-semibold text-[#0B08AE] border-2 border-[#0B08AE]"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleReject(item._id)}
                          className="text-center ms-5 py-2 w-20 rounded-full font-semibold text-[#FF0000] border-2 border-[#FF0000]"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ) : item.status === "Confirmed" ? (
                    <div className="ms-auto my-auto p-10">
                      <p className="text-xl font-bold text-center">
                        {item.pin}
                      </p>
                      <p className="text-[#00B8A8]">Transfer PIN</p>
                    </div>
                  ) : item.status === "Return Pending" ? (
                    <div className="ms-auto my-auto p-5 justify-center">
                      <input
                        type="number"
                        id="pin"
                        placeholder="Borrwer PIN"
                        className="bg-[#ffffff] w-[140px] text-center font-semibold py-2 rounded-full"
                        onChange={(e) => setUserPin(parseInt(e.target.value))}
                      ></input>
                      <br />
                      <button
                        disabled={userPin !== item.pin}
                        onClick={() =>
                          handlePinSubmit(
                            item._id,
                            item.caution,
                            item.userEmail
                          )
                        }
                        className="bg-[#4E3CB8] text-white mt-2 mx-8 font-semibold px-4 py-2 rounded-full hover:bg-[#3f308f]"
                      >
                        Submit
                      </button>
                    </div>
                  ) : item.status === "Returned" ? (
                    <button
                      onClick={() => handleAvailable(item._id)}
                      className="ms-auto mr-5 my-auto bg-[#4E3CB8] text-white font-semibold px-4 py-2 rounded-full hover:bg-[#3f308f]"
                    >
                      Available
                    </button>
                  ) : item.status === "Picked Up" ? (
                    <div className="ms-auto my-auto p-10">
                      <p className="text-[#00B8A8]">Equipment is on rent</p>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="ms-auto mr-5 my-auto bg-[#e34848] text-white font-semibold px-4 py-2 rounded-full hover:bg-[#8f3030]"
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MyStuff;
