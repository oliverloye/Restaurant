package dto;

import entity.MenuItem;

public class MenuItemDTO {

    public int id;
    public String description;
    public String itemName;
    public int price;
    public RestaurantDTO restaurant;

    public MenuItemDTO(MenuItem menuItem) {
        this.id = menuItem.getId();
        this.itemName = menuItem.getItemName();
        this.description = menuItem.getDescription();
        this.price = menuItem.getPrice();
        this.restaurant = new RestaurantDTO(menuItem.getRestaurant());
    }

}
