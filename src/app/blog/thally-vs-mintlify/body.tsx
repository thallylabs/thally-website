"use client";

import { PostShell } from "@/components/blog/post-shell";
import { getPost } from "@/lib/blog";

import Content from "./content.mdx";

export function PostBody() {
  return (
    <PostShell post={getPost("thally-vs-mintlify")}>
      <Content />
    </PostShell>
  );
}
