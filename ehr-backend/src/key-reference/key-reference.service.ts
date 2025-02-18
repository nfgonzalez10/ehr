import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CreateKeyReferenceDto } from './dto/create-key-reference.dto';
import { UpdateKeyReferenceDto } from './dto/update-key-reference.dto';
import { KeyReference } from './entities/key-reference.entity';

@Injectable()
export class KeyReferenceService {
  constructor(
    @InjectRepository(KeyReference)
    private readonly keyReferenceRepository: Repository<KeyReference>,
  ) {}
  create(createKeyReferenceDto: CreateKeyReferenceDto) {
    return this.keyReferenceRepository.save(createKeyReferenceDto);
  }

  createBulk(keyReferenceList: CreateKeyReferenceDto[]) {
    return this.keyReferenceRepository.save(keyReferenceList);
  }

  findAll() {
    return this.keyReferenceRepository.find();
  }

  findOne(id: number) {
    return this.keyReferenceRepository.findOneBy({ id });
  }

  async findAllByList(idList: number[]) {
    const keyReferenceList = await this.keyReferenceRepository.find({
      where: {
        id: In(idList),
      },
    });

    return keyReferenceList.reduce(
      (acc, curr) => {
        acc[curr.id] = curr;
        return acc;
      },
      {} as Record<number, CreateKeyReferenceDto>,
    );
  }

  update(id: number, updateKeyReferenceDto: UpdateKeyReferenceDto) {
    return `This action updates a #${id} keyReference`;
  }

  remove(id: number) {
    return this.keyReferenceRepository.delete(id);
  }
}
