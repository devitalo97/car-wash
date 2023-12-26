import GalleryList from "../../ui/gallery-list";
import SearchBar from "../../ui/search-bar";

export default function Example({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || "";
  return (
    <>
      <div className="flex h-full xl:pl-72 bg-gray-900">
        {/* Content area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <SearchBar
            placeholder="Busque pela sua galeria"
            redirectButtonUrl="gallery/create"
          />

          {/* Main content */}
          <div className="flex flex-1 items-stretch overflow-hidden">
            <GalleryList query={query} />
          </div>
        </div>
      </div>
    </>
  );
}
