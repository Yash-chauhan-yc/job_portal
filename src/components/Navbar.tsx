import Link from "next/link";
import logo from "../assets/company-logo-placeholder.png";
import Image from "next/image";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <header className="shadow-sm">
      <nav className="m-auto flex max-w-5xl px-3 py-5 items-center justify-between">
        <Link href={"/"} className="flex items-center gap-3">
          <Image src={logo} width={40} height={40} alt="logo" />
          <span className="text-xl font-bold tracking-tight">Find Jobs</span>
        </Link>
        <Button asChild>
          <Link href={"/jobs/new"}>Post a Job</Link>
        </Button>
      </nav>
    </header>
  );
}
