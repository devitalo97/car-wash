import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import br from "@/public/br.svg";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth";
import { logout } from "@/app/lib/actions";
import { CartButton } from "./cart-button";

export default async function NavBar() {
  const session = await auth();
  const isLoggedIn = !!session?.user;
  return (
    <div className="bg-white">
      <nav
        aria-label="Top"
        className="relative z-20 bg-white bg-opacity-90 backdrop-blur-xl backdrop-filter"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center">
            {/* Logo */}
            <div className="flex lg:ml-0">
              <Link href="/">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </Link>
            </div>

            <div className="ml-auto flex items-center">
              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                <LoginButton isLoggedIn={isLoggedIn} />
                <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                {!isLoggedIn && (
                  <Link
                    href="/register"
                    className="text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    Criar conta
                  </Link>
                )}
              </div>

              <div className="hidden lg:ml-8 lg:flex">
                <a
                  href="#"
                  className="flex items-center text-gray-700 hover:text-gray-800"
                >
                  <Image
                    src={br}
                    alt=""
                    className="block h-auto w-5 flex-shrink-0"
                  />
                  <span className="ml-3 block text-sm font-medium">BRL</span>
                  <span className="sr-only">, change currency</span>
                </a>
              </div>

              {/* Cart */}
              <CartButton />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

const LoginButton = async ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return isLoggedIn ? (
    <form action={logout}>
      <button
        type="submit"
        className="text-sm font-medium text-gray-700 hover:text-gray-800"
      >
        {"Log-out"}
      </button>
    </form>
  ) : (
    <Link
      href={"/login"}
      className="text-sm font-medium text-gray-700 hover:text-gray-800"
    >
      Log-in
    </Link>
  );
};
