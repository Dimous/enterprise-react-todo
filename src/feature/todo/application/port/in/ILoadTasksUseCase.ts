import type TaskAggregateRoot from "../../../domain/aggregate/task/TaskAggregateRoot";

export default interface ILoadTasksUseCase {
    execute(): Promise<TaskAggregateRoot[]>,
}