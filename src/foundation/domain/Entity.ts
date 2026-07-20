import type { TEquatable } from "./TEquatable";

export default abstract class Entity<TId extends TEquatable<TId>> {
    constructor(id: TId) {
        this.#id = id;
    }
    //---

    get id(): TId {
        return this.#id;
    }

    //---

    equals(that: this): boolean {
        if (this === that) {
            return true;
        }

        if (this.#isEquatable(this.id)) {
            return this.id.equals(that.id);
        }

        if (this.#isEquatable(that.id)) {
            return that.id.equals(this.id);
        }

        return this.id === that.id;
    }

    //---

    #isEquatable(id: TId): id is TId & TEquatable {
        return "object" == typeof id && "equals" in id && "function" == typeof id.equals;
    }

    //---

    readonly #id: TId;
}