import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Script from 'next/script';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Serverless Devs Registry | Serverless Devs 包管理平台',
  description: 'Serverless Devs 包管理平台',
  other: {
    'aplus-core': 'aplus.js',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <Script
          id="aplus-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w, d, s, q) {
                w[q] = w[q] || [];
                var f = d.getElementsByTagName(s)[0],j = d.createElement(s);
                j.async = true;
                j.id = 'beacon-aplus';
                j.setAttribute('exparams', \`userid=&aplus&sidx=aplusSidex&ckx=aplusCkx\`);
                j.src = "//g.alicdn.com/alilog/mlog/aplus_v2.js";
                j.crossorigin = 'anonymous';
                f.parentNode.insertBefore(j, f);
              })(window, document, 'script', 'aplus_queue');
            `
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
