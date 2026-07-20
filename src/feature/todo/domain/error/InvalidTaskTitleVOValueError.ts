export default class InvalidTaskTitleVOValueError extends Error {
    override name = "InvalidTaskTitleVOValueError";

    constructor(public readonly value: string, reason: string) {
        super(`Неверное значение TaskTitleVO ${value}, ${reason}`);
    }
}