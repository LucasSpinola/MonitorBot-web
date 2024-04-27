import type { AppProps } from "next/app";
import 'tailwindcss/tailwind.css';
import { AuthProvider } from "../data/context/AuthContext"; 
import { AppProvider } from "../data/context/AppContext";

export default function App({ Component, pageProps }: AppProps) {
  return ( 
    <AuthProvider>
      <AppProvider>
      <Component {...pageProps} />
      </AppProvider>
    </AuthProvider>
  )
}
