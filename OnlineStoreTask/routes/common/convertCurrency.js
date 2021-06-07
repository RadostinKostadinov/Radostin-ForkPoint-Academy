const soap = require('soap');

const url = 'http://infovalutar.ro/curs.asmx?wsdl';

function getAll() {
  return new Promise((resolve) => {
    soap.createClient(url, (err, client) => {
      if (err) throw err.message;

      const today = new Date();
      const yesterday = new Date(today);

      yesterday.setDate(yesterday.getDate() - 1);

      const infovalutarReqDate = `${yesterday.toISOString().slice(0, 10)}T00:00:00`;

      client.getall({
        dt: infovalutarReqDate,
      }, (error, res) => {
        if (error) throw error;

        resolve(res.getallResult);
      });
    });
  });
}

module.exports = async function convertCurrency(from, to, value) {
  const getall = await getAll();
  const currentCurrencyExRate = Number(getall.diffgram.DocumentElement.Currency
    .find(currency => currency.IDMoneda === from).Value);
  const nextCurrencyExRate = Number(getall.diffgram.DocumentElement.Currency
    .find(currency => currency.IDMoneda === to).Value);

  const result = (value * currentCurrencyExRate) / nextCurrencyExRate;
  return result;
};

/* async function test() {
    const result = await convertCurrency('USD', 'BGN', 200);
    console.log(result);
}

test(); */
