import clsx from "clsx";

type Props = {
  title: string;
  status?: boolean;
};

const badgeStyle: { [x: string]: string } = {
  false: "text-gray-400 bg-gray-400/10 ring-gray-400/20",
  true: "text-green-400 bg-green-400/10 ring-green-400/30",
};

export function Badge({ title, status }: Props) {
  return (
    <div
      title={title}
      className={clsx(
        badgeStyle[status ? status.toString() : "false"],
        "rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset"
      )}
    >
      {title}
    </div>
  );
}
