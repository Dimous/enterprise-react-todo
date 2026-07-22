import type { THandler } from "./THandler";
import Event from "../../../../../foundation/domain/Event";
import type IEventBus from "../../../../application/port/out/IEventBus";

export default class InMemoryEventBus implements IEventBus {
    publish(...events: Event[]): void {
        for (const event of events) {
            const
                handlers = this.#handlers[event.type];
            ///
            ///
            if (handlers) {
                for (const handler of handlers) {
                    handler(event);
                }
            }
        }
    }

    //---

    subscribe<T extends Event>(type: string, handler: THandler<T>): () => void {
        (this.#handlers[type] ??= new Set()).add(handler as THandler);

        return (): void => {
            const
                handlers = this.#handlers[type];
            ///
            ///
            if (handlers) {
                handlers.delete(handler as THandler);

                if (0 === handlers.size) {
                    delete this.#handlers[type];
                }
            }
        };
    }

    //---

    #handlers: Record<string, Set<THandler>> = {};
}