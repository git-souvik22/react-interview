import "./app.css";
import React, { useState } from "react";

function App() {
  let initialUserValue = {
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    state: "",
    city: "",
    language: {},
  };

  let [newUser, setNewUser] = useState({ ...initialUserValue });

  let setInputData = (event) => {
    let { value, name } = event.target;
    setNewUser({ ...newUser, [name]: value });
  };

  // languages
  const [inputValue, setInputValue] = useState("");
  const [showLanguage, setShowLanguage] = useState(false);
  const [selectedLang, setSelectedLang] = useState([]);

  const languages = ["English", "Hindi", "Bengali"];

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setShowLanguage(true);
  };

  const handleLangClick = (lang) => {
    if (!selectedLang.includes(lang)) {
      setSelectedLang([...selectedLang, lang]);
      setInputValue("");
    }
  };

  // country
  let [showCountry, setShowCountry] = useState(false);
  let [selectedCountry, setSelectedCountry] = useState("");

  const countries = ["India", "America", "China", "Pakistan"];

  const countryClick = () => {
    setShowCountry(true);
  };

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
    setShowCountry(!showCountry);
  };

  return (
    <div className="container-fluid vh-100">
      <div className="d-flex justify-content-end w-75 mx-auto">
        <button
          className="btn btn-outline-dark fs-5 my-2"
          data-bs-toggle="modal"
          data-bs-target="#formModal"
        >
          Add New
        </button>
      </div>

      <div
        className="modal fade"
        id="formModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Manage Customer
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body h-50">
              <label className="d-flex justify-content-between align-item-center m-2">
                <span className="fs-4"> Full Name </span>
                <input
                  type="text"
                  name="fullname"
                  onChange={setInputData}
                  placeholder="name"
                />
              </label>
              <label className="d-flex justify-content-between align-item-center m-2">
                <span className="fs-4"> Email </span>
                <input
                  type="text"
                  name="email"
                  onChange={setInputData}
                  placeholder="email"
                />
              </label>
              <label className="d-flex justify-content-between align-item-center m-2">
                <span className="fs-4"> Password </span>
                <input
                  type="password"
                  name="password"
                  onChange={setInputData}
                  placeholder="password"
                />
              </label>
              <label className="d-flex justify-content-between align-item-center m-2">
                <span className="fs-4"> Confirm Password </span>
                <input
                  type="password"
                  name="confirmpassword"
                  placeholder="confirm password"
                  onChange={setInputData}
                />
              </label>
              <label className="d-flex justify-content-between align-item-center m-2">
                <span className="fs-4"> Country </span>
                <div className="d-flex flex-column">
                  <input
                    type="text"
                    name="country"
                    onChange={setInputData}
                    onClick={countryClick}
                    value={selectedCountry}
                    placeholder="country name"
                    autoComplete="off"
                  />
                  {showCountry && (
                    <ul className="input-list">
                      {countries
                        .filter((country) => country.includes(selectedCountry))
                        .map((country) => (
                          <li
                            key={country}
                            onClick={() => handleCountryClick(country)}
                          >
                            {country}
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              </label>

              <label className="d-flex justify-content-between align-item-center m-2">
                <span className="fs-4"> State </span>
                <input
                  type="text"
                  name="state"
                  onChange={setInputData}
                  placeholder="state name"
                />
              </label>
              <label className="d-flex justify-content-between align-item-center m-2">
                <span className="fs-4"> City </span>
                <input
                  type="text"
                  name="city"
                  onChange={setInputData}
                  placeholder="city"
                />
              </label>
              <label className="d-flex justify-content-between align-item-center m-2">
                <span className="fs-4"> Language </span>
                <div className="d-flex flex-column">
                  <input
                    type="text"
                    name="languages"
                    multiple
                    onChange={handleInputChange}
                    value={[...selectedLang, inputValue]}
                    placeholder="Languages..."
                  />
                  {showLanguage && (
                    <ul className="input-list">
                      {languages
                        .filter((lang) =>
                          lang.toLowerCase().includes(inputValue.toLowerCase())
                        )
                        .map((lang) => (
                          <li key={lang} onClick={() => handleLangClick(lang)}>
                            {lang}
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              </label>

              <label className="d-flex align-item-center gap-4">
                <span className="fs-4 ms-2 my-2"> Active </span>
                <input type="checkbox" name="active" />
              </label>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button type="button" className="btn btn-primary">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border border-2 w-75 mx-auto">
        <table className="table table-bordered w-100 ">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Country</th>
              <th>State</th>
              <th>City</th>
              <th>Languages</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                {/* <button className="btn btn-outline-dark">Edit</button>{" "}
                <button className="btn btn-outline-dark">Delete</button> */}
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                {/* <button className="btn btn-outline-dark">Edit</button>{" "}
                <button className="btn btn-outline-dark">Delete</button> */}
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                {/* <button className="btn btn-outline-dark">Edit</button>{" "}
                <button className="btn btn-outline-dark">Delete</button> */}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="w-100 d-flex justify-content-end mb-3">
          <button
            className="btn btn-outline-primary px-3 py-1"
            style={{
              marginLeft: "10px",
              marginRight: "10px",
            }}
          >
            Prev
          </button>

          <button
            className="btn btn-outline-dark rounded-5"
            style={{
              marginLeft: "10px",
              marginRight: "10px",
            }}
          >
            1
          </button>

          <button
            className="btn btn-outline-dark rounded-5"
            style={{
              marginLeft: "10px",
              marginRight: "10px",
            }}
          >
            2
          </button>

          <button
            className="btn btn-outline-dark rounded-5"
            style={{
              marginLeft: "10px",
              marginRight: "10px",
            }}
          >
            3
          </button>

          <button
            className="btn btn-outline-primary px-3 py-1"
            style={{
              marginLeft: "10px",
              marginRight: "10px",
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
