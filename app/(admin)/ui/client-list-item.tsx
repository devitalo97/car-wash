"use client";
import { User } from "@/app/lib/definitions";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export function ClientListItem({ client }: { client: User }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleClick = () => {
    const params = new URLSearchParams(searchParams);
    params.set("user_uuid", client.uuid);
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <li key={client.uuid} onClick={handleClick}>
      <div className="relative flex items-center space-x-3 px-6 py-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 hover:bg-white/5">
        {client.avatar && (
          <div className="flex-shrink-0">
            <img
              className="h-10 w-10 rounded-full"
              src={client.avatar}
              alt=""
            />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <a href="#" className="focus:outline-none">
            {/* Extend touch target to entire panel */}
            <span className="absolute inset-0" aria-hidden="true" />
            <p className="text-sm font-medium text-white">
              {client?.name ?? client.email}
            </p>
            <p className="truncate text-sm text-gray-500">
              {roleMapped[client.role]}
            </p>
          </a>
        </div>
      </div>
    </li>
  );
}

const roleMapped = {
  client: "Cliente",
  guest: "Visitante",
  admin: "Adm",
};
