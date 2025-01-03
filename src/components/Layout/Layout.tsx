/* 
Layout.tsx:
  Defines a layout of all pages
*/

import Footer from "./Footer/Footer";
import Header from "./Header/Header";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="cursor-default flex min-h-screen flex-col bg-white">
      <Header />
      <main className="mt-[52px]">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
