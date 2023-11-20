interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

export default function Button({ label, ...rest }: Props) {
  return (
    <>
      <button
        {...rest}
        className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
      >
        {label}
      </button>
    </>
  );
}
