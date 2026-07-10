import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const Signup = () => {
  return (
    <section className="bg-muted flex flex-1 items-center justify-center px-4 py-12">
      <Card className="w-full max-w-sm">
        <CardHeader className="flex flex-col items-center space-y-0">
          <Logo className="mb-7" />
          <p className="mb-2 text-2xl font-bold">Start your free trial</p>
          <p className="text-muted-foreground">Sign up in less than 2 minutes.</p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Input type="text" placeholder="Enter your name" required />
            <Input type="email" placeholder="Enter your email" required />
            <div>
              <Input type="password" placeholder="Enter your password" required />
              <p className="text-muted-foreground mt-1 text-sm">Must be at least 8 characters.</p>
            </div>
            <Button type="submit" className="mt-2 w-full">
              Create an account
            </Button>
            <Button variant="outline" className="w-full">
              <FcGoogle className="mr-2 size-5" />
              Continue with Google
            </Button>
          </div>
          <div className="text-muted-foreground mx-auto mt-8 flex justify-center gap-1 text-sm">
            <p>Already have an account?</p>
            <Link href="/login" className="text-primary font-medium">
              Log in
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default Signup;
