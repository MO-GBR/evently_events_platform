import Footer from "@/Components/Shared/Footer"
import Header from "@/Components/Shared/Navbar/Header"

export default function RootLayout({ children } : { children: React.ReactNode }) {
    return (
        <div>
            <Header />
            <main className="mt-22">{children}</main>
            <Footer />
        </div>
    )
};
