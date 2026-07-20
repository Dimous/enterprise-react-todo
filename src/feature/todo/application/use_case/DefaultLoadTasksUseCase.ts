import type ILoadTasksUseCase from "../port/in/ILoadTasksUseCase";
import type ITaskRepository from "../../domain/port/out/ITaskRepository";
import type TaskAggregateRoot from "../../domain/aggregate/task/TaskAggregateRoot";

export default class DefaultLoadTasksUseCase implements ILoadTasksUseCase {
    constructor(private readonly task_repository: ITaskRepository) { }

    //---

    async execute(): Promise<TaskAggregateRoot[]> {
        return this.task_repository.list();
    }
}