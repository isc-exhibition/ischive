import Footer from "./Footer/Footer";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
