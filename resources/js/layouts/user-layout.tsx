import React, { PropsWithChildren } from "react";
import Header from "@/components/header-user";
import Footer from "@/components/footer";

const UserLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* HEADER */}
      <Header />

      {/* Bagian konten halaman (sub header + main) */}
      {children}

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default UserLayout;
