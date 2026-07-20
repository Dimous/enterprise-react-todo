import type { TTaskDTO } from "../data_source/dto/TTaskDTO";
import TaskAggregateRoot from "../../../../domain/aggregate/task/TaskAggregateRoot";

export default class TaskMapper {
    static toDTO(entity: TaskAggregateRoot): TTaskDTO {
        return {
            id: entity.id.value,
            title: entity.title.value,
            created_at: entity.created_at,
            is_removed: entity.is_removed,
            is_finished: entity.is_finished,
        };
    }

    //---

    static toEntity(dto: TTaskDTO): TaskAggregateRoot {
        return TaskAggregateRoot.reconstitute(dto.id, dto.title, dto.created_at, dto.is_removed, dto.is_finished);
    }
}