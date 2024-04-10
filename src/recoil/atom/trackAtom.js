import { atom } from "recoil";

export const currentTrackIdState = atom({
  key: "currentTrackIdState",
  default: null,
});

export const currentTrackTypeState = atom({
  key: "currentTrackTypeState",
  default: null,
});

export const isCurrentTrackPlayingState = atom({
  key: "isCurrentTrackPlayingState",
  default: false,
});
