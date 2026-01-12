import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <h2>Home Page</h2>
      <Link href="/tickets" className="underline">
        Go to tickets
      </Link>
    </>
  );
}
