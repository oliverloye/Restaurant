package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import dto.MenuItemDTO;
import dto.RestaurantDTO;
import facade.Facade;
import java.io.IOException;
import java.util.List;
import javax.annotation.security.RolesAllowed;
import javax.persistence.Persistence;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

@Path("info")
public class RestaurantAPI {

    private Facade facade = new Facade(Persistence.createEntityManagerFactory("pu"));
    private Gson gson = new GsonBuilder().setPrettyPrinting().create();

    @Context
    private UriInfo context;

    @Context
    SecurityContext securityContext;

    @GET // VIRKER
    @Produces(MediaType.APPLICATION_JSON)
    @Path("getlist")
    public Response getAllRestaurants() {
        List<RestaurantDTO> restaurants = facade.getAllRestaurants();
//        if (persons.isEmpty()) {
//            throw new PersonNotFoundException("Ingen personer fundet.");
//        }
        return Response.ok(gson.toJson(restaurants)).build();
    }
    
    @GET //VIRKER
    @Produces(MediaType.APPLICATION_JSON)
    @Path("getname")
    @RolesAllowed({"rest_owner", "admin"})
    public String getName() {
        String user = securityContext.getUserPrincipal().getName();
        return "\"" + user + " is logged in \"";
    }
    
    
//    @GET
//    @Produces(MediaType.APPLICATION_JSON)
//    @Path("getmenu")
////    @RolesAllowed({"rest_owner", "admin"})
//    public String getMenuItems() {
//        String user = securityContext.getUserPrincipal().getName();
//        return "\"" + user + " is logged in \"";
//    }
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("getmenu")
    public Response getMenuItems(@QueryParam("id") int id) {
        List<MenuItemDTO> menuItems = facade.getMenuItems(id);
//        if (menuItems == null) {
//            {
//                throw new MenuNotFoundException("No restaurants match this id.");
//            } 
//            catch (MenuNotFoundException e) {
//                ExceptionDTO exDTO = new ExceptionDTO(e, 406, false);
//                exDTO.setMessage("No pets match this id.");
//                return gson.toJson(exDTO);
//            }
//        }
        return Response.ok(gson.toJson(menuItems)).build();
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
        return "\" test \"";
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("swapi")
    public String getSwapi() throws IOException {
        String swapitest = facade.getSwapiData();
        return swapitest;
    }

//    @GET
//    @Path("list")
//    //    @RolesAllowed({"user", "admin"})
//    @Produces(MediaType.APPLICATION_JSON)
//    public String getJson() {
//        return gson.toJson(facade.getPersons());
//    }
//
//    // bruges ikke pt
//    @GET
//    @Path("pagetest")
//    @RolesAllowed({"user", "admin"})
//    @Produces(MediaType.APPLICATION_JSON)
//    public Response getJson(@QueryParam("_start") String _start, @QueryParam("_end") String _end,
//            @QueryParam("_sort") String _sort, @QueryParam("_order") String _order) {
//        int start = Integer.parseInt(_start);
//        int end = Integer.parseInt(_end);
//        List<Persons> persons = facade.getByPage(start, end);
//        int count = persons.size();
//        return Response.ok(persons).header("X-Total-Count", count)
//                .header("Access-Control-Expose-Headers", "X-Total-Count").build();
//    }
}
