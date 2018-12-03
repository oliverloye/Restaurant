package dto;

import entity.FavRest;
import entity.Restaurant;

public class FavRestDTO {

    String restName;
    String comment;
    String rating;
    String foodType;
    int restID;

    public FavRestDTO(String restName, String comment, String rating, String foodType, int restID) {
        this.restName = restName;
        this.comment = comment;
        this.rating = rating;
        this.foodType = foodType;
        this.restID = restID;
    }

    public FavRestDTO(Restaurant r, FavRest f) {
        this.restName = r.getRestname();
        this.comment = f.getComment();
        this.rating = f.getRating();
        this.foodType = r.getFoodType();
        this.restID = r.getId();
    }
}
