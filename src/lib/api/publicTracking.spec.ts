import { describe, expect, it, vi } from 'vitest';

import { requestJson } from './http';
import { lookupPublicProjectTracking } from './publicTracking';

vi.mock('./http', () => ({
  requestJson: vi.fn(),
}));

describe('publicTracking API', () => {
  it('posts project and VAT identifiers to the public lookup endpoint', async () => {
    vi.mocked(requestJson).mockResolvedValue({
      projectId: 'PRJ001',
      projectName: 'Laser Jig',
      status: 'IN_PROGRESS',
      clientTrackingStage: 'PACKAGING',
      updates: [],
      stages: [],
    });

    await lookupPublicProjectTracking({
      projectId: 'PRJ001',
      vat: 'K123456789',
    });

    expect(requestJson).toHaveBeenCalledWith(
      '/client-portal/public/project-lookup',
      {
        method: 'POST',
        body: {
          projectId: 'PRJ001',
          vat: 'K123456789',
        },
      },
    );
  });
});
