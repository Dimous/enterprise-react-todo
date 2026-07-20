import TaskMapper from "../mapper/TaskMapper";
import type { TTaskDTO } from "../data_source/dto/TTaskDTO";
import type TaskIdVO from "../../../../domain/aggregate/task/vo/TaskIdVO";
import type ITaskRepository from "../../../../domain/port/out/ITaskRepository";
import type TaskAggregateRoot from "../../../../domain/aggregate/task/TaskAggregateRoot";
import type ILocalDataSource from "../../../../../../shared/application/port/out/ILocalDataSource";

export default class DefaultTaskRepository implements ITaskRepository {
    constructor(private readonly local_data_source: ILocalDataSource) { }

    //---

    // ADO

    async remove(id: TaskIdVO): Promise<void> {
        return this.local_data_source.delete(id.value);
    }

    //---

    async list(): Promise<TaskAggregateRoot[]> {
        const
            all = await this.local_data_source.getAll();
        ///
        ///
        return all.map(dto => TaskMapper.toEntity(dto as TTaskDTO));
    }

    //---

    // ES

    async save(entity: TaskAggregateRoot): Promise<void> {
        return this.local_data_source.put(TaskMapper.toDTO(entity));
    }

    //---

    async load(id: TaskIdVO): Promise<TaskAggregateRoot | undefined> {
        const
            dto = await this.local_data_source.get(id.value);
        ///
        ///
        return dto ? TaskMapper.toEntity(dto as TTaskDTO) : dto;
    }
}