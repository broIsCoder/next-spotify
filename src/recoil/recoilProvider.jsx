"use client"
import useSpotify from "@/hooks/useSpotify";
import { RecoilRoot } from "recoil"

const recoilProvider = ({ children }) => {
  // setting token for spotify can be access throughout the app
  const spotifyApi = useSpotify();
  return (
    <RecoilRoot>{children}</RecoilRoot>
  )
}

export default recoilProvider;