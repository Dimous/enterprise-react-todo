import TaskIdVO from "../../domain/aggregate/task/vo/TaskIdVO";
import type IToggleTaskUseCase from "../port/in/IToggleTaskUseCase";
import type ITaskRepository from "../../domain/port/out/ITaskRepository";
import type IEventBus from "../../../../shared/application/port/out/IEventBus";

export default class DefaultToggleTaskUseCase implements IToggleTaskUseCase {
    constructor(private readonly task_repository: ITaskRepository, private readonly event_bus: IEventBus) { }

    //---

    async execute(id: string): Promise<void> {
        const
            task = await this.task_repository.load(TaskIdVO.create(id));
        ///
        ///
        if (task) {
            if (task.is_finished) {
                task.resume();
            } else {
                task.finish();
            }

            await this.task_repository.save(task);

            this.event_bus.publish(...task.pullEvents());
        }
    }
}