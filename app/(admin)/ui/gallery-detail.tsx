import { deleteGallery } from "@/app/lib/actions";
import { Gallery } from "@/app/lib/definitions";
import { Carousel } from "@/app/ui/carousel";
import { formatBytes } from "@/app/utils/formatters";
import Link from "next/link";

export function GalleryDetail({ gallery }: { gallery: Gallery }) {
  const deleteGalleryBinded = deleteGallery.bind(null, gallery.uuid);
  return (
    <aside className="overflow-y-auto border-l border-white/5 bg-gray-900 p-8 lg:max-w-7xl">
      <Carousel>
        {gallery.media.map((m) => (
          <div
            key={m.source}
            className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-[unset]"
          >
            <div className="lg:col-start-2">
              <div className="aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg">
                <img src={m.source} alt="" className="object-cover" />
              </div>
              <div className="mt-4 flex items-start justify-between lg:hidden">
                <div>
                  <h2 className="text-lg font-medium text-white">
                    <span className="sr-only">Details for </span>
                    {gallery.name}
                  </h2>
                </div>
              </div>
            </div>
            <div className="lg:col-start-1 lg:row-start-1">
              {/* <h3 className="font-medium text-white">Informações</h3> */}
              <div className="hidden mt-4 items-start justify-between lg:flex">
                <div>
                  <h2 className="text-lg font-medium text-white">
                    <span className="sr-only">Details for </span>
                    {gallery.name}
                  </h2>
                </div>
              </div>
              <dl className="mt-2 divide-y divide-white/5 border-b border-t border-white/5">
                <div
                  key={"source"}
                  className="flex justify-between py-3 text-sm font-medium"
                >
                  <dt className="text-gray-500 mr-2">Link</dt>
                  <dd className="whitespace-nowrap text-white truncate">
                    {m["source"]}
                  </dd>
                </div>
                <div
                  key={"name"}
                  className="flex justify-between py-3 text-sm font-medium"
                >
                  <dt className="text-gray-500 mr-2">Nome</dt>
                  <dd className="whitespace-nowrap text-white truncate">
                    {m["name"]}
                  </dd>
                </div>

                <div
                  key={"size"}
                  className="flex justify-between py-3 text-sm font-medium"
                >
                  <dt className="text-gray-500 mr-2">Tamanho</dt>
                  <dd className="whitespace-nowrap text-white truncate">
                    {formatBytes(m["size"])}
                  </dd>
                </div>
                <div
                  key={"type"}
                  className="flex justify-between py-3 text-sm font-medium"
                >
                  <dt className="text-gray-500 mr-2">Tipo</dt>
                  <dd className="whitespace-nowrap text-white truncate">
                    {m["type"]}
                  </dd>
                </div>
                {m.width && (
                  <div
                    key={"dimension"}
                    className="flex justify-between py-3 text-sm font-medium"
                  >
                    <dt className="text-gray-500 mr-2">Tipo</dt>
                    <dd className="whitespace-nowrap text-white truncate">
                      {m["width"]}x{m["height"]}
                    </dd>
                  </div>
                )}
              </dl>
              {gallery.description && (
                <div className="hidden lg:block lg:mt-4">
                  <h3 className="font-medium text-white">Descrição</h3>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm italic text-gray-500">
                      {gallery.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
            {gallery.description && (
              <div className="lg:hidden">
                <h3 className="font-medium text-white">Descrição</h3>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-sm italic text-gray-500">
                    {gallery.description}
                  </p>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3 lg:col-start-1 lg:flex-row">
              <Link
                href={m.source}
                target="_blank"
                type="Link"
                className="w-full rounded-md text-center bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Download
              </Link>
              <Link
                href={`${gallery.uuid}/edit`}
                className="w-full rounded-md text-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Editar
              </Link>
              <form action={deleteGalleryBinded} className="w-full">
                <button
                  type="submit"
                  className="w-full rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Deletar
                </button>
              </form>
            </div>
          </div>
        ))}
      </Carousel>
    </aside>
  );
}
