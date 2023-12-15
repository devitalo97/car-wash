import ServiceCreateForm from "@/app/(admin)/ui/form/service/create-form";
import { createService } from "@/app/lib/actions";

export default function Example({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const breadcrumbs = [
    { id: 1, name: "Serviço", href: "/dashboard/service" },
    {
      id: 2,
      name: "Criar serviço",
      href: `/dashboard/service/create`,
    },
  ];

  return (
    <div className="xl:pl-72 bg-gray-900 h-full">
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
      <ServiceCreateForm createService={createService} />
    </div>
  );
}
