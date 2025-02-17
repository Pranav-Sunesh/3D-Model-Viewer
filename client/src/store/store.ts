import { create } from "zustand";
import {pageSlice, PageSliceType} from "./pageSlice";
import { modelSlice, ModelSliceTypes } from "./modelSlice";

const useStore = create<PageSliceType & ModelSliceTypes>((...a) => ({
    ...pageSlice(...a),
    ...modelSlice(...a),
}));

export default useStore