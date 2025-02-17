import { StateCreator } from "zustand";

export interface PageSliceType{
    //States
    homePage: boolean,
    uploadPage: boolean,
    modelViewPage: boolean,

    //Actions
    setHomePage: (val: boolean) => void,
    setUploadPage: (val: boolean) => void,
    setModelViewPage: (val: boolean) => void,
}

export const pageSlice: StateCreator<PageSliceType, [], [], PageSliceType> = (set) => ({
    //States
    homePage: true,
    uploadPage: false,
    modelViewPage: false,

    //Actions
    setHomePage: (val: boolean) => set(() => ({homePage: val})),
    setUploadPage: (val: boolean) => set(() => ({uploadPage: val})),
    setModelViewPage: (val: boolean) => set(() => ({modelViewPage: val})),
})

