interface CurrencySelectorProps {
  countriesList: [string, number][];
  currencyQuantity: string;
  quantityOnChange: React.ChangeEventHandler<HTMLInputElement>;
  inputId: string;
  selectId: string;
  selectedCurrency: string;
  handleCurrencyChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const customClass = `block w-full 
rounded-md border-0 py-1.5
text-gray-900 shadow-md
ring-1 ring-inset ring-sky-300
focus:ring-1 focus:ring-inset focus:ring-sky-300
focus:outline-none focus:ring focus:border-sky-300
sm:text-sm sm:leading-6 bg-gray-300 h-10 p-2
placeholder:text-gray-400
`;

export const CurrencySelector = ({
  countriesList,
  currencyQuantity,
  quantityOnChange,
  inputId,
  selectId,
  selectedCurrency,
  handleCurrencyChange,
}: CurrencySelectorProps) => {
  return (
    <div className="border border-gray-50 rounded-lg bg-gray-50 sm:w-80 p-5 md:w-full lg:w-96 xl:w-80">
      <div className="mb-4">
        <label
          htmlFor="country"
          className="block text-sm font-medium leading-6 text-slate-400"
        >
          Currency
        </label>
        <div className="mt-2">
          <select
            id={selectId}
            name={selectId}
            className={customClass}
            value={selectedCurrency}
            onChange={handleCurrencyChange}
          >
            <option value="" disabled hidden>
              Select a Currency
            </option>
            {countriesList.map(([currency, rate]) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor={inputId}
          className="block text-sm font-medium leading-6 text-slate-400"
        >
          Amount
        </label>
        <div className="mt-2">
          <input
            placeholder="Enter currency amount"
            type="number"
            name={inputId}
            id={inputId}
            value={currencyQuantity}
            onChange={quantityOnChange}
            className={customClass}
          />
        </div>
      </div>
    </div>
  );
};
