import type { TTaskDTO } from "../dto/TTaskDTO"

export type TTaskState = {
    task: TTaskDTO,
    is_renaming: boolean,
}