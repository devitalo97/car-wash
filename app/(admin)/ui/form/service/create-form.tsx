"use client";

import Input from "@/app/ui/input";
import Textarea from "@/app/ui/textarea";
import Button from "@/app/ui/button";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { useServiceCreateForm } from "./useServiceCreateForm";

interface Props {
  createService: (formData: FormData) => Promise<void>;
}

export default function ServiceCreateForm({ createService }: Props) {
  const { errors, register, handleSubmit } = useServiceCreateForm({
    createService,
  });

  return (
    <aside className="bg-gray-900 lg:fixed lg:bottom-0 lg:right-0 lg:top-16 lg:w-96 lg:overflow-y-auto lg:border-l lg:border-white/5">
      <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <h2 className="text-base font-semibold leading-7 text-white">
          Crie um novo serviço
        </h2>
      </header>
      <form className="px-4 py-2 space-y-2" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <div className="border-b border-gray-900/10">
            <div className="flex flex-col gap-4">
              <Input
                {...register("name")}
                placeholder="Nome do serviço"
                label="Nome"
                error={errors.name?.message}
              />

              <Input
                {...register("price")}
                placeholder="Preço do serviço"
                label="Preço"
                type="number"
                error={errors.price?.message}
              />

              <Textarea
                {...register("description")}
                label="Descrição"
                placeholder="Descrição do serviço"
                error={errors.description?.message}
              />
            </div>
          </div>
          <div className="border-b border-gray-900/10">
            <div className="flex flex-col gap-4">
              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Imagens
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-4">
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file_upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-x-6">
          <Button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            label="Salvar"
          />
        </div>
      </form>
    </aside>
  );
}
