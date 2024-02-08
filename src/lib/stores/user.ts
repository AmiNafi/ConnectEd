// src/stores/userId.ts
import { writable } from 'svelte/store';

// Initial value for userId
const initialUserId: number | null = null;

// Create a writable store for userId
export const userId = writable<number | null>(initialUserId);

// Function to set userId
export const setUserId = (newUserId: number | null) => {
  userId.set(newUserId);
};