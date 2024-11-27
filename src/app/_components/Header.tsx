'use client'

import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";



export function Header() {
    const {isSignedIn}= useUser();
    return (
        <header className="bg-gray-200 border-b py-3   ">
            <div className="container flex justify-between items-center">

            
                <Button className=" bg-transparent text-black text-2xl font-semibold hover:bg-transparent" asChild>
                    <Link
                    href="/"
                    className="text-2xl flex items-center gap-1 font-[family-name:var(--font-dancing-script)]"
                    >
                        <Image src='/book.png' width={40} height={40} alt="logo"/>
                    TheBookClub
                    </Link>
                </Button>
                <Link href='/books' className="  text-2xl">Books</Link>
                {
                    isSignedIn ? (
                        <UserButton/>
                    ) : (
                        <Link href='/sign-in' >
                        <Button variant={"secondary"} className="text-2xl font-semibold">
                        Login 
                        </Button>
                        </Link>
                    )
                }
                </div>
        </header>
    );
}