import { Inject, Injectable } from '@nestjs/common';
import { CreateMappingDto } from './dto/create-mapping.dto';
import { UpdateMappingDto } from './dto/update-mapping.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mapping } from './entities/mapping.entity';
import { TenantService } from 'src/tenant/tenant.service';
import { KeyReferenceService } from 'src/key-reference/key-reference.service';

@Injectable()
export class MappingsService {
  constructor(
    @InjectRepository(Mapping)
    private readonly mappingsRepository: Repository<Mapping>,
    @Inject(TenantService)
    private readonly tenantService: TenantService,
    @Inject(KeyReferenceService)
    private readonly referenceKeyService: KeyReferenceService,
  ) {}
  async create(createMappingDto: CreateMappingDto) {
    const tenant = await this.tenantService.findOne(createMappingDto.tenantId);
    if (!tenant) {
      throw new Error('Tenant not found');
    }
    const keyReference = await this.referenceKeyService.findOne(
      createMappingDto.keyReferenceId,
    );

    if (!keyReference) {
      throw new Error('Key reference not found');
    }

    return await this.mappingsRepository.save(createMappingDto);
  }

  async findAll(tenantId: number) {
    const tenant = await this.tenantService.findOne(tenantId);
    if (!tenant) {
      throw new Error('Tenant not found');
    }

    const mappingList = await this.mappingsRepository.find({
      where: { tenantId },
    });

    if (!mappingList) {
      throw new Error('Mapping not found');
    }

    const keyReferenceList = mappingList.map((mappingItem) => {
      return mappingItem.keyReferenceId;
    });

    const keyReference =
      await this.referenceKeyService.findAllByList(keyReferenceList);

    const mapResult = mappingList.map((mappingItem) => {
      const referenceKey = keyReference[mappingItem.keyReferenceId];
      return {
        ...mappingItem,
        referenceKeyName: referenceKey.key,
      };
    });
    return { mapResult, tenant };
  }

  async findOne(id: number) {
    const mapping = await this.mappingsRepository.findOneBy({ id });

    if (!mapping) {
      throw new Error('Mapping not found');
    }

    const [tenant, keyReference] = await Promise.all([
      this.tenantService.findOne(mapping.tenantId),
      this.referenceKeyService.findOne(mapping.keyReferenceId),
    ]);

    const resultMapping = {
      ...mapping,
      tenant: tenant?.name,
      referenceKeyName: keyReference?.key,
    };

    return resultMapping;
  }

  update(id: number, updateMappingDto: UpdateMappingDto) {
    return `This action updates a #${id} mapping`;
  }

  remove(id: number) {
    return this.mappingsRepository.delete(id);
  }
}
