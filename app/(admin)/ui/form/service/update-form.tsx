"use client";

import Input from "@/app/ui/input";
import Textarea from "@/app/ui/textarea";
import Button from "@/app/ui/button";
import { Service } from "@/app/lib/definitions";
import { useServiceUpdateForm } from "./useServiceUpdateForm";
import { Controller } from "react-hook-form";
import { FileInput } from "@/app/ui/file-upload";
import GalleryInput from "@/app/ui/gallery-input";

interface Props {
  updateService: (formData: FormData) => Promise<void>;
  service: Service;
}

export default function ServiceUpdateForm({ updateService, service }: Props) {
  const { errors, register, handleSubmit, control } = useServiceUpdateForm({
    updateService,
    service,
  });
  return (
    <aside className="bg-gray-900 border-l border-white/5">
      <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <h2 className="text-base font-semibold leading-7 text-white">
          Atualizar um serviço
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
          <div>
            <Controller
              control={control}
              name="old_upload"
              render={({ field }) => (
                <GalleryInput
                  label="Imanges Atuais"
                  images={field.value.map((item) => ({
                    title: item.name,
                    size: `${item.size / 1000000} MB`,
                    source: item.source,
                  }))}
                />
              )}
            />
          </div>
          <div>
            <Controller
              control={control}
              name="file_upload"
              render={({ field }) => (
                <FileInput
                  id="file_upload"
                  label="Novas imagens"
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
