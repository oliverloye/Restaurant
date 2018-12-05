package facade;

import dto.FavRestDTO;
import dto.MenuItemDTO;
import dto.RestaurantDTO;
import entity.CityInfo;
import entity.FavRest;
import entity.MenuItem;
import entity.Restaurant;
import entity.Role;
import entity.User;
import exceptions.AuthenticationException;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import jdk.nashorn.internal.runtime.regexp.joni.exception.InternalException;

public class Facade {

    private EntityManagerFactory emf = Persistence.createEntityManagerFactory("pu");

    public Facade(EntityManagerFactory emf) {
        this.emf = emf;
    }

    private EntityManager getEntityManager() {
        return emf.createEntityManager();
    }

    public List<RestaurantDTO> getAllRestaurants() {
        EntityManager em = getEntityManager();
        try {
            em.getTransaction().begin();
            TypedQuery<RestaurantDTO> tq = em.createQuery("Select new dto.RestaurantDTO(r) from Restaurant r", RestaurantDTO.class);
            List<RestaurantDTO> restaurants = tq.getResultList();
            em.getTransaction().commit();
            return restaurants;
        } finally {
            em.close();
        }
    }

    public User getVeryfiedUser(String username, String password) throws AuthenticationException {
        EntityManager em = emf.createEntityManager();
        User user;
        try {
            user = em.find(User.class, username);
            if (user == null || !user.verifyPassword(password)) {
                throw new AuthenticationException("Invalid user name or password");
            }
        } finally {
            em.close();
        }
        return user;
    }

    public List<MenuItemDTO> getMenuItems(int id) {
        EntityManager em = getEntityManager();
        try {
            Restaurant restaurant = em.find(Restaurant.class, id);
            TypedQuery<MenuItemDTO> tq = em.createQuery("Select new dto.MenuItemDTO(m) from MenuItem m where m.restaurant=:rest", MenuItemDTO.class);
            tq.setParameter("rest", restaurant);
            List<MenuItemDTO> menu = tq.getResultList();
            return menu;
        } finally {
            em.close();
        }
    }

    public List<RestaurantDTO> getMyRestaurants(String owner) {
        EntityManager em = getEntityManager();
        try {
            User ownerOfRestaurants = em.find(User.class, owner);
            TypedQuery<RestaurantDTO> tq = em.createQuery("Select new dto.RestaurantDTO(r) from Restaurant r where r.owner=:owner", RestaurantDTO.class);
            tq.setParameter("owner", ownerOfRestaurants);
            List<RestaurantDTO> list = tq.getResultList();
            return list;
        } finally {
            em.close();
        }
    }

    public User addNewUser(User user) throws AuthenticationException {
        EntityManager em = emf.createEntityManager();
        try {
            em.getTransaction().begin();
            em.persist(user);
            em.getTransaction().commit();
        } finally {
            em.close();
        }
        return user;
    }

    public Long getNumberOfUsers() {
        EntityManager em = getEntityManager();
        try {
            Query q = em.createQuery("select count(u) from User u");
            Long count = (Long) q.getSingleResult();
            return count;
        } finally {
            em.close();
        }
    }

    public RestaurantDTO getRestaurantDTO(Integer id) {
        EntityManager em = getEntityManager();
        try {
            em.getTransaction().begin();
            Restaurant rest = em.find(Restaurant.class, id);
            em.getTransaction().commit();
            if (rest != null) {
                RestaurantDTO r = new RestaurantDTO(rest);
                return r;
            } else {
                return null;
            }
        } finally {
            em.close();
        }
    }

    public Restaurant getRestaurant(Integer id) {
        EntityManager em = getEntityManager();
        try {
            Restaurant rest = em.find(Restaurant.class, id);
            return rest;
        } finally {
            em.close();
        }
    }

    public Restaurant editRestaurant(Restaurant r, Integer id) {
        EntityManager em = getEntityManager();
        try {
            Restaurant rest = em.find(Restaurant.class, id);
            rest.setCityInfo(r.getCityInfo());
            rest.setFoodType(r.getFoodType());
            rest.setOwner(r.getOwner());
            rest.setPhone(r.getPhone());
            rest.setRestname(r.getRestname());
            rest.setStreet(r.getStreet());
            rest.setWebsite(r.getWebsite());
            em.getTransaction().begin();
            em.merge(rest);
            em.getTransaction().commit();
            return rest;
        } finally {
            em.close();
        }
    }

