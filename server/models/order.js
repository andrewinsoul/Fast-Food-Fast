export const orders = [
  {
    orderId: 1,
    userId: 1,
    order: [
      {
        foodId: 3, quantity: 1, price: 2000
      },
      {
        foodId: 1, quantity: 3, price: 1200
      },
      {
        foodId: 4, quantity: 2, price: 2000
      }
    ],
    address: 'my house',
    status: 'complete'
  },

  {
    orderId: 2,
    userId: 1,
    order: [
      {
        foodId: 2, quantity: 12, price: 1000
      },
      {
        foodId: 4, quantity: 3, price: 1200
      },
      {
        foodId: 3, quantity: 2, price: 50
      }
    ],
    address: 'my house',
    status: 'declined'
  },

  {
    orderId: 3,
    userId: 2,
    order: [
      {
        foodId: 2, quantity: 1, price: 1200,
      },
      {
        foodId: 1, quantity: 2, price: 2000,
      }
    ],
    status: 'waiting'
  }
];

export const foodList = [
  {
    foodId: 1,
    food: 'Sharwama'
  },

  {
    foodId: 2,
    food: 'Lemonade'
  },

  {
    foodId: 3,
    food: 'Water'
  },

  {
    foodId: 4,
    food: 'Fried Rice'
  },

  {
    foodId: 5,
    food: 'Banana'
  },

  {
    foodId: 6,
    food: 'Apple'
  },

  {
    foodId: 7,
    food: 'Cake'
  },

  {
    foodId: 8,
    food: 'Plantain',
  }
];

export const users = [
  {
    userId: 1,
    name: 'Andrew Okoye',
    address: 'my house',
    phone: 123456
  },
  {
    userId: 2,
    name: 'Slava Couroy',
    address: 'my club',
    phone: 234567
  },
  {
    userId: 3,
    name: 'Travis Scott',
    address: 'my office',
    phone: 225645
  }
];
