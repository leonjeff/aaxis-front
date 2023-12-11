import Currencies from "@/pages/currencies";
import { CurrenciesProvider } from "../context/CurrenciesContext";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 sm:px-8 md:px-16 lg:px-16 xl:px-16 bg-sky-500">
      <div
        className="p-4 sm:p-8 md:p-8 lg:p-10 xl:p-12 rounded-md shadow-lg shadow-slate-500 bg-sky-100 w-full sm:w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center">
          Converter App
        </h1>
        <CurrenciesProvider>
          <Currencies />
        </CurrenciesProvider>
      </div>
    </main>
  );
}
