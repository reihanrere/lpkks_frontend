"use client";

import authImage from "@/assets/images/auth-image.png";
import logoSasmita from "@/assets/images/logo-sasmita.png";
import logo from "@/assets/images/logo.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IcSecurityWarningOutlined } from "@/assets/svg";
import Link from "next/link";
import Image from "next/image";
import {PasswordInputGroup} from "@/components/ui/input-group";

export default function SignIn() {

    const onSubmit = () => {}

    return (
        <div className="min-h-screen w-full flex">
            <div
                className="w-0 lg:w-1/2 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(${authImage.src})`,
                }}
            ></div>
            <div
                className="relative w-full overflow-hidden lg:w-1/2 mx-auto flex flex-col justify-center items-center px-8 lg:px-24">
                <div className={"z-10 w-full flex flex-col"}>
                    <div className={"w-full flex gap-4 items-center mb-4 md:mb-12"}>
                        <Image src={logoSasmita} alt="logo-sasmita-jaya" />
                        <Image src={logo} alt="logo-lpkks" />
                    </div>
                    <h1 className={"text-4xl font-semibold mb-4"}>
                        Selamat Datang di RINAKA
                    </h1>
                    <p className={"text-secondary-color text-base"}>
                        Platform digital untuk mengelola pelatihan terintegrasi, <br className={"hidden md:block"} />
                        mulai pendaftaran hingga sertifikat, terhubung dengan LSP.
                    </p>
                </div>
                <form onSubmit={onSubmit} className={"z-10 w-full flex flex-col gap-6 mt-6"}>
                    <div className={"w-full flex flex-col gap-2"}>
                        <label htmlFor="identitas" className={"text-sm font-medium"}>Identitas Akun</label>
                        <Input id={"identitas"} name={"identitas"} type={"text"} placeholder={"Masukkan NIM/ID Dosen/ Email"} />
                    </div>
                    <div className={"w-full flex flex-col gap-2"}>
                        <div className={"w-full flex justify-between"}>
                            <label htmlFor="password" className={"text-sm font-medium"}>Password</label>
                            <Link href={"/auth/sign-in"}>
                                <p className={"text-primary text-sm font-semibold"}>Lupa Kata Sandi?</p>
                            </Link>
                        </div>
                        <PasswordInputGroup id={"password"} name={"password"} placeholder={"Masukan kata sandi"} />
                    </div>
                    <div className={"w-full bg-background-grey-2 p-4 flex gap-4 rounded-lg"}>
                        <IcSecurityWarningOutlined className={"text-content-secondary"} />
                        <p className={"text-content-secondary text-base"}>
                            Bagi kamu yang bukan Dosen/Mahasiswa UNPAM,<br />
                            masuk atau daftar menggunakan email
                        </p>
                    </div>
                    <Button disabled={true} type={"button"}>Submit</Button>
                    <div className={"w-full flex justify-center"}>
                        <p className={"text-lg text-content-secondary"}>
                            Belum punya akun?
                            <Link href={"/auth/sign-in"}>
                                <span className={"text-primary font-semibold ml-1"}>Daftar</span>
                            </Link>
                        </p>
                    </div>
                </form>
                <div className="absolute right-[10px] bottom-[-260px] w-[281px] h-[281px] bg-[#FDD305]/70 blur-[100px] rounded-full shadow-[0_0_120px_60px_#FDD30540]"></div>
                <div className="absolute right-[-150px] bottom-[-220px] w-[281px] h-[281px] bg-primary/70 blur-[100px] rounded-full shadow-[0_0_120px_60px_#4f46e540]"></div>
            </div>
        </div>
    );
}
