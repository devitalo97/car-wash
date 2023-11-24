"use client";

import Button from "@/app/ui/button";
import Input from "@/app/ui/input";
import { useAdminLoginForm } from "./useAdminLoginForm";

interface Props {
  signIn: (formData: FormData) => Promise<void>;
}

export function AdminLoginForm({ signIn }: Props) {
  const { errors, register, handleSubmit } = useAdminLoginForm({
    signIn,
  });
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <Input
          type="email"
          label="Email"
          dark={false}
          {...register("email")}
          error={errors.email?.message}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Senha
            </label>
            <div className="text-sm">
              <a
                href="#"
                className="font-semibold text-indigo-600 hover:text-indigo-300"
              >
                Esqueceu sua senha?
              </a>
            </div>
          </div>
          <Input
            type="password"
            id="password"
            {...register("password")}
            error={errors.password?.message}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <div className="w-full">
          <Button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            label="Entrar"
          />
        </div>
      </form>
    </div>
  );
}
