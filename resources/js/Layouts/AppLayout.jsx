import { Head } from "@inertiajs/react";
import Navbar from "@/Layouts/Navbar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import { usePage } from "@inertiajs/react";

export default function AppLayout({ children, title }) {
    const { flash, csrfToken } = usePage().props;

    return (
        <>
            <Head title={title}>

    <meta name="csrf-token" content={csrfToken} />
    <link rel="icon" href="/images/icons/favicon.ico" />
    <link rel="manifest" href="/site.webmanifest" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
    <link
      href="https://fonts.googleapis.com/css2?family=Questrial&display=swap"
      rel="stylesheet"
    />
  
</Head>


            {/* Apply the custom font class here */}
            <div className="min-h-screen questrial-regular">
                <Navbar />

                {flash?.success && (
                    <div className="global-flash-message">{flash.success}</div>
                )}

                <main>{children}</main>

                <ScrollToTop />
                <Footer />
            </div>

            <style>{`
        .global-flash-message {
          position: fixed;
          top: 70px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
          padding: 1rem 2rem;
          background: #4CAF50;
          color: white;
          border-radius: 4px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        /* Apply the Questrial font */
        .questrial-regular {
          font-family: "Questrial", serif;
          font-weight: 400;
          font-style: normal;
        }
      `}</style>
        </>
    );
}
