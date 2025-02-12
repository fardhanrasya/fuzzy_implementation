function fuzzyMembership(value, low, mid, high) {
  if (value <= low) return 0;
  if (value >= high) return 1;
  if (value < mid) return (value - low) / (mid - low);
  return (high - value) / (high - mid);
}

function getFuzzyValues(nilaiTes, nilaiRapor, ekstrakurikuler) {
  return {
      tes: {
          rendah: fuzzyMembership(nilaiTes, 0, 40, 60),
          sedang: fuzzyMembership(nilaiTes, 40, 60, 80),
          tinggi: fuzzyMembership(nilaiTes, 60, 80, 100),
      },
      rapor: {
          rendah: fuzzyMembership(nilaiRapor, 0, 50, 70),
          sedang: fuzzyMembership(nilaiRapor, 50, 70, 85),
          tinggi: fuzzyMembership(nilaiRapor, 70, 85, 100),
      },
      ekstrakurikuler: {
          kurang: fuzzyMembership(ekstrakurikuler, 0, 3, 5),
          cukup: fuzzyMembership(ekstrakurikuler, 3, 5, 8),
          aktif: fuzzyMembership(ekstrakurikuler, 5, 8, 10),
      },
  };
}

function calculateSugeno(nilaiTes, nilaiRapor, ekstrakurikuler) {
  let fuzzyValues = getFuzzyValues(nilaiTes, nilaiRapor, ekstrakurikuler);

  let rules = [
      { weight: Math.min(fuzzyValues.tes.sedang, fuzzyValues.rapor.tinggi), output: 80 },
      { weight: Math.min(fuzzyValues.tes.tinggi, fuzzyValues.rapor.tinggi), output: 90 },
      { weight: Math.max(fuzzyValues.tes.rendah, fuzzyValues.rapor.rendah), output: 30 },
  ];

  let numerator = 0, denominator = 0;

  for (let rule of rules) {
      numerator += rule.weight * rule.output;
      denominator += rule.weight;
  }

  const skor_akhir = denominator === 0 ? 0 : numerator / denominator;
  
  let keputusan = 'DITOLAK';
  if (skor_akhir > 60) keputusan = 'DITERIMA';
  else if (skor_akhir >= 50) keputusan = 'CADANGAN';

  return { skor_akhir, keputusan };
}

module.exports = { calculateSugeno };