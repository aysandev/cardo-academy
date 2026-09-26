import type { Metadata } from "next";
import { Estedad } from "next/font/google";
import "./globals.css";


const estedad = Estedad({

  subsets: ["arabic"],

  weight: [
    "400",
    "500",
    "600",
    "700",
    "800",
    "900"
  ],

  display: "swap",

});



export const metadata: Metadata = {

  title:
    "کاردو | آموزش تخصصی HSE و آتش نشانی",

  description:
    "پلتفرم آموزش تخصصی ایمنی، HSE و آتش نشانی",

};



export default function RootLayout({

  children,

}: Readonly<{

  children: React.ReactNode;

}>) {


  return (

    <html lang="fa" dir="rtl">

      <body className={estedad.className}>

        {children}

      </body>

    </html>

  );

}