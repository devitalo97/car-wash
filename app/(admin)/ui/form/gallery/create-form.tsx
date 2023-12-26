"use client";

import Input from "@/app/ui/input";
import Textarea from "@/app/ui/textarea";
import Button from "@/app/ui/button";
import { useGalleryCreateForm } from "./useGalleryCreateForm";
import { FileInput } from "@/app/ui/file-upload";
import { Controller } from "react-hook-form";

interface Props {
  createGallery: (formData: FormData) => Promise<void>;
}

export default function GalleryCreateForm({ createGallery }: Props) {
  const { errors, register, handleSubmit, control } = useGalleryCreateForm({
    createGallery,
  });

  return (
    <aside className="bg-gray-900 lg:border-l lg:border-white/5">
      <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <h2 className="text-base font-semibold leading-7 text-white">
          Crie um novo item na galeria
        </h2>
      </header>
      <form className="px-4 lg:px-8 py-2 space-y-2" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <div className="border-b border-gray-900/10">
            <div className="flex flex-col gap-4">
              <Input
                {...register("name")}
                placeholder="Nome da midia"
                label="Nome"
                error={errors.name?.message}
              />

              <Textarea
                {...register("description")}
                label="Descrição"
                placeholder="Descrição da midia"
                error={errors.description?.message}
              />
            </div>
          </div>
          <div className="border-b border-gray-900/10">
            <Controller
              control={control}
              name="file_upload"
              render={({ field }) => (
                <FileInput
                  id="file_upload"
                  label="Mídias"
                  onChange={field.onChange}
                />
              )}
            />
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
