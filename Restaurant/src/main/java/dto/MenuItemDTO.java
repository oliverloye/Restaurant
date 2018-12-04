package dto;

import entity.MenuItem;

public class MenuItemDTO {

    public int id;
    public String description;
    public String itemName;
    public int price;
    public int restID;

    public MenuItemDTO(MenuItem menuItem) {
        this.id = menuItem.getId();
        this.itemName = menuItem.getItemName();
        this.description = menuItem.getDescription();
        this.price = menuItem.getPrice();
        this.restID = menuItem.getRestaurant().getId();
    }

    public MenuItemDTO(String itemName, String description, int price, int restID) {
        this.itemName = itemName;
        this.description = description;
        this.price = price;
        this.restID = restID;
    }

}
