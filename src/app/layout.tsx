import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { AppProvider } from '@/lib/context';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ნუტრიციოლოგი — კალორიების კალკულატორი და კვების გეგმა',
  description:
    'გამოთვალე შენი კალორიები, მაკრონუტრიენტები და მიიღე უსაფრთხო კვების გეგმა. ქართულ ენაზე.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ka" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-gray-50 font-[var(--font-geist-sans)]">
        <AppProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
