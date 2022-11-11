import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'yakoob2',
      email: 'admin2@example.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: true,
    },
    {
      name: 'John1',
      email: 'user1@example.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: false,
    },
  ],
  services: [
    {
      name: 'Nike Slim Shirt',
      category: 'Shirts',
      image: '/images/p1.jpg',
      price: 120,
      countInStock: 10,
      provider: 'Nike',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality service',
    },
    {
      name: 'Adidas Fit Shirt',
      category: 'Shirts',
      image: '/images/p2.jpg',
      price: 100,
      countInStock: 20,
      provider: 'Adidas',
      rating: 4.0,
      numReviews: 10,
      description: 'high quality service',
    },
    {
      name: 'Lacoste Free Shirt',
      category: 'Shirts',
      image: '/images/p3.jpg',
      price: 220,
      countInStock: 0,
      provider: 'Lacoste',
      rating: 4.8,
      numReviews: 17,
      description: 'high quality service',
    },
    {
      name: 'Nike Slim Pant',
      category: 'Pants',
      image: '/images/p4.jpg',
      price: 78,
      countInStock: 15,
      provider: 'Nike',
      rating: 4.5,
      numReviews: 14,
      description: 'high quality service',
    },
  ],
};
export default data;
