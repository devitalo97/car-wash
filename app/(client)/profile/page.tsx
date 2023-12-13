import { auth } from "@/auth";

export default async function Example() {
  const session = await auth();
  return (
    <>
      <div className="mx-auto max-w-7xl lg:flex lg:gap-x-16 lg:px-8 bg-white">
        <main className="px-4 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
          <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Perfil
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-500">
                Essas informações serão exibidas publicamente, então tome
                cuidado com o que você compartilha
              </p>

              <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                <div className="pt-6 sm:flex">
                  <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                    Nome
                  </dt>
                  <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div className="text-gray-900">{session?.user.name}</div>
                    <button
                      type="button"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Atualizar
                    </button>
                  </dd>
                </div>
                <div className="pt-6 sm:flex">
                  <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                    Telefone
                  </dt>
                  <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div className="text-gray-900"></div>
                    <button
                      type="button"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Atualizar
                    </button>
                  </dd>
                </div>
                <div className="pt-6 sm:flex">
                  <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                    Email
                  </dt>
                  <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div className="text-gray-900">{session?.user.email}</div>
                    <button
                      type="button"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Atualizar
                    </button>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
