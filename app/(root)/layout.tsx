import Footer from "@/Components/Shared/Footer"
import Header from "@/Components/Shared/Header"

export default function RootLayout({ children } : { children: React.ReactNode }) {
    return (
        <div>
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    )
};