import Event from "./Event";
import Entity from "./Entity";
import type { TEquatable } from "./TEquatable";

export default abstract class AggregateRoot<TId extends TEquatable<TId>> extends Entity<TId> {
    constructor(id: TId, events: Event[] = [], version: number = 0) {
        super(id);

        /**
         * loadFromHistory()
         */

        this.#version = version; // или лучше events.length? а если снимок?

        for (const event of events) {
            this.when(event);
        }
    }

    //---

    /**
     * в save репозитория: expected_version = aggregate.version - aggregate.events.length (то есть -- исходная версия)
     */
    get version(): number {
        return this.#version;
    }

    //---

    /**
     * getUncommittedEvents()
     */
    get events(): readonly Event[] {
        return [...this.#events];
    }

    //---

    /**
     * markEventsAsCommitted()
     * вызывается в save репозитория после успешной записи
     */
    clearEvents(): void {
        this.#events.length = 0;
    }

    //---

    /**
     * у Вернона такого нет, он сразу публикует в шину (при мутации)
     */
    pullEvents(): readonly Event[] {
        const
            events = this.events;
        ///
        ///
        this.clearEvents();

        return events;
    }

    //---

    protected apply(event: Event): void {
        this.when(event);

        this.#version ++;

        this.#events.push(event);
    }

    //---

    /**
     * switch по type (хотя реконституция должна гидрировать события, instanceof должен работать даже при минификации)
     */
    protected abstract when(event: Event): void;

    //---

    #version: number;

    readonly #events: Event[] = [];
}