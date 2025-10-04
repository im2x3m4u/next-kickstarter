import { providers } from "./handlers/providers.";
import { callbacks } from "./handlers/callbacks";
import * as events from "./handlers/events";
import { sessionUpdate } from "./handlers/sessionUpdate";

export const authHandlers = {
  handlers: { providers, callbacks },
  signIn: events.signIn,
  signOut: events.signOut,
  sessionUpdate,
};

// Untuk NextAuth
export const authOptions = {
  providers,
  session: { strategy: "jwt" as const },
  callbacks,
  events: {
    signIn: events.signIn,
    signOut: events.signOut,
  },
};
