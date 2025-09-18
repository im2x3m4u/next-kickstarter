import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function Breadcrumb({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav aria-label="breadcrumb" className={cn("w-full", className)} {...props} />
  )
}

export function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol className={cn("flex items-center gap-1 text-sm text-gray-500", className)} {...props} />
  )
}

export function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li className={cn("inline-flex items-center gap-1", className)} {...props} />
}

export function BreadcrumbSeparator({ className, ...props }: React.ComponentProps<"span">) {
  return <span role="presentation" className={cn("px-1 text-gray-400", className)} {...props}>/</span>
}

export function BreadcrumbLink({ className, href = "#", ...props }: React.ComponentProps<typeof Link>) {
  return (
    <Link href={href} className={cn("text-gray-600 hover:text-gray-900 transition-colors", className)} {...props} />
  )
}

export function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return <span aria-current="page" className={cn("font-medium text-gray-900", className)} {...props} />
}

export function BreadcrumbEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return <span className={cn("text-gray-400", className)} {...props}>…</span>
}


