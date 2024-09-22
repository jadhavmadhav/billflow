import React from "react";

export default function PageLayout({ label, children, Footer }) {
  return (
    <div className="h-[100%] flex flex-col gap-3">
      <div className="flex-1 overflow-auto px-5 py-3">{children}</div>
      {Footer && <div>{Footer}</div>}
    </div>
  );
}
