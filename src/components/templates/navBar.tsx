import { NavLink } from "react-router-dom";
import Logo from "../../assets/images/logo_preto.png";

export const NavBar = () => {
    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{width: '280px', height: '100vh'}}>
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
            <img src={Logo} alt="Logo" width={200}/>
        </a>
          <hr />
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <NavLink to="/" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} aria-current="page">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/usuarios" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                Usuários
              </NavLink>
            </li>
          </ul>
          <hr />
          <div className="dropdown">
            <a href="#" className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="https://github.com/wellsouza13.png" alt="mdo" width="32" height="32" className="rounded-circle me-2" />
              <strong>wellington</strong>
            </a>
            <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
              <li><a className="dropdown-item" href="#">Novo Projeto...</a></li>
              <li><a className="dropdown-item" href="#">Configurações</a></li>
              <li><a className="dropdown-item" href="#">Perfil</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="#">Sair</a></li>
            </ul>
          </div>
        </div>
      );
    };
