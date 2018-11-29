package dto;

import entity.FavRest;
import entity.Restaurant;

public class FavRestDTO {
    
    String restName;
    String comment;
    String rating;

    public FavRestDTO(String restName, String comment, String rating) {
        this.restName = restName;
        this.comment = comment;
        this.rating = rating;
    }
    
    public FavRestDTO(Restaurant r, FavRest f) {
        this.restName = r.getRestname();
        this.comment = f.getComment();
        this.rating = f.getRating();
    }
}
