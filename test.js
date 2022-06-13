const fs = require('fs')

const m = new Map();

m.set('#cool', {table:  [1,2,3], seen: 999});


console.log(m)


const mapToObj = m => {
    return Array.from(m).reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});
};

fs.writeFileSync('m.json', JSON.stringify(mapToObj(m)))
