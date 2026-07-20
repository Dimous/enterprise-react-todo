import type { TIdentifiableDTO } from "../../../../../../../shared/infrastructure/adapter/out/data_source/TIdentifiableDTO";

export type TTaskDTO = TIdentifiableDTO & {
    title: string,
    created_at: Date,
    is_removed: boolean,
    is_finished: boolean,
}