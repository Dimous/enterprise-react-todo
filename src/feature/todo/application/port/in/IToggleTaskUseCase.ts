export default interface IToggleTaskUseCase {
    execute(id: string): Promise<void>,
}