import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchForm from "./SearchForm";
import "../../Css/Header.css";
import { RiPencilFill } from "react-icons/ri";
import { FaUserEdit } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { FcHome } from "react-icons/fc";

import { BsBookmarks } from "react-icons/bs";
import SkeletonElement from "../Skeletons/SkeletonElement";
import { AuthContext } from "../../Context/AuthContext";
const Header = () => {
  const bool = localStorage.getItem("authToken") ? true : false;
  const [auth, setAuth] = useState(bool);
  const { activeUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setAuth(bool);
    setTimeout(() => {
      setLoading(false);
    }, 1600);
  }, [bool]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <div>
      <header>
        <div className="averager">
            
        {activeUser?.role !== "admin" ?  <Link className="readList-link" to="#">
              {''}
            <FcHome /> <h5>Portfolio</h5>
            {''}
          </Link> :<div/>}

          <Link to="/" className="logo">
            <h5>MITHUN'S BLOG</h5>
          </Link>

          <SearchForm />
          <div className="header_options">
            {auth ? (
              <div className="auth_options">
                {activeUser.role === "admin" ? (
                  <Link className="addStory-link" to="/addstory">
                    <RiPencilFill /> Add Story{" "}
                  </Link>
                ) : (
                  <div />
                )}

                <Link to="/readList" className="readList-link">
                  <BsBookmarks />
                  <span id="readListLength">{activeUser.readListLength}</span>
                </Link>
                <div className="header-profile-wrapper ">
                  {loading ? (
                    <SkeletonElement type="minsize-avatar" />
                  ) : (
                    <img
                      src={`/userPhotos/${activeUser.photo}`}
                      alt={activeUser.username}
                    />
                  )}

                  <div className="sub-profile-wrap  ">
                    <Link className="profile-link" to="/profile">
                      {" "}
                      <FaUserEdit /> Profile{" "}
                    </Link>

                    <button className="logout-btn" onClick={handleLogout}>
                      {" "}
                      <BiLogOut /> Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="noAuth_options">
                <Link className="login-link" to="/login">
                  {" "}
                  Login{" "}
                </Link>

                <Link className="register-link" to="/register">
                  {" "}
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
      <SearchForm formId="bottom-search" />
    </div>
  );
};

export default Header;
