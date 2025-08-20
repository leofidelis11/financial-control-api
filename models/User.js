const { v4: uuidv4 } = require('uuid');

class User {
  constructor(name, email) {
    this.id = uuidv4();
    this.name = name;
    this.email = email;
    this.createdAt = new Date();
  }

  static validate(userData) {
    const errors = [];
    
    if (!userData.name || typeof userData.name !== 'string' || userData.name.trim().length === 0) {
      errors.push('Name is required and must be a non-empty string');
    }
    
    if (!userData.email || typeof userData.email !== 'string' || userData.email.trim().length === 0) {
      errors.push('Email is required and must be a non-empty string');
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userData.email)) {
        errors.push('Email must be a valid email format');
      }
    }
    
    return errors;
  }

  update(userData) {
    if (userData.name !== undefined) {
      this.name = userData.name;
    }
    if (userData.email !== undefined) {
      this.email = userData.email;
    }
    this.updatedAt = new Date();
  }
}

module.exports = User;