    public MenuItem editMenuItem(MenuItem mi, Integer id) {
        EntityManager em = getEntityManager();
        try {
            MenuItem item = em.find(MenuItem.class, id);
            item.setItemName(mi.getItemName());
            item.setDescription(mi.getDescription());
            item.setPrice(mi.getPrice());
            em.getTransaction().begin();
            em.merge(item);
            em.getTransaction().commit();
            return item;
        } finally {
            em.close();
        }
    }

    public void deleteRestaurant(Integer id) {
        EntityManager em = getEntityManager();
        try {
            Restaurant rest = em.find(Restaurant.class, id);
            em.getTransaction().begin();
            em.remove(rest);
            em.getTransaction().commit();
        } finally {
            em.close();
        }
    }

    public void deleteMenuItem(Integer id) {
        EntityManager em = getEntityManager();
        try {
            MenuItem mi = em.find(MenuItem.class, id);
            em.getTransaction().begin();
            em.remove(mi);
            em.getTransaction().commit();
        } finally {
            em.close();
        }
    }

    public Restaurant addRestaurant(Restaurant rest) throws InternalException {
        EntityManager em = getEntityManager();
        try {
            em.getTransaction().begin();
            em.persist(rest);
            em.getTransaction().commit();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            em.close();
        }
        return rest;
    }

    public void addMenuItem(MenuItem mi) {
        EntityManager em = getEntityManager();
        try {
            em.getTransaction().begin();
            em.persist(mi);
            em.getTransaction().commit();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            em.close();
        }
    }

    public MenuItemDTO getMenuItemDTO(Integer id) {
        EntityManager em = getEntityManager();
        try {
            em.getTransaction().begin();
            MenuItem mi = em.find(MenuItem.class, id);
            em.getTransaction().commit();
            if (mi != null) {
                MenuItemDTO miDTO = new MenuItemDTO(mi);
                return miDTO;
            } else {
                return null;
            }
        } finally {
            em.close();
        }
    }

    public User findUser(String username) {
        EntityManager em = getEntityManager();
        try {
            User user = em.find(User.class, username);
            return user;
        } finally {
            em.close();
        }
    }

    public void deleteUser(String username) {
        EntityManager em = getEntityManager();
        try {
            em.getTransaction().begin();
            User user = em.find(User.class, username);
            List<RestaurantDTO> restaurants = getMyRestaurants(username);
            for (int i = 0; i < restaurants.size(); i++) {
                deleteRestaurant(restaurants.get(i).id);
            }
            em.remove(user);
            em.getTransaction().commit();

        } finally {
            em.close();
        }
    }

    public List<String> getUsers() {
        EntityManager em = getEntityManager();
        try {
            List<String> users;
            Role role = new Role("rest_owner");
            Query q = em.createQuery("Select distinct new dto.UserDTO(u) from User u, Role r where u.roleList=:rest_owner");
            q.setParameter("rest_owner", role);
            users = q.getResultList();
            return users;
        } finally {
            em.close();
        }
    }

    public CityInfo getCityFromZip(String zip) {
        EntityManager em = getEntityManager();
        try {
            CityInfo cityInfo = em.find(CityInfo.class, zip);
            return cityInfo;
        } finally {
            em.close();
        }
    }

    public List<String> getFoodTypes() {
        EntityManager em = getEntityManager();
        try {
            List<String> foodTypes;
            Query q = em.createQuery("Select distinct r.foodType from Restaurant r");
            foodTypes = q.getResultList();
            return foodTypes;
        } finally {
            em.close();
        }
    }

    public List<String> getZipCodes() {
        EntityManager em = getEntityManager();
        try {
            List<String> zipCodes;
            Query q = em.createQuery("Select distinct c.zip from CityInfo c");
            zipCodes = q.getResultList();
            return zipCodes;
        } finally {
            em.close();
        }
    }

    public void addFavRestaurant(int restID, String userName) {
        EntityManager em = getEntityManager();
        FavRest fr = new FavRest(restID, userName, "", "");
        try {
            em.getTransaction().begin();
            em.persist(fr);
            em.getTransaction().commit();
        } finally {
            em.close();
        }
    }

