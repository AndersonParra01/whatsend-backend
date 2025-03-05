import { Repository } from "typeorm";
import { BranchOffice } from "../models/branche_office.entity";
import { AppDataSource } from "../database/data-source";

export class BrancheService {
    private brancheRepository: Repository<BranchOffice>;

    constructor() {
        this.brancheRepository = AppDataSource.getRepository(BranchOffice);
    }

    async getAllBranchOffices(): Promise<BranchOffice[]> {
        return await this.brancheRepository.find();
    }

    async getBranchOfficeById(id: number): Promise<BranchOffice | null> {
        const branch = await this.brancheRepository.findOne({
            where: { id },
            relations: ["customers"]
        })
        if (!branch) {
            throw new Error(`Branch office with id ${id} not found`);
        }
        return branch;
    }

    async createBranchOffice(branchOfficeData: Partial<BranchOffice>): Promise<BranchOffice> {
        const branchOffice = this.brancheRepository.create(branchOfficeData);
        return await this.brancheRepository.save(branchOffice);
    }

    async updateBranchOffice(id: number, branchOfficeData: Partial<BranchOffice>): Promise<BranchOffice | null> {
        const branchOffice = await this.brancheRepository.findOneBy({ id });
        if (!branchOffice) {
            return null;
        }
        Object.assign(branchOffice, branchOfficeData);
        return await this.brancheRepository.save(branchOffice);
    }

    async deleteBranchOffice(id: number): Promise<boolean> {
        const result = await this.brancheRepository.delete(id);
        return result.affected !== 0;
    }

}