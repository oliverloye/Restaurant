package entity;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;

@Entity
@IdClass(FavRestId.class)
public class FavRest implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    int restID;
    @Id
    String userName;
    String comment;
    String rating;

    public FavRest() {
    }

    public FavRest(int restID, String userName, String comment, String rating) {
        this.restID = restID;
        this.userName = userName;
        this.comment = comment;
        this.rating = rating;
    }

    public FavRest(int restID, String userName) {
        this.restID = restID;
        this.userName = userName;
    }

    public int getRestID() {
        return restID;
    }

    public void setRestID(int restID) {
        this.restID = restID;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

}
