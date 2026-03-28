// Mock economic data for AI profit tracking and robot tax calculations

export interface AICompany {
  name: string;
  ticker: string;
  aiRevenue2025: number; // billions
  aiProfit2025: number; // billions
  employees: number;
  jobsDisplaced: number; // estimated
  profitPerDisplacedWorker: number;
  revenueGrowthPct: number;
  sector: string;
}

export const aiCompanies: AICompany[] = [
  {
    name: 'Nvidia',
    ticker: 'NVDA',
    aiRevenue2025: 130.5,
    aiProfit2025: 78.3,
    employees: 32000,
    jobsDisplaced: 245000,
    profitPerDisplacedWorker: 319592,
    revenueGrowthPct: 94,
    sector: 'Hardware/Chips',
  },
  {
    name: 'Microsoft',
    ticker: 'MSFT',
    aiRevenue2025: 89.2,
    aiProfit2025: 38.1,
    employees: 228000,
    jobsDisplaced: 182000,
    profitPerDisplacedWorker: 209341,
    revenueGrowthPct: 47,
    sector: 'Cloud/Software',
  },
  {
    name: 'Alphabet',
    ticker: 'GOOGL',
    aiRevenue2025: 76.8,
    aiProfit2025: 31.2,
    employees: 182000,
    jobsDisplaced: 156000,
    profitPerDisplacedWorker: 200000,
    revenueGrowthPct: 38,
    sector: 'Search/Cloud',
  },
  {
    name: 'Meta',
    ticker: 'META',
    aiRevenue2025: 62.4,
    aiProfit2025: 24.8,
    employees: 72000,
    jobsDisplaced: 134000,
    profitPerDisplacedWorker: 185075,
    revenueGrowthPct: 52,
    sector: 'Social/Advertising',
  },
  {
    name: 'Amazon',
    ticker: 'AMZN',
    aiRevenue2025: 58.1,
    aiProfit2025: 19.6,
    employees: 1540000,
    jobsDisplaced: 312000,
    profitPerDisplacedWorker: 62821,
    revenueGrowthPct: 41,
    sector: 'Cloud/Retail',
  },
  {
    name: 'Apple',
    ticker: 'AAPL',
    aiRevenue2025: 42.3,
    aiProfit2025: 18.9,
    employees: 164000,
    jobsDisplaced: 89000,
    profitPerDisplacedWorker: 212360,
    revenueGrowthPct: 28,
    sector: 'Consumer/Devices',
  },
  {
    name: 'OpenAI',
    ticker: 'Private',
    aiRevenue2025: 13.8,
    aiProfit2025: -2.1,
    employees: 3400,
    jobsDisplaced: 420000,
    profitPerDisplacedWorker: -5000,
    revenueGrowthPct: 340,
    sector: 'AI Models',
  },
  {
    name: 'Anthropic',
    ticker: 'Private',
    aiRevenue2025: 4.2,
    aiProfit2025: -1.8,
    employees: 1200,
    jobsDisplaced: 185000,
    profitPerDisplacedWorker: -9730,
    revenueGrowthPct: 480,
    sector: 'AI Models',
  },
];

export const totalAIRevenue = aiCompanies.reduce((sum, c) => sum + c.aiRevenue2025, 0);
export const totalAIProfit = aiCompanies.reduce((sum, c) => sum + c.aiProfit2025, 0);
export const totalJobsDisplaced = aiCompanies.reduce((sum, c) => sum + c.jobsDisplaced, 0);

// Per-second rates for live counters (annualized)
export const profitPerSecond = (totalAIProfit * 1e9) / (365 * 24 * 3600);
export const jobsDisplacedPerDay = Math.round(totalJobsDisplaced / 365);

// Tax calculation models
export interface TaxModel {
  id: string;
  name: string;
  description: string;
  rateRange: [number, number];
  defaultRate: number;
  pros: string[];
  cons: string[];
}

export const taxModels: TaxModel[] = [
  {
    id: 'flat-revenue',
    name: 'Flat AI Revenue Tax',
    description: 'A percentage tax on all AI-generated revenue, similar to a corporate income tax but specific to AI operations.',
    rateRange: [1, 25],
    defaultRate: 5,
    pros: ['Simple to implement', 'Broad tax base', 'Revenue predictable'],
    cons: ['May discourage innovation', 'Hard to define "AI revenue"', 'Regressive for startups'],
  },
  {
    id: 'displacement',
    name: 'Displacement Tax',
    description: 'Companies pay per job displaced by automation. Higher displacement = higher tax. Incentivizes keeping humans in the loop.',
    rateRange: [5000, 50000],
    defaultRate: 15000,
    pros: ['Directly addresses displacement', 'Incentivizes human employment', 'Progressive structure'],
    cons: ['Displacement hard to measure', 'Companies may offshore', 'Complex enforcement'],
  },
  {
    id: 'automation-hours',
    name: 'Automation Hours Tax',
    description: 'Tax equivalent hours of human labor replaced by AI systems, treating AI output like a taxable employee.',
    rateRange: [2, 20],
    defaultRate: 8,
    pros: ['Mimics payroll tax model', 'Fair comparison to human labor', 'Familiar mechanism'],
    cons: ['Hard to measure AI "hours"', 'Definition challenges', 'Industry variation'],
  },
  {
    id: 'windfall',
    name: 'Windfall Profit Tax',
    description: 'Excess profits above a threshold are taxed at a higher rate. Targets outsized gains from AI disruption.',
    rateRange: [10, 50],
    defaultRate: 25,
    pros: ['Targets excess profits only', 'Preserves normal returns', 'Precedent in oil taxes'],
    cons: ['Defining "windfall" is subjective', 'May reduce reinvestment', 'Avoidance strategies'],
  },
];

