import { describe, expect, it, vi } from 'vitest';

import { requestJson } from './http';
import {
  exchangeClientPortalReviewLink,
  getClientPortalSession,
  listClientPortalProjects,
  loginClientPortal,
  logoutClientPortal,
} from './clientPortal';

vi.mock('./http', () => ({
  requestJson: vi.fn(),
}));

describe('clientPortal API', () => {
  it('logs clients in against the cookie-backed portal auth endpoint', async () => {
    vi.mocked(requestJson).mockResolvedValue({
      user: { sub: 'portal-user-1' },
    });

    await loginClientPortal({
      email: 'buyer@example.com',
      password: 'secret',
    });

    expect(requestJson).toHaveBeenCalledWith('/client-portal/auth/login', {
      method: 'POST',
      body: {
        email: 'buyer@example.com',
        password: 'secret',
      },
    });
  });

  it('fetches the current client-portal session with cookies included', async () => {
    vi.mocked(requestJson).mockResolvedValue({
      user: { sub: 'portal-user-1' },
    });

    await getClientPortalSession();

    expect(requestJson).toHaveBeenCalledWith('/client-portal/auth/me', {
      method: 'GET',
    });
  });

  it('exchanges quote review links for a portal session', async () => {
    vi.mocked(requestJson).mockResolvedValue({
      user: { sub: 'portal-user-1' },
    });

    await exchangeClientPortalReviewLink('review-token');

    expect(requestJson).toHaveBeenCalledWith(
      '/client-portal/auth/review-link/exchange',
      {
        method: 'POST',
        body: { token: 'review-token' },
      },
    );
  });

  it('lists the authenticated client projects', async () => {
    vi.mocked(requestJson).mockResolvedValue([]);

    await listClientPortalProjects();

    expect(requestJson).toHaveBeenCalledWith('/client-portal/projects/me', {
      method: 'GET',
    });
  });

  it('logs clients out through the portal session endpoint', async () => {
    vi.mocked(requestJson).mockResolvedValue({ ok: true });

    await logoutClientPortal();

    expect(requestJson).toHaveBeenCalledWith('/client-portal/auth/logout', {
      method: 'POST',
    });
  });
});
