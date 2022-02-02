# main

Chatroom Table
columns: [ Title, ID, Author, Password, Authorized Users, Time, Messages = [{user: message}, {user: message}, {user: message}] ]

User Table (enforce unique usernames)
columns: [ username, O-Auth token, favorite chatrooms = ID from Chatroom Table ]



Generate new chatroom window
Features: [ Title, Security Status, Password (if SecurityStatus = Closed) ]

Chatroom Table

Title
David's Room
Nico's Room
Miko's Room
Vincent's Room


Create New Chatroom
CREATE TABLE ${title}_Participants

${title}_Participants

${title}_Messages