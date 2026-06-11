'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    // get category IDs from DB
    const cats = await queryInterface.sequelize.query(
      `SELECT "categoryId", "categoryName" FROM categories`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const catMap = {};
    cats.forEach(c => { catMap[c.categoryName] = c.categoryId; });

    await queryInterface.bulkInsert('items', [
      // Lunch & Dinner
      {
        itemId: uuidv4(),
        categoryId: catMap['Lunch, Dinner'],
        itemName: 'Veg Rice',
        itemDescription: 'Steamed rice with mixed vegetable curry',
        price: 60.00,
        imageUrl: 'https://placehold.co/400x300?text=Veg+Rice',
        stockQuantity: 50,
        isAvailable: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemId: uuidv4(),
        categoryId: catMap['Lunch, Dinner'],
        itemName: 'Chicken Curry Rice',
        itemDescription: 'Steamed rice with spicy chicken curry',
        price: 90.00,
        imageUrl: 'https://placehold.co/400x300?text=Chicken+Rice',
        stockQuantity: 40,
        isAvailable: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Breakfast, Lunch, Dinner
      {
        itemId: uuidv4(),
        categoryId: catMap['Breakfast, Lunch, Dinner'],
        itemName: 'Chapati (2 pcs)',
        itemDescription: 'Soft wheat rotis served with dal',
        price: 30.00,
        imageUrl: 'https://placehold.co/400x300?text=Chapati',
        stockQuantity: 100,
        isAvailable: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemId: uuidv4(),
        categoryId: catMap['Breakfast, Lunch, Dinner'],
        itemName: 'Paratha',
        itemDescription: 'Stuffed whole wheat paratha with curd',
        price: 40.00,
        imageUrl: 'https://placehold.co/400x300?text=Paratha',
        stockQuantity: 60,
        isAvailable: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Snacks
      {
        itemId: uuidv4(),
        categoryId: catMap['Snacks'],
        itemName: 'Samosa (2 pcs)',
        itemDescription: 'Crispy fried samosas with chutney',
        price: 20.00,
        imageUrl: 'https://placehold.co/400x300?text=Samosa',
        stockQuantity: 80,
        isAvailable: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemId: uuidv4(),
        categoryId: catMap['Snacks'],
        itemName: 'Vada Pav',
        itemDescription: 'Mumbai style vada pav with green chutney',
        price: 25.00,
        imageUrl: 'https://placehold.co/400x300?text=Vada+Pav',
        stockQuantity: 60,
        isAvailable: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Beverages
      {
        itemId: uuidv4(),
        categoryId: catMap['Beverages'],
        itemName: 'Masala Chai',
        itemDescription: 'Hot spiced Indian tea',
        price: 15.00,
        imageUrl: 'https://placehold.co/400x300?text=Chai',
        stockQuantity: 100,
        isAvailable: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemId: uuidv4(),
        categoryId: catMap['Beverages'],
        itemName: 'Fresh Lime Soda',
        itemDescription: 'Chilled lime soda sweet or salted',
        price: 30.00,
        imageUrl: 'https://placehold.co/400x300?text=Lime+Soda',
        stockQuantity: 50,
        isAvailable: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Desserts
      {
        itemId: uuidv4(),
        categoryId: catMap['Desserts'],
        itemName: 'Gulab Jamun (2 pcs)',
        itemDescription: 'Soft milk solid dumplings in sugar syrup',
        price: 30.00,
        imageUrl: 'https://placehold.co/400x300?text=Gulab+Jamun',
        stockQuantity: 40,
        isAvailable: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemId: uuidv4(),
        categoryId: catMap['Desserts'],
        itemName: 'Kheer',
        itemDescription: 'Creamy rice pudding with cardamom',
        price: 35.00,
        imageUrl: 'https://placehold.co/400x300?text=Kheer',
        stockQuantity: 30,
        isAvailable: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('items', null, {});
  }
};