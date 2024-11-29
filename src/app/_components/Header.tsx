'use client'

import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";



export function Header() {
    const {isSignedIn}= useUser();
    return (
        <header className=" border-b py-3  ">
            <div className="md:px-12 px-2 flex justify-between items-center">

            
                    <Link
                    href="/"
                    className="md:text-2xl font-semibold flex items-center gap-0  md:gap-1 font-[family-name:var(--font-dancing-script)]"
                    >
                        <Image src='/book.png' width={40} height={40} alt="logo" className="w-6 h-6 md:h-10 md:w-10"/>
                    TheBookClub
                    </Link>

                <Link href='/books' className=" md:text-2xl">Books</Link>
                {
                    isSignedIn ? (
                            <UserButton/>
                        
                    ) : (
                        <Link href='/sign-in' >
                        <Button variant={"secondary"} className="md:text-2xl ">
                        Login 
                        </Button>
                        </Link>
                    )
                }
                </div>
        </header>
    );
}