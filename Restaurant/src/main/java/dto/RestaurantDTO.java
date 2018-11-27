package dto;

import entity.Restaurant;
import entity.User;

public class RestaurantDTO {

    public int id;
    
    public String restName;
    public String foodType;
    public String street;
    public String website;
    public String phone;
    public CityInfoDTO cityInfo;
    
    public User owner;

    public RestaurantDTO() {
    }

    public RestaurantDTO(Restaurant restaurant) {
        this.id = restaurant.getId();
        this.restName = restaurant.getRestname();
        this.foodType = restaurant.getFoodType();
        this.street = restaurant.getStreet();
        this.phone = restaurant.getPhone();
        this.website = restaurant.getWebsite();
        this.cityInfo = new CityInfoDTO(restaurant.getCityInfo());
        if (restaurant.getOwner() != null) {
            this.owner = new User(restaurant.getOwner().getUserName(), restaurant.getOwner().getUserPass());
        }
    }

    public RestaurantDTO(String restName, String foodType, String street, String website, String phone, CityInfoDTO cityInfo, User owner) {
        this.restName = restName;
        this.foodType = foodType;
        this.street = street;
        this.website = website;
        this.phone = phone;
        this.cityInfo = cityInfo;
        this.owner = owner;
    }

    public RestaurantDTO(int id, String restName, String foodType, String street, String website, CityInfoDTO cityInfo) {
        this.id = id;
        this.restName = restName;
        this.foodType = foodType;
        this.street = street;
        this.website = website;
        this.cityInfo = cityInfo;
    }

    public RestaurantDTO(int id, String restName, String foodType, String street, String website) {
        this.id = id;
        this.restName = restName;
        this.foodType = foodType;
        this.street = street;
        this.website = website;
    }

}
