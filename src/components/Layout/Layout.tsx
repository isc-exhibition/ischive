import Footer from "./Footer/Footer";
import Header from "./Header/Header";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="mt-[60px]">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
