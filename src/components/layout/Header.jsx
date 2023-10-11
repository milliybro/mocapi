import logo from "../../assets/logo.png"
const Header = () => {
  return (
    <header className="container">
      <ul className="nav">
         <div>
            <img src={logo} alt="" />
         </div>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">
            Active
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Link
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Link
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled" aria-disabled="true">
            Disabled
          </a>
        </li>
      </ul>
    </header>
  );
};

export default Header;
