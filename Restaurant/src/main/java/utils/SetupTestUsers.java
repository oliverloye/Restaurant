package utils;

import entity.Role;
import entity.User;
import javax.persistence.EntityManager;
import javax.persistence.Persistence;

public class SetupTestUsers {

    public static void main(String[] args) {

        EntityManager em = Persistence.createEntityManagerFactory("pu").createEntityManager();

        // IMPORTAAAAAAAAAANT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // This breaks one of the MOST fundamental security rules in that it ships with default users and passwords
        // CHANGE the three passwords below, before you uncomment and execute the code below
        //throw new UnsupportedOperationException("REMOVE THIS LINE, WHEN YOU HAVE READ WARNING");
        em.getTransaction().begin();
        Role restOwner = new Role("rest_owner");
        Role adminRole = new Role("admin");
        User rest_owner = new User("rest_owner", "test");
        rest_owner.addRole(restOwner);
        User admin = new User("admin", "test");
        admin.addRole(adminRole);
        User both = new User("rest_owner_admin", "test");
        both.addRole(restOwner);
        both.addRole(adminRole);
        em.persist(restOwner);
        em.persist(adminRole);
        em.persist(rest_owner);
        em.persist(admin);
        em.persist(both);
        em.getTransaction().commit();
        System.out.println("PW: " + rest_owner.getUserPass());
        System.out.println("Testing user with OK password: " + rest_owner.verifyPassword("test"));
        System.out.println("Testing user with wrong password: " + rest_owner.verifyPassword("test1"));
        System.out.println("Created TEST Users");

    }

}
