import Spotify from "next-auth/providers/spotify";
import spotifyApi, { signInURL } from "@/lib/spotify";

// Function to refresh access token
async function refreshAccessToken(token) {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
    console.log("NEW REFRESHED TOKEN: ", refreshedToken.access_token + "\n");

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.error("\nError Refreshing Token: ", error.message + "\n");
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const options = {
  // Configure Spotify provider
  providers: [
    Spotify({
      clientId: process.env.SPOTIFY_ID,
      clientSecret: process.env.SPOTIFY_SECRET,
      authorization: signInURL,
    }),
  ],
  // Configure JWT secret
  secret: process.env.JWT_SECRET,
  callbacks: {
    // Callback to update JWT token
    async jwt({ token, account }) {
      try {
        // if new user sign in for first time
        if (account) {
          console.log("CREATING NEW USER ACCOUNT\n");
          return {
            ...token,
            accessToken: account.access_token,
            refreshToken: account.refresh_token,
            username: account.providerAccountId,
            accessTokenExpires: account.expires_at * 1000,
          };
        }

        // if previous token has not expired
        if (Date.now() < token.accessTokenExpires) {
          console.log(
            "EXISTING TOKEN IS STILL VALID:\n",
            token.accessToken + "\n"
          );
          return token;
        }

        // if previous token has expired
        console.log("EXISTING TOKEN HAS EXPIRED :: REFRESHING TOKEN \n");
        return await refreshAccessToken(token);
        
      } catch (error) {
        console.error("\nError in JWT Callback: ", error.message + "\n");
        return {
          ...token,
          error: "JWTCallbackError",
        };
      }
    },

    // Callback to update user session
    async session({ session, token }) {
      try {
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.username = token.username;
        console.log("A NEW SESSION STARTED \n");
        return session;
      } catch (error) {
        console.error("\nError in Session Callback: ", error.message + "\n");
        return {
          ...session,
          error: "SessionCallbackError",
        };
      }
    },
  },
};
