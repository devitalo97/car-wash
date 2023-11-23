import { fetchServiceById } from "@/app/lib/data";
import Link from "next/link";
import { deleteService } from "@/app/lib/actions";
import { notFound } from "next/navigation";

export default async function Example({ params }: { params: { id: string } }) {
  const id = params.id;
  const breadcrumbs = [
    { id: 1, name: "Serviços", href: "/dashboard/service" },
    {
      id: 2,
      name: "Visualizar serviço",
      href: `/dashboard/service/${id}`,
    },
  ];
  const service = await fetchServiceById(id);
  if (!service) {
    notFound();
  }
  const deleteServiceWithId = deleteService.bind(null, service.uuid);

  return (
    <div className="xl:pl-72 bg-gray-900 h-full">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-8 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        {/* Product details */}
        <div className="lg:max-w-lg lg:self-end">
          <nav aria-label="Breadcrumb">
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

          <div className="mt-4">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {service.name}
            </h1>
          </div>

          <section aria-labelledby="information-heading" className="mt-4">
            <h2 id="information-heading" className="sr-only">
              Product information
            </h2>

            <div className="flex items-center">
              <p className="text-lg text-white sm:text-xl">
                R${service.price / 100}
              </p>
            </div>

            <div className="mt-4 space-y-6">
              <p className="text-base text-gray-500">{service.description}</p>
            </div>
          </section>
        </div>

        {/* Product image */}
        <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
            <img
              src={service.imageSrc}
              alt={service.imageAlt}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Product form */}
        <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
          <section aria-labelledby="options-heading">
            <h2 id="options-heading" className="sr-only">
              Product options
            </h2>

            <div className="mt-10 flex gap-4">
              <Link
                href={`/dashboard/service/${id}/edit`}
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Editar
              </Link>
              <form action={deleteServiceWithId}>
                <button
                  type="submit"
                  className="flex w-[2/3] items-center justify-center rounded-md border border-transparent  px-8 py-3 text-base font-medium text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 bg-indigo-50 shadow-sm hover:bg-indigo-100"
                >
                  Excluir
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
