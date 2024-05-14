import { useState, React } from "react";
import { FaRegSmileBeam } from "react-icons/fa";

const Model = ({ userData, closeModal, updateUserData }) => {
  console.log("UserData is : ", userData);

  const [editedData, setEditedData] = useState({ ...userData });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // If the property is nested (address or company), create a new copy of the nested object
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setEditedData((prevData) => ({
        ...prevData,
        [parent]: {
          ...prevData[parent],
          [child]: value,
        },
      }));
      console.log("Nested Data :", editedData);
    } else {
      // If the property is not nested, update it directly
      setEditedData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserData(editedData);
    closeModal(); // Close the modal after editing
  };

  if (!userData) return null;

  return (
    <>
      <div
        className="modal"
        tabIndex="-1"
        style={{ display: userData ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                Hey!! {editedData.username}, You can Edit Your Information{" "}
                <FaRegSmileBeam style={{ color: "darkorange" }} />
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={closeModal}
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form_group">
                  <label htmlFor="name" className="form-label">
                    Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={editedData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form_group">
                  <label htmlFor="email" className="form-label">
                    Email:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    name="email"
                    value={editedData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form_group">
                  <label htmlFor="phone" className="form-label">
                    Phone:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={editedData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form_group">
                  <label htmlFor="address" className="form-label">
                    Address: Street Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address.street"
                    value={editedData.address.street}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form_group">
                  <label htmlFor="address" className="form-label">
                    Address: city Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address.city"
                    value={editedData.address.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form_group">
                  <label htmlFor="address" className="form-label">
                    Address: zipcode
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address.zipcode"
                    value={editedData.address.zipcode}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form_group">
                  <label htmlFor="company" className="form-label">
                    Company Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="company"
                    name="company.name"
                    value={editedData.company.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form_group">
                  <label htmlFor="catchPhrase" className="form-label">
                    Company Name: catchPhrase
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="catchPhrase"
                    name="company.catchPhrase"
                    value={editedData.company.catchPhrase}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={closeModal}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Model;
