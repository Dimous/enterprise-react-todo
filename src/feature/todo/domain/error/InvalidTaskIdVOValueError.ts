export default class InvalidTaskIdVOValueError extends Error {
    override name = "InvalidTaskIdVOValueError";

    constructor(public readonly value: string) {
        super(`Неверное значение TaskIdVO ${value}`);
    }
}