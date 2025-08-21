const { v4: uuidv4 } = require('uuid');

class Transaction {
  static CATEGORIES = [
    'Food',
    'Transportation', 
    'Housing',
    'Education',
    'Pet',
    'Health',
    'Personal',
    'Leisure',
    'Financial Services'
  ];

  static TYPES = ['income', 'expense'];

  constructor(userId, type, value, category, description = '') {
    this.id = uuidv4();
    this.userId = userId;
    this.type = type;
    this.value = value;
    this.category = category;
    this.description = description;
    this.datetime = new Date();
    this.createdAt = new Date();
  }

  static validate(transactionData) {
    const errors = [];
    
    if (!transactionData.userId || typeof transactionData.userId !== 'string') {
      errors.push('User ID is required and must be a string');
    }
    
    if (!transactionData.type || !Transaction.TYPES.includes(transactionData.type)) {
      errors.push('Type is required and must be either "income" or "expense"');
    }
    
    if (!transactionData.value || typeof transactionData.value !== 'number' || transactionData.value <= 0) {
      errors.push('Value is required and must be a positive number');
    }
    
    if (!transactionData.category || !Transaction.CATEGORIES.includes(transactionData.category)) {
      errors.push(`Category is required and must be one of: ${Transaction.CATEGORIES.join(', ')}`);
    }
    
    if (transactionData.description !== undefined && typeof transactionData.description !== 'string') {
      errors.push('Description must be a string');
    }
    
    return errors;
  }

  update(transactionData) {
    if (transactionData.type !== undefined) {
      this.type = transactionData.type;
    }
    if (transactionData.value !== undefined) {
      this.value = transactionData.value;
    }
    if (transactionData.category !== undefined) {
      this.category = transactionData.category;
    }
    if (transactionData.description !== undefined) {
      this.description = transactionData.description;
    }
    if (transactionData.datetime !== undefined) {
      this.datetime = new Date(transactionData.datetime);
    }
    this.updatedAt = new Date();
  }
}

module.exports = Transaction;
