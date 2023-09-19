import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <>
      <div className="text-center">
        <img
          style={{ width: "400px", height: "auto" }}
          src={"../assets/images/page-404.png"}
          alt="Page not found"
        />
        <Link className="mt-2 d-block" to="/">
          <i className="fas fa-arrow-left me-1"></i>Return to dashboard
        </Link>
      </div>
    </>
  );
}

export default PageNotFound;
