"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IcSecurityWarningOutlined } from "@/assets/svg";
import Link from "next/link";
import {PasswordInputGroup} from "@/components/ui/input-group";
import { useSignIn } from "@/features/auth/hooks/useAuth";
import { signInSchema, SignInSchema } from "@/features/auth/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function SignInPage() {
    const { mutate: signInMutation, isPending } = useSignIn();

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInSchema>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onFormSubmit = (data: SignInSchema) => {
        signInMutation(data);
    };

    return (
      <form onSubmit={handleSubmit(onFormSubmit)} className={"z-10 w-full flex flex-col gap-6 mt-6"}>
          <div className={"w-full flex flex-col gap-2"}>
              <label htmlFor="email" className={"text-sm font-medium"}>Identitas Akun</label>
              <Input
                id={"email"}
                {...register("email")}
                type={"text"}
                placeholder={"Masukkan NIM/ID Dosen/ Email"}
                error={errors.email?.message ?? ''}
              />
          </div>
          <div className={"w-full flex flex-col gap-2"}>
              <div className={"w-full flex justify-between"}>
                  <label htmlFor="password" className={"text-sm font-medium"}>Password</label>
                  <Link href={"/sign-up"}>
                      <p className={"text-primary text-sm font-semibold"}>Lupa Kata Sandi?</p>
                  </Link>
              </div>
              <PasswordInputGroup
                id={"password"}
                {...register("password")}
                placeholder={"Masukan kata sandi"}
                error={errors.password?.message ?? ''}
              />
          </div>
          <div className={"w-full bg-background-grey-2 p-4 flex gap-4 rounded-lg"}>
              <IcSecurityWarningOutlined className={"text-content-secondary"} />
              <p className={"text-content-secondary text-base"}>
                  Bagi kamu yang bukan Dosen/Mahasiswa UNPAM,<br />
                  masuk atau daftar menggunakan email
              </p>
          </div>
          <Button type={"submit"}>Masuk</Button>
          <div className={"w-full flex justify-center"}>
              <p className={"text-lg text-content-secondary"}>
                  Belum punya akun?
                  <Link href={"/sign-up"}>
                      <span className={"text-primary font-semibold ml-1"}>Daftar</span>
                  </Link>
              </p>
          </div>
      </form>
    );
}
