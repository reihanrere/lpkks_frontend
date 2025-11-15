'use client'

import { Input } from "@/components/ui/input";
import Link from "next/link";
import { PasswordInputGroup } from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";

export default function SignUpPage() {
  return (
    <form className={"z-10 w-full flex flex-col gap-6 mt-6"}>
      <div className={"w-full flex flex-col gap-2"}>
        <label htmlFor="full_name" className={"text-sm font-medium"}>Nama Lengkap</label>
        <Input
          id={"full_name"}
          /*{...register("full_name")}*/
          type={"text"}
          placeholder={"Masukkan nama lengkap"}
          // error={errors.full_name?.message ?? ''}
        />
      </div>
      <div className={"w-full flex flex-col gap-2"}>
        <label htmlFor="email" className={"text-sm font-medium"}>Email</label>
        <Input
          id={"email"}
          /*{...register("email")}*/
          type={"text"}
          placeholder={"Masukkan Email"}
          // error={errors.email?.message ?? ''}
        />
      </div>
      <div className={"w-full flex flex-col gap-2"}>
        <label htmlFor="password" className={"text-sm font-medium"}>Password</label>
        <PasswordInputGroup
          id={"password"}
          //{...register("password")}
          placeholder={"Masukan kata sandi"}
          // error={errors.password?.message ?? ''}
        />
      </div>
      <Button type={"submit"}>Daftar</Button>
      <div className={"w-full flex justify-center"}>
        <p className={"text-lg text-content-secondary"}>
          Sudah punya akun?
          <Link href={"/sign-in"}>
            <span className={"text-primary font-semibold ml-1"}>Masuk</span>
          </Link>
        </p>
      </div>
    </form>
  )
}