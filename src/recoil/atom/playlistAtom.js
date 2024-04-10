import { useChangeBgColor } from "@/lib/themes";
import { atom } from "recoil";

export const currentPlaylistIdState = atom({
    key:"currentPlaylistIdState",
    default:null
});