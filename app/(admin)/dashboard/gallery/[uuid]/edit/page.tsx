import GalleryUpdateForm from "@/app/(admin)/ui/form/gallery/update-form";
import { updateGallery } from "@/app/lib/actions";
import { fetchGalleryById } from "@/app/lib/data";
import { notFound } from "next/navigation";

export default async function Example({
  params,
}: {
  params: { uuid: string };
}) {
  const uuid = params.uuid;
  const gallery = await fetchGalleryById(uuid);
  if (!gallery) {
    notFound();
  }
  const updateInvoiceWithId = updateGallery.bind(null, gallery.uuid);
  const breadcrumbs = [
    { id: 1, name: "Galeria", href: "/dashboard/gallery" },
    {
      id: 2,
      name: "Visualizar",
      href: `/dashboard/gallery/${uuid}`,
    },
    {
      id: 2,
      name: "Editar",
      href: `/dashboard/gallery/${uuid}/edit`,
    },
  ];
  return (
    <div className="xl:pl-72 bg-gray-900 h-full">
      <nav
        aria-label="Breadcrumb"
        className="px-4 pt-16 sm:px-6 sm:pt-8 lg:px-8"
      >
        <ol role="list" className="flex items-center space-x-2">
          {breadcrumbs.map((breadcrumb, breadcrumbIdx) => (
            <li key={breadcrumb.id}>
              <div className="flex items-center text-sm">
                <a
                  href={breadcrumb.href}
                  className="font-medium text-gray-500 hover:text-white"
                >
                  {breadcrumb.name}
                </a>
                {breadcrumbIdx !== breadcrumbs.length - 1 ? (
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300"
                  >
                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                  </svg>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </nav>
      <GalleryUpdateForm
        updateGallery={updateInvoiceWithId}
        gallery={gallery}
      />
    </div>
  );
}
