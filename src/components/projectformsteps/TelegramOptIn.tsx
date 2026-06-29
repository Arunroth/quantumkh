import { useEffect, useState } from "react";
import { fetchTelegramLinkStatus } from "../../lib/api/requestProjects.ts";
import { TELEGRAM_BOT_USERNAME } from "../../utils/serviceManageer.ts";

const POLL_INTERVAL_MS = 4000;
const MAX_POLL_ATTEMPTS = 30; // ~2 minutes

export interface TelegramOptInProps {
    requestId: string;
}

export function TelegramOptIn({ requestId }: TelegramOptInProps): React.ReactNode {
    const [linked, setLinked] = useState(false);

    useEffect(() => {
        if (!TELEGRAM_BOT_USERNAME) return;

        let attempts = 0;
        let cancelled = false;

        const interval = setInterval(() => {
            attempts += 1;
            fetchTelegramLinkStatus(requestId)
                .then((result) => {
                    if (cancelled) return;
                    if (result.linked) {
                        setLinked(true);
                        clearInterval(interval);
                    } else if (attempts >= MAX_POLL_ATTEMPTS) {
                        clearInterval(interval);
                    }
                })
                .catch(() => {
                    // Ignore transient errors; keep polling until MAX_POLL_ATTEMPTS.
                });
        }, POLL_INTERVAL_MS);

        return () => {
            cancelled = true;
            clearInterval(interval);
        };
    }, [requestId]);

    if (!TELEGRAM_BOT_USERNAME) return null;

    const deepLink = `https://t.me/${TELEGRAM_BOT_USERNAME}?start=${requestId}`;

    return (
        <div className="my-6 mx-auto w-full max-w-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4 text-center">
            {linked ? (
                <p className="text-sm font-medium text-green-600 dark:text-green-400">
                    ✅ Telegram connected — you'll receive updates about this request there.
                </p>
            ) : (
                <>
                    <p className="text-sm text-gray-700 dark:text-gray-200 mb-3">
                        Get live updates on this request via Telegram.
                    </p>
                    <a
                        href={deepLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block bg-[#229ED9] text-white font-semibold px-4 py-2 rounded-md hover:bg-[#1b85b8] transition duration-300"
                    >
                        Connect Telegram
                    </a>
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        Tap "Start" in the chat to begin receiving updates.
                    </p>
                </>
            )}
        </div>
    );
}
