export default interface IRenameTaskUseCase {
    execute(id: string, title: string): Promise<void>,
}