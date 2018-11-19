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

INSERT INTO CITYINFO (ZIP, CITY) VALUES ('3000', 'Helsingør');
INSERT INTO CITYINFO (ZIP, CITY) VALUES ('4000', 'Roskilde');
INSERT INTO CITYINFO (ZIP, CITY) VALUES ('3540', 'Lynge');
INSERT INTO CITYINFO (ZIP, CITY) VALUES ('2800', 'Lyngby');
INSERT INTO CITYINFO (ZIP, CITY) VALUES ('4600', 'Køge');
INSERT INTO CITYINFO (ZIP, CITY) VALUES ('3400', 'Hillerød');

INSERT INTO restaurant (id,foodtype,phone,restname,street, website,cityinfo_zip) VALUES
(0,'Indian','867564523','Dhaba','Brogade 45', 'www.dhaba.dk', '4600'),
(1,'Indian','26374891','Kashmir','Viaduktvej 2', 'www.kashmir.dk', '3400'),
(2,'Indian','73125364','Bindia', 'Strandvejen 76', 'www.bindia.dk', '2800'),
(3,'Indian','85962849','Punjab','Jernbanegade 23', 'www.punjab.dk', '3000'),
(4,'Indian','83917264','Golden Indian','Mosevej 2', 'www.goldenindian.dk', '3540'),
(5,'Indian','74659182','Namaste', 'Strandboulevarden 5', 'www.namaste.dk', '4000'),
(6,'American','8823910','Stacys Diner','Søndre havnevej 3', 'www.stacysdiner.dk', '4600'),
(7,'American','62730192','Bones', 'Åboulevard 75', 'www.bones.dk', '2800'),
(8,'American','65648391','Jensens Bøfhus', 'Helsingørvej 33', 'www.jensensboefhus.dk', '3000'),
(9,'American','87968571','Hard Rock Café','Rådhuspladsen 23', 'www.hardrockcafe.dk', '4000'),
(10,'American','63814231','Burger Palace','Vesterbrogade 43', 'www.burgerpalace.dk', '3400'),
(11,'American','99847112','Halifax','Frederikssundvej 97', 'www.halifax.dk', '3540'),
(12,'Chinese','33844912','Zhou','Nørregade 108', 'www.zhou.dk', '4600'),
(13,'Chinese','22738271','Xin Fu','Vestergade 47', 'www.xinfu.dk', '2800'),
(14,'Chinese','74639200','Hai Long','Nørre boulevard 23', 'www.hailong.dk', '3400'),
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
