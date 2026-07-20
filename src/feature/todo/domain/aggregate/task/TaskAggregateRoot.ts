import TaskIdVO from "./vo/TaskIdVO";
import TaskTitleVO from "./vo/TaskTitleVO";
import TaskCreatedEvent from "../../event/TaskCreatedEvent";
import TaskRemovedEvent from "../../event/TaskRemovedEvent";
import TaskResumedEvent from "../../event/TaskResumedEvent";
import TaskRenamedEvent from "../../event/TaskRenamedEvent";
import TaskFinishedEvent from "../../event/TaskFinishedEvent";
import type Event from "../../../../../foundation/domain/Event";
import TaskNotFinishedError from "../../error/TaskNotFinishedError";
import TaskTitleUnchangedError from "../../error/TaskTitleUnchangedError";
import TaskAlreadyRemovedError from "../../error/TaskAlreadyRemovedError";
import AggregateRoot from "../../../../../foundation/domain/AggregateRoot";
import TaskAlreadyFinishedError from "../../error/TaskAlreadyFinishedError";

/**
 * ES заложен на будущее
 */
export default class TaskAggregateRoot extends AggregateRoot<TaskIdVO> {
    static create(title: string): TaskAggregateRoot {
        return new TaskAggregateRoot(TaskIdVO.create(), TaskTitleVO.create(title), new Date(), true, false, false);
    }

    //---

    static reconstitute(id: string, title: string, created_at: Date, is_removed: boolean, is_finished: boolean): TaskAggregateRoot {
        return new TaskAggregateRoot(TaskIdVO.create(id), TaskTitleVO.create(title), created_at, false, is_removed, is_finished);
    }

    //---

    get title(): TaskTitleVO {
        return this.#title;
    }

    //---

    get created_at(): Date {
        return this.#created_at;
    }

    //---

    get is_removed(): boolean {
        return this.#is_removed;
    }

    //---

    get is_finished(): boolean {
        return this.#is_finished;
    }

    //---

    // может быть множество инвариантов и на каждый своя семантическая ошибка

    resume(): void {
        if (!this.is_finished) {
            throw new TaskNotFinishedError(this.id.value);
        }

        this.apply(
            new TaskResumedEvent(this.id.value)
        );
    }

    //---

    remove(): void {
        if (this.is_removed) {
            throw new TaskAlreadyRemovedError(this.id.value);
        }

        this.apply(
            new TaskRemovedEvent(this.id.value)
        );
    }

    //---

    finish(): void {
        if (this.is_finished) {
            throw new TaskAlreadyFinishedError(this.id.value);
        }

        this.apply(
            new TaskFinishedEvent(this.id.value)
        );
    }

    //---

    rename(title: string): void {
        const
            new_title = TaskTitleVO.create(title);
        ///
        ///
        if (new_title.equals(this.title)) {
            throw new TaskTitleUnchangedError(this.id.value);
        }

        this.apply(
            new TaskRenamedEvent(this.id.value, new_title.value)
        );
    }

    //---

    protected when(event: Event): void {
        switch (true) {
            case event instanceof TaskRenamedEvent:
                this.#title = TaskTitleVO.create(event.title);
                break;

            case event instanceof TaskResumedEvent:
                this.#is_finished = false;
                break;

            case event instanceof TaskRemovedEvent:
                this.#is_removed = true;
                break;

            case event instanceof TaskFinishedEvent:
                this.#is_finished = true;
                break;
        }
    }

    //---

    private constructor(id: TaskIdVO, title: TaskTitleVO, created_at: Date, is_new: boolean, is_removed: boolean, is_finished: boolean) {
        super(id);

        this.#title = title;
        this.#created_at = created_at;
        this.#is_removed = is_removed;
        this.#is_finished = is_finished;

        if (is_new) {
            this.apply(
                new TaskCreatedEvent(id.value, title.value, created_at)
            );
        }
    }

    //---

    #created_at: Date;

    #title: TaskTitleVO;

    #is_removed: boolean;

    #is_finished: boolean;
}