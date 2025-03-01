import { Repository } from "typeorm";
import { AppDataSource } from "../database/data-source";
import { Message } from "../models/message.entity";

export class MessageService {
  messageRepository: Repository<Message>;

  constructor() {
    this.messageRepository = AppDataSource.getRepository(Message);
  }

  async getMessages(): Promise<Message[]> {
    return await this.messageRepository.find({ relations: ["deliveries"] });
  }
  async getMessageById(id: number): Promise<Message> {
    const message = await this.messageRepository.findOne({ where: { id }, relations: ["deliveries"] });
    if (!message) {
      throw new Error(`Message with id ${id} not found`);
    }
    return message;
  }

  async createMessage(messageData: Message): Promise<Message> {
    try {
      console.log('Delete Deliveries', messageData);
      const message = this.messageRepository.create(messageData);
      return await this.messageRepository.save(message);
    } catch (error) {
      console.log(error);
      throw new Error('Failed to create message');
    }
  }

  async updateMessage(id: number, message: Message): Promise<Message> {
    await this.messageRepository.update(id, message);
    return await this.getMessageById(id);
  }

  async deleteMessage(id: number): Promise<void> {
    await this.messageRepository.delete(id);
  }
}