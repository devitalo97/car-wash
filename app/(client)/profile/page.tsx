import { logout } from "@/app/lib/actions";
import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();
  return (
    <div>
      <p>Welcome {session?.user.name}!</p>;
      <form action={logout}>
        <button type="submit">logout</button>
      </form>
    </div>
  );
}
