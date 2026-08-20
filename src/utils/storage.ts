import { Artwork } from '../types';
import { INITIAL_ARTWORKS } from '../data/artworks';

const DB_NAME = 'nailong_art_gallery_db';
const STORE_NAME = 'artworks_store';
const DB_VERSION = 1;
const LEGACY_STORAGE_KEY = 'nailong_art_gallery_custom_artworks';

// In-memory cache
let inMemoryArtworks: Artwork[] = INITIAL_ARTWORKS;

/**
 * Open or initialize IndexedDB connection
 */
function openDB(): Promise<IDBDatabase | null> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      resolve(null);
      return;
    }
    try {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = () => {
        resolve(null);
      };
    } catch {
      resolve(null);
    }
  });
}

/**
 * Asynchronously load persistent artworks from IndexedDB
 */
export async function loadArtworksFromIndexedDB(): Promise<Artwork[] | null> {
  try {
    const db = await openDB();
    if (!db) {
      // Fallback check legacy localStorage if available
      return getSavedArtworks();
    }
    return new Promise((resolve) => {
      try {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.get('all_artworks');
        req.onsuccess = () => {
          if (Array.isArray(req.result) && req.result.length > 0) {
            inMemoryArtworks = req.result;
            resolve(req.result);
          } else {
            resolve(null);
          }
        };
        req.onerror = () => resolve(null);
      } catch {
        resolve(null);
      }
    });
  } catch (err) {
    console.warn('IndexedDB read error', err);
    return null;
  }
}

/**
 * Synchronous initial getter
 */
export function getSavedArtworks(): Artwork[] {
  // If we have cached in-memory artworks, return them
  if (inMemoryArtworks && inMemoryArtworks.length > 0) {
    return inMemoryArtworks;
  }

  // Attempt to check if small legacy data exists in localStorage
  try {
    const data = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        inMemoryArtworks = parsed;
        return parsed;
      }
    }
  } catch {
    // If localStorage failed or threw quota error, safely ignore
  }

  return INITIAL_ARTWORKS;
}

/**
 * Normalizes title for fuzzy and exact duplicate comparison
 */
export function normalizeArtworkTitle(title: string): string {
  if (!title) return '';
  return title
    .replace(/[《》""''“”‘’\s·・\-]/g, '')
    .trim()
    .toLowerCase();
}

/**
 * Checks if two artworks represent the same piece based on Title, Original Title or ID
 */
export function isDuplicateArtwork(a: Artwork, b: Partial<Artwork>): boolean {
  if (a.id && b.id && a.id === b.id) return true;
  
  const normATitle = normalizeArtworkTitle(a.title);
  const normBTitle = normalizeArtworkTitle(b.title || '');
  if (normATitle && normBTitle && normATitle === normBTitle) return true;

  const normAOriginal = normalizeArtworkTitle(a.originalTitle);
  const normBOriginal = normalizeArtworkTitle(b.originalTitle || '');
  if (normAOriginal && normBOriginal && normAOriginal === normBOriginal) return true;

  return false;
}

/**
 * Inserts or updates an artwork in the array.
 * If a duplicate exists (by ID, title or originalTitle), the old artwork is automatically removed and replaced with the new one.
 */
export function upsertArtwork(artworks: Artwork[], newArtwork: Artwork): { updatedList: Artwork[]; isReplacement: boolean } {
  const duplicateIdx = artworks.findIndex(a => isDuplicateArtwork(a, newArtwork));
  const isReplacement = duplicateIdx !== -1;
  const filtered = artworks.filter((_, idx) => idx !== duplicateIdx);
  return {
    updatedList: [newArtwork, ...filtered],
    isReplacement
  };
}

/**
 * Save artworks to IndexedDB (and remove legacy oversized localStorage key to avoid quota errors)
 */
export function saveArtworks(artworks: Artwork[]) {
  inMemoryArtworks = artworks;

  // Clear legacy localStorage key to prevent QuotaExceededError
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(LEGACY_STORAGE_KEY);
    }
  } catch {
    // ignore
  }

  // Persist into IndexedDB
  saveArtworksToIndexedDB(artworks);
}

/**
 * Save to IndexedDB helper
 */
export async function saveArtworksToIndexedDB(artworks: Artwork[]): Promise<void> {
  try {
    const db = await openDB();
    if (!db) return;
    return new Promise((resolve) => {
      try {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        store.put(artworks, 'all_artworks');
        tx.oncomplete = () => resolve();
        tx.onerror = () => resolve();
      } catch {
        resolve();
      }
    });
  } catch {
    // gracefully ignore
  }
}

/**
 * Reset artworks to default catalogue
 */
export async function resetToDefaultArtworks(): Promise<Artwork[]> {
  inMemoryArtworks = INITIAL_ARTWORKS;
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(LEGACY_STORAGE_KEY);
    }
  } catch {
    // ignore
  }

  try {
    const db = await openDB();
    if (db) {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.delete('all_artworks');
    }
  } catch {
    // ignore
  }

  return INITIAL_ARTWORKS;
}

/**
 * Helper to compress user-uploaded image files to lightweight base64
 * to keep UI and storage performant and eliminate memory bloat
 */
export function compressImageFile(file: File, maxWidth = 1920, maxHeight = 1920, quality = 0.88): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', quality));
        } else {
          resolve(e.target?.result as string);
        }
      };
      img.onerror = () => {
        resolve(e.target?.result as string);
      };
      img.src = e.target?.result as string;
    };
    reader.onerror = () => {
      resolve('');
    };
    reader.readAsDataURL(file);
  });
}
