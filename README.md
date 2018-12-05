# CA3-2

Dette er bare en test!

Mette Rytt &  
Pernille Lørup

Vi har i denne CA3 lavet et quick-start-projekt, som består af 3 seperate projekter; en backend, en web-client applikation og en react native app. 

Backend:
For at starte projektet op med ny data, skal du i backenden sørge for at lave en Persistence unit, med navnet "pu", og connecte den til en tom database.
I din Application config skal du sørge for at have denne import: 
import org.glassfish.jersey.server.filter.RolesAllowedDynamicFeature;
-Hvis den ikke er der, vil projektet ikke køre optimalt. 
For at sætte databasen op, kan du bruge vores dummy-data, som findes i mappen utils og klassen SetupTestUsers. Dette gør du ved bare at køre run i denne klasse. 

I other sources ligger der en mappe med navnet data, hvori der ligger en sql-fil. Kør også denne fil, så der bliver oprettet en ny tabel med noget ekstra dummy data. 

I mappen kaldt facade, ligger der en klasse af samme navn. Inde i facaden, skal du finde metoden getSwapiData og ændre URL'en til din ønskede URL. 

Web-app:
I settings.js skal du ændre URL'en til den passende URL fra din backend, som du får når du kører dit projekt.
Du skal også sørge for at installere nogle forskellige ting gennem din terminal i roden af dit app-projekt:

  npm install 
  
  npm install react-router-dom
  
  npm install react-navigation (evt. npm install bagefter igen)
  
  npm install react-bootstrap-table-next
  
  npm install bootstrap@4.0.0
  
  npm install react-bootstrap-table2-filter
  
  npm install react-bootstrap-table2-paginator
  

Native app:
Du skal gå ind i klassen FetchSite.js og ændre URL'en til en ny ngrok URL. Denne URL finder du ved at gå ind i den mappe/folder, som din ngrok-fil ligger i. Når du er inde i mappen skriver du kommandoen './ngrok http 8084' eller './ngrok http 8080' alt efter hvilken port du kører på. Du skal herefter vælge den øverste URL der hedder forwarding og indsæt i din browser og tilføje dine endpoints - i dette filfælde /api/info/swapi. 










Vi har desværre ikke kunne deploye vores backend, og derfor heller ikke web-app via surge. 
Du kan downloade vores app gennem dette link: https://expo.io/@pernillelorup/ca3-native-app

Den kan godt være lidt langsom til at hente data, så bare giv den et par sekunder. 
