import Link from "next/link";

export default function ComingSoon() {
  return (
    <div className="w-full h-full text-center mt-20">
      <h2 className="font-bold text-4xl">Coming Soon</h2>
      <div className="mt-4">
        <p className="text-lg">This page will be available very soon!</p>
        <Link href={"/"}>
          <button className="rounded-lg border mt-4 px-4 py-1 bg-white hover:bg-gray-100 transition-all duration-200">
            Return Home
          </button>
        </Link>
      </div>
    </div>
  );
}
