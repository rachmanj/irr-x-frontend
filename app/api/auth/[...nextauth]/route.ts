import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Define types for the token and session
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      roles: string[];
      accessToken: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    roles: string[];
    accessToken: string;
  }
}

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        login: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(credentials),
            }
          );

          const data = await res.json();
          console.log("Login response:", data);

          if (res.ok && data.user) {
            // Store roles in localStorage
            if (typeof window !== "undefined") {
              localStorage.setItem("user_roles", JSON.stringify(data.roles));
            }

            // Return user data with roles
            return {
              id: data.user.id.toString(),
              name: data.user.name,
              email: data.user.email,
              roles: data.roles,
              accessToken: data.access_token,
            };
          }
          throw new Error(data.message || "Invalid credentials");
        } catch (error: any) {
          throw new Error(error.message || "Invalid credentials");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, trigger }) {
      console.log("JWT Callback - Input:", { token, user, trigger });

      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.roles = user.roles as string[];
        token.accessToken = user.accessToken as string;
      }

      console.log("JWT Callback - Output:", token);
      return token;
    },
    async session({ session, token }) {
      console.log("Session Callback - Input:", { session, token });

      // Create a completely new session object
      const updatedSession = {
        ...session,
        user: {
          id: token.id as string,
          name: token.name as string,
          email: token.email as string,
          roles: token.roles as string[],
          accessToken: token.accessToken as string,
        },
        expires: session.expires,
      };

      console.log("Session Callback - Output:", updatedSession);
      return updatedSession;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: true, // Enable debugging
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
