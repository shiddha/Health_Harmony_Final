import React, { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import { postItem } from "../../API/Item";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UploadWidget from "../../Components/UploadWidget";

function AddHospital() {
  const { user } = useContext(AuthContext);
  const [photoURL, setPhotoURL] = useState("");
  const navigate = useNavigate();

  const handleImageUpload = (url) => {
    setPhotoURL(url);
  };

  const handleAdminSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const description = form.description.value;
    const photos = form.photos.value;
    const price = form.price.value;

    const data = {
      name,
      description,
      photos,
      price,
      status: "Gift Card",
    };

    postItem(data);
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (photoURL) {
      const form = e.target;
      const name = form.name.value;
      const description = form.description.value;
      const category = form.category.value;
      const condition = form.condition.value;
      const age = form.age.value;
      const price = form.price.value;
      const contact = form.contact.value;
      const duration = form.duration.value;
      const road = form.road.value;
      const area = form.area.value;
      const city = form.city.value;
      let map = form.map.value;
      let location = form.location.value;

      const caution = price * age - price * condition;

      const src = map?.split(" ");
      const url = src[1]?.split('"');

      const coordinatesArray = location.split(", ");

      const latitude = coordinatesArray[0];
      const longitude = coordinatesArray[1];

      const data = {
        name,
        description,
        condition,
        category,
        age,
        photos: photoURL,
        contact,
        price,
        duration,
        road,
        area,
        city,
        map: url?.[1],
        caution,
        userName: user.displayName,
        userImage: user.photoURL,
        userEmail: user.email,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        status: "Admin aproval",
      };

      postItem(data);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your item listed successfully",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => navigate("/dashboard/user/mystuff"));
    }
  };

  return (
    <>
      {user.email === "admin@protybeshi.com" ? (
        <div>
          <h1 className="text-4xl text-center font-bold my-12">Gift Cards</h1>
          <form onSubmit={handleAdminSubmit}>
            <div className="flex flex-row justify-center space-x-24">
              <div>
                <div className="text-2xl font-bold">
                  <label>Describe Equipment</label>
                </div>
                <div className="text-base font-bold mt-4">
                  <label>Name</label>
                </div>
                <div className="after:content-['*'] after:ml-0.5 after:text-red-500 text-sm text-[#7C706B]">
                  <label>Required</label>
                </div>
                <div>
                  <input
                    className="w-96 bg-[#F4F5F7] border-none rounded"
                    type="text"
                    name="name"
                    placeholder="Equipment Name"
                    required
                  ></input>
                </div>
                <div className="mt-4 text-base font-bold">
                  <label>Description</label>
                </div>
                <div>
                  <textarea
                    className="w-96 bg-[#F4F5F7] border-none rounded"
                    rows="4"
                    cols="50"
                    name="description"
                    placeholder="Description"
                  ></textarea>
                </div>

                <div className="text-base font-bold mt-4">
                  <label>Add Photos</label>
                </div>
                <div
                  name="photos"
                  className="w-44 bg-[#444AC4] text-[#FFFFFF] border-none rounded text-center ml-4 h-9"
                >
                  <UploadWidget
                    onImageUpload={handleImageUpload}
                  ></UploadWidget>
                </div>

                <div>
                  <input
                    className="w-96 bg-[#F4F5F7] border-none rounded"
                    type="text"
                    name="photos"
                    placeholder="Upload Photo URL"
                  ></input>
                </div>
                <div className="after:content-['*'] after:ml-0.5 after:text-red-500 text-sm text-[#7C706B]">
                  <label>*Required-The maximum photo size is 15MB</label>
                </div>
                <div className="text-2xl font-bold mt-4">
                  <label>Pricing</label>
                </div>
                <div>
                  <input
                    className="w-96 bg-[#F4F5F7] border-none rounded mt-2 mb-8"
                    type="number"
                    name="price"
                    placeholder="Price"
                  ></input>
                </div>
              </div>
            </div>
            <div className="bg-[#444AC4] w-40 mx-auto text-white border-none rounded-lg text-center py-2 px-6">
              <button type="submit">Publish Item</button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <h1 className="text-4xl text-center font-bold my-12">
            Equipment Description
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-row justify-center space-x-24">
              <div>
                <div className="text-2xl font-bold">
                  <label>Describe Equipment</label>
                </div>
                <div className="text-base font-bold mt-4">
                  <label>Name</label>
                </div>
                <div className="after:content-['*'] after:ml-0.5 after:text-red-500 text-sm text-[#7C706B]">
                  <label>Required</label>
                </div>
                <div>
                  <input
                    className="w-96 bg-[#F4F5F7] border-none rounded"
                    type="text"
                    name="name"
                    placeholder="Equipment Name"
                    required
                  ></input>
                </div>
                <div className="mt-4 text-base font-bold">
                  <label>Description</label>
                </div>
                <div>
                  <textarea
                    className="w-96 bg-[#F4F5F7] border-none rounded"
                    rows="4"
                    cols="50"
                    name="description"
                    placeholder="Description"
                  ></textarea>
                </div>
                <div className="text-2xl font-bold mt-2">
                  <label>Category</label>
                </div>
                {/* <div className="text-sm"> 
                  <label>*Required</label>
                </div> */}
                <div>
                  <select
                    className="w-96 bg-[#F4F5F7] border-none rounded mt-2"
                    name="category"
                  >
                    <option
                      className="text-[#50d71e]"
                      value=""
                      disabled
                      selected
                      required
                    >
                      Select Category
                    </option>
                    <option value="Analog">Analog</option>
                    <option value="Digital">Digital</option>
                  </select>
                </div>

                <div className="text-2xl font-bold mt-2">
                  <label>Select Condition</label>
                </div>
                <div>
                  <select
                    className="w-96 bg-[#F4F5F7] border-none rounded"
                    name="condition"
                  >
                    <option value="" disabled selected>
                      Select Condition
                    </option>
                    <option value=".1">New</option>
                    <option value=".15">Excellent</option>
                    <option value=".2">Good</option>
                    <option value=".25">Average</option>
                    <option value=".30">Poor</option>
                  </select>
                </div>
                <div className="text-2xl mt-2 font-bold">
                  <label>Equipment Age</label>
                </div>
                <div>
                  <select
                    className="w-96 bg-[#F4F5F7] border-none rounded"
                    name="age"
                  >
                    <option value="" disabled selected>
                      Select Age
                    </option>
                    <option value="0.8">Less than 1 year</option>
                    <option value="0.7">Less than 2 year</option>
                    <option value="0.6">Less than 5 year</option>
                    <option value="0.5">Less than 10 year</option>
                  </select>
                </div>
                <div className="text-2xl font-bold mt-2">
                  <label>Pricing</label>
                </div>
                <div className="text-base font-bold">
                  <label>Choose duration and rate</label>
                </div>
                <div>
                  <input
                    className="w-96 bg-[#F4F5F7] border-none rounded mt-2"
                    type="text"
                    name="price"
                    placeholder="Buying Price"
                    required
                  ></input>
                </div>
                <div className="mt-2">
                  <select
                    className="w-96 bg-[#F4F5F7] border-none rounded"
                    name="duration"
                  >
                    <option value="" disabled selected>
                      Select Duration
                    </option>
                    <option value="1 week">1 week</option>
                    <option value="2 week">2 week</option>
                    <option value="1 month">1 month</option>
                  </select>
                </div>
                <div className="text-base font-bold mt-4">
                  <label>Add Photos</label>
                </div>
                <div
                  name="photos"
                  className="w-1/3 bg-[#444AC4] text-white mx-auto border-none rounded text-center px-4 py-3"
                >
                  <UploadWidget
                    onImageUpload={handleImageUpload}
                  ></UploadWidget>
                </div>
                <div className="after:content-['*'] after:ml-0.5 after:text-red-500 text-sm text-[#7C706B]">
                  <label>*Required-The maximum photo size is 15MB</label>
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  <label>Location</label>
                </div>
                <div className="text-base font-bold mt-4">
                  <label>Provide details about location</label>
                </div>
                <div>
                  <input
                    className="w-96 bg-[#F4F5F7] border-none rounded mt-4"
                    type="text"
                    name="road"
                    placeholder="Road"
                  ></input>
                </div>
                <div>
                  <input
                    className="w-96 bg-[#F4F5F7] border-none rounded mt-4"
                    type="text"
                    name="area"
                    placeholder="Area"
                    required
                  ></input>
                </div>
                <div>
                  <input
                    className="w-96 bg-[#F4F5F7] border-none rounded mt-4"
                    type="text"
                    name="city"
                    placeholder="City"
                    required
                  ></input>
                </div>
                <div className="text-base font-bold mt-4">
                  <label>Geo-location Coordinate</label>
                </div>
                <div>
                  {JSON.parse(localStorage.getItem("Location"))?.latitude ? (
                    <input
                      className="w-96 bg-[#F4F5F7] border-none rounded mt-4"
                      type="text"
                      name="location"
                      placeholder="e.g: 23.69510781937833, 90.45102680192862"
                      defaultValue={`${
                        JSON.parse(localStorage.getItem("Location")).latitude
                      }, ${
                        JSON.parse(localStorage.getItem("Location")).longitude
                      }`}
                      required
                    ></input>
                  ) : (
                    <input
                      className="w-96 bg-[#F4F5F7] border-none rounded mt-4"
                      type="text"
                      name="location"
                      placeholder="e.g: 23.69510781937833, 90.45102680192862"
                      required
                    ></input>
                  )}
                </div>
                <div className="text-2xl font-bold mt-6">
                  <label>Owner's Info</label>
                </div>
                <div className="text-base font-bold mt-4 mb-8">
                  <label>Provide details about you</label>
                </div>
                <img
                  className="rounded-xl mx-auto"
                  src={user.photoURL}
                  alt=""
                />
                <div>
                  <input
                    className="w-96 bg-[#F4F5F7] border-none rounded mt-8"
                    type="text"
                    name="username"
                    placeholder={user.displayName}
                    defaultValue=""
                    disabled
                  ></input>
                </div>
                <div>
                  <input
                    className="w-96 bg-[#F4F5F7] border-none rounded mt-3"
                    type="email"
                    name="usermail"
                    placeholder={user.email}
                    disabled
                  ></input>
                </div>
                <div className="text-base font-bold mt-4 mb-2">
                  <label>Contact Details</label>
                </div>
                <div>
                  <input
                    className="w-96 bg-[#F4F5F7] border-none rounded"
                    type="text"
                    name="contact"
                    placeholder="Contact or phone number"
                  ></input>
                </div>
                <div>
                  <input
                    className="w-96 bg-[#F4F5F7] border-none rounded mt-3"
                    type="text"
                    name="map"
                    placeholder="Map Link: G.Maps > Embed a map > Copy HTML"
                  ></input>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-center my-8 space-x-4">
              <div className="text-[#444AC4] border rounded-lg text-center py-2 px-6">
                <button type="">Back</button>
              </div>
              <div className="bg-[#444AC4] text-white border-none rounded-lg text-center py-2 px-6">
                <button type="submit">Publish Item</button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default AddHospital;
