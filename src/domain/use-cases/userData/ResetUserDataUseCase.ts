import { AppStorageRepository } from "@/domain/repositories/AppStorageRepository";

export class ResetUserDataUseCase {
  constructor(
    private appDataRepository: AppStorageRepository,
  ) {}

  async execute(): Promise<void> {
    await this.appDataRepository.resetUserData();
  }
}
