"use client"
import config from "@/config";
import { SignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
    const router = useRouter()

    if (!config?.auth?.enabled) {
        router.back()
    }

    return (
        <div className="flex min-w-screen justify-center my-[5rem]">
            <SignUp />
        </div>
    );
}