/**
 * событие публикуется только если факт имеет доменное значение (смысл для бизнеса), но в ES любая мутация агрегата -- событие
 */
export default abstract class Event {
    constructor(aggregate_id: string, payload: Record<string, unknown> = {}, occurred_at: Date = new Date()) {
        this.#payload = payload;
        this.#occurred_at = occurred_at;
        this.#aggregate_id = aggregate_id;
    }

    //---

    abstract get type(): string;

    //---

    get payload(): Record<string, unknown> {
        return this.#payload;
    }

    //---

    get occurred_at(): Date {
        return this.#occurred_at;
    }

    //---

    get aggregate_id(): string {
        return this.#aggregate_id;
    }

    //---

    toString(): string {
        return JSON.stringify({ type: this.type, payload: this.payload, aggregate_id: this.aggregate_id, occurred_at: this.occurred_at.toISOString() });
    }

    //---

    readonly #payload: Record<string, unknown>;

    readonly #occurred_at: Date;

    readonly #aggregate_id: string;
}