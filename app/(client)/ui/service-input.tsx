import { fetchServices } from "@/app/lib/data";
import StackedList from "@/app/ui/stacked-list";

export default async function ServiceInput() {
  const services = await fetchServices();
  return <StackedList />;
}
