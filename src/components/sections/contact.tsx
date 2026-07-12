import { Github, Twitter } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

const formFields = [
  {
    label: "Full name",
    name: "fullName",
    placeholder: "First and last name",
    type: "text",
  },
  {
    label: "Work email address",
    name: "email",
    placeholder: "me@example.com",
    type: "email",
  },
  {
    label: "Company name",
    name: "company",
    placeholder: "Company name",
    type: "text",
    optional: true,
  },
  {
    label: "Number of employees",
    name: "employees",
    placeholder: "Company name",
    type: "text",
    optional: true,
  },
  {
    label: "Your message",
    name: "message",
    placeholder: "Write your message",
    type: "textarea",
  },
];

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
              <div className="mt-3 space-y-2">
                <div>
                  <p>Careers</p>
                  <Link
                    href="mailto:careers@example.com"
                    className="text-muted-foreground mt-3 text-lg font-medium tracking-tight"
                  >
                    careers@example.com
                  </Link>
                </div>
                <div>
                  <p>Press</p>
                  <Link
                    href="mailto:press@example.com"
                    className="text-muted-foreground mt-3 text-lg font-medium tracking-tight"
                  >
                    press@example.com
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold">Follow us</h2>
              <div className="mt-3 flex gap-6">
                <Link
                  href="https://github.com/kenny-io/thally"
                  aria-label="Thally on GitHub"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Github className="size-6" />
                </Link>
                <Link
                  href="https://x.com/thallydocs"
                  aria-label="Thally on X"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Twitter className="size-6" />
                </Link>
              </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="flex-1 md:ps-8">
            <h2 className="text-lg font-semibold">Inquiries</h2>
            <form className="mt-5 space-y-5">
              {formFields.map((field) => (
                <div key={field.name} className="flex flex-col gap-2">
                  <Label>
                    {field.label}
                    {field.optional && <span className="text-muted-foreground/60"> (optional)</span>}
                  </Label>
                  {field.type === "textarea" ? (
                    <Textarea name={field.name} placeholder={field.placeholder} className="min-h-[120px] resize-none" />
                  ) : (
                    <Input type={field.type} name={field.name} placeholder={field.placeholder} />
                  )}
                </div>
              ))}

              <div className="flex justify-end">
                <Button type="submit" size="lg">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
