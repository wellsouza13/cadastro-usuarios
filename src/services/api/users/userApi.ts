import { UserForm, UsersResponse } from "../../../interface/api/users";
import axiosInstance from "../axiosConfig";

export const getUsers = async () => {
  try {
    const response = await axiosInstance.get<UsersResponse[]>('/users');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    throw error;
  }
};

export const postUser = async (payload: UserForm) => {
  try {
    const response = await axiosInstance.post<UsersResponse>('/users', payload);
    return response.data;
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    throw error;
  }
};

export const putUser = async (payload: UserForm) => {
  try {
    const response = await axiosInstance.put<UsersResponse>(`/users/${payload.id}`, payload);
    return response.data;
  } catch (error) {
    console.error('Erro ao alterar usuários:', error);
    throw error;
  }
};

export const deleteUser = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    throw error;
  }
};

export const getUserById = async (id: number) => {
  try {
    const response = await axiosInstance.get<UsersResponse>(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    throw error;
  }
};
