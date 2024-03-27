import { withAuth } from "next-auth/middleware";
import spotifyApi from "./lib/spotify";

export default withAuth({
  callbacks: {
    authorized: ({ req }) => {
      // verify token and return a boolean
      const sessionToken = req.cookies.get("next-auth.session-token");
      const token = spotifyApi.getAccessToken();
      if (sessionToken && token ) {
        console.log("Session token Middleware : ", sessionToken);
        console.log("token Middleware : ", token);
        return true ;
      }
      else return false;
    },
  },
});

export const config = { matcher: ["/albums/:path*","/artists/:path*"] };