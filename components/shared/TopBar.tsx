import { SignedIn, SignOutButton, OrganizationSwitcher } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const TopBar = (props: Props) => {
  return (
    <nav className="fixed top-0 z-30 flex w-full items-center justify-between bg-neutral-900  px-6 py-3">
      <Link href="/" className="flex items-center gap-4">
        <Image src="/assets/logo.svg" alt="logo" width={28} height={28} />
        <p className=" text-2xl font-bold text-white">Threads</p>
      </Link>

      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer">
                <Image
                  src="/assets/logout.svg"
                  alt="logout"
                  width={24}
                  height={24}
                />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
        <OrganizationSwitcher />
      </div>
    </nav>
  );
};

export default TopBar;