/* 
Layout.tsx:
  Defines a layout of all pages
*/

import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import "../../app/cursor.css";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="default-cursor flex min-h-screen flex-col bg-white">
      <Header />
      <main className="mt-[52px]">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
