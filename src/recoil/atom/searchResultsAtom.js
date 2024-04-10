import { atom } from "recoil";

export const searchQueryState = atom({
    key:"searchQueryState",
    default:""
})
export const searchResultsTypeState = atom({
    key:"searchResultsTypeState",
    default:"track"
})
    export const searchResultsState = atom({
        key:"searchResultsState",
        default:[]
    });
