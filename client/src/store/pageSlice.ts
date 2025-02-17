import { StateCreator } from "zustand";

export interface PageSliceType{
    //States
    homePage: boolean,
    uploadPage: boolean,
    modelDescriptionPage: boolean,
    modelViewPage: boolean,

    //Actions
    setHomePage: (val: boolean) => void,
    setUploadPage: (val: boolean) => void,
    setModelDescriptionPage: (val: boolean) => void,
    setModelViewPage: (val: boolean) => void,
}

export const pageSlice: StateCreator<PageSliceType, [], [], PageSliceType> = (set) => ({
    //States
    homePage: false,
    uploadPage: false,
    modelDescriptionPage: false,
    modelViewPage: true,

    //Actions
    setHomePage: (val: boolean) => set(() => ({homePage: val})),
    setUploadPage: (val: boolean) => set(() => ({uploadPage: val})),
    setModelDescriptionPage: (val: boolean) => set(() => ({modelDescriptionPage: val})),
    setModelViewPage: (val: boolean) => set(() => ({modelViewPage: val})),
})

