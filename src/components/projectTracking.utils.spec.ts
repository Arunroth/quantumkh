import { describe, expect, it } from 'vitest';

import {
  getTrackingStageIconToken,
  formatTrackingIdentifierLine,
  formatTrackingStatusLabel,
  normalizeTrackingLookupInput,
} from './projectTracking.utils';

describe('normalizeTrackingLookupInput', () => {
  it('accepts separate tracking code and VAT inputs', () => {
    expect(
      normalizeTrackingLookupInput({
        trackingCode: 'prj-a1b2c3d4',
        vat: 'k123456789',
      }),
    ).toEqual({
      referenceNo: 'PRJ-A1B2C3D4',
      vat: 'K123456789',
    });
  });

  it('allows a blank VAT for individual customers', () => {
    expect(
      normalizeTrackingLookupInput({
        trackingCode: 'prj-a1b2c3d4',
        vat: '',
      }),
    ).toEqual({
      referenceNo: 'PRJ-A1B2C3D4',
      vat: '',
    });
  });

  it('supports the legacy combined input format when VAT is blank', () => {
    expect(
      normalizeTrackingLookupInput({
        trackingCode: 'PRJ-A1B2C3D4, K123456789',
        vat: '',
      }),
    ).toEqual({
      referenceNo: 'PRJ-A1B2C3D4',
      vat: 'K123456789',
    });
  });

  it('accepts numeric project or quote reference numbers', () => {
    expect(
      normalizeTrackingLookupInput({
        trackingCode: '260001',
        vat: 'k123456789',
      }),
    ).toEqual({
      referenceNo: '260001',
      vat: 'K123456789',
    });
  });
});

describe('tracking labels', () => {
  it('assigns icon tokens based on stage title keywords', () => {
    expect(getTrackingStageIconToken('Order confirmed')).toBe('confirm');
    expect(getTrackingStageIconToken('CAM programming')).toBe('design');
    expect(getTrackingStageIconToken('Quality inspection')).toBe('approval');
    expect(getTrackingStageIconToken('CNC machining')).toBe('process');
    expect(getTrackingStageIconToken('Packaging')).toBe('packaging');
    expect(getTrackingStageIconToken('Out for delivery')).toBe('delivery');
    expect(getTrackingStageIconToken('Arrived at warehouse')).toBe('arrived');
    expect(getTrackingStageIconToken('Completed')).toBe('completed');
    expect(getTrackingStageIconToken('Something else')).toBe('default');
  });

  it('formats reference number and VAT for display together', () => {
    expect(formatTrackingIdentifierLine('PRJ-A1B2C3D4', 'K123456789')).toBe(
      'PRJ-A1B2C3D4 · VAT K123456789',
    );
    expect(formatTrackingIdentifierLine('PRJ-A1B2C3D4', '')).toBe('PRJ-A1B2C3D4');
  });

  it('formats backend project-request statuses for display', () => {
    expect(formatTrackingStatusLabel('in-progress')).toBe('In Progress');
    expect(formatTrackingStatusLabel('completed')).toBe('Completed');
    expect(formatTrackingStatusLabel('new')).toBe('New');
  });
});
