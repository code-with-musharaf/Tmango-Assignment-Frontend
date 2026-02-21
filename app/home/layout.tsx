import Navbar from "@/components/Navbar";
import Providers from "@/redux/Providers";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <Navbar />
      <div>
        {/* <ChallengeSidebar /> */}
        {children}
      </div>
    </Providers>
  );
}
