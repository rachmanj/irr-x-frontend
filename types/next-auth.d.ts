import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      accessToken?: string;
      email?: string | null;
      name?: string | null;
      image?: string | null;
      roles?: string[];
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    roles?: string[];
    accessToken?: string;
  }
}
