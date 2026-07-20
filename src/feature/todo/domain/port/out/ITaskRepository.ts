import type TaskIdVO from "../../aggregate/task/vo/TaskIdVO";
import type TaskAggregateRoot from "../../aggregate/task/TaskAggregateRoot";

export default interface ITaskRepository {
    // ADO

    remove(id: TaskIdVO): Promise<void>,

    list(): Promise<TaskAggregateRoot[]>,

    // ES

    save(entity: TaskAggregateRoot): Promise<void>, // апсёрт

    load(id: TaskIdVO): Promise<TaskAggregateRoot | undefined>,
}