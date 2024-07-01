import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  getUserById,
  postUser,
  putUser,
} from "../../services/api/users/userApi";
import { AxiosError } from "axios";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../loadingSpinner";
import { ToastMessage } from "../toastMessage";

type FormData = {
  name: string;
  email: string;
  age: number;
  city: string;
};

export const UserForm = () => {
  const { id } = useParams();
  const isUpdate = Boolean(id);
  const titleButton = id ? "Atualizar" : "Salvar";

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const { mutateAsync: registerUser, isPending: isRegisterLoading } =
    useMutation({
      mutationFn: postUser,
      onSuccess: () => {
        reset();
        setToastMessage("Usuário criado com sucesso!");
        setShowToast(true);
      },
      onError: (error: AxiosError) => {
        setToastMessage(
          `Erro ao criar usuário: ${error.response?.data || error.message}`
        );
        setShowToast(true);
      },
    });

  const { mutateAsync: updateUser, isPending: isUpdateLoading } = useMutation({
    mutationFn: putUser,
    onSuccess: () => {
      setToastMessage("Usuário atualizado com sucesso!");
      setShowToast(true);
    },
    onError(error: AxiosError) {
      setToastMessage(
        `Erro ao atualizar usuário: ${error.response?.data || error.message}`
      );
      setShowToast(true);
    },
  });

  const { isLoading } = useQuery({
    queryKey: ["user-id"],
    queryFn: () =>
      getUserById(Number(id)).then((response) => {
        const convertedResponse = {
          ...response.user,
          age: Number(response.user.age),
        };
        reset(convertedResponse);
        return response;
      }),
    refetchOnWindowFocus: false,
    enabled: Boolean(id),
  });

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      isUpdate
        ? await updateUser({ ...data, id: Number(id) })
        : await registerUser(data);
    } catch (error) {
      setToastMessage(`Erro na operação: ${error}`);
      setShowToast(true);
    }
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <>
      <LoadingSpinner
        isLoading={isRegisterLoading || isUpdateLoading || isLoading}
      />
      {!isRegisterLoading && !isUpdateLoading && !isLoading && (
        <div className="container">
          <h2>Formulário</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Nome
              </label>
              <input
                type="text"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                id="name"
                {...register("name", { required: "Nome é obrigatório" })}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name.message}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                id="email"
                {...register("email", {
                  required: "Email é obrigatório",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Email inválido",
                  },
                })}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="age" className="form-label">
                Idade
              </label>
              <input
                type="number"
                className={`form-control ${errors.age ? "is-invalid" : ""}`}
                id="age"
                {...register("age", {
                  required: "Senha é obrigatória",
                  minLength: {
                    value: 1,
                    message: "Senha deve ter pelo menos 1 caracteres",
                  },
                  maxLength: {
                    value: 3,
                    message: "Senha deve ter no máximo 3 caracteres",
                  },
                })}
              />
              {errors.age && (
                <div className="invalid-feedback">{errors.age.message}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="city" className="form-label">
                Cidade
              </label>
              <input
                type="text"
                className={`form-control ${errors.city ? "is-invalid" : ""}`}
                id="city"
                {...register("city", { required: "Cidade é obrigatório" })}
              />
              {errors.city && (
                <div className="invalid-feedback">{errors.city.message}</div>
              )}
            </div>

            <button type="submit" className="btn btn-primary">
              {titleButton}
            </button>
          </form>
          <ToastMessage
            message={toastMessage}
            show={showToast}
            onClose={() => setShowToast(false)}
          />
        </div>
      )}
    </>
  );
};
