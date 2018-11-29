package entity;

import java.io.Serializable;
import java.util.Objects;

public class FavRestId implements Serializable {

    int restID;
    String userName;

    public FavRestId() {
    }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 73 * hash + this.restID;
        hash = 73 * hash + Objects.hashCode(this.userName);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final FavRestId other = (FavRestId) obj;
        if (this.restID != other.restID) {
            return false;
        }
        if (!Objects.equals(this.userName, other.userName)) {
            return false;
        }
        return true;
    }

}
