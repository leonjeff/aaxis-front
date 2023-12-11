"use client";
import { useEffect, useState } from "react";
import { useCurrencies } from "../context/CurrenciesContext";
import { CurrencySelector } from "@/components/currencySelector";
import swap from "../components/swapIcon.svg";
import Image from "next/image";

export const Currencies = () => {
  const { currencyData, loading } = useCurrencies();
  const [firstCurrencyValue, setFirstCurrencyValue] = useState<string>("");
  const [firstSelectedCurrency, setFirstSelectedCurrency] = useState("");

  const [secondCurrencyValue, setSecondCurrencyValue] = useState<string>("");
  const [secondSelectedCurrency, setSecondSelectedCurrency] = useState("");

  const [convertedValue, setConvertedValue] = useState<Number>();
  const [swapedCurrency, setSwapedCurrency] = useState(false);

  useEffect(() => {
    if (!swapedCurrency) {
      setSwapedCurrency((prevSwapedCurrency) => !prevSwapedCurrency);
    }
  }, [swapedCurrency]);

  if (!currencyData) {
    return <div>No data available.</div>;
  }
  const currencyArray: [string, number][] = Object.entries(currencyData.data);

  if (loading) {
    return <div>Cargando...</div>;
  }

  const firstCurrencyOnchange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setFirstCurrencyValue(e.target.value);
  };

  const secondCurrencyOnchange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setSecondCurrencyValue(e.target.value);
  };

  const onFirstSelectChange: React.ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
    setFirstSelectedCurrency(e.target.value);
  };

  const onSecondSelectChange: React.ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
    setSecondSelectedCurrency(e.target.value);
  };

  const calculateCurrencyExchange = (
    firstCurrencyValue: string,
    secondCurrencyValue: string
  ) => {
    const valueOne = parseInt(firstCurrencyValue);
    const valueTwo = parseInt(secondCurrencyValue);

    const filteredFirstCurrency = currencyArray.find(
      ([code]) => code === firstSelectedCurrency
    );

    const filteredSecondCurrency = currencyArray.find(
      ([code]) => code === secondSelectedCurrency
    );

    console.log(filteredFirstCurrency?.[1]);

    let finalValue;
    if (filteredSecondCurrency) {
      finalValue = valueOne * filteredSecondCurrency?.[1];

      setConvertedValue(finalValue);
      setSecondCurrencyValue(finalValue.toString());
    }
  };

  const swapCurrencies = () => {
    setSwapedCurrency((prevSwapedCurrency) => !prevSwapedCurrency);
    setFirstSelectedCurrency(firstSelectedCurrency);
    setSecondSelectedCurrency(secondSelectedCurrency);

    setFirstSelectedCurrency((prevFirstSelectedCurrency: string) => {
      return swapedCurrency
        ? secondSelectedCurrency
        : prevFirstSelectedCurrency;
    });

    setSecondSelectedCurrency((prevSecondSelectedCurrency: string) => {
      return swapedCurrency
        ? firstSelectedCurrency
        : prevSecondSelectedCurrency;
    });

    setFirstCurrencyValue((prevFirstCurrencyValue: string) => {
      return swapedCurrency ? secondCurrencyValue : prevFirstCurrencyValue;
    });

    setSecondCurrencyValue((prevSecondCurrencyValue: string) => {
      return swapedCurrency ? firstCurrencyValue : prevSecondCurrencyValue;
    });
  };

  return (
    <div className="flex flex-col items-center sm:p-8 md:p-8">
      <div className="py-2 sm:py-6 md:py-8 lg:py-10 xl:py-12">
        <CurrencySelector
          countriesList={currencyArray}
          inputId={"currencyOne"}
          selectId={"currencyOneList"}
          currencyQuantity={firstCurrencyValue}
          quantityOnChange={firstCurrencyOnchange}
          selectedCurrency={firstSelectedCurrency}
          handleCurrencyChange={onFirstSelectChange}
        />
      </div>

      <div className="py-2 sm:py-6 md:py-8 lg:py-10 xl:py-12">
        <div
          onClick={swapCurrencies}
          className="rounded-full border-1 bg-gray-300 w-10 h-10 flex justify-center"
        >
          <Image src={swap} alt="swapicon" />
        </div>
      </div>

      <div className="py-2 sm:py-6 md:py-8 lg:py-10 xl:py-12">
        <CurrencySelector
          countriesList={currencyArray}
          inputId={"currencyTwo"}
          selectId={"currencyTwoList"}
          currencyQuantity={secondCurrencyValue}
          quantityOnChange={secondCurrencyOnchange}
          selectedCurrency={secondSelectedCurrency}
          handleCurrencyChange={onSecondSelectChange}
        />
      </div>

      <div className="flex mt-2 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-12 items-center gap-x-4 sm:gap-x-6">
        <button
          type="button"
          onClick={() =>
            calculateCurrencyExchange(firstCurrencyValue, secondCurrencyValue)
          }
          className="rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full"
        >
          Convert
        </button>
      </div>
    </div>
  );
};

export default Currencies;
