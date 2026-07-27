import type ITaskRepository from "../port/out/ITaskRepository";
import type ICreateTaskUseCase from "../port/in/ICreateTaskUseCase";
import type IEventBus from "../../../../foundation/messaging/IEventBus";
import TaskAggregateRoot from "../../domain/aggregate/task/TaskAggregateRoot";

export default class DefaultCreateTaskUseCase implements ICreateTaskUseCase {
    constructor(private readonly task_repository: ITaskRepository, private readonly event_bus: IEventBus) { }

    //---

    async execute(title: string): Promise<void> {
        const
            task = TaskAggregateRoot.create(title);
        ///
        ///
        await this.task_repository.save(task);

        this.event_bus.publish(...task.pullEvents());
    }
}