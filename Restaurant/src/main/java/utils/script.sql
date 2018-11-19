CREATE TABLE CITYINFO (ZIP VARCHAR(255) NOT NULL, CITY VARCHAR(255), PRIMARY KEY (ZIP));
CREATE TABLE RESTAURANT (ID INTEGER NOT NULL, FOODTYPE VARCHAR(255), PHONE VARCHAR(255), RESTNAME VARCHAR(255), STREET VARCHAR(255), WEBSITE VARCHAR(255), CITYINFO_ZIP VARCHAR(255), PRIMARY KEY (ID));
CREATE TABLE MENUITEM (ID INTEGER NOT NULL, DESCRIPTION VARCHAR(255), ITEMNAME VARCHAR(255), PRICE INTEGER, RESTAURANT_ID INTEGER, PRIMARY KEY (ID));
CREATE TABLE user (user_name VARCHAR(25) NOT NULL, user_pass VARCHAR(255), PRIMARY KEY (user_name));
CREATE TABLE role (role_name VARCHAR(20) NOT NULL, PRIMARY KEY (role_name));
CREATE TABLE user_roles (user_name VARCHAR(25) NOT NULL, role_name VARCHAR(20) NOT NULL, PRIMARY KEY (user_name, role_name));
ALTER TABLE RESTAURANT ADD CONSTRAINT FK_RESTAURANT_CITYINFO_ZIP FOREIGN KEY (CITYINFO_ZIP) REFERENCES CITYINFO (ZIP);
ALTER TABLE MENUITEM ADD CONSTRAINT FK_MENUITEM_RESTAURANT_ID FOREIGN KEY (RESTAURANT_ID) REFERENCES RESTAURANT (ID);
ALTER TABLE user_roles ADD CONSTRAINT FK_user_roles_user_name FOREIGN KEY (user_name) REFERENCES user (user_name);
ALTER TABLE user_roles ADD CONSTRAINT FK_user_roles_role_name FOREIGN KEY (role_name) REFERENCES role (role_name);

INSERT INTO restaurant (id,foodtype,phone,restname,street, website,cityinfo_zip) VALUES
(15,'Vietnamese','72039472','Vietcong','Kongevejen 48','www.vietcong.dk','4600'),
(16,'Vietnamese','75620485','Tonkin','Pilestræde 18','www.tonkin.dk','2800'),
(17,'Vietnamese','92483283','Bahn Mi Temple','Engelsborgvej 53','www.bahnmitemple.dk','3540'),
(18,'Vietnamese','45284959','Spicy Road','Sankt Annæ Alle 33','www.spicyroad.dk','3400'),
(19,'Vietnamese','71829456','Lele Kitchen','Rådhuspladsen 2','www.lelekitchen.dk','3000'),
(20,'Vietnamese','65739284','Bonjour Vietnam','Nørregade 14','www.bonjourvietnam.dk','4000'),
(21,'Italian','47392945','La Perla','Klampenborgvej 34','www.laperla.dk','3540'),
(22,'Italian','73002374','Geronissimo','Winthersgade 90','www.geronissimo.dk','4600'),
(23,'Italian','86720177','Quatro Stagioni','Strædet 7','www.quatrostagioni.dk','2800'),
(24,'Italian','62850024','Pizza Palace','Storetorv 4','www.pizzapalace.dk','3400'),
(25,'Italian','36459923','La Vecchia Signora','Gammelgade 14','www.lavecchiasignora.dk','3000'),
(26,'Italian','82345510','Roma','Torvet 6','www.roma.dk','4000'),
(27,'Chinese','65718234','Beijing','Allegade 33','www.beijing.dk','4000'),
(28,'Chinese','99823477','Five Spice','Roskildevej 18','www.fivespice.dk','3540'),
(29,'Chinese','67829188','China Garden','Stationsvej 28','www.chinagarden.dk','3000');
