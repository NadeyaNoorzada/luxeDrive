import apiClient from './api';
import luxuryCars from '../data/luxuryCars';

const transformProduct = (item) => ({
  id: item.id,
  title: item.title,
  brand: item.brand || 'Luxury',
  category: item.category || 'vehicle',
  description: item.description || 'Premium luxury vehicle.',
  price: item.price,
  horsepower: item.horsepower || Math.floor(Math.random() * 400) + 400,
  topSpeed: item.topSpeed || Math.floor(Math.random() * 80) + 150,
  acceleration: item.acceleration || (Math.random() * 3 + 2).toFixed(1),
  transmission: item.transmission || 'Automatic',
  fuelType: item.fuelType || 'Gasoline',
  year: item.year || 2024,
  rating: item.rating || (Math.random() * 1 + 4).toFixed(1),
  stock: item.stock || Math.floor(Math.random() * 10) + 1,
  thumbnail: item.thumbnail || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
  images: item.images || ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80'],
});

export const fetchCars = async ({ skip = 0, limit = 12 } = {}) => {
  try {
    const response = await apiClient.get(`/products/category/vehicle`, {
      params: { skip, limit },
    });
    const products = response.data.products || [];
    if (products.length === 0) throw new Error('No products from API');
    return {
      cars: products.map(transformProduct),
      total: response.data.total || products.length,
    };
  } catch {
    const sorted = [...luxuryCars].slice(skip, skip + limit);
    return {
      cars: sorted,
      total: luxuryCars.length,
    };
  }
};

export const fetchCarById = async (id) => {
  try {
    const response = await apiClient.get(`/products/${id}`);
    return transformProduct(response.data);
  } catch {
    const car = luxuryCars.find((c) => c.id === Number(id));
    if (!car) throw new Error('Car not found');
    return car;
  }
};

export const searchCars = async ({ query = '', skip = 0, limit = 12 } = {}) => {
  try {
    const response = await apiClient.get(`/products/search`, {
      params: { q: query, skip, limit },
    });
    const products = response.data.products || [];
    if (products.length > 0) {
      return {
        cars: products.map(transformProduct),
        total: response.data.total || products.length,
      };
    }
    throw new Error('No results');
  } catch {
    const filtered = luxuryCars.filter(
      (c) =>
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.brand.toLowerCase().includes(query.toLowerCase())
    );
    return {
      cars: filtered.slice(skip, skip + limit),
      total: filtered.length,
    };
  }
};

export const fetchCarsByBrand = async (brand) => {
  const filtered = luxuryCars.filter(
    (c) => c.brand.toLowerCase() === brand.toLowerCase()
  );
  return {
    cars: filtered,
    total: filtered.length,
  };
};
