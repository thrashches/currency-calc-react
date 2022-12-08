function convert(value, currencyFrom, currencyTo, rates) {
  rates["RUB"] = { Value: 1, Nominal: 1 };
  console.log(rates);
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
