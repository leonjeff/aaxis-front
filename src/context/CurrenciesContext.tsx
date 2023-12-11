"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import axios from "axios";

interface CurrencyData {
  data: Record<string, number>;
}

interface CurrenciesContextProps {
  currencyData: CurrencyData | null;
  loading: boolean;
}

interface CurrenciesProviderProps {
  children: ReactNode;
}

const CurrenciesContext = createContext<CurrenciesContextProps | undefined>(
  undefined
);

const apikey = process.env.NEXT_PUBLIC_REACT_APP_API_KEY;
const url = process.env.NEXT_PUBLIC_REACT_APP_MAIN_URL;

const fetchCurrencyData = async () => {
  try {
    const response = await axios.get(`${url}?apikey=${apikey}`);
    return response.data as CurrencyData;
  } catch (error) {
    console.error("Error fetching currency data:", error);
    throw error;
  }
};

export const CurrenciesProvider = ({ children }: CurrenciesProviderProps) => {
  const [currencyData, setCurrencyData] = useState<CurrencyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCurrencyData();
        setCurrencyData(data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <CurrenciesContext.Provider value={{ currencyData, loading }}>
      {children}
    </CurrenciesContext.Provider>
  );
};

export const useCurrencies = () => {
  const context = useContext(CurrenciesContext);
  if (!context) {
    throw new Error(
      "useCurrencies debe ser utilizado dentro de un CurrenciesProvider"
    );
  }
  return context;
};
