CREATE DATABASE IF NOT EXISTS lifestyle_db;
USE lifestyle_db;

-- יצירת טבלת משתמשים
CREATE TABLE IF NOT EXISTS Users (
    ID INT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255), 
    role VARCHAR(50),
    address VARCHAR(255),
    phone_number VARCHAR(20),
    trainer_id INT DEFAULT NULL,
    nutritionist_id INT DEFAULT NULL,
    FOREIGN KEY (trainer_id) REFERENCES Users(ID),
    FOREIGN KEY (nutritionist_id) REFERENCES Users(ID)
);

-- יצירת טבלת בלוגים
CREATE TABLE IF NOT EXISTS Blogs (
    blog_ID INT PRIMARY KEY AUTO_INCREMENT,
    User_ID INT,
    Title VARCHAR(255),
    body TEXT,
    audience_type VARCHAR(50) DEFAULT 'all',
    recipient_client_id INT DEFAULT NULL,
    FOREIGN KEY (User_ID) REFERENCES Users(ID),
    FOREIGN KEY (recipient_client_id) REFERENCES Users(ID)
);

-- יצירת טבלת משימות
CREATE TABLE IF NOT EXISTS  Tasks (
    Task_ID INT PRIMARY KEY AUTO_INCREMENT,
    Body varchar(255),
    Title varchar(255),
    manager_ID INT,
    client_ID INT,
    completed BOOLEAN,
    FOREIGN KEY (manager_ID) REFERENCES Users(ID),
    FOREIGN KEY (client_ID) REFERENCES Users(ID)
);

-- יצירת טבלת הודעות
CREATE TABLE IF NOT EXISTS Messages (
    message_ID INT PRIMARY KEY AUTO_INCREMENT,
    from_ID INT,
    to_ID INT,
    body TEXT,
    is_read BOOLEAN,
    FOREIGN KEY (from_ID) REFERENCES Users(ID),
    FOREIGN KEY (to_ID) REFERENCES Users(ID),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- יצירת טבלת מעקב תזונה 
CREATE TABLE IF NOT EXISTS FoodLog (
    Table_ID INT PRIMARY KEY AUTO_INCREMENT,
    From_ID INT,
    To_ID INT,
    food VARCHAR(255),
    calories INT,
    date DATE
);

CREATE TABLE IF NOT EXISTS Notifications (
    Task_ID INT PRIMARY KEY AUTO_INCREMENT,
    User_ID INT,
    Manager_ID INT,
    FOREIGN KEY (User_ID) REFERENCES Users(ID),
    FOREIGN KEY (Manager_ID) REFERENCES Users(ID)
);

-- יצירת טבלת קטלוג סרטוני כושר
CREATE TABLE IF NOT EXISTS FitnessVideos (
    video_ID INT PRIMARY KEY AUTO_INCREMENT,
    From_ID INT,
    To_ID INT,
    title VARCHAR(255),
    video_url VARCHAR(255),
    FOREIGN KEY (From_ID) REFERENCES Users(ID),
    FOREIGN KEY (To_ID) REFERENCES Users(ID)
);