import { fetchServiceById } from "@/app/lib/data";
import { updateService } from "@/app/lib/actions";
import { notFound } from "next/navigation";
import ServiceUpdateForm from "@/app/(admin)/ui/form/service/update-form";

export default async function Example({ params }: { params: { id: string } }) {
  const id = params.id;
  const service = await fetchServiceById(id);
  if (!service) {
    notFound();
  }
  const updateInvoiceWithId = updateService.bind(null, service.uuid);
  const breadcrumbs = [
    { id: 1, name: "Serviços", href: "/dashboard/service" },
    {
      id: 2,
      name: "Visulaizar serviço",
      href: `/dashboard/service/${id}`,
    },
    {
      id: 2,
      name: "Editar serviço",
      href: `/dashboard/service/${id}/edit`,
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
      <ServiceUpdateForm
        updateService={updateInvoiceWithId}
        service={service}
      />
    </div>
  );
}
