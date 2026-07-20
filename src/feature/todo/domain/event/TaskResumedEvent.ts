import Event from "../../../../foundation/domain/Event";

export default class TaskResumedEvent extends Event {
    get type(): string {
        return TaskResumedEvent.TYPE;
    }

    //---

    static readonly TYPE: string = "todo.task_resumed" as const;
}