import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <div style={{ border: "5px solid pink" }}>{children}</div>;
}
