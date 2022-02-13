// This file handles the authentication state.

import { Session as KratosSession } from "@ory/kratos-client";
import AsyncStore from "@react-native-community/async-storage";

// The key under which the session is being stored
const userSessionName = "user_session";

// The session type
export type SessionContext = {
  session_token: string;
  session: KratosSession;
} | null;

export const getAuthenticatedSession = (): Promise<SessionContext> => {
  const parse = (sessionRaw: string | null): SessionContext => {
    if (!sessionRaw) {
      return null;
    }
    return JSON.parse(sessionRaw);
  };

  const p = AsyncStore.getItem(userSessionName);
  return p.then(parse);
};

// Sets the session.
export const setAuthenticatedSession = (
  session: SessionContext
): Promise<void> => {
  if (!session) {
    return killAuthenticatedSession();
  }
  return AsyncStore.setItem(userSessionName, JSON.stringify(session));
};

// Removes the session from the store.
export const killAuthenticatedSession = (): Promise<void> => {
  return AsyncStore.removeItem(userSessionName);
};
