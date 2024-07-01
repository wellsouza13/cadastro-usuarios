// src/components/UserTable.tsx

import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteUser, getUsers } from "../../services/api/users/userApi";
import { User, UsersResponse } from "../../interface/api/users";
import { useNavigate } from "react-router";
import { useState } from "react";
import { AxiosError } from "axios";
import { ToastMessage } from "../toastMessage";

export const UserTable = () => {
  const navigate = useNavigate();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleUserEdit = (id: number) => {
    const redirectUrl = `/usuarios/atualizar/${id}`;
    navigate(redirectUrl);
  };

  const {
    data,
    error,
    isLoading,
    refetch,
  } = useQuery<UsersResponse>({
    queryKey: ["users"],
    queryFn: getUsers,
    refetchOnWindowFocus: false,
  });

  const users = data?.users || [];

  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      setToastMessage("Usuário deletado com sucesso!");
      setShowToast(true);
      refetch();
    },
    onError(error: AxiosError) {
      setToastMessage(
        `Erro ao deletar usuário: ${error.response?.data || error.message}`
      );
      setShowToast(true);
    },
  });

  const handleUserDelete = (id: number) => {
    mutateAsync(id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error)
    return <div>An error occurred: {error.message}</div>;


  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) && users.length > 0 ? (
            users.map((user: User) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => handleUserEdit(user?.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleUserDelete(user?.id)}
                    disabled={isPending}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No users available</td>
            </tr>
          )}
        </tbody>
      </table>
      <ToastMessage
        message={toastMessage}
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
};
