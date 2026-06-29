import { describe, expect, it, vi } from 'vitest';

import { requestJson } from './http';
import { lookupPublicProjectTracking } from './publicTracking';

vi.mock('./http', () => ({
  requestJson: vi.fn(),
}));

describe('publicTracking API', () => {
  it('looks up a project by reference number and VAT', async () => {
    vi.mocked(requestJson).mockResolvedValue({
      referenceNo: 'PRJ-A1B2C3D4',
      projectName: 'Laser Jig',
      status: 'in-progress',
      createdAt: '2026-03-17T00:00:00.000Z',
      stages: [],
    });

    await lookupPublicProjectTracking({
      referenceNo: 'PRJ-A1B2C3D4',
      vat: 'K123456789',
    });

    expect(requestJson).toHaveBeenCalledWith(
      '/api/v1/project-requests/track?reference_no=PRJ-A1B2C3D4&vat=K123456789',
    );
  });

  it('looks up a project without a VAT (individual customers)', async () => {
    vi.mocked(requestJson).mockResolvedValue({
      referenceNo: 'PRJ-A1B2C3D4',
      projectName: 'Laser Jig',
      status: 'new',
      createdAt: '2026-03-17T00:00:00.000Z',
      stages: [],
    });

    await lookupPublicProjectTracking({
      referenceNo: 'PRJ-A1B2C3D4',
      vat: '',
    });

    expect(requestJson).toHaveBeenCalledWith(
      '/api/v1/project-requests/track?reference_no=PRJ-A1B2C3D4&vat=',
    );
  });
});
