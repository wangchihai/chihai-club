import "./globals.css";
import "prism-themes/themes/prism-dracula.css";
import './../styles/main.css'
import "../styles/code.css";
import Header from "./components/Header";
import Script from "next/script";


export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
    <html>
    <head>
      <Script

        src={"//at.alicdn.com/t/c/font_4132358_4i5a1eu91ni.js"}
      />
      <title></title>
    </head>


    <body>
      <div className={'blog-main'}>
        <Header/>
        {children}
      </div>
    </body>
    </html>
  );
}
