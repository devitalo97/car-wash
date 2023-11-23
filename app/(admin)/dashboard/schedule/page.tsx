import SearchBar from "@/app/(admin)/ui/search-bar";
import ScheduleList from "@/app/(admin)/ui/schedule-list";
import { Calendar } from "@/app/(admin)/ui/calendar";
import Button from "@/app/ui/button";
import Link from "next/link";

export default function Example() {
  return (
    <div className="xl:pl-72 bg-gray-900 h-full">
      <SearchBar placeholder="Busque pelos horários" />

      <ScheduleList />
      <aside className="bg-gray-900 lg:fixed lg:bottom-0 lg:right-0 lg:top-16 lg:w-96 lg:overflow-y-auto lg:border-l lg:border-white/5  px-4">
        <Calendar />
        <Link href={"/dashboard/schedule/create"}>
          <Button type="button" label="Add Horário" />
        </Link>
      </aside>
    </div>
  );
}
