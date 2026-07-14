import { Github, Mail, Twitter } from "lucide-react";
import Link from "next/link";

import { DESTINATIONS, SOCIAL } from "@/lib/site";

import { Button } from "../ui/button";

export default function Contact() {
  return (
    <section className="py-16 md:py-28 lg:py-32">
      <div className="container max-w-4xl">
        <h1 className="font-display text-center text-4xl font-semibold tracking-tight sm:text-5xl">Contact us</h1>
        <p className="text-muted-foreground mt-4 text-center">
          Tell us what you&apos;re building — we usually reply within a day.
        </p>

        <div className="mt-8 flex max-md:flex-col md:mt-12 md:divide-x lg:mt-20">
          {/* Contact Information */}
          <div className="space-y-10 md:pe-14">
            <div>
              <h2 className="text-lg font-semibold">Corporate office</h2>
              <p className="text-muted-foreground mt-3 text-lg font-medium tracking-tight">
                Level 5, 120 Collins Street
                <br />
                Melbourne VIC 3000, Australia
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold">Email us</h2>
              <Link
                href={DESTINATIONS.email}
                className="text-muted-foreground mt-3 inline-block text-lg font-medium tracking-tight"
              >
                noreply@thally.io
              </Link>
            </div>

            <div>
              <h2 className="text-lg font-semibold">Follow us</h2>
              <div className="mt-3 flex gap-6">
                <Link
                  href={SOCIAL.github}
                  aria-label="Thally on GitHub"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Github className="size-6" />
                </Link>
                <Link href={SOCIAL.x} aria-label="Thally on X" className="text-muted-foreground hover:text-foreground">
                  <Twitter className="size-6" />
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-1 flex-col justify-center md:ps-14">
            <Mail className="text-primary size-8" />
            <h2 className="mt-5 text-2xl font-semibold">Sales and support</h2>
            <p className="text-muted-foreground mt-3 max-w-md leading-relaxed">
              Ask about migration, self-hosting, Enterprise SSO, or anything else. We usually reply within one business
              day.
            </p>
            <Button asChild size="lg" className="mt-7 w-fit">
              <a href={DESTINATIONS.email}>Email the Thally team</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
