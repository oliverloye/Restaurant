package dto;

import entity.User;

public class UserDTO {

    public String userName;

    public UserDTO(User user) {
        this.userName = user.getUserName();
    }

}
