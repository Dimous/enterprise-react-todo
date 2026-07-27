import TaskIdVO from "../../domain/aggregate/task/vo/TaskIdVO";
import type ITaskRepository from "../port/out/ITaskRepository";
import type IRenameTaskUseCase from "../port/in/IRenameTaskUseCase";
import type IEventBus from "../../../../foundation/messaging/IEventBus";

export default class DefaultRenameTaskUseCase implements IRenameTaskUseCase {
    constructor(private readonly task_repository: ITaskRepository, private readonly event_bus: IEventBus) { }

    //---

    async execute(id: string, title: string): Promise<void> {
        const
            task = await this.task_repository.load(TaskIdVO.create(id));
        ///
        ///
        if (task) {
            task.rename(title);

            await this.task_repository.save(task);

            this.event_bus.publish(...task.pullEvents());
        }
    }
}