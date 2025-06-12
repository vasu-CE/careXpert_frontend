import { Outlet } from "react-router-dom";

export default function Layout({ children }: { children?: React.ReactNode }) {
  return <div className="min-h-screen font-sans">{children || <Outlet />}</div>;
}
