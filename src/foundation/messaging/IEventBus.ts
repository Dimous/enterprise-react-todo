import type { THandler } from "./THandler";
import Event from "../../foundation/domain/Event";

/**
 * это не порт конкретного UseCase, а общий механизм и не понятие предметной области, коммуникационная инфраструктурная абстракция, поэтому не в domain, а в messaging
 */
export default interface IEventBus {
    publish(...events: Event[]): void,

    subscribe<T extends Event>(type: string, handler: THandler<T>): () => void,
}