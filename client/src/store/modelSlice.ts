import { StateCreator } from "zustand"
import { ModelType } from "../types"


export interface ModelSliceTypes{
    //States
    file: File | null,
    name: string,
    meshName: string ,
    xAxis: number ,
    yAxis: number ,
    zAxis: number ,
    vertexCount: number,
    surfaceArea: number,

    modelUrl: string,
    models: ModelType[] 


    //Actions
    setFile: (file: File | null) => void,
    setName: (name: string) => void
    setMeshName: (mesh: string) => void,
    setXAxis: (val: number) => void,
    setYAxis: (val: number) => void,
    setZAxis: (val: number) => void,
    setVertexCount: (count: number) => void,
    setSurfaceArea: (area: number) => void,
    setModelUrl: (url: string) => void,
    setModels: (models: ModelType[]) => void
}

export const modelSlice :StateCreator<ModelSliceTypes, [], [], ModelSliceTypes> = (set) => ({
    //States
    file: null,
    name: "",
    meshName: "",
    xAxis: 0,
    yAxis: 0,
    zAxis: 0, 
    vertexCount: 0,
    surfaceArea: 0,
    modelUrl: "",
    models: [],
    
    //Actions
    setFile: (file: File| null) => set(() => ({file: file})),
    setName: (name: string) => set(() => ({name: name})),
    setMeshName: (name: string) => set(() => ({meshName: name})),
    setXAxis: (val: number) => set(() => ({xAxis: val})),
    setYAxis: (val: number) => set(() => ({yAxis: val})),
    setZAxis: (val: number) => set(() => ({zAxis: val})),
    setVertexCount: (count: number) => set(() => ({vertexCount: count})),
    setSurfaceArea: (area: number) => set(() => ({surfaceArea: area})),
    setModelUrl: (url: string) => set(() => ({modelUrl: url})),
    setModels: (models: ModelType[]) => set(() => ({models: models}))
})
