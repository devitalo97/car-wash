import Image from "next/image";
import { home } from "@/public/home";
import Link from "next/link";

const favorites = [
  {
    id: 1,
    name: "Limpeza Completa",
    price: "$32",
    href: "/product/4",
    imageSrc: home[4],
    imageAlt: "Model wearing women's black cotton crewneck tee.",
  },
  {
    id: 2,
    name: "Limpeza de tapetes e bancos",
    price: "$32",
    href: "/product/5",
    imageSrc: home[5],
    imageAlt: "Model wearing women's off-white cotton crewneck tee.",
  },
  {
    id: 3,
    name: "Polimento",
    price: "$36",
    href: "/product/6",
    imageSrc: home[6],
    imageAlt:
      "Model wearing women's burgundy red crewneck artwork tee with small white triangle overlapping larger black triangle.",
  },
];

export default function Page() {
  return (
    <div className="bg-white">
      <header className="relative overflow-hidden">
        {/* Hero section */}
        <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
          <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
            <div className="sm:max-w-lg">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                M&M LavaCar
              </h1>
              <p className="mt-4 text-xl text-gray-500">
                Descubra a combinação perfeita de qualidade e agilidade em
                nossos serviços de limpeza automotiva. Nossa equipe dedicada
                está comprometida em oferecer a você o melhor atendimento e
                resultados impecáveis.
              </p>
            </div>
            <div>
              <div className="mt-10">
                {/* Decorative image grid */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                >
                  <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                    <div className="flex items-center space-x-6 lg:space-x-8">
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                          <Image
                            src={home[0]}
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <Image
                            src={home[1]}
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <Image
                            src={home[2]}
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <Image
                            src={home[3]}
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <Image
                            src={home[4]}
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <Image
                            src={home[5]}
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <Image
                            src={home[6]}
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Link
                  href="/schedule"
                  className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
                >
                  Agendar horário
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Category section */}
        <section aria-labelledby="category-heading" className="bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
            <div className="sm:flex sm:items-baseline sm:justify-between">
              <h2
                id="category-heading"
                className="text-2xl font-bold tracking-tight text-gray-900"
              >
                Escolha por categoria
              </h2>
              <Link
                href="/product"
                className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block"
              >
                Veja todos os serviços
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
              <div className="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-h-1 sm:aspect-w-1 sm:row-span-2">
                <Image
                  src={home[1]}
                  alt="Two models wearing women's black cotton crewneck tee and off-white cotton crewneck tee."
                  className="object-cover object-center group-hover:opacity-75"
                />

                <div
                  aria-hidden="true"
                  className="bg-gradient-to-b from-transparent to-black opacity-50"
                />
                <div className="flex items-end p-6">
                  <div>
                    <h3 className="font-semibold text-white">
                      <Link href={"/product/1"}>
                        <span className="absolute inset-0" />
                        M&M Car Delivery
                      </Link>
                    </h3>
                    <p aria-hidden="true" className="mt-1 text-sm text-white">
                      Ver serviço
                    </p>
                  </div>
                </div>
              </div>
              <div className="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full">
                <Image
                  src={home[2]}
                  alt="Wooden shelf with gray and olive drab green baseball caps, next to wooden clothes hanger with sweaters."
                  className="object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0 sm:h-full sm:w-full"
                />
                <div
                  aria-hidden="true"
                  className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
                />
                <div className="flex items-end p-6 sm:absolute sm:inset-0">
                  <div>
                    <h3 className="font-semibold text-white">
                      <Link href={"/product/2"}>
                        <span className="absolute inset-0" />
                        Limpeza e Higienização completa
                      </Link>
                    </h3>
                    <p aria-hidden="true" className="mt-1 text-sm text-white">
                      Ver serviço
                    </p>
                  </div>
                </div>
              </div>
              <div className="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full">
                <Image
                  src={home[3]}
                  alt="Walnut desk organizer set with white modular trays, next to porcelain mug on wooden desk."
                  className="object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0 sm:h-full sm:w-full"
                />
                <div
                  aria-hidden="true"
                  className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
                />
                <div className="flex items-end p-6 sm:absolute sm:inset-0">
                  <div>
                    <h3 className="font-semibold text-white">
                      <Link href={"/product/3"}>
                        <span className="absolute inset-0" />
                        Pintura automotiva
                      </Link>
                    </h3>
                    <p aria-hidden="true" className="mt-1 text-sm text-white">
                      Ver serviço
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 sm:hidden">
              <Link
                href="/product"
                className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Veja todos os serviços
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured section */}
        <section aria-labelledby="cause-heading">
          <div className="relative bg-gray-800 px-6 py-32 sm:px-12 sm:py-40 lg:px-16">
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={home[0]}
                alt=""
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gray-900 bg-opacity-50"
            />
            <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
              <h2
                id="cause-heading"
                className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
              >
                Lavagem Rápida e Eficiente
              </h2>
              <p className="mt-3 text-xl text-white">
                Oferecemos uma abordagem de lavagem automotiva rápida e
                eficiente para manter seu veículo sempre impecável. Nossa equipe
                prioriza a qualidade, garantindo resultados visíveis em pouco
                tempo. Opte por uma solução prática que mantém seu veículo limpo
                sem comprometer seu dia.
              </p>
              <Link
                href="/schedule"
                className="mt-8 block w-full rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
              >
                Agendar horário
              </Link>
            </div>
          </div>
        </section>

        {/* Favorites section */}
        <section aria-labelledby="favorites-heading">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
            <div className="sm:flex sm:items-baseline sm:justify-between">
              <h2
                id="favorites-heading"
                className="text-2xl font-bold tracking-tight text-gray-900"
              >
                Serviços isolados
              </h2>
              <Link
                href="/product"
                className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block"
              >
                Veja todos os serviços
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-0 lg:gap-x-8">
              {favorites.map((favorite) => (
                <div key={favorite.id} className="group relative">
                  <div className="h-96 w-full overflow-hidden rounded-lg sm:aspect-h-3 sm:aspect-w-2 group-hover:opacity-75 sm:h-auto">
                    <Image
                      src={favorite.imageSrc}
                      alt={favorite.imageAlt}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-gray-900">
                    <Link href={favorite.href}>
                      <span className="absolute inset-0" />
                      {favorite.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{favorite.price}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 sm:hidden">
              <Link
                href="/product"
                className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Veja todos os serviços
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section aria-labelledby="sale-heading">
          <div className="overflow-hidden pt-32 sm:pt-14">
            <div className="bg-gray-800">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="relative pb-16 pt-48 sm:pb-24">
                  <div>
                    <h2
                      id="sale-heading"
                      className="text-4xl font-bold tracking-tight text-white md:text-5xl"
                    >
                      Promoção.
                      <br />
                      50% off
                      <br />
                      Limpeza Completa
                    </h2>
                    <div className="mt-6 text-base">
                      <Link
                        href="/schedule"
                        className="font-semibold text-white"
                      >
                        Agendar horário
                        <span aria-hidden="true"> &rarr;</span>
                      </Link>
                    </div>
                  </div>

                  <div className="absolute -top-32 left-1/2 -translate-x-1/2 transform sm:top-6 sm:translate-x-0">
                    <div className="ml-24 flex min-w-max space-x-6 sm:ml-3 lg:space-x-8">
                      <div className="flex space-x-6 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                        <div className="flex-shrink-0">
                          <Image
                            className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                            src={home[8]}
                            alt=""
                          />
                        </div>

                        <div className="mt-6 flex-shrink-0 sm:mt-0">
                          <Image
                            className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                            src={home[9]}
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="flex space-x-6 sm:-mt-20 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                        <div className="flex-shrink-0">
                          <Image
                            className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                            src={home[9]}
                            alt=""
                          />
                        </div>

                        <div className="mt-6 flex-shrink-0 sm:mt-0">
                          <Image
                            className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                            src={home[7]}
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="flex space-x-6 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                        <div className="flex-shrink-0">
                          <Image
                            className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                            src={home[8]}
                            alt=""
                          />
                        </div>

                        <div className="mt-6 flex-shrink-0 sm:mt-0">
                          <Image
                            className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                            src={home[9]}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
