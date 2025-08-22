export const nf = new Intl.NumberFormat('pt-BR');

export function formatMetric(n: number, suffix = '') {
  return `${nf.format(n)}${suffix}`;
}

// Função auxiliar para formatar valores monetários
export function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

// Função para formatar números grandes de forma compacta
export function formatCompactNumber(value: number, suffix = '') {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1).replace('.0', '')}M${suffix}`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1).replace('.0', '')}K${suffix}`;
  }
  return `${value}${suffix}`;
}