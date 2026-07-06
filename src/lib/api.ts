import { MenuItem } from "@/data/menuData";

// Backend manzili — .env'dan
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Backend javob shakli: { total, data }
interface ApiResponse<T> {
  total: number;
  data: T;
}

// Universal so'rov yuboruvchi — GET, POST, PATCH, DELETE hammasini qo'llaydi
async function request<T>(
  endpoint: string,
  options?: { method?: string; body?: unknown }
): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: options?.method ?? "GET",
    headers: { "Content-Type": "application/json" },
    body: options?.body ? JSON.stringify(options.body) : undefined,
  });
  if (!res.ok) {
    throw new Error(`API xatosi: ${res.status} ${res.statusText}`);
  }
  const json: ApiResponse<T> = await res.json();
  return json.data;
}


// Backend taomini → frontend MenuItem shakliga aylantiradi
export function adaptFood(food: ApiFood): MenuItem {
  return {
    id: food._id,
    name: { en: food.name, uz: food.name, ru: food.name },
    description: {
      en: food.description,
      uz: food.description,
      ru: food.description,
    },
    ingredients: { en: "", uz: "", ru: "" },
    allergens: { en: "", uz: "", ru: "" },
    price: food.price,
    image: food.image,
    category: "mains",
    categoryId: food.category_id,
  };
}

// --- Kategoriyalar ---
export function getCategories() {
  return request<ApiCategory[]>("/category");
}
// --- Taomlar ---
export async function getFoods(): Promise<MenuItem[]> {
  const foods = await request<ApiFood[]>("/foods");
  return foods.map(adaptFood);
}


// Backend "create" kutadigan shakl (Postman'dan)
export interface FoodInput {
  category_id: string;
  name: string;
  description: string;
  price: number;
  is_available: boolean;
  image: string;
}

// Backend qaytaradigan kategoriya shakli
export interface ApiCategory {
  _id: string;
  name: string;
  image: string | null;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
}

// --- Yangi taom qo'shish (POST) ---
export function createFood(food: FoodInput) {
  return request<ApiFood>("/foods/create", {
    method: "POST",
    body: food,
  });
}
// --- Taomni tahrirlash (PATCH) ---
export function updateFood(id: string, food: Partial<FoodInput>) {
  return request<ApiFood>(`/foods/${id}`, {
    method: "PATCH",
    body: food,
  });
}
// --- Taomni o'chirish (DELETE) ---
export function deleteFood(id: string) {
  return request<ApiFood>(`/foods/${id}`, {
    method: "DELETE",
  });
}
// Backend "category create" kutadigan shakl
export interface CategoryInput {
  name: string;
  is_active: boolean;
}
// --- Yangi kategoriya qo'shish (POST) ---
export function createCategory(category: CategoryInput) {
  return request<ApiCategory>("/category/create", {
    method: "POST",
    body: category,
  });
}
// --- Kategoriyani tahrirlash (PATCH) ---
export function updateCategory(id: string, category: Partial<CategoryInput>) {
  return request<ApiCategory>(`/category/${id}`, {
    method: "PATCH",
    body: category,
  });
}

// --- Kategoriyani o'chirish (DELETE) — backend tayyor bo'lganda ulanadi ---
export function deleteCategory(id: string) {
  return request<ApiCategory>(`/category/${id}`, {
    method: "DELETE",
  });
}

// Backend "reservation create" kutadigan shakl
export interface ReservationInput {
  user_id: string;
  name: string;              // guest booking uchun (backend qo'shishi kerak)
  phone: string;
  table_preference: string;
  date: string;              // "2026-10-12" formatida
  time: string;
  guests_count: number;
  note?: string;
}

// --- Yangi bron (POST) ---
export function createReservation(data: ReservationInput) {
  return request<unknown>("/reservations", {
    method: "POST",
    body: data,
  });
}

export interface ApiUser {
  _id: string;
  firstname: string;
  lastname: string;
  phone: string;
}


// Backend qaytaradigan bron shakli
export interface ApiReservation {
  _id: string;
  user_id: ApiUser;
  date: string;              // "2026-07-10T00:00:00.000Z"
  time: string;
  guests_count: number;
  table_preference: string;
  note: string;
  status?: string;           // backend keyin qo'shadi (hozir yo'q)
  name?: string;             // backend keyin qo'shadi
  phone?: string;            // backend keyin qo'shadi
  createdAt: string;
  updatedAt: string;
}

// --- Bronlarni olish (GET) ---
export function getReservations() {
  return request<ApiReservation[]>("/reservations");
}

// --- Bronni o'chirish (DELETE) ---
export function deleteReservation(id: string) {
  return request<unknown>(`/reservations/${id}`, {
    method: "DELETE",
  });
}

