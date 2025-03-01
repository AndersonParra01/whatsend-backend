import { Repository } from "typeorm";
import { AppDataSource } from "../database/data-source";
import { Customer } from "./../models/customer.entity";

export class CustomerService {
	private customerRepository: Repository<Customer>;

	constructor() {
		this.customerRepository = AppDataSource.getRepository(Customer);
	}

	async getAllCustomers(): Promise<Customer[]> {
		return await this.customerRepository.find({ relations: ["deliveries"] });
	}

	async getCustomerById(id: number): Promise<Customer | null> {
		return await this.customerRepository.findOne({ where: { id }, relations: ["deliveries"] });
	}

	async createCustomer(clientData: Partial<Customer>): Promise<Customer> {
		try {
			const client = this.customerRepository.create(clientData);
			return await this.customerRepository.save(client);
		}
		catch (error) {
			console.error(`Error creating customer: ${error}`);
			throw error;
		}
	}

	async updateCustomer(id: number, clientData: Partial<Customer>): Promise<Customer | null> {
		const client = await this.customerRepository.findOneBy({ id });
		if (!client) {
			return null;
		}
		Object.assign(client, clientData);
		return await this.customerRepository.save(client);
	}

	async deleteCustomer(id: number): Promise<boolean> {
		const result = await this.customerRepository.delete(id);
		return result.affected !== 0;
	}
}
