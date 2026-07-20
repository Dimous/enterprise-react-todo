import type { TIdentifiableDTO } from "../../../infrastructure/adapter/out/data_source/TIdentifiableDTO";

export default interface ILocalDataSource {
    clear(): Promise<void>,

    delete(id: string): Promise<void>,

    getAll(): Promise<TIdentifiableDTO[]>,

    put(dto: TIdentifiableDTO): Promise<void>,

    get(id: string): Promise<TIdentifiableDTO | undefined>,
}

