import type { TTaskDTO } from "../dto/TTaskDTO";

export type TTodoListState = {
    is_loading: boolean,
    tasks: Record<string, TTaskDTO>,
}