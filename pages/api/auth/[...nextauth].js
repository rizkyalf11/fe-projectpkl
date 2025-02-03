import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const authOptions = {
	providers: [
		// ...add more providers here
		CredentialsProvider({
			type: 'credentials',
			credentials: {},
			authorize(credentials) {
				return {
					...credentials,
				}
			},
		}),
	],

	callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }

      return {
        ...token,
        ...user,
      };
    },
    async session({ session, token }) {
      console.log('hehehe', session)
      console.log('hohoho', token)
      session.user.id = token.id;
      session.user.username = token.username;
      session.user.access_token = token.access_token;

      return session;
    },
  },

	pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/error",
  },
}

export default NextAuth(authOptions)
