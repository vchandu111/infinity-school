import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "./Components/Common/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-gray-900 text-white min-h-screen ">
      <Navbar/>
      <Component {...pageProps} />
    </div>
  );
}
