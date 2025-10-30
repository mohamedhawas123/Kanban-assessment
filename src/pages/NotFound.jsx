import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function NotFound() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      <div className="text-center">
        <h1 className="display-4 fw-bold text-danger mb-3">404</h1>
        <h3 className="mb-3">Page Not Found</h3>
        <p className="text-muted mb-4">
          Oops! The page you are looking for doesn’t exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    </div>
  );
}