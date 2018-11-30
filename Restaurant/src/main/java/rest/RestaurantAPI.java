package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import dto.CityInfoDTO;
import dto.FavRestDTO;
import dto.MenuItemDTO;
import dto.RestaurantDTO;
import entity.CityInfo;
import entity.Restaurant;
import entity.User;
import exceptions.NotFoundException;
import facade.Facade;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.security.RolesAllowed;
import javax.persistence.Persistence;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

@Path("info")
public class RestaurantAPI {

    private Facade facade = new Facade(Persistence.createEntityManagerFactory("pu"));
    private Gson gson = new GsonBuilder().setPrettyPrinting().create();
    private JsonParser parser = new JsonParser();

    @Context
    private UriInfo context;

    @Context
    SecurityContext securityContext;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("getlists")
    public Response getAllRestaurants() {
        List<RestaurantDTO> restaurants = facade.getAllRestaurants();
        int nextID = restaurants.get(restaurants.size() - 1).id + 1;

        String remote = facade.getRemoteRestaurants();
        if (!remote.contains("Error")) {
            JsonArray jo = parser.parse(remote).getAsJsonArray();
            List<RestaurantDTO> list = new ArrayList<>();
            for (JsonElement jsonElement : jo) {
                RestaurantDTO dto = new RestaurantDTO();
                dto.phone = jsonElement.getAsJsonObject().get("phone").getAsString();
                dto.restName = jsonElement.getAsJsonObject().get("restName").getAsString();
                dto.foodType = jsonElement.getAsJsonObject().get("foodType").getAsString();
                dto.street = jsonElement.getAsJsonObject().get("street").getAsString();
                if (jsonElement.getAsJsonObject().has("website")) {
                    dto.website = jsonElement.getAsJsonObject().get("website").getAsString();
                }
                JsonElement newjo = jsonElement.getAsJsonObject().get("cityInfo");
                String zip = newjo.getAsJsonObject().get("zip").getAsString();
                String city = newjo.getAsJsonObject().get("city").getAsString();
                CityInfo cityInfo = new CityInfo(zip, city);
                CityInfoDTO cityInfoDTO = new CityInfoDTO(cityInfo);
                dto.cityInfo = cityInfoDTO;
                dto.id = nextID;
                nextID++;
                list.add(dto);
            }
            restaurants.addAll(list);
        }
        for (RestaurantDTO restaurantDTO : restaurants) {
            System.out.println(restaurantDTO.street);
        }
        return Response.ok(gson.toJson(restaurants)).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("getlist")
    public Response getOurRestaurants() {
        List<RestaurantDTO> restaurants = facade.getAllRestaurants();
        return Response.ok(gson.toJson(restaurants)).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("getname")
    @RolesAllowed({"rest_owner", "admin"})
    public String getName() {
        String user = securityContext.getUserPrincipal().getName();
        return "\"" + user + "\"";
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("getmenu")
    public Response getMenuItems(@QueryParam("id") int id) {
        List<MenuItemDTO> menuItems = facade.getMenuItems(id);
        return Response.ok(gson.toJson(menuItems)).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("getmyrestaurants")
    public Response getMyRestaurants(@QueryParam("owner") String owner) throws NotFoundException {
        List<RestaurantDTO> myRest = facade.getMyRestaurants(owner);
        if (myRest.isEmpty()) {
            throw new NotFoundException("No restaurants are registered on your account.");
        }
        return Response.ok(gson.toJson(myRest)).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("getrestaurant")
    public Response getRestaurant(@QueryParam("id") Integer id) {
        RestaurantDTO myRest = facade.getRestaurant(id);
        return Response.ok(gson.toJson(myRest)).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("getusers")
    public Response getUsers() {
        List<String> users = facade.getUsers();
//        if (persons.isEmpty()) {
//            throw new PersonNotFoundException("Ingen personer fundet.");
//        }
        return Response.ok(gson.toJson(users)).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("getfoodtypes")
    public Response getFoodTypes() {
        List<String> foodTypes = facade.getFoodTypes();
        return Response.ok(gson.toJson(foodTypes)).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("getzipcodes")
    public Response getZipCodes() {
        List<String> zipCodes = facade.getZipCodes();
        return Response.ok(gson.toJson(zipCodes)).build();
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("addfavrest")
    public Response addFavoriteRestaurants(String json) throws NotFoundException {
        System.out.println("Test");
        JsonObject jo = parser.parse(json).getAsJsonObject();
        String userName = jo.get("userName").getAsString();
        Integer restID = jo.get("restID").getAsInt();
        System.out.println("u: " + userName + "r: " + restID);
        facade.addFavRestaurant(restID, userName);
        return Response.ok().build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("getfavrests")
    public Response getFavRests(@QueryParam("userName") String userName) {
        List<FavRestDTO> myRest = facade.getFavRestaurants(userName);
        return Response.ok(gson.toJson(myRest)).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("swapi")
    public String getSwapi() throws IOException {
        String swapitest = facade.getSwapiData();
        return swapitest;
    }

    @PUT
    @Path("editrest")
    //@RolesAllowed("rest_owner")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response editRestaurant(String json) throws NotFoundException {
        JsonObject jo = parser.parse(json).getAsJsonObject();
        CityInfo cityInfo = facade.getCityFromZip(jo.get("zip").getAsString());
        String ownername = jo.get("userName").getAsString();
        User owner = facade.findUser(ownername);
        RestaurantDTO restDTO = new RestaurantDTO(jo.get("restName").getAsString(),
                jo.get("foodType").getAsString(), jo.get("street").getAsString(),
                jo.get("website").getAsString(), jo.get("phone").getAsString(), new CityInfoDTO(cityInfo), owner);
        Restaurant rest = new Restaurant(restDTO);
        rest.setCityInfo(cityInfo);
        facade.editRestaurant(rest, jo.get("id").getAsInt());
        return Response.ok(json).build();
    }

    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    public String deleteRestaurant(@QueryParam("id") Integer id) {
        facade.deleteRestaurant(id);
        String answer = "Restaurant deleted.";
        return "\"" + answer + "\"";
        //return Response.ok().build();
    }

    @POST
    @Path("addrest")
    @RolesAllowed("rest_owner")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addRestaurant(String json) throws NotFoundException {
        JsonObject jo = parser.parse(json).getAsJsonObject();
        Restaurant rest = new Restaurant();
        CityInfo cityInfo = facade.getCityFromZip(jo.get("zip").getAsString());
        rest.setCityInfo(cityInfo);
        User owner = facade.findUser(jo.get("owner").getAsString());
        rest.setOwner(owner);
        rest.setRestname(jo.get("restName").getAsString());
        rest.setPhone(jo.get("phone").getAsString());
        rest.setStreet(jo.get("street").getAsString());
        rest.setWebsite(jo.get("website").getAsString());
        rest.setFoodType(jo.get("foodType").getAsString());
        facade.addRestaurant(rest);
        return Response.ok(json).build();
    }

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
//    
//    @POST
//    @Path("addrest")
//    @RolesAllowed("rest_owner")
//    @Consumes(MediaType.APPLICATION_JSON)
//    @Produces(MediaType.APPLICATION_JSON)
//    public Response addRestaurant(String json) throws NotFoundException {
//        RestaurantDTO restData = gson.fromJson(json, RestaurantDTO.class);
//        if (restData.restName == null || restData.foodType == null || restData.phone == null) {
//            throw new NotFoundException("Please enter a valid restaurant name, foodtype or phone number.");
//        } else if ((restData.restName.length() <= 1)) {
//            throw new NotFoundException("Your restaurant name must be at least 2 characters long.");
//        }
//        System.out.println(restData.toString());
//
//        Restaurant rest = new Restaurant();
//        CityInfo cityInfo = new CityInfo();
//
//        cityInfo.setCity(restData.cityInfo.city);
//        cityInfo.setZip(restData.cityInfo.zip);
//
//        rest.setRestname(restData.restName);
//        rest.setPhone(restData.phone);
//        rest.setStreet(restData.street);
//        rest.setWebsite(restData.website);
//        rest.setFoodType(restData.foodType);
//        rest.setCityInfo(cityInfo);
//        User owner = facade.findUser(restData.owner.getUserName());
//        rest.setOwner(owner);
//
//        facade.addRestaurant(rest);
//        return Response.ok(json).build();
//    }
}
