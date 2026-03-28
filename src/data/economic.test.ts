import { describe, it, expect } from 'vitest';
import {
  aiCompanies,
  totalAIRevenue,
  totalAIProfit,
  totalJobsDisplaced,
  calculateTaxRevenue,
  calculateFunding,
  formatBillions,
  formatNumber,
  formatCurrency,
  taxModels,
  stateImpacts,
  fundingTargets,
} from './economic';

describe('Economic Data', () => {
  it('should have 8 AI companies', () => {
    expect(aiCompanies).toHaveLength(8);
  });

  it('should calculate total AI revenue correctly', () => {
    const manual = aiCompanies.reduce((sum, c) => sum + c.aiRevenue2025, 0);
    expect(totalAIRevenue).toBeCloseTo(manual, 1);
  });

  it('should calculate total AI profit correctly', () => {
    const manual = aiCompanies.reduce((sum, c) => sum + c.aiProfit2025, 0);
    expect(totalAIProfit).toBeCloseTo(manual, 1);
  });

  it('should calculate total jobs displaced correctly', () => {
    const manual = aiCompanies.reduce((sum, c) => sum + c.jobsDisplaced, 0);
    expect(totalJobsDisplaced).toBe(manual);
  });

  it('each company should have required fields', () => {
    for (const company of aiCompanies) {
      expect(company.name).toBeTruthy();
      expect(company.ticker).toBeTruthy();
      expect(typeof company.aiRevenue2025).toBe('number');
      expect(typeof company.aiProfit2025).toBe('number');
      expect(typeof company.employees).toBe('number');
      expect(typeof company.jobsDisplaced).toBe('number');
    }
  });
});

describe('Tax Calculations', () => {
  it('should calculate tax revenue for 5%', () => {
    const revenue = calculateTaxRevenue(5);
    expect(revenue).toBeCloseTo(totalAIProfit * 0.05, 1);
  });

  it('should calculate tax revenue for 25%', () => {
    const revenue = calculateTaxRevenue(25);
    expect(revenue).toBeCloseTo(totalAIProfit * 0.25, 1);
  });

  it('should calculate funding correctly', () => {
    const people = calculateFunding(10, 12000); // $10B, $12K per person
    expect(people).toBe(Math.floor(10e9 / 12000));
  });

  it('should have 4 tax models', () => {
    expect(taxModels).toHaveLength(4);
    for (const model of taxModels) {
      expect(model.pros.length).toBeGreaterThan(0);
      expect(model.cons.length).toBeGreaterThan(0);
    }
  });
});

describe('State Impacts', () => {
  it('should have 20 states', () => {
    expect(stateImpacts).toHaveLength(20);
  });

  it('each state should have valid severity', () => {
    const validSeverities = ['low', 'medium', 'high', 'critical'];
    for (const state of stateImpacts) {
      expect(validSeverities).toContain(state.severity);
    }
  });
});

describe('Formatting Functions', () => {
  it('formatBillions should format correctly', () => {
    expect(formatBillions(130.5)).toBe('$130.5B');
    expect(formatBillions(0.5)).toBe('$500M');
    expect(formatBillions(1500)).toBe('$1.5T');
  });

  it('formatNumber should format correctly', () => {
    expect(formatNumber(1500000)).toBe('1.5M');
    expect(formatNumber(245000)).toBe('245K');
    expect(formatNumber(500)).toBe('500');
  });

  it('formatCurrency should format correctly', () => {
    expect(formatCurrency(87000)).toContain('87,000');
  });
});

describe('Funding Targets', () => {
  it('should have 5 funding targets', () => {
    expect(fundingTargets).toHaveLength(5);
  });

  it('each target should have cost per person > 0', () => {
    for (const target of fundingTargets) {
      expect(target.costPerPerson).toBeGreaterThan(0);
    }
  });
});
