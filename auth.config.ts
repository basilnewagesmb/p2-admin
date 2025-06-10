/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextAuthConfig, type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialProvider from "next-auth/providers/credentials";
import { refreshAccessToken } from "./auth";
import { API } from "./lib/fetch";

type ExtendedUser = DefaultSession["user"] & {
  role?: "Admin" | "User";
  uid?: string;
  id?: string;
  active?: boolean;
  avatar?: string;
  accessToken: string;
  refreshToken: string;
  sessionId: string;
  tokenExpiry: string;
  user_type: string;
  phone: number;
};

declare module "next-auth/jwt" {
  interface JWT {
    user: ExtendedUser;
  }
}

declare module "next-auth" {
  export interface Session {
    user: ExtendedUser;
  }

  interface User {
    role?: "Admin" | "User";
    uid?: string;
    id?: string;
    avatar?: string;
    active?: boolean;
    accessToken: string;
    refreshToken: string;
    sessionId: string;
    user_type: string;
    tokenExpiry: string;
    phone: number;
  }
}

export const authOptions = {
  trustHost: true,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
  secret: "sdfdsfsdf",
  debug: process.env.NEXT_AUTH_DEBUG === "Y",
  callbacks: {
    async session({ token, session, user, newSession }) {
      return { ...session, user: token.user };
    },
    async jwt({ token, user, account, profile, session, trigger }) {
      if (user) {
        return {
          ...token,
          user,
        };
      }
      if (trigger === "update") {
        token.user.user_type = session?.user_type;
        if (session?.name) token.user.name = session?.name;
        if (session?.email) token.user.email = session?.email;
        if (session?.phone) token.user.phone = session?.phone;
        if (session?.avatar) token.user.avatar = session?.avatar;
      }
      if (new Date() < new Date(token?.user?.tokenExpiry)) {
        return token;
      }
      const refreshedToken = await refreshAccessToken(token);

      if (refreshedToken.error) {
        console.error("Token refresh failed, forcing logout...");
        return null;
      }

      return refreshedToken;
    },
  },
  providers: [
    CredentialProvider({
      async authorize(credentials) {
        const { data, error } = await API.Post("auth/local", {
          ...credentials,
          info: { type: "User" },
        });
        if (error) return null;

        return {
          ...data.user,
          accessToken: data.token,
          refreshToken: data.refresh_token,
          sessionId: data.session_id,
          tokenExpiry: data.token_expiry,
        };
      },
    }),
  ],
} satisfies NextAuthConfig;
