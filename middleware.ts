import { withAuth } from "next-auth/middleware";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log("token", req.nextauth.token);
  },
  {
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      authorized: ({ token }) => {
        if (token) return true;
        return false;
      },
    },
    pages: {
      signIn: "/login",
      error: '/api/auth/error',
    },
  }
);

export const config = { matcher: ["/", "/dashboard", "/dashboard/:path*"] };