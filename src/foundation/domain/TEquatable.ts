export type TEquatable<T = unknown> = {
    equals(other: T): boolean,
}