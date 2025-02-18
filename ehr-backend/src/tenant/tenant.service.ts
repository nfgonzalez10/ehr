import { Injectable } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tenant } from './entities/tenant.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
  ) {}

  create(createTenantDto: CreateTenantDto) {
    return this.tenantRepository.save(createTenantDto);
  }

  findAll() {
    return this.tenantRepository.find();
  }

  findOne(id: number | undefined) {
    return this.tenantRepository.findOneBy({ id });
  }

  update(id: number, updateTenantDto: UpdateTenantDto) {
    return `This action updates a #${id} tenant`;
  }

  remove(id: number) {
    return this.tenantRepository.delete(id);
  }
}
