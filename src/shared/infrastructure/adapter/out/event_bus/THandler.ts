import Event from "../../../../../foundation/domain/Event";

export type THandler<T extends Event = Event> = (event: T) => void;