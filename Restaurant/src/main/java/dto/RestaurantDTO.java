package dto;

import entity.Restaurant;

public class RestaurantDTO {

    public int id;
    public String restName;
    public String foodType;
    public String street;
    public String website;
    public String phone;
    public CityInfoDTO cityInfo;

    public RestaurantDTO() {
    }

    public RestaurantDTO(Restaurant restaurant) {
        this.id = restaurant.getId();
        this.restName = restaurant.getRestname();
        this.foodType = restaurant.getFoodType();
        this.street = restaurant.getStreet();
        this.phone = restaurant.getPhone();
        this.cityInfo = new CityInfoDTO(restaurant.getCityInfo());
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

    @Override
    public String toString() {
        return "RestaurantDTO{" + "restName=" + restName + ", foodType=" + foodType + ", street=" + street + ", website=" + website + ", cityInfo=" + cityInfo + '}';
    }

}
