import InvalidTaskTitleVOValueError from "../../../error/InvalidTaskTitleVOValueError";

export default class TaskTitleVO {
    static create(value: string): TaskTitleVO {
        if (!value || "string" !== typeof value) {
            throw new InvalidTaskTitleVOValueError(String(value), "Title is required");
        }

        const
            trimmed_value = value.trim();
        ///
        ///
        if (0 === trimmed_value.length) {
            throw new InvalidTaskTitleVOValueError(value, "Title cannot be empty or whitespace");
        }

        if (this.#MAX_LENGTH < trimmed_value.length) {
            throw new InvalidTaskTitleVOValueError(value, `Title cannot exceed ${this.#MAX_LENGTH} characters`);
        }

        return new TaskTitleVO(trimmed_value);
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

    static readonly #MAX_LENGTH = 255;
}