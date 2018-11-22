CREATE TABLE CITYINFO (ZIP VARCHAR(255) NOT NULL, CITY VARCHAR(255), PRIMARY KEY (ZIP))
CREATE TABLE RESTAURANT (ID INTEGER AUTO_INCREMENT NOT NULL, FOODTYPE VARCHAR(255), PHONE VARCHAR(255), RESTNAME VARCHAR(255), STREET VARCHAR(255), WEBSITE VARCHAR(255), CITYINFO_ZIP VARCHAR(255), OWNER_user_name VARCHAR(25), PRIMARY KEY (ID))
CREATE TABLE MENUITEM (ID INTEGER AUTO_INCREMENT NOT NULL, DESCRIPTION VARCHAR(255), ITEMNAME VARCHAR(255), PRICE INTEGER, RESTAURANT_ID INTEGER, PRIMARY KEY (ID))
CREATE TABLE role (role_name VARCHAR(20) NOT NULL, PRIMARY KEY (role_name))
CREATE TABLE user (user_name VARCHAR(25) NOT NULL, user_pass VARCHAR(255), PRIMARY KEY (user_name))
CREATE TABLE user_roles (role_name VARCHAR(20) NOT NULL, user_name VARCHAR(25) NOT NULL, PRIMARY KEY (role_name, user_name))
ALTER TABLE RESTAURANT ADD CONSTRAINT FK_RESTAURANT_OWNER_user_name FOREIGN KEY (OWNER_user_name) REFERENCES user (user_name)
ALTER TABLE RESTAURANT ADD CONSTRAINT FK_RESTAURANT_CITYINFO_ZIP FOREIGN KEY (CITYINFO_ZIP) REFERENCES CITYINFO (ZIP)
ALTER TABLE MENUITEM ADD CONSTRAINT FK_MENUITEM_RESTAURANT_ID FOREIGN KEY (RESTAURANT_ID) REFERENCES RESTAURANT (ID)
ALTER TABLE user_roles ADD CONSTRAINT FK_user_roles_user_name FOREIGN KEY (user_name) REFERENCES user (user_name)
ALTER TABLE user_roles ADD CONSTRAINT FK_user_roles_role_name FOREIGN KEY (role_name) REFERENCES role (role_name)
