const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

async function fetchProvince(prov, type) {
  // 替换为真实抓取逻辑或 API 地址
  const url = `https://example.com/api/ranks?province=${prov}&type=${type}`;
  const res = await fetch(url);
  return res.json();
}

(async () => {
  const provinces = ['福建','江苏','广东']; 
  const types = ['理科','文科'];
  const result = {};
  for (const p of provinces) {
    result[p] = {};
    for (const t of types) {
      console.log(`Fetching ${p}-${t}`);
      result[p][t] = await fetchProvince(p, t);
    }
  }

  const outDir = path.join(__dirname, '..', 'api', 'data');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'ranks.json'), JSON.stringify(result, null,2));
  console.log('✅ ranks.json updated');
})();
