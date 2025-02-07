"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "./ui/sidebar";
import { usePathname } from "next/navigation";

const formatBreadcrumb = (segment: string): string => {
  return segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
};

export default function Header() {
  const pathname: string | null = usePathname();
  let segments: string[] = pathname ? pathname
    .split("/")
    .filter((segment) => segment !== "") : [];

  if (segments[0] === "dashboard") {
    segments = segments.slice(1);
  }

  segments = segments.filter((segment, index, arr) => {
    return !(arr[index - 1] === "detail" && /^\d+$/.test(segment)); // Jika angka dan didahului "detail", hapus
  });

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {segments.map((segment: string, index: number) => {
              const href: string = "/dashboard/" + segments.slice(0, index + 1).join("/");
              const isLast: boolean = index === segments.length - 1;
              const formattedSegment: string = formatBreadcrumb(
                decodeURIComponent(segment),
              );

              return (
                <div key={href} className="flex items-center">
                  {index > 0 && <BreadcrumbSeparator />}
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage>{formattedSegment}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={href}>
                        {formattedSegment}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </div>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}
