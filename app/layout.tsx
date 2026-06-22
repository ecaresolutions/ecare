import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

// This root layout is required by Next.js and must render the html and body tags
// to satisfy Next.js root layout constraints for fallback/error routes.
export default function RootLayout({ children }: Props) {
  return children;
}
