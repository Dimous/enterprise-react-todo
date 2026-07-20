import Event from "../../../../foundation/domain/Event";

export default class TaskFinishedEvent extends Event {
    get type(): string {
        return TaskFinishedEvent.TYPE;
    }

    //---

    static readonly TYPE: string = "todo.task_finished" as const;
}