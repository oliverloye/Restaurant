package entity;

import dto.RestaurantDTO;
import java.io.Serializable;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Restaurant implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String restname;
    private String street;
    private String phone;
    private String website;
    private String foodType;
    @ManyToOne
    private CityInfo cityInfo;
    @ManyToOne 
    private User owner;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Restaurant() {
    }

    public Restaurant(String restname, String street, String phone, CityInfo cityInfo, String foodType, User owner) {
        this.restname = restname;
        this.street = street;
        this.phone = phone;
        this.cityInfo = cityInfo;
        this.foodType = foodType;
        this.owner = owner;
    }

    public Restaurant(String restname, String street, String phone, CityInfo cityInfo, String foodType) {
        this.restname = restname;
        this.street = street;
        this.phone = phone;
        this.cityInfo = cityInfo;
        this.foodType = foodType;
    }

    public Restaurant(RestaurantDTO rest) {
        this.restname = rest.restName;
        this.phone = rest.phone;
        this.street = rest.street;
        this.website = rest.website;
        this.foodType = rest.foodType;
        this.owner = rest.owner;
        this.cityInfo = new CityInfo(rest.cityInfo);
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getFoodType() {
        return foodType;
    }

    public void setFoodType(String foodType) {
        this.foodType = foodType;
    }

    public String getRestname() {
        return restname;
    }

    public void setRestname(String restname) {
        this.restname = restname;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public CityInfo getCityInfo() {
        return cityInfo;
    }

    public void setCityInfo(CityInfo cityInfo) {
        this.cityInfo = cityInfo;
    }

}
