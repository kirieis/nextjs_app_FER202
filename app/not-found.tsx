import Link from "next/link";

export default function NotFound() {
  return (
    <div
      data-testid="not-found"
      className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center"
    >
      <div className="w-16 h-16 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center text-3xl font-black mb-4">
        404
      </div>
      <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-foreground">
        Page or Product Not Found
      </h1>
      <p className="text-muted-foreground max-w-md mb-6 text-base">
        The product or page you are looking for does not exist or might have been removed.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition shadow-sm"
      >
        &larr; Back to Home
      </Link>
    </div>
  );
}
