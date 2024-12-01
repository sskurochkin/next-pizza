export default function DashboardLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (

            <main className="min-h-screen">
                <div>{children}</div>
            </main>



    );
}
