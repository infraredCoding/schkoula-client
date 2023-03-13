import { Priority } from "../enums/Priority"

export type Assignment = {
    id: number,
    title: string,
    priority: Priority,
    deadline: string,
    completed: boolean
} 