const utils = require('../utils');
const main = async () => {
  let data = await utils.getData(
    'https://notional.finance/.netlify/functions/yields'
  );
  const project = 'notional';
  data = data.map((p) => {
    const name = p.symbol.split(' ');
    return {
      ...p,
      pool: `${p.symbol.replace(/\s/g, '-')}-${project}`,
      symbol: name[0],
      poolMeta: name.length > 1 ? name.slice(1).join(' ') : null,
    };
  });

  return data;
};

module.exports = {
  timetravel: false,
  apy: main,
  url: 'https://notional.finance',
};
