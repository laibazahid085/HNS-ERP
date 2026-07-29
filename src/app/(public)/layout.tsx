import * as React from "react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-[var(--cream-dark)] text-[var(--ink)] flex flex-col justify-center items-center font-[family-name:var(--font-body)]">
      <div className="w-full flex-1 flex flex-col justify-center items-center">
        {children}
      </div>
    </div>
  );
}