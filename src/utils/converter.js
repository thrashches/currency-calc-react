function convert(value, currencyFrom, currencyTo, rates) {
  const result = 
    Math.round(
      ((value * rates[currencyFrom].Value) /
        rates[currencyFrom].Nominal /
        (rates[currencyTo].Value / rates[currencyTo].Nominal)) *
        100
    ) / 100;
  return result;
}

export { convert };
