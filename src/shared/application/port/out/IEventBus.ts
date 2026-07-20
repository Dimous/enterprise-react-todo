import Event from "../../../../foundation/domain/Event";
import type { THandler } from "../../../infrastructure/adapter/out/event_bus/THandler";

export default interface IEventBus {
    publish(...events: Event[]): void,

    subscribe<T extends Event>(type: string, handler: THandler<T>): () => void,
}