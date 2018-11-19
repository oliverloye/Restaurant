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
(0,'male','Chrisbjørn','Munch','chrisbjørn85@somewhere.dk'),
(1,'male','Mannfred','Thygesen','mannfred58@somewhere.dk'),
(2,'female','Pheline','Petersen','pheline84@somewhere.dk'),
(3,'female','Marka','Skov','marka64@somewhere.dk'),
(4,'female','Rosario','Lauritzen','rosario49@somewhere.dk'),
(5,'male','Viliyan','Toft','viliyan21@somewhere.dk'),
(6,'female','Maybritmira','Eskildsen','maybritmira22@somewhere.dk'),
(7,'male','Faheem','Bertelsen','faheem32@somewhere.dk'),
(8,'female','Dimka','Jacobsen','dimka90@somewhere.dk'),
(9,'female','Pingyi','Carlsen','pingyi63@somewhere.dk'),
(10,'male','Roall','Bjerregård','roall49@somewhere.dk'),
(11,'male','Villaz','Nissen','villaz20@somewhere.dk'),
(12,'male','Ny','Frederiksen','ny26@somewhere.dk'),
(13,'female','Elliesofia','Juul','elliesofia85@somewhere.dk'),
(14,'female','Rannveig','Khan','rannveig69@somewhere.dk'),
(15,'male','Jens-Peter','Bech','jens-peter96@somewhere.dk'),
(16,'female','Fauna','Bisgaard','fauna88@somewhere.dk'),
(17,'male','Arian','Sommer','arian25@somewhere.dk'),
(18,'female','Djinvat','Johannsen','djinvat45@somewhere.dk'),
(19,'female','Rifka','Danielsen','rifka34@somewhere.dk'),
(20,'male','Fadi','Bach','fadi42@somewhere.dk'),
(21,'male','Yousof','Toft','yousof31@somewhere.dk'),
(22,'female','Hilan','Mathiasen','hilan32@somewhere.dk'),
(23,'male','Aanis','Iversen','aanis24@somewhere.dk'),
(24,'male','Lenus','Jørgensen','lenus97@somewhere.dk'),
(25,'female','Kankolongo','Lind','kankolongo94@somewhere.dk'),
(26,'female','Abigija','Frederiksen','abigija50@somewhere.dk'),
(27,'male','Karim','Thomsen','karim36@somewhere.dk'),
(28,'female','Dinne','Nørgård','dinne14@somewhere.dk'),
(29,'female','Lareb','Carstensen','lareb52@somewhere.dk'),
(30,'male','Nithilan','Ravn','nithilan21@somewhere.dk'),
