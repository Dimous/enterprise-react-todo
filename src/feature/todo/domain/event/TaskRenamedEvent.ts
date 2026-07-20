import Event from "../../../../foundation/domain/Event";

export default class TaskRenamedEvent extends Event {
    constructor(id: string, title: string) {
        super(id, { title });
    }

    //---

    get type(): string {
        return TaskRenamedEvent.TYPE;
    }

    //---

    get title(): string {
        return this.payload.title as string;
    }

    //---

    static readonly TYPE: string = "todo.task_renamed" as const;
}