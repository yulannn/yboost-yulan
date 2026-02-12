export type OrderFetchData = {
    order_id: number;
    nb_table: number;
    state: string;
    order_data: Date;
    employee_id?: number;
    cocktail_id: number;
    orderCocktails: {
        cocktail_id: number;
        quantity: number;
    }[];
};
