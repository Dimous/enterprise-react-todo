import Event from "../../../../foundation/domain/Event";

export default class TaskCreatedEvent extends Event {
    constructor(id: string, title: string, created_at: Date) {
        super(id, { title, created_at });
    }

    //---

    get type(): string {
        return TaskCreatedEvent.TYPE;
    }

    //---

    get title(): string {
        return this.payload.title as string;
    }

    //---

    get created_at(): Date {
        return this.payload.created_at as Date;
    }

    //---

    static readonly TYPE: string = "todo.task_created" as const;
}