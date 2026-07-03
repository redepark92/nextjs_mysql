
import Navigation from "@/app/components/Navigation";
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';


export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en">
        <body >
          <Navigation />
          <Header />

          {children}

          <Footer />
        </body>
      </html>
    );
  }
