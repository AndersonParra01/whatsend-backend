import { Repository } from "typeorm";
import { AppDataSource } from "../database/data-source";
import { Delivery } from "../models/delivery.entity";

export class DeliveryService {
    private deliveryRepository: Repository<Delivery>;

    constructor() {
        this.deliveryRepository = AppDataSource.getRepository(Delivery);
    }

    async getAllDeliveries(): Promise<Delivery[]> {
        return await this.deliveryRepository.find({ relations: ["client", "message"] });
    }

    async getDeliveryById(id: number): Promise<Delivery | null> {
        return await this.deliveryRepository.findOne({ where: { id }, relations: ["client", "message"] });
    }

    async createDelivery(deliveryData: Partial<Delivery>): Promise<Delivery> {
        const delivery = this.deliveryRepository.create(deliveryData);
        return await this.deliveryRepository.save(delivery);
    }

    async updateDelivery(id: number, deliveryData: Partial<Delivery>): Promise<Delivery | null> {
        const delivery = await this.deliveryRepository.findOneBy({ id });
        if (!delivery) {
            return null;
        }
        Object.assign(delivery, deliveryData);
        return await this.deliveryRepository.save(delivery);
    }

    async deleteDelivery(id: number): Promise<boolean> {
        const result = await this.deliveryRepository.delete(id);
        return result.affected !== 0;
    }
}
