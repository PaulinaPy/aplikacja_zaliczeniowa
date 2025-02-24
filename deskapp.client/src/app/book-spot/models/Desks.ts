import { Group } from "fabric/*"

export interface Desk {
    id?: string,
    left: number,
    top: number,
    label: string | null,
    isAvailable?: boolean
}

export interface DeskObject extends Group {
    id?: string
}