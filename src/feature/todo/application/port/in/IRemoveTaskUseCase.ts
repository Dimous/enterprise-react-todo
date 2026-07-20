export default interface IRemoveTaskUseCase {
    execute(id: string): Promise<void>,
}