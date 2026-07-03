import Link from "next/link";

export default function Navigation() {
    return (
        <div className="w-screen h-12 fixed bg-blue-900 flex justify-center items-center text-white gap-4">
            <Link href={"/"}>Home</Link>
            <Link href={"/menu/1"}>Menu 1</Link>
            <Link href={"/menu/2"}>Menu 2</Link>
            <Link href={"/menu/3"}>Menu 3</Link>
      </div>
    );
  }