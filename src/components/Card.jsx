import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoMdMail } from "react-icons/io";
import { FaPhoneAlt, FaHeart } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { CiHeart, CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import Model from "./Model";

const Card = () => {
  const [data, setData] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setData(response.data);
      console.log("Fetched Data:", response.data);
    } catch (error) {
      console.log("Error Occured :", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //   Edit User Logic

  const handleEditClick = (id) => {
    setEditModalOpen(true);
    setSelectedUserId(id);
  };

  // Func to close modal
  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedUserId(null);
  };

  // Handle delete functionality
  const handleDeleteClick = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmed) {
      setData((prevData) => prevData.filter((item) => item.id !== id));
    }
  };

  const handleLikeClick = (id) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, liked: !item.liked } : item
      )
    );
  };

  return (
    <>
      <div style={{margin:'40px'}}>
        <div className="container">
          <p
            style={{
              textAlign: "center",
              textTransform: "upperCase",
              width: "100%",
              overFlow: "hidden",
              fontSize: "40px",
              fontWeight: "500",
            }}
          >
            User-Crud{" "}
          </p>
          <div className="container d-flex justify-content-evenly flex-wrap mx-auto">
            {data.length > 0 &&
              data.map((item) => {
                const { id, username, name, email, phone, website, address } =
                  item;
                return (
                  <div
                    key={id}
                    className="card card-container"
                    style={{ width: "18rem" }}
                  >
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`}
                      className="card-img-top"
                      alt="Avatar"
                      width={"100px"}
                      style={{backgroundColor:'#dcdcdc'}}
                    />
                    <div className="card-body">
                      <strong className="card-title">{name}</strong>
                      <br />
                      <small className="card-text">
                        <IoMdMail style={{ fontSize: "18px" }} /> {email}{" "}
                      </small>
                      <br />
                      <small className="card-text">
                        <FaPhoneAlt style={{ fontSize: "18px" }} /> {phone}{" "}
                      </small>
                      <br />
                      <small className="card-text">
                        <CgWebsite style={{ fontSize: "18px" }} /> {website}{" "}
                      </small>
                    </div>
                    <strong style={{ marginLeft: "18px" }}>Address : </strong>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        Street : {address.street}
                      </li>
                      <li className="list-group-item">City : {address.city}</li>
                      <li className="list-group-item">
                        Zipcode : {address.zipcode}
                      </li>
                    </ul>
                    <strong style={{ marginLeft: "18px" }}>Company :</strong>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        Name : {item.company.name}
                      </li>
                      <li className="list-group-item">
                        CatchPhrase : {item.company.catchPhrase}
                      </li>
                    </ul>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor:'#dcdcdc'
                      }}
                    >
                      <button
                        className="btn icon-link"
                        onClick={() => handleLikeClick(id)}
                        style={{ color: "red" }}
                      >
                        {item.liked ? <FaHeart /> : <CiHeart />}
                      </button>
                      <button
                        className="btn icon-link"
                        onClick={() => handleEditClick(id)}
                      >
                        <CiEdit />
                      </button>
                      <button
                        className="btn icon-link"
                        onClick={() => handleDeleteClick(id)}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {editModalOpen && selectedUserId && (
          <Model
            userData={data.find((user) => user.id === selectedUserId)}
            closeModal={closeEditModal}
            updateUserData={(updatedUserData) => {
              setData((prevData) =>
                prevData.map((user) =>
                  user.id === selectedUserId
                    ? { ...user, ...updatedUserData }
                    : user
                )
              );
            }}
          />
        )}
      </div>
    </>
  );
};

export default Card;
