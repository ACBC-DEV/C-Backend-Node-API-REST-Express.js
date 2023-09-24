const faker = require('faker');
const boom = require('@hapi/boom');
class UserServices {
  constructor() {
    this.users = [];
    this.generate();
  }
  generate() {
    const limit = 24;
    for (let i = 0; i < limit; i++) {
      this.users.push({
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        role: faker.name.jobTitle(),
      });
    }
  }
  async create(data) {
    const newUser = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.users.push(newUser);
    return newUser;
  }
  async find() {
    return this.users;
  }
  async findOne(id) {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }
  async update(id, changes) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('user not found');
    }
    this.users[index] = {
      ...this.users[index],
      ...changes,
    };
    return this.users[index];
  }
  async delete(id) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('user not found');
    }
    this.users.splice(index, 1);
    return { id };
  }
}
module.exports = UserServices;
