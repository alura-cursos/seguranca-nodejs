'use client';

import { useForm } from 'react-hook-form';
import { useRegisterMutate } from "../utils/register";
import { useEffect } from "react";
import nookies from 'nookies';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { mutate, data, isSuccess, isError, isLoading } = useRegisterMutate();

  const onSubmit = (formData) => {
    mutate(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      alert("Login realizado com sucesso!");
      console.log("Dados do servidor:", data); // Use os dados da resposta aqui

      // Salvar o token nos cookies
      nookies.set(null, 'token', data.data.token, {
        maxAge: 30 * 24 * 60 * 60, // 30 dias
        path: '/',
      });

     window.location.href = "/"
    }
  }, [isSuccess, data]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl font-bold mb-8">Login</h2>
      <form className="w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.email ? 'border-red-500' : ''
            }`}
            id="email"
            type="email"
            placeholder="Email"
            {...register('email', { required: 'Este campo é obrigatório' })}
          />
          {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Senha
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
              errors.password ? 'border-red-500' : ''
            }`}
            id="password"
            type="password"
            placeholder="Senha"
            {...register('password', { required: 'Este campo é obrigatório' })}
          />
          {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Enviando...' : 'Login'}
        </button>
        {isError && <p className="text-red-500 text-xs italic mt-2">Erro ao fazer login</p>}
      </form>
    </div>
  );
}
