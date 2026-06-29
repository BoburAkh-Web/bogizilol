import { MenuItem } from "@/data/menuData";

// Backend manzili — .env'dan
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Backend javob shakli: { total, data }
interface ApiResponse<T> {
  total: number;
  data: T;
}

// Universal so'rov yuboruvchi — data'ni avtomatik ochadi
async function request<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`);
  if (!res.ok) {
    throw new Error(`API xatosi: ${res.status} ${res.statusText}`);
  }
  const json: ApiResponse<T> = await res.json();
  return json.data; // 👈 obyektdan haqiqiy datani ajratib olamiz
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
  };
}

// --- Kategoriyalar ---
export function getCategories() {
  return request("/category");
}

// --- Taomlar ---
export async function getFoods(): Promise<MenuItem[]> {
  const foods = await request<ApiFood[]>("/foods");
  return foods.map(adaptFood);
}