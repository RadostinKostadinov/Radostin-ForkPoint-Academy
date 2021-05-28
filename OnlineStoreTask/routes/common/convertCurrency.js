const soap = require('soap');

const url = 'http://infovalutar.ro/curs.asmx?wsdl';

function getCurrencyInfo(currency) {
  return new Promise((resolve) => {
    soap.createClient(url, (err, client) => {
      if (err) throw err.message;

      client.GetLatestValue({
        Moneda: currency,
      }, (error, res) => {
        if (error) throw error;

        resolve(res.GetLatestValueResult);
      });
    });
  });
}

module.exports = async function convertCurrency(from, to, value) {
  const firstCurrency = await getCurrencyInfo(from);
  const secondCurrency = await getCurrencyInfo(to);

  const result = (value * firstCurrency) / secondCurrency;
  return result;
};

/* async function test() {
  const newValue = await convertCurrency('USD', 'BGN', 200);
  console.log(newValue);
}

test(); */
