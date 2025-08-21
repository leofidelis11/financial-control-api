const express = require('express');
const Transaction = require('../models/Transaction');
const database = require('../../data/database');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       required:
 *         - userId
 *         - type
 *         - value
 *         - category
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated unique identifier
 *         userId:
 *           type: string
 *           description: ID of the user who owns this transaction
 *         type:
 *           type: string
 *           enum: [income, expense]
 *           description: Type of transaction
 *         value:
 *           type: number
 *           minimum: 0.01
 *           description: Transaction amount
 *         category:
 *           type: string
 *           enum: [Food, Transportation, Housing, Education, Pet, Health, Personal, Leisure, Financial Services]
 *           description: Transaction category
 *         description:
 *           type: string
 *           description: Optional transaction description
 *         datetime:
 *           type: string
 *           format: date-time
 *           description: Transaction date and time
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Transaction creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Transaction last update timestamp
 */

/**
 * @swagger
 * /api/transactions:
 *   post:
 *     summary: Create a new transaction
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - type
 *               - value
 *               - category
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "user-uuid-here"
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *                 example: "expense"
 *               value:
 *                 type: number
 *                 minimum: 0.01
 *                 example: 50.00
 *               category:
 *                 type: string
 *                 enum: [Food, Transportation, Housing, Education, Pet, Health, Personal, Leisure, Financial Services]
 *                 example: "Food"
 *               description:
 *                 type: string
 *                 example: "Grocery shopping"
 *               datetime:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-01-15T10:30:00Z"
 *     responses:
 *       201:
 *         description: Transaction created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: User not found
 */
router.post('/', (req, res) => {
  try {
    const { userId, type, value, category, description, datetime } = req.body;

    // Check if user exists
    const user = database.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Validate input
    const errors = Transaction.validate({ userId, type, value, category, description });
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    // Create transaction
    const transaction = new Transaction(userId, type, value, category, description);
    
    // Set custom datetime if provided
    if (datetime) {
      transaction.datetime = new Date(datetime);
    }

    const createdTransaction = database.createTransaction(transaction);
    res.status(201).json(createdTransaction);
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Get all transactions
 *     tags: [Transactions]
 *     responses:
 *       200:
 *         description: List of all transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 */
router.get('/', (req, res) => {
  try {
    const transactions = database.getAllTransactions();
    res.json(transactions);
  } catch (error) {
    console.error('Error getting transactions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/transactions/{id}:
 *   get:
 *     summary: Get transaction by ID
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction ID
 *     responses:
 *       200:
 *         description: Transaction found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       404:
 *         description: Transaction not found
 */
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const transaction = database.getTransactionById(id);

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.json(transaction);
  } catch (error) {
    console.error('Error getting transaction:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/transactions/user/{userId}:
 *   get:
 *     summary: Get all transactions for a specific user
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of user transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *       404:
 *         description: User not found
 */
router.get('/user/:userId', (req, res) => {
  try {
    const { userId } = req.params;

    // Check if user exists
    const user = database.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const transactions = database.getTransactionsByUserId(userId);
    res.json(transactions);
  } catch (error) {
    console.error('Error getting user transactions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/transactions/user/{userId}/filter:
 *   get:
 *     summary: Filter user transactions by period and/or category
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for filtering (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for filtering (YYYY-MM-DD)
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [Food, Transportation, Housing, Education, Pet, Health, Personal, Leisure, Financial Services]
 *         description: Category to filter by
 *     responses:
 *       200:
 *         description: Filtered transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *       404:
 *         description: User not found
 */
router.get('/user/:userId/filter', (req, res) => {
  try {
    const { userId } = req.params;
    const { startDate, endDate, category } = req.query;

    // Check if user exists
    const user = database.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    let transactions = database.getTransactionsByUserId(userId);

    // Filter by period if dates are provided
    if (startDate && endDate) {
      transactions = database.getTransactionsByPeriod(userId, startDate, endDate);
    }

    // Filter by category if provided
    if (category) {
      if (!Transaction.CATEGORIES.includes(category)) {
        return res.status(400).json({ 
          error: `Invalid category. Must be one of: ${Transaction.CATEGORIES.join(', ')}` 
        });
      }
      transactions = transactions.filter(t => t.category === category);
    }

    res.json(transactions);
  } catch (error) {
    console.error('Error filtering transactions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/transactions/{id}:
 *   put:
 *     summary: Update transaction
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *               value:
 *                 type: number
 *                 minimum: 0.01
 *               category:
 *                 type: string
 *                 enum: [Food, Transportation, Housing, Education, Pet, Health, Personal, Leisure, Financial Services]
 *               description:
 *                 type: string
 *               datetime:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Transaction updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Transaction not found
 */
router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Check if transaction exists
    const existingTransaction = database.getTransactionById(id);
    if (!existingTransaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    // Validate update data
    const errors = Transaction.validate({ 
      ...existingTransaction, 
      ...updateData 
    });
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    // Update transaction
    const updatedTransaction = database.updateTransaction(id, updateData);
    if (!updatedTransaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.json(updatedTransaction);
  } catch (error) {
    console.error('Error updating transaction:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/transactions/{id}:
 *   delete:
 *     summary: Delete transaction
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction ID
 *     responses:
 *       200:
 *         description: Transaction deleted successfully
 *       404:
 *         description: Transaction not found
 */
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const deleted = database.deleteTransaction(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/transactions/categories:
 *   get:
 *     summary: Get all available transaction categories
 *     tags: [Transactions]
 *     responses:
 *       200:
 *         description: List of available categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
router.get('/categories', (req, res) => {
  try {
    res.json(Transaction.CATEGORIES);
  } catch (error) {
    console.error('Error getting categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
