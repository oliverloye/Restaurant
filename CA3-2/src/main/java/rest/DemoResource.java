package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import entity.User;
import facade.Facade;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.security.RolesAllowed;
import javax.persistence.Persistence;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.SecurityContext;

@Path("info")
public class DemoResource {

    private Facade facade = new Facade(Persistence.createEntityManagerFactory("pu"));
    private Gson gson = new GsonBuilder().setPrettyPrinting().create();

    @Context
    private UriInfo context;

    @Context
    SecurityContext securityContext;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("getname")
    @RolesAllowed({"user", "admin"})
    public String getName() {
        String user = securityContext.getUserPrincipal().getName();
        return "\"" + user + " is logged in \"";
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("user")
    @RolesAllowed("user")
    public String getFromUser() {
        Long numberOfUsers = facade.getNumberOfUsers();
        return "\"" + numberOfUsers.toString() + "\"";
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("admin")
    @RolesAllowed("admin")
    public String getFromAdmin() {
        List<User> allUsers = facade.getAllUsers();
        List<String> result = new ArrayList<>();
        return "\" test \"";
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("swapi")
    public String getSwapi() throws IOException {
//        List<String> swapitest = facade.getSwapiDataNew(1);
        String swapitest = facade.getSwapiDataNew(1);
//        List<JsonObject> returnlist = facade.getSwapiDataNew(1);
        return swapitest;
    }
    
    
    //Returnerer bare en string indtil videre. 
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("luke")
    @RolesAllowed({"user", "admin"})
    public String getPaginationData() throws IOException {
        //String paginationData = facade.getPaginationData(1);
        //return paginationData;
        return "\" pagination test \"";
    }
}
