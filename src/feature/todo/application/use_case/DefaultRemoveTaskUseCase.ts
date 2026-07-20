import TaskIdVO from "../../domain/aggregate/task/vo/TaskIdVO";
import type IRemoveTaskUseCase from "../port/in/IRemoveTaskUseCase";
import type ITaskRepository from "../../domain/port/out/ITaskRepository";
import type IEventBus from "../../../../shared/application/port/out/IEventBus";

export default class DefaultRemoveTaskUseCase implements IRemoveTaskUseCase {
    constructor(private readonly task_repository: ITaskRepository, private readonly event_bus: IEventBus) { }

    //---

    async execute(id: string): Promise<void> {
        // ES

        const
            task = await this.task_repository.load(TaskIdVO.create(id));
        ///
        ///
        if (task) {
            await this.task_repository.save(task);

            this.event_bus.publish(...task.pullEvents());
        }

        // ADO

        await this.task_repository.remove(TaskIdVO.create(id));
    }
}