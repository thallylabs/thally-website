import type { Metadata } from "next";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to your Thally account.",
  alternates: {
    canonical: "/login",
  },
  robots: {
    index: false,
    follow: true,
  },
};

const Login = () => {
  return (
    <section className="bg-muted flex flex-1 items-center justify-center px-4 py-12">
      <Card className="w-full max-w-sm">
        <CardHeader className="flex flex-col items-center space-y-0">
          <Logo className="mb-7" />
          <p className="mb-2 text-2xl font-bold">Welcome back</p>
          <p className="text-muted-foreground">Please enter your details.</p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Input type="email" placeholder="Enter your email" required />
            <div>
              <Input type="password" placeholder="Enter your password" required />
            </div>
            <div className="flex justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" className="border-muted-foreground" />
                <label
                  htmlFor="remember"
                  className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </label>
              </div>
              <a href="#" className="text-primary text-sm font-medium">
                Forgot password
              </a>
            </div>
            <Button type="submit" className="mt-2 w-full">
              Log in
            </Button>
            <Button variant="outline" className="w-full">
              <FcGoogle className="mr-2 size-5" />
              Continue with Google
            </Button>
          </div>
          <div className="text-muted-foreground mx-auto mt-8 flex justify-center gap-1 text-sm">
            <p>Don&apos;t have an account?</p>
            <Link href="/signup" className="text-primary font-medium">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default Login;
