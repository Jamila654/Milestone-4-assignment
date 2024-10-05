import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Milestone 4 - Assignment</h1>
      <Link href='/login' className="relative group">
        <span className="after:content-[''] after:block after:w-0 after:h-[2px] after:bg-green-500 after:transition-all after:duration-300 after:ease-in-out after:absolute after:left-0 after:bottom-[-4px] group-hover:after:w-full">
          Click here to login
        </span>
      </Link>
    </div>
  );
}
