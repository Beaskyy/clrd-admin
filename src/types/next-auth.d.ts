declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string;
      // Add other user properties as needed
    };
    accessToken?: string;
  }

  interface User {
    id: string;
    email: string;
    name?: string;
    accessToken?: string;
    user: {
      id: string;
      email: string;
      name?: string;
      // Add other user properties as needed
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    user?: {
      id: string;
      email: string;
      name?: string;
      // Add other user properties as needed
    };
  }
}
