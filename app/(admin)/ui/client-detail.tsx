import { fetchUserByUUID } from "@/app/lib/data";
import { User } from "@/app/lib/definitions";
import { formatShortDate } from "@/app/utils/formatters";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { ClientDetailInfo } from "./client-detail-info";

export async function ClientDetail({
  user_uuid,
  currentPage,
}: {
  user_uuid: string;
  currentPage: number;
}) {
  const user = await fetchUserByUUID(user_uuid);
  if (!user) {
    return <div>no user</div>;
  }
  user["created_at"] = formatShortDate(user.created_at) as unknown as Date;
  user["role"] = roleMapped[user["role"]] as User["role"];
  return (
    <article>
      {/* Profile header */}
      <div>
        <div>
          <img
            className="h-32 w-full object-cover lg:h-48"
            src={
              "https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            }
            alt=""
          />
        </div>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
            <div className="flex">
              {user.avatar && (
                <img
                  className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                  src={user.avatar}
                  alt=""
                />
              )}
              {!user?.avatar && (
                <div className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32 bg-gray-900 flex items-center justify-center">
                  <p className="truncate text-2xl font-bold text-white">
                    {user.email.slice(0, 2)}
                  </p>
                </div>
              )}
            </div>
            <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
              <div className="mt-6 min-w-0 flex-1 sm:hidden 2xl:block">
                <h1 className="truncate text-2xl font-bold text-white">
                  {user?.name ?? user.email}
                </h1>
              </div>
              <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
                <button
                  type="button"
                  className="inline-flex justify-center gap-x-1.5 rounded-md bg-transparent hover:bg-white/5 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-400 hover:bg-gray-50"
                >
                  <EnvelopeIcon
                    className="-ml-0.5 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  Email
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center gap-x-1.5 rounded-md bg-transparent hover:bg-white/5 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-400 hover:bg-gray-50"
                >
                  <PhoneIcon
                    className="-ml-0.5 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  Wtp
                </button>
              </div>
            </div>
          </div>
          <div className="mt-6 hidden min-w-0 flex-1 sm:block 2xl:hidden">
            <h1 className="truncate text-2xl font-bold text-white">
              {user?.name ?? user.email}
            </h1>
          </div>
        </div>
      </div>

      <ClientDetailInfo user={user} />
    </article>
  );
}

const roleMapped: {
  [x in User["role"]]: string;
} = {
  client: "Cliente",
  guest: "Visitante",
  admin: "Adm",
};
