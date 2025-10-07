import NextAuth from "next-auth";
import { authOptions, authHandlers } from "./option";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };


