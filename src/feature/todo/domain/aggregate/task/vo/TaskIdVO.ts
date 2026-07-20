import InvalidTaskIdVOValueError from "../../../error/InvalidTaskIdVOValueError";

export default class TaskIdVO {
    static create(value: string = crypto.randomUUID()): TaskIdVO {
        if (!this.#value_pattern.test(value)) {
            throw new InvalidTaskIdVOValueError(value);
        }

        return new TaskIdVO(value);
    }

    //---

    get value(): string {
        return this.#value;
    }

    //---

    equals(that: this): boolean {
        return this.value === that.value;
    }

    //---

    valueOf(): string {
        return this.value;
    }

    //---

    toString(): string {
        return this.value;
    }

    //---

    private constructor(value: string) {
        this.#value = value;
    }

    //---

    readonly #value: string;

    //---

    static readonly #value_pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
}