import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, "Please enter a passward with at least 6 caracthers."),
});

export type AdminSignInFormSchemaType = z.infer<typeof schema>;

export function useAdminLoginForm({
  signIn,
}: {
  signIn: (formData: FormData) => Promise<void>;
}) {
  const {
    register,
    handleSubmit: submit,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<AdminSignInFormSchemaType>({
    resolver: zodResolver(schema),
  });

  const handleSubmit = submit(async (_, e) => {
    try {
      await signIn(new FormData(e?.target));
    } catch (error) {
      if ((error as Error).message.includes("CredentialsSignin")) {
        setError("password", { message: "Invalid user" });
      }
    }
  });
  return {
    errors,
    handleSubmit,
    register,
    clearErrors,
  };
}
