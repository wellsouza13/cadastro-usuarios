import { useNavigate } from "react-router";
import { UserTable } from "../components/templates/userTable";

export const Users = () => {
  const navigate = useNavigate()
  const redirectUrl = '/usuarios/cadastro';

  const handleAddUser = () => {
    navigate(redirectUrl);
  };
  return (
    <div>
      <h2>Usuários</h2>
      <div className="d-flex justify-content-end">
        <button className="btn btn-primary me-2" onClick={handleAddUser}>Adicionar</button>
      </div>
      <UserTable />
    </div>
  );
};
