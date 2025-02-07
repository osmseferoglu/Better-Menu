interface FoodListType {
  Id: number;
  Name: string;
}

interface FoodItem {
  Id: number;
  Food: string;
  Calory: number;
  FoodListType: FoodListType;
}

interface FoodMenuCategory {
  Id: number;
  Name: string;
}

interface FoodMenuTime {
  Id: number;
  Name: string;
}

interface FoodMenu {
  Id: number;
  Date: string;
  FoodMenuCategory: FoodMenuCategory;
  FoodMenuTime: FoodMenuTime;
  FoodLists: FoodItem[];
}