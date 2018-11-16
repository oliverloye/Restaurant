package rest;

import entity.Persons;
import facade.Facade;
import java.util.List;
import javax.persistence.Persistence;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


// This class is really not used, since the method has been moved to DemoResource
@Path("persons")
public class PersonsResource {

    @Context
    private UriInfo context;
    private final Facade facade = new Facade(Persistence.createEntityManagerFactory("pu"));

    @GET
    @Path("pagetest")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getJson(@QueryParam("_start") String _start, @QueryParam("_end") String _end,
            @QueryParam("_sort") String _sort, @QueryParam("_order") String _order) {
        int start = Integer.parseInt(_start);
        int end = Integer.parseInt(_end);
        List<Persons> persons = facade.getByPage(start, end);
        int count = persons.size();
        return Response.ok(persons).header("X-Total-Count", count)
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Expose-Headers", "X-Total-Count").build();
    }
}
