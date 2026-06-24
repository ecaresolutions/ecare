export interface CartItem {
  id: string; // e.g. `${slug}-${licenseType}-${extendSupport}`
  slug: string;
  title: string;
  price: number;
  licenseType: "regular" | "extended";
  extendSupport: boolean;
  supportPrice: number;
  quantity: number;
  image?: string;
}

export function getCartItems(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem("ecare_cart");
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Failed to parse cart items", e);
    return [];
  }
}

export function saveCartItems(items: CartItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("ecare_cart", JSON.stringify(items));
    // Dispatch a custom event to notify other components/instances of the header cart
    window.dispatchEvent(new Event("ecare_cart_change"));
  } catch (e) {
    console.error("Failed to save cart items", e);
  }
}

export function addToCart(item: Omit<CartItem, "id">) {
  const items = getCartItems();
  const id = `${item.slug}-${item.licenseType}-${item.extendSupport}`;
  
  const existingIndex = items.findIndex((i) => i.id === id);
  if (existingIndex > -1) {
    items[existingIndex].quantity += item.quantity;
  } else {
    items.push({ ...item, id });
  }
  
  saveCartItems(items);
}

export function updateCartQuantity(id: string, quantity: number) {
  let items = getCartItems();
  items = items.map((item) => {
    if (item.id === id) {
      return { ...item, quantity: Math.max(1, quantity) };
    }
    return item;
  });
  saveCartItems(items);
}

export function removeFromCart(id: string) {
  const items = getCartItems();
  const filtered = items.filter((item) => item.id !== id);
  saveCartItems(filtered);
}

export function clearCart() {
  saveCartItems([]);
}
