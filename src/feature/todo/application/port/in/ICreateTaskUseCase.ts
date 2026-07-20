export default interface ICreateTaskUseCase {
    execute(title: string): Promise<void>,
}