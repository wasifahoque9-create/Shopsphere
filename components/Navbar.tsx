"use client";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3">
      <div className="container">
        <a className="navbar-brand fw-bold fs-2" href="#">
          WorkWorm
        </a>

        <ul className="navbar-nav d-flex flex-row ms-auto gap-4">
          <li className="nav-item">
            <a className="nav-link text-white" href="#">
              Home
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link text-white" href="#">
              Products
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link text-white" href="#">
              Categories
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link text-white" href="#">
              About
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link text-white" href="#">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}