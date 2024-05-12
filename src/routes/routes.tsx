import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NavBar } from "../components/templates/navBar";
import { Header } from "../components/templates/header";
import { Users } from "../pages/users";
import { Home } from "../pages/home";
import { UserForm } from "../components/templates/userForm";

export const AuthRouter: React.FC = () => {
  return (
    <Router>
      <div className="d-flex">
        <div style={{ width: '280px' }}>
          <NavBar />
        </div>

        <div style={{ flex: 1, paddingLeft: '20px' }}>
          <Header title="" />
          <div className="p-3" style={{ overflowY: 'auto', width: '100%' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/usuarios" element={<Users />} />
              <Route path="/usuarios/cadastro" element={<UserForm />} />
              <Route path="/usuarios/atualizar/:id" element={<UserForm />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};
