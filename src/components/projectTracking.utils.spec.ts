import { describe, expect, it } from 'vitest';

import {
  getTrackingStageIconToken,
  formatTrackingStageLabel,
  formatTrackingIdentifierLine,
  formatTrackingStatusLabel,
  normalizeTrackingLookupInput,
} from './projectTracking.utils';

describe('normalizeTrackingLookupInput', () => {
  it('accepts separate tracking code and VAT inputs', () => {
    expect(
      normalizeTrackingLookupInput({
        trackingCode: 'prj-123e4567e89b',
        vat: 'k123456789',
      }),
    ).toEqual({
      projectId: 'PRJ-123E4567E89B',
      vat: 'K123456789',
    });
  });

  it('supports the legacy combined input format when VAT is blank', () => {
    expect(
      normalizeTrackingLookupInput({
        trackingCode: 'PRJ-123E4567E89B, K123456789',
        vat: '',
      }),
    ).toEqual({
      projectId: 'PRJ-123E4567E89B',
      vat: 'K123456789',
    });
  });
});

describe('tracking labels', () => {
  it('assigns distinct icon tokens to the main tracking stages', () => {
    expect(getTrackingStageIconToken('CONFIRM')).toBe('confirm');
    expect(getTrackingStageIconToken('DESIGN_CONFIRM')).toBe('design');
    expect(getTrackingStageIconToken('MATERIAL_APPROVAL')).toBe('approval');
    expect(getTrackingStageIconToken('CUSTOM_PROCESS')).toBe('process');
    expect(getTrackingStageIconToken('PACKAGING')).toBe('packaging');
    expect(getTrackingStageIconToken('OUT_FOR_DELIVERY')).toBe('delivery');
    expect(getTrackingStageIconToken('ARRIVED')).toBe('arrived');
    expect(getTrackingStageIconToken('COMPLETED')).toBe('completed');
    expect(getTrackingStageIconToken('UNKNOWN_STAGE')).toBe('default');
    expect(getTrackingStageIconToken('CNC machining')).toBe('process');
    expect(getTrackingStageIconToken('Shipped / delivered')).toBe('delivery');
  });

  it('formats tracking code and VAT for display together', () => {
    expect(formatTrackingIdentifierLine('PRJ-123E4567E89B', 'K123456789')).toBe(
      'PRJ-123E4567E89B · VAT K123456789',
    );
    expect(formatTrackingIdentifierLine('PRJ-123E4567E89B', '')).toBe('PRJ-123E4567E89B');
  });

  it('formats backend tracking statuses for display', () => {
    expect(formatTrackingStatusLabel('IN_PROGRESS')).toBe('In Progress');
    expect(formatTrackingStatusLabel('completed')).toBe('Completed');
  });

  it('formats backend tracking stages for display', () => {
    expect(formatTrackingStageLabel('OUT_FOR_DELIVERY')).toBe('Out For Delivery');
  });
});
