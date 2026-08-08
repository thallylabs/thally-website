import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-canvas flex min-h-screen flex-col items-center justify-center px-5 py-28 text-center">
      <h1 className="heading-section text-canvas-foreground">PAGE NOT FOUND!</h1>
      <p className="text-canvas-muted mt-5 max-w-md text-lg text-pretty">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="text-canvas mt-9 inline-flex items-center rounded-lg bg-white px-6 py-3.5 text-lg font-medium transition-colors hover:bg-white/90"
      >
        Back to Home
      </Link>
    </div>
  );
}
