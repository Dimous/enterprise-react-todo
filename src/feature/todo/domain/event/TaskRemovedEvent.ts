import Event from "../../../../foundation/domain/Event";

export default class TaskRemovedEvent extends Event {
    get type(): string {
        return TaskRemovedEvent.TYPE;
    }

    //---

    static readonly TYPE: string = "todo.task_removed" as const;
}