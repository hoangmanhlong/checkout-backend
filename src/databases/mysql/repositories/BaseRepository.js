import { Repository } from 'typeorm';

export class BaseRepository {
  constructor(repository) {
    this.repository = repository;
  }

  async findById(id) {
    return this.repository.findOne({ where: { id } });
  }

  async findAll(options = {}) {
    return this.repository.find(options);
  }

  async create(data) {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async update(id, data) {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  async delete(id) {
    return this.repository.delete(id);
  }

  async count(options = {}) {
    return this.repository.count(options);
  }
} 