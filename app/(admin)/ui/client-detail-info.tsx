import { User } from "@/app/lib/definitions";
import clsx from "clsx";

export function ClientDetailInfo({ user }: { user: User }) {
  return (
    <>
      <div className="mt-6 sm:mt-2 2xl:mt-5">
        <div className="border-b border-white/5">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabs.map((tab) => (
                <a
                  key={tab.name}
                  href={tab.href}
                  className={clsx(
                    tab.current
                      ? "border-indigo-500 text-white"
                      : "border-transparent text-gray-400 hover:border-gray-300 hover:text-gray-500",
                    "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium"
                  )}
                  aria-current={tab.current ? "page" : undefined}
                >
                  {tab.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Description list */}
      <div className="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          {fields.map(
            (field) =>
              user[field] && (
                <div key={field} className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    {fieldMapped[field]}
                  </dt>
                  <dd className="mt-1 text-sm text-white">
                    {user[field] as string}
                  </dd>
                </div>
              )
          )}
        </dl>
      </div>
    </>
  );
}

const tabs = [
  { name: "Perfil", href: "#", current: true },
  // { name: "Pedidos", href: "#", current: false },
];

const fields: (keyof Partial<User>)[] = ["email", "role", "created_at", "name"];
const fieldMapped: {
  [x in keyof Partial<User>]: string;
} = {
  name: "Nome",
  email: "E-mail",
  role: "Tipo",
  created_at: "Criado em",
};
