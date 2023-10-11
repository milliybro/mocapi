import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png"

import "./Header.scss"

const Header = () => {
  return (
    <header className="container">
      <ul className="nav">
         <div>
            <img height={60} src={logo} alt="" />
         </div>
        <li className="nav-item">
          <NavLink to={""}  className="nav-link" aria-current="page" href="#">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" href="#">
            Product
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" href="#">
            Favourite
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" aria-disabled="true">
            Cart
          </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default Header;