// State-by-state impact data
export interface StateImpact {
  state: string;
  abbr: string;
  jobsAtRisk: number;
  percentWorkforce: number;
  avgSalaryImpacted: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export const stateImpacts: StateImpact[] = [
  { state: 'California', abbr: 'CA', jobsAtRisk: 342000, percentWorkforce: 1.8, avgSalaryImpacted: 87000, severity: 'critical' },
  { state: 'Texas', abbr: 'TX', jobsAtRisk: 218000, percentWorkforce: 1.5, avgSalaryImpacted: 62000, severity: 'high' },
  { state: 'New York', abbr: 'NY', jobsAtRisk: 196000, percentWorkforce: 2.0, avgSalaryImpacted: 78000, severity: 'critical' },
  { state: 'Florida', abbr: 'FL', jobsAtRisk: 158000, percentWorkforce: 1.5, avgSalaryImpacted: 54000, severity: 'high' },
  { state: 'Illinois', abbr: 'IL', jobsAtRisk: 112000, percentWorkforce: 1.7, avgSalaryImpacted: 65000, severity: 'high' },
  { state: 'Pennsylvania', abbr: 'PA', jobsAtRisk: 98000, percentWorkforce: 1.6, avgSalaryImpacted: 58000, severity: 'high' },
  { state: 'Ohio', abbr: 'OH', jobsAtRisk: 87000, percentWorkforce: 1.5, avgSalaryImpacted: 52000, severity: 'medium' },
  { state: 'Georgia', abbr: 'GA', jobsAtRisk: 79000, percentWorkforce: 1.6, avgSalaryImpacted: 56000, severity: 'medium' },
  { state: 'Michigan', abbr: 'MI', jobsAtRisk: 76000, percentWorkforce: 1.7, avgSalaryImpacted: 55000, severity: 'medium' },
  { state: 'Washington', abbr: 'WA', jobsAtRisk: 72000, percentWorkforce: 1.9, avgSalaryImpacted: 82000, severity: 'high' },
  { state: 'Massachusetts', abbr: 'MA', jobsAtRisk: 68000, percentWorkforce: 1.8, avgSalaryImpacted: 79000, severity: 'high' },
  { state: 'New Jersey', abbr: 'NJ', jobsAtRisk: 64000, percentWorkforce: 1.4, avgSalaryImpacted: 72000, severity: 'medium' },
  { state: 'Virginia', abbr: 'VA', jobsAtRisk: 61000, percentWorkforce: 1.5, avgSalaryImpacted: 71000, severity: 'medium' },
  { state: 'North Carolina', abbr: 'NC', jobsAtRisk: 58000, percentWorkforce: 1.2, avgSalaryImpacted: 57000, severity: 'medium' },
  { state: 'Arizona', abbr: 'AZ', jobsAtRisk: 45000, percentWorkforce: 1.3, avgSalaryImpacted: 54000, severity: 'medium' },
  { state: 'Colorado', abbr: 'CO', jobsAtRisk: 42000, percentWorkforce: 1.4, avgSalaryImpacted: 68000, severity: 'medium' },
  { state: 'Minnesota', abbr: 'MN', jobsAtRisk: 38000, percentWorkforce: 1.3, avgSalaryImpacted: 61000, severity: 'medium' },
  { state: 'Indiana', abbr: 'IN', jobsAtRisk: 35000, percentWorkforce: 1.1, avgSalaryImpacted: 48000, severity: 'low' },
  { state: 'Tennessee', abbr: 'TN', jobsAtRisk: 33000, percentWorkforce: 1.0, avgSalaryImpacted: 49000, severity: 'low' },
  { state: 'Maryland', abbr: 'MD', jobsAtRisk: 31000, percentWorkforce: 1.1, avgSalaryImpacted: 67000, severity: 'medium' },
];

// What robot tax revenue could fund
export interface FundingTarget {
  name: string;
  costPerPerson: number;
  icon: string;
  description: string;
}

export const fundingTargets: FundingTarget[] = [
  { name: 'Universal Basic Income', costPerPerson: 12000, icon: '💰', description: '$1,000/month for displaced workers' },
  { name: 'Job Retraining', costPerPerson: 8500, icon: '🎓', description: '6-month tech retraining program' },
  { name: 'Community Investment', costPerPerson: 4200, icon: '🏘️', description: 'Local infrastructure & small business grants' },
  { name: 'Healthcare Access', costPerPerson: 6800, icon: '🏥', description: 'Mental health & transition support' },
  { name: 'Education Fund', costPerPerson: 5600, icon: '📚', description: 'K-12 STEM + digital literacy programs' },
];

// Calculate tax revenue for a given rate
export function calculateTaxRevenue(ratePct: number): number {
  return totalAIProfit * (ratePct / 100);
}

// Calculate how many people a given revenue can fund
export function calculateFunding(revenueBillions: number, costPerPerson: number): number {
  return Math.floor((revenueBillions * 1e9) / costPerPerson);
}

// Format large numbers
export function formatBillions(n: number): string {
  if (Math.abs(n) >= 1000) return `$${(n / 1000).toFixed(1)}T`;
  if (Math.abs(n) >= 1) return `$${n.toFixed(1)}B`;
  return `$${(n * 1000).toFixed(0)}M`;
}

export function formatNumber(n: number): string {
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(0)}K`;
  return n.toLocaleString();
}

export function formatCurrency(n: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n);
}
