import React, { createContext, ReactNode, useEffect, useState } from "react";
import {
  getAuthenticatedSession,
  killAuthenticatedSession,
  SessionContext,
  setAuthenticatedSession
} from "../helpers/auth";
import { AxiosError } from "axios";
import { newKratosSdk } from "../helpers/sdk";
import { Session } from "@ory/kratos-client";
import { ApplicationConstant } from "../../../constant/message";

interface Context {
  session?: Session;
  sessionToken?: string;
  setSession: (session: SessionContext) => void;
  syncSession: () => Promise<void>;
  didFetch: boolean;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<Context>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setSession: () => {},
  syncSession: () => Promise.resolve(),
  didFetch: false,
  isAuthenticated: false
});

interface AuthContextProps {
  children: ReactNode;
}
// eslint-disable-next-line react/display-name
export default ({ children }: AuthContextProps): JSX.Element => {
  const project = ApplicationConstant.PLAY_GROUND;
  const [ sessionContext, setSessionContext ] = useState<
  SessionContext | undefined
  >(undefined);

  useEffect(() => {
    getAuthenticatedSession().then(syncSession);
  }, []);

  const syncSession = (auth: SessionContext): Promise<void> => {
    if (!auth) {
      return setAuth(null);
    }
    return newKratosSdk(project)
      .toSession(auth.session_token)
      .then(({ data: session }) => {
        setSessionContext({ session, session_token: auth.session_token });
        return Promise.resolve();
      })
      .catch((err: AxiosError) => {
        if (err.response?.status !== 401) {
          // console.error(err);
        }
        setSessionContext(null);
      });
  };

  const setAuth = (session: SessionContext): Promise<void> => {
    if (!session) {
      return killAuthenticatedSession().then(() => setSessionContext(session));
    }

    setAuthenticatedSession(session).then(() => syncSession(session));
  };

  if (sessionContext === undefined) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        session: sessionContext?.session,
        sessionToken: sessionContext?.session_token,
        isAuthenticated: Boolean(sessionContext?.session_token),
        syncSession: () => getAuthenticatedSession().then(syncSession),
        setSession: setAuth,
        didFetch: true
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
