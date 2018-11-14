package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import facade.Facade;
import java.io.IOException;
import java.util.List;
import javax.annotation.security.RolesAllowed;
import javax.persistence.Persistence;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.SecurityContext;

/**
 * REST Web Service
 *
 * @author lam@cphbusiness.dk
 */
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
    @Path("user")
    @RolesAllowed("user")
    public String getFromUser(){
        String user = securityContext.getUserPrincipal().getName();
        return "\"" + user + " is logged in \"";
    }
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("admin")
    @RolesAllowed("admin")
    public String getFromAdmin() {
        String user = securityContext.getUserPrincipal().getName();
        return "\"Hello from ADMIN"+ user+"\"";
    }
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("swapi")
    public List<String> getSwapi() throws IOException {
        List<String> swapitest = facade.getSwapiDataNew(1);
//        List<JsonObject> returnlist = facade.getSwapiDataNew(1);
        return swapitest;
    }
}
