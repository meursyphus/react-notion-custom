"use client";

import useIsMobile from "../hooks/useIsMobile";

interface DynamicLayoutProps {
  sidebar: React.ReactNode;
  toc: React.ReactNode;
  mobileSidebar: React.ReactNode;
  children: React.ReactNode;
}

export default function DynamicLayout({
  sidebar,
  toc,
  mobileSidebar,
  children,
}: DynamicLayoutProps) {
  const isMobile = useIsMobile();

  return (
    <div
      className={`flex flex-col justify-center gap-5 md:flex-row ${isMobile ? "p-4" : "p-5"}`}
    >
      {!isMobile && <div>{sidebar}</div>}
      {isMobile && <div>{mobileSidebar}</div>}
      <div className={`${isMobile ? "w-full" : "w-fit"} `}>{children}</div>
      {!isMobile && <div>{toc}</div>}
    </div>
  );
}
