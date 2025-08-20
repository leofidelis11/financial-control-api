// In-memory database for development purposes
// In production, this would be replaced with a real database

class Database {
  constructor() {
    this.users = new Map();
    this.transactions = new Map();
  }

  // User methods
  createUser(user) {
    this.users.set(user.id, user);
    return user;
  }

  getUserById(id) {
    return this.users.get(id);
  }

  getAllUsers() {
    return Array.from(this.users.values());
  }

  updateUser(id, userData) {
    const user = this.users.get(id);
    if (user) {
      user.update(userData);
      this.users.set(id, user);
      return user;
    }
    return null;
  }

  deleteUser(id) {
    const user = this.users.get(id);
    if (user) {
      // Delete all transactions for this user
      for (const [transactionId, transaction] of this.transactions.entries()) {
        if (transaction.userId === id) {
          this.transactions.delete(transactionId);
        }
      }
      this.users.delete(id);
      return true;
    }
    return false;
  }

  // Transaction methods
  createTransaction(transaction) {
    this.transactions.set(transaction.id, transaction);
    return transaction;
  }

  getTransactionById(id) {
    return this.transactions.get(id);
  }

  getTransactionsByUserId(userId) {
    return Array.from(this.transactions.values()).filter(t => t.userId === userId);
  }

  getAllTransactions() {
    return Array.from(this.transactions.values());
  }

  updateTransaction(id, transactionData) {
    const transaction = this.transactions.get(id);
    if (transaction) {
      transaction.update(transactionData);
      this.transactions.set(id, transaction);
      return transaction;
    }
    return null;
  }

  deleteTransaction(id) {
    return this.transactions.delete(id);
  }

  // Balance calculation
  calculateUserBalance(userId) {
    const userTransactions = this.getTransactionsByUserId(userId);
    
    const income = userTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.value, 0);
    
    const expenses = userTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.value, 0);
    
    return {
      income,
      expenses,
      balance: income - expenses
    };
  }

  // Filter transactions by period
  getTransactionsByPeriod(userId, startDate, endDate) {
    const userTransactions = this.getTransactionsByUserId(userId);
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    return userTransactions.filter(t => {
      const transactionDate = new Date(t.datetime);
      return transactionDate >= start && transactionDate <= end;
    });
  }

  // Filter transactions by category
  getTransactionsByCategory(userId, category) {
    const userTransactions = this.getTransactionsByUserId(userId);
    return userTransactions.filter(t => t.category === category);
  }

  // Check if email already exists
  isEmailExists(email) {
    return Array.from(this.users.values()).some(user => user.email === email);
  }
}

// Create a singleton instance
const database = new Database();

module.exports = database;
