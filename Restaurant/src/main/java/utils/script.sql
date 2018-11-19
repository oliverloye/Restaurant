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
(0,'Indian','867564523','Dhaba','Brogade 45', 'www.dhaba.dk', '4600'),
(1,'Indian','26374891','Kashmir','Viaduktvej 2', 'www.kashmir.dk', '3400'),
(2,'Indian','73125364','Bindia', 'Strandvejen 76', 'www.bindia.dk', '2800'),
(3,'Indian','85962849','Punjab','Jernbanegade 23', 'www.punjab.dk', '3000'),
(4,'Indian','83917264','Golden Indian','Mosevej 2', 'www.goldenindian.dk', '3540'),
(5,'Indian','74659182','Namaste', 'Strandboulevarden 5', 'www.namaste.dk', '4000'),
(6,'American','8823910','Stacys Diner','Søndre havnevej 3', 'www.stacysdiner', '4600'),
(7,'American','62730192','Bones', 'Åboulevard 75', 'www.bones.dk', '2800'),
(8,'American','65648391','Jensens Bøfhus', 'Helsingørvej 33', 'www.jensensboefhus.dk', '3000'),
(9,'American','87968571','Hard Rock Café','Rådhuspladsen 23', 'www.hardrockcafe.dk', '4000'),
(10,'American','63814231','Burger Palace','Vesterbrogade 43', 'www.burgerpalace.dk', '3400'),
(11,'American','99847112','Halifax','Frederikssundvej 97', 'www.halifax.dk', '3540'),
(12,'Chinese','33844912','Zhou','Nørregade 108', 'www.zhou.dk', '4600'),
(13,'Chinese','22738271','Xin Fu','Vestergade 47', 'www.xinfu.dk', '2800'),
(14,'Chinese','74639200','Hai Long','Nørre boulevard 23', 'www.hailong.dk', '3400'),
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
