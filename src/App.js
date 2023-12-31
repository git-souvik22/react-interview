import axios from "axios";
import "./app.css";
import React, { useEffect, useState } from "react";
import moment from "moment/moment";

function App() {
  let initialUserValue = {
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    state: "",
    city: "",
    language: [],
    active: "off",
  };

  let [newUser, setNewUser] = useState({ ...initialUserValue });

  let setInputData = (event) => {
    let { value, name } = event.target;
    setNewUser({ ...newUser, [name]: value });
  };

  // saving user data
  const saveUserData = async () => {
    let sendData = {
      fullname: newUser.fullname,
      email: newUser.email,
      password: newUser.password,
      country: newUser.country,
      state: newUser.state,
      city: newUser.city,
      language: newUser.language,
      active: newUser.active,
    };

    let url = "http://localhost:8000/api/save-user-data";
    let { data } = await axios.post(url, sendData);

    if (data.call === true) {
      alert("Registered successfully.");
      window.location.reload();
    } else {
      alert(data.message);
    }
  };

  // update user

  let updateUserValue = {
    fullname: "",
    email: "",
    password: "",
    country: "",
    state: "",
    city: "",
    language: [],
  };
  let [updatedUser, setUpdatedUser] = useState({ ...updateUserValue });

  let setUpdateData = (event) => {
    let { value, name } = event.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const updateUserData = async () => {
    let updateData = {
      fullname: updatedUser.fullname,
      email: updatedUser.email,
      password: updatedUser.password,
      country: updatedUser.country,
      state: updatedUser.state,
      city: updatedUser.city,
      language: updatedUser.language,
    };

    let url = "http://localhost:8000/api/update-user";
    let { data } = await axios.put(url, updateData);

    if (data.call === true) {
      alert("Updated successfully.");
      window.location.reload();
    } else {
      alert(data.message);
    }
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
  const handleInputUpdate = (e) => {
    setInputValue(e.target.value);
    setShowLanguage(true);
  };

  const handleLangClick = (lang) => {
    if (!selectedLang.includes(lang)) {
      setSelectedLang([...selectedLang, lang]);
      setNewUser({ ...newUser, language: [...selectedLang, lang] });
      setInputValue("");
    }
  };
  const handleLangUpdateClick = (lang) => {
    if (!selectedLang.includes(lang)) {
      setSelectedLang([...selectedLang, lang]);
      setUpdatedUser({ ...updatedUser, language: [...selectedLang, lang] });
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

  const handleCountryClick = (countryName) => {
    setSelectedCountry(countryName);
    setNewUser({ ...newUser, country: countryName });
    setShowCountry(false);
  };

  const handleCountryUpdate = (countryName) => {
    setSelectedCountry(countryName);
    setUpdatedUser({ ...updatedUser, country: countryName });
    setShowCountry(false);
  };

  // state
  let [showState, setShowState] = useState(false);
  let [selectedState, setSelectedState] = useState("");

  const states = ["Gujarat", "Delhi", "West Bengal", "Uttar Pradesh"];

  const stateClick = () => {
    setShowState(true);
  };

  const handleStateClick = (state) => {
    setSelectedState(state);
    setNewUser({ ...newUser, state: state });
    setShowState(false);
  };

  const handleStateUpdated = (state) => {
    setSelectedState(state);
    setUpdatedUser({ ...updatedUser, state: state });
    setShowState(false);
  };

  // city
  let [showCity, setShowCity] = useState(false);
  let [selectedCity, setSelectedCity] = useState("");

  const cities = ["Kolkata", "Bengaluru", "Mumbai", "Noida"];

  const cityClick = () => {
    setShowCity(true);
  };

  const handleCityClick = (city) => {
    setSelectedCity(city);
    setNewUser({ ...newUser, city: city });
    setShowCity(false);
  };

  const handleCityUpdate = (city) => {
    setSelectedCity(city);
    setUpdatedUser({ ...updatedUser, city: city });
    setShowCity(false);
  };

  // active
  let [checked, setChecked] = useState(true);

  const handleActive = () => {
    setChecked(!checked);
    if (checked === true) {
      setNewUser({ ...newUser, active: "on" });
    }
    if (checked === false) {
      setNewUser({ ...newUser, active: "off" });
    }
  };

  // table setup
  let [tableUsers, setTableUsers] = useState([]);

  // pagination
  const [pageData, setPageData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const handlePrevPage = () => {
    if (page === 1) return page;
    setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page === pageCount) return page;
    setPage(page + 1);
  };

  useEffect(() => {
    (async () => {
      let url = "http://localhost:8000/api/";
      const { data } = await axios.get(url);
      setTableUsers(data.users);
    })();
  }, [page]);

  useEffect(() => {
    const pagedataCount = Math.ceil(tableUsers.length / 3);
    setPageCount(pagedataCount);

    if (page) {
      const limit = 3;
      const skip = limit * page;
      const dataSkip = tableUsers.slice(page === 1 ? 0 : skip - limit, skip);
      setPageData(dataSkip);
    }
  }, [tableUsers, page]);

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
                  name="confirmPassword"
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
                  {showCountry && selectedCountry === "" && (
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
                <div className="d-flex flex-column">
                  <input
                    type="text"
                    name="state"
                    onChange={setInputData}
                    onClick={stateClick}
                    value={selectedState}
                    placeholder="state name"
                  />
                  {showState && selectedState === "" && (
                    <ul className="input-list">
                      {states
                        .filter((state) => state.includes(selectedState))
                        .map((state) => (
                          <li
                            key={state}
                            onClick={() => handleStateClick(state)}
                          >
                            {state}
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              </label>
              <label className="d-flex justify-content-between align-item-center m-2">
                <span className="fs-4"> City </span>
                <div className="d-flex flex-column">
                  <input
                    type="text"
                    name="city"
                    onChange={setInputData}
                    onClick={cityClick}
                    value={selectedCity}
                    placeholder="city name"
                  />
                  {showCity && selectedCity === "" && (
                    <ul className="input-list">
                      {cities
                        .filter((city) => city.includes(selectedCity))
                        .map((city) => (
                          <li key={city} onClick={() => handleCityClick(city)}>
                            {city}
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              </label>
              <label className="d-flex justify-content-between align-item-center m-2">
                <span className="fs-4"> Language </span>
                <div className="d-flex flex-column">
                  <input
                    type="text"
                    name="languages"
                    onChange={handleInputChange}
                    value={[...selectedLang, inputValue]}
                    placeholder="Languages..."
                  />
                  {showLanguage && selectedLang.length < 3 ? (
                    <ul className="input-list">
                      {languages
                        .filter((lang) =>
                          lang.toLowerCase().includes(inputValue.toLowerCase())
                        )
                        .map((lang, index) => (
                          <li key={index} onClick={() => handleLangClick(lang)}>
                            {lang}
                          </li>
                        ))}
                    </ul>
                  ) : null}
                </div>
              </label>

              <label className="d-flex align-item-center gap-4">
                <span className="fs-4 ms-2 my-2"> Active </span>
                <input type="checkbox" name="active" onClick={handleActive} />
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
              <button className="btn btn-primary" onClick={saveUserData}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="editModal"
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
                  value={updatedUser.fullname}
                  onChange={setUpdateData}
                  placeholder="name"
                />
              </label>
              <label className="d-flex justify-content-between align-item-center m-2">
                <span className="fs-4"> Email </span>
                <input
                  type="text"
                  name="email"
                  value={updatedUser.email}
                  onChange={setUpdateData}
                  placeholder="email"
                />
              </label>
              <label className="d-flex justify-content-between align-item-center m-2">
                <span className="fs-4"> Password </span>
                <input
                  type="password"
                  name="password"
                  value={updatedUser.password}
                  onChange={setUpdateData}
                  placeholder="password"
                />
              </label>
              <label className="d-flex justify-content-between align-item-center m-2">
                <span className="fs-4"> Country </span>
                <div className="d-flex flex-column">
                  <input
                    type="text"
                    name="country"
                    onChange={setUpdateData}
                    onClick={countryClick}
                    value={selectedCountry}
                    placeholder="country name"
                    autoComplete="off"
                  />
                  {showCountry && selectedCountry === "" && (
                    <ul className="input-list">
                      {countries
                        .filter((country) => country.includes(selectedCountry))
                        .map((country) => (
                          <li
                            key={country}
                            onClick={() => handleCountryUpdate(country)}
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
                <div className="d-flex flex-column">
                  <input
                    type="text"
                    name="state"
                    onChange={setUpdateData}
                    onClick={stateClick}
                    value={selectedState}
                    placeholder="state name"
                  />
                  {showState && selectedState === "" && (
                    <ul className="input-list">
                      {states
                        .filter((state) => state.includes(selectedState))
                        .map((state) => (
                          <li
                            key={state}
                            onClick={() => handleStateUpdated(state)}
                          >
                            {state}
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              </label>
              <label className="d-flex justify-content-between align-item-center m-2">
                <span className="fs-4"> City </span>
                <div className="d-flex flex-column">
                  <input
                    type="text"
                    name="city"
                    onChange={setUpdateData}
                    onClick={cityClick}
                    value={selectedCity}
                    placeholder="city name"
                  />
                  {showCity && selectedCity === "" && (
                    <ul className="input-list">
                      {cities
                        .filter((city) => city.includes(selectedCity))
                        .map((city) => (
                          <li key={city} onClick={() => handleCityUpdate(city)}>
                            {city}
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              </label>
              <label className="d-flex justify-content-between align-item-center m-2">
                <span className="fs-4"> Language </span>
                <div className="d-flex flex-column">
                  <input
                    type="text"
                    name="languages"
                    onChange={handleInputUpdate}
                    value={[...selectedLang, inputValue]}
                    placeholder="Languages..."
                  />
                  {showLanguage && selectedLang.length < 3 ? (
                    <ul className="input-list">
                      {languages
                        .filter((lang) =>
                          lang.toLowerCase().includes(inputValue.toLowerCase())
                        )
                        .map((lang, index) => (
                          <li
                            key={index}
                            onClick={() => handleLangUpdateClick(lang)}
                          >
                            {lang}
                          </li>
                        ))}
                    </ul>
                  ) : null}
                </div>
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
              <button className="btn btn-primary" onClick={updateUserData}>
                Update
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
            {pageData.length > 0 &&
              pageData.map((user, index) => (
                <tr key={index}>
                  <td>{page * page + index}</td>
                  <td>{user.fullname}</td>
                  <td>{user.email}</td>
                  <td>{user.country}</td>
                  <td>{user.state}</td>
                  <td>{user.city}</td>
                  <td>{user.language.join(", ")}</td>
                  <td>
                    {moment(user.updatedAt.slice(0, 10), "YYYY-MM-DD").format(
                      "MMM DD, YYYY"
                    )}
                  </td>
                  <td>
                    {user && (
                      <>
                        <button
                          className="btn btn-outline-dark me-2"
                          data-bs-toggle="modal"
                          data-bs-target="#editModal"
                          onClick={() => setUpdatedUser(user)}
                        >
                          Edit
                        </button>
                        <button className="btn btn-outline-dark">Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <div className="w-100 d-flex justify-content-end mb-3">
          <button
            className="btn btn-outline-primary px-3 py-1"
            onClick={handlePrevPage}
            disabled={page === 1}
            style={{
              marginLeft: "10px",
              marginRight: "10px",
            }}
          >
            Prev
          </button>

          {Array(pageCount)
            .fill(null)
            .map((element, index) => {
              return (
                <button
                  className="btn btn-outline-dark rounded-5"
                  key={index}
                  style={{
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                  onClick={() => setPage(index + 1)}
                >
                  {index + 1}
                </button>
              );
            })}

          <button
            className="btn btn-outline-primary px-3 py-1"
            onClick={handleNextPage}
            disabled={page === pageCount}
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
