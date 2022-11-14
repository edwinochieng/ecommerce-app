import React from "react";
import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div className='relative min-h-screen'>
      <header>
        <Navbar />
      </header>
      <main className='max-w-screen-xl mx-auto px-2 pt-16 md:pt-[88px]'>
        {children}
      </main>
    </div>
  );
}

export default Layout;
