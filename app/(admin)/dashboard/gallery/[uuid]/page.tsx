import { GalleryDetail } from "@/app/(admin)/ui/gallery-detail";
import { fetchGalleryById } from "@/app/lib/data";
import { Carousel } from "@/app/ui/carousel";
import clsx from "clsx";

export default async function Example({
  params,
}: {
  params: { uuid: string };
}) {
  const gallery = await fetchGalleryById(params.uuid);
  const breadcrumbs = [
    { id: 1, name: "Galeria", href: "/dashboard/gallery" },
    {
      id: 2,
      name: "Visualizar item",
      href: `/dashboard/gallery/${params.uuid}`,
    },
  ];
  return (
    <div className="flex flex-col h-full xl:pl-72 bg-gray-900">
      {/* Content area */}
      <div className="flex items-center justify-between border-b border-white/5 px-4 py-2 sm:px-6 sm:py-4 lg:px-8">
        <nav aria-label="Breadcrumb">
          <ol role="list" className="flex items-center space-x-2">
            {breadcrumbs.map((breadcrumb, breadcrumbIdx) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center text-sm">
                  <a
                    href={breadcrumb.href}
                    className="font-medium text-gray-400 hover:text-gray-200"
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
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <GalleryDetail gallery={gallery} />
      </div>
    </div>
  );
}
