const langData = {
  zh: {
    title: "2024高考志愿推荐",
    province: "省份：",
    score: "分数：",
    type: "科类：",
    submit: "查询"
  },
  en: {
    title: "2024 Gaokao Advisor",
    province: "Province:",
    score: "Score:",
    type: "Stream:",
    submit: "Submit"
  }
};

function setLang(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    el.childNodes[0].nodeValue = langData[lang][key];
  });
}

document.getElementById('query-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const province = document.getElementById('province').value;
  const score = parseInt(document.getElementById('score').value);
  const type = document.getElementById('type').value;

  // 模拟分数排名映射
  const rankTable = {
    河南: {
      理科: { 680: 5000, 650: 12000, 600: 40000, 550: 85000 },
      文科: { 630: 3000, 600: 9000, 570: 20000 }
    },
    山东: {
      理科: { 680: 4000, 650: 10000, 600: 35000, 550: 78000 },
      文科: { 630: 2500, 600: 8000, 570: 18000 }
    }
  };

  const schools = [
    { name: "复旦大学", type: "文科", min: 1, max: 5000, level: "冲", majors: ["法学", "新闻"] },
    { name: "中山大学", type: "理科", min: 10000, max: 25000, level: "稳", majors: ["电子", "生物"] },
    { name: "西南大学", type: "理科", min: 40000, max: 70000, level: "保", majors: ["化学", "农学"] }
  ];

  const provinceRanks = rankTable[province]?.[type];
  let rank = null;

  if (provinceRanks) {
    const sorted = Object.keys(provinceRanks).map(Number).sort((a, b) => b - a);
    for (let s of sorted) {
      if (score >= s) {
        rank = provinceRanks[s];
        break;
      }
    }
  }

  let html = "";

  if (rank) {
    html += `<p>🎯 估算全省排名：<strong>${rank}</strong></p>`;

    const matched = { 冲: [], 稳: [], 保: [] };
    schools.forEach(s => {
      if (s.type === type && rank >= s.min && rank <= s.max) {
        matched[s.level].push(s);
      }
    });

    ["冲", "稳", "保"].forEach(level => {
      if (matched[level].length) {
        html += `<h3>${level}：</h3><ul>`;
        matched[level].forEach(s => {
          html += `<li>${s.name} - 专业：${s.majors.join(" / ")}</li>`;
        });
        html += `</ul>`;
      }
    });

    if (!matched.冲.length && !matched.稳.length && !matched.保.length) {
      html += `<p>未找到匹配院校。</p>`;
    }
  } else {
    html = `<p>未找到该分数对应的排名数据。</p>`;
  }

  document.getElementById('result').innerHTML = html;
});
