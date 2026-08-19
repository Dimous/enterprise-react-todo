import TaskIdVO from "../../domain/aggregate/task/vo/TaskIdVO";
import type ITaskRepository from "../port/out/ITaskRepository";
import type IRemoveTaskUseCase from "../port/in/IRemoveTaskUseCase";
import type IEventBus from "../../../../foundation/messaging/IEventBus";

export default class DefaultRemoveTaskUseCase implements IRemoveTaskUseCase {
    constructor(private readonly task_repository: ITaskRepository, private readonly event_bus: IEventBus) { }

    //---

    async execute(id: string): Promise<void> {
        // ES

        const
            task_id = TaskIdVO.create(id),
            task = await this.task_repository.load(task_id);
        ///
        ///
        if (task) {
            task.remove();

            await this.task_repository.save(task);

            this.event_bus.publish(...task.pullEvents());
        }

        // ADO

        await this.task_repository.remove(task_id);
    }
}