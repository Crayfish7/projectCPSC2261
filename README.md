# projectCPSC2261
Project for Weird

App.js
  This is the backbone file for the server, the frontend sends requests and retrieves JSON data from the database (MongoDB)
  
index.html
  This is the front page of the weirdo site, all it shows is the top two posts of the site. A navigation bar is 
  at the top of the page for moving from page to page.
main.css
  this is the entire ccs of the site, it has all the style which keep the site together.
main.js
  this is the main javascript file which keeps all the frontend to connect to the backend.
post.html
  sends a request to the backend; it creates a JSON element for the database to insert into the message array.
post_success.html
  once the post.html succeeds, a new window pops out and indicates that the data was inserted.
view.html
  shows all the posts created in the database.
