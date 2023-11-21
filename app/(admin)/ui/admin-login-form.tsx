import Button from "@/app/ui/button";
import Input from "@/app/ui/input";

export function AdminLoginForm() {
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" action="#" method="POST">
        <Input type="email" label="Email" />

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-white"
            >
              Password
            </label>
            <div className="text-sm">
              <a
                href="#"
                className="font-semibold text-indigo-400 hover:text-indigo-300"
              >
                Forgot password?
              </a>
            </div>
          </div>
          <Input type="password" id="password" />
        </div>

        <div>
          <Button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            label="Entrar"
          />
        </div>
      </form>

      <p className="mt-10 text-center text-sm text-gray-400">
        Not a member?{" "}
        <a
          href="#"
          className="font-semibold leading-6 text-indigo-400 hover:text-indigo-300"
        >
          Start a 14 day free trial
        </a>
      </p>
    </div>
  );
}
