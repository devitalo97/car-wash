import ScheduleList from "@/app/(admin)/ui/schedule-list";
import { Calendar } from "@/app/(admin)/ui/calendar";
import Button from "@/app/ui/button";
import Link from "next/link";
import SearchBar from "../../ui/search-bar";

export default function Example() {
  return (
    <div className="xl:pl-72 bg-gray-900 h-full">
      <SearchBar
        placeholder="Busque pelos horários"
        redirectButtonUrl="schedule/create"
      />
      <ScheduleList />
      <aside className="bg-gray-900 lg:fixed lg:bottom-0 lg:right-0 lg:top-0 lg:w-96 lg:overflow-y-auto lg:border-l lg:border-white/5 px-4">
        <Calendar />
      </aside>
    </div>
  );
}
