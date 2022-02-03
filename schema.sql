-- works 
CREATE TABLE chatrooms (
  id BIGINT PRIMARY KEY UNIQUE NOT NULL GENERATED ALWAYS AS IDENTITY, 
  chatroom_name VARCHAR(255) NOT NULL, 
  owner_id BIGINT REFERENCES users (id) NOT NULL, 
  is_private BOOLEAN NOT NULL, --to be changed into status: string
  password VARCHAR(255) NOT NULL
);

-- works 
CREATE TABLE messages (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    chatroom_id BIGINT REFERENCES chatrooms (id) NOT NULL ,
    user_id BIGINT REFERENCES users (id) NOT NULL,
    message VARCHAR(255) NOT NULL,
    time_stamp TIMESTAMP NOT NULL
);

-- works 
CREATE TABLE users (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- works 
CREATE TABLE user_chatroom_favorites (
  user_id BIGINT REFERENCES users (id) NOT NULL, 
  chatroom_id BIGINT REFERENCES chatrooms (id) NOT NULL
);