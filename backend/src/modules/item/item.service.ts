import Item from './item.entity.js';
import { NotFoundError } from '../../utils/errors.js';
import type {
  CreateItemDto,
  UpdateItemDto,
  ItemDto
} from './item.dto.js';
import ItemRepository from './item.repository.js';
import {
  PaginationOptions,
  PaginatedResult
} from '../../utils/pagination.js';
import connectRedis from '../../config/redis.js';

const toItemDto = (item: Item | ItemDto): ItemDto => {
  return typeof (item as Item).toJSON === "function"
    ? (item as Item).toJSON() as ItemDto
    : item as ItemDto;
};

const redis = await connectRedis();


// Create a new item
const createItem = async (
  data: CreateItemDto
): Promise<ItemDto> => {

  const newItem = await ItemRepository.create(data);

  // Invalidate cached item list
  await redis?.del('items');

  return toItemDto(newItem);
};


// Get all items
const getAllItems = async (
  options: PaginationOptions
): Promise<PaginatedResult<ItemDto>> => {

  const cachedItems = await redis?.get('items');

  if (cachedItems) {
    const parsedItems = JSON.parse(cachedItems);

    return {
      ...parsedItems,
      data: parsedItems.data.map(toItemDto),
    };
  }

  const paginatedItems =
    await ItemRepository.findAll(options);

  await redis?.set(
    'items',
    JSON.stringify(paginatedItems),
    {
      EX: 60 * 60,
    }
  );

  return {
    ...paginatedItems,
    data: paginatedItems.data.map(toItemDto),
  };
};


// Get item by ID
const getItemById = async (
  id: string
): Promise<ItemDto> => {

  const item =
    await ItemRepository.findById(id);

  if (!item) {
    throw new NotFoundError('Item not found');
  }

  return toItemDto(item);
};


// Update item
const updateItem = async (
  id: string,
  data: UpdateItemDto
): Promise<ItemDto> => {

  const item =
    await ItemRepository.update(id, data);

  if (!item) {
    throw new NotFoundError('Item not found');
  }

  // Invalidate cached item list
  await redis?.del('items');

  return toItemDto(item);
};


// Delete item
const deleteItem = async (
  id: string
): Promise<{ message: string }> => {

  const deleted =
    await ItemRepository.delete(id);

  if (!deleted) {
    throw new NotFoundError('Item not found');
  }

  // Invalidate cached item list
  await redis?.del('items');

  return {
    message: 'Item deleted successfully'
  };
};


export default {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
};