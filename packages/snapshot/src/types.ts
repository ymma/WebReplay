import { VNode } from '@WebReplay/virtual-dom'

export enum SnapshotType {
    'WINDOW' = 'WINDOW',
    'DOM' = 'DOM',
    'MOUSE' = 'MOUSE',
    'DOM_UPDATE' = 'DOM_UPDATE',
    'FORM_EL_UPDATE' = 'FORM_EL_UPDATE'
}

export enum FormElementEvent {
    'ATTR' = 'ATTR',
    'INPUT' = 'INPUT',
    'CHANGE' = 'CHANGE',
    'FOCUS' = 'FOCUS',
    'BLUR' = 'BLUR'
}
export enum MouseEventType {
    'MOVE' = 'MOVE',
    'CLICK' = 'click'
}

export interface WindowSnapshot {
    type: SnapshotType.WINDOW
    data: WindowSnapshotData
    time: string
}
export interface WindowSnapshotData {
    width: number
    height: number
    href: string
}

export interface DOMSnapshot {
    type: SnapshotType.DOM
    data: DOMSnapshotData
    time: string
}

export interface DOMSnapshotData {
    vNode: VNode
}
export interface MouseSnapshot {
    type: SnapshotType.MOUSE
    data: MouseSnapshotData
    time: string
}
export interface MouseSnapshotData {
    type: MouseEventType
    x: number
    y: number
    id?: number
}
export interface DOMObserve {
    type: SnapshotType.DOM_UPDATE
    data: DOMObserveData
    time: string
}
export interface DOMObserveData {
    mutations: DOMObserveMutations[]
}
export interface DOMObserveMutations {
    mType: 'attributes' | 'characterData' | 'childList'
    data: ChildListUpdateData | CharacterDataUpdateData | AttributesUpdateData
}

export interface AttributesUpdateData {
    nodeId: number
    value: string
    attr: string
}

export interface CharacterDataUpdateData {
    parentId: number
    value: string
}

export interface ChildListUpdateData {
    type: ChildListUpdateDataType
    parentId: number
    nodeId: number
    pos: number
    value?: string
    vNode: VNode
}
export enum ChildListUpdateDataType {
    'ADD' = 'ADD',
    'DELETE' = 'DELETE',
    'MOVE' = 'MOVE'
}

export interface FormElementObserve {
    type: SnapshotType.FORM_EL_UPDATE
    data: FormElementObserveData
    time: string
}

export interface FormElementObserveData {
    type: FormElementEvent
    id: number
    key?: string
    value?: string
}

export type SnapshotEvent<T> = (e: T) => void

export type SnapshotData = FormElementObserve | DOMObserve | MouseSnapshot | DOMSnapshot | WindowSnapshot
