import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
        <Link href="/" className="text-lg font-bold tracking-tight">
          YupRAG
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <Link href="#features" className="hover:text-foreground">
            Features
          </Link>
          <Link href="#workflow" className="hover:text-foreground">
            How It Works
          </Link>
          <Link href="#pricing" className="hover:text-foreground">
            Pricing
          </Link>
        </nav>
        <SignedOut>
          <div className="flex items-center gap-2">
            <Button size={"sm"} variant="ghost" asChild>
              <Link href="/pricing">Pricing</Link>
            </Button>
            <Button size={"sm"} className="cursor-pointer">
              <SignInButton />
            </Button>
          </div>
        </SignedOut>
        <SignedIn>
          <div className="flex items-center justify-center gap-2">
            <Button size={"sm"} asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </header>
  );
};

export default Navbar;