    //"select distinct new dto.FavRestDTO(r, f) from Restaurant r, FavRest f where r.id in (select f.restID from FavRest f where f.userName=:userName)"
    public List<FavRestDTO> getFavRestaurants(String userName) {
        EntityManager em = getEntityManager();
        try {
            List<FavRestDTO> list;
            //Query q = em.createQuery("select new dto.FavRestDTO(r, f) from Restaurant r, FavRest f where f.userName=:userName");
            Query q = em.createQuery("select new dto.FavRestDTO(r, f) from Restaurant r, FavRest f where f.userName=:userName and f.restID=r.id");
            q.setParameter("userName", userName);
            list = q.getResultList();
            return list;
        } finally {
            em.close();
        }
    }

    public FavRestDTO getSingleFavRest(String userName, Integer restid) {
        EntityManager em = getEntityManager();
        try {
            FavRestDTO myFav;
            //Query q = em.createQuery("select new dto.FavRestDTO(r, f) from Restaurant r, FavRest f where f.userName=:userName");
            Query q = em.createQuery("select new dto.FavRestDTO(r, f) from Restaurant r, FavRest f where f.userName=:userName and f.restID=:restID and r.id=:restID");
            q.setParameter("userName", userName);
            q.setParameter("restID", restid);
            myFav = (FavRestDTO) q.getSingleResult();
            return myFav;
        } finally {
            em.close();
        }
    }
    
    public FavRest editFavRest(FavRest fr, Integer id, String userName) {
        EntityManager em = getEntityManager();
        try {
            Query q = em.createQuery("select fr from FavRest fr where fr.userName=:userName and fr.restID=:id");
            q.setParameter("userName", userName);
            q.setParameter("id", id);
            FavRest frest = (FavRest) q.getSingleResult();
            frest.setComment(fr.getComment());
            frest.setRating(fr.getRating());
            
            em.getTransaction().begin();
            em.merge(frest);
            em.getTransaction().commit();
            return frest;
        } finally {
            em.close();
        }
    }


    public String getRemoteRestaurants() {

        String result = "Error";
        try {
            //URL url = new URL("https://andreasheick.dk/durumbo/api/info/restaurants");

            URL url = new URL("https://andreasheick.dk/durumbo/api/info/durumborestaurants");
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");
            con.setRequestProperty("Accept", "application/json; charset=UTF-8");
            con.setRequestProperty("User-Agent", "server");
            Scanner scan = new Scanner(con.getInputStream());
            String jsonStr = "";

            while (scan.hasNext()) {
                jsonStr += scan.nextLine();
            }
            scan.close();
            return jsonStr;

        } catch (Exception e) {
//            result = "->Red<-";
        }
        return "\"" + result + "\"";

    }

    public String getSwapiData() throws MalformedURLException, IOException {
        String hostURL = "https://swapi.co/api/people/";
        int numberOfServerCalls = 5;

        ExecutorService executor = Executors.newFixedThreadPool(numberOfServerCalls);
        List<Future<String>> list = new ArrayList<Future<String>>();

        for (int i = 1; i <= numberOfServerCalls; i++) {
            Callable<String> callable = new SwapiHelper(hostURL + i);
            Future<String> future = executor.submit(callable);
            list.add(future);
        }
        List<String> returnList = new ArrayList<>();
        for (Future f : list) {
            try {
                returnList.add(f.get().toString());
            } catch (Exception e) {
            }
        }
        executor.shutdown();
        String returnstring = "[";
        for (int i = 0; i < numberOfServerCalls; i++) {
            returnstring += returnList.get(i);
            returnstring += ",";
        }

        returnstring = returnstring.substring(0, returnstring.length() - 1);
        returnstring += "]";
        return returnstring;
    }

    class SwapiHelper implements Callable {

        private String urlName;

        public SwapiHelper(String urlName) {
            this.urlName = urlName;
        }

        public String getUrlName() {
            return urlName;
        }

        @Override
        public String call() throws Exception {
            String result = "Error";
            try {
                URL url = new URL(urlName);
                HttpURLConnection con = (HttpURLConnection) url.openConnection();
                con.setRequestMethod("GET");
                con.setRequestProperty("Accept", "application/json;charset=UTF-8");
                con.setRequestProperty("User-Agent", "server");
                Scanner scan = new Scanner(con.getInputStream());
                String jsonStr = null;
                if (scan.hasNext()) {
                    jsonStr = scan.nextLine();
                }
                scan.close();
                return jsonStr;

            } catch (Exception e) {
                result = "->Red<-";
            }
            return urlName + "---" + result;
        }
    }
}
