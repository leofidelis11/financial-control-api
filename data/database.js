// In-memory database for development purposes
// In production, this would be replaced with a real database

const fs = require('fs');
const path = require('path');
const User = require('../src/models/User');
const Transaction = require('../src/models/Transaction');

const DATA_DIR = __dirname;
const DB_FILE = path.join(DATA_DIR, 'db.json');
const SEED_USERS_FILE = path.join(DATA_DIR, 'seedUsers.json');

class Database {
  constructor() {
    this.users = new Map();
    this.transactions = new Map();
    this.loadData();
  }

  // User methods
  createUser(user) {
    this.users.set(user.id, user);
    this.saveData();
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
      this.saveData();
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
      this.saveData();
      return true;
    }
    return false;
  }

  // Transaction methods
  createTransaction(transaction) {
    this.transactions.set(transaction.id, transaction);
    this.saveData();
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
      this.saveData();
      return transaction;
    }
    return null;
  }

  deleteTransaction(id) {
    const deleted = this.transactions.delete(id);
    if (deleted) {
      this.saveData();
    }
    return deleted;
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

  // Persistence
  loadData() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        if (raw && raw.trim().length > 0) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed.users)) {
            for (const plainUser of parsed.users) {
              const user = Object.assign(Object.create(User.prototype), plainUser);
              this.users.set(user.id, user);
            }
          }
          if (Array.isArray(parsed.transactions)) {
            for (const plainTx of parsed.transactions) {
              const tx = Object.assign(Object.create(Transaction.prototype), plainTx);
              this.transactions.set(tx.id, tx);
            }
          }
          return;
        }
      }
      // If no DB file, try to seed
      this.seedIfAvailable();
      this.saveData();
    } catch (error) {
      console.error('Error loading database file:', error);
    }
  }

  saveData() {
    try {
      const data = {
        users: Array.from(this.users.values()),
        transactions: Array.from(this.transactions.values())
      };
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
      console.error('Error saving database file:', error);
    }
  }

  seedIfAvailable() {
    try {
      if (fs.existsSync(SEED_USERS_FILE)) {
        const raw = fs.readFileSync(SEED_USERS_FILE, 'utf-8');
        const seeds = JSON.parse(raw);
        if (Array.isArray(seeds)) {
          for (const seed of seeds) {
            if (seed && typeof seed.name === 'string' && typeof seed.email === 'string') {
              const user = new User(seed.name, seed.email);
              this.users.set(user.id, user);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error seeding users:', error);
    }
  }
}

// Create a singleton instance
const database = new Database();

module.exports = database;
