import React from "react";

function NavBar() {
  function login(e) {
    e.preventDefault();
    window.location = "http://localhost:3000/auth/google";
  }
  return (
    <ul className="navbar">
        <p className="home">HOME</p>
        <button onClick={login} type="submit" className="login_button">
          Login
        </button>
    </ul>
  );
}

export default NavBar;
