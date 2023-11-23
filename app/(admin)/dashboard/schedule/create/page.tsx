import ScheduleCreateForm from "@/app/(admin)/ui/form/schedule/create-form";
import { createSchedule } from "@/app/lib/actions";

export default async function Example() {
  const breadcrumbs = [
    { id: 1, name: "Horários", href: "/dashboard/schedule/" },
    {
      id: 2,
      name: "Criar horários",
      href: "/dashboard/schedule/create",
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
      <ScheduleCreateForm createSchedule={createSchedule} />
    </div>
  );
}
