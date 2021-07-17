import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import * as faker from 'faker';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction) private repository: Repository<Transaction>,
  ) {}

  create(createTransactionDto: CreateTransactionDto): Promise<any> {
    const transaction = new Transaction();

    transaction.userName = createTransactionDto.random
      ? faker.name.findName()
      : createTransactionDto.userName;
    transaction.value = createTransactionDto.random
      ? faker.datatype.number()
      : createTransactionDto.value;
    return this.repository.save(transaction);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number): Promise<Transaction> {
    return this.repository.findOne(id);
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto): Promise<any> {
    const transaction = new Transaction();
    transaction.id = id;
    transaction.userName = updateTransactionDto.userName;
    transaction.value = updateTransactionDto.value;
    return this.repository.save(transaction);
  }

  async remove(id: number): Promise<any> {
    const transaction = await this.findOne(id);
    return this.repository.remove(transaction);
  }
}
