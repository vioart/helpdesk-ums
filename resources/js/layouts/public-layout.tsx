import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

type Props = { children: React.ReactNode };

const PublicLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="md:min-h-screen md:flex md:flex-col lg:min-h-0 lg:block">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
