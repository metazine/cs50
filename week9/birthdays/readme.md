# Birthdays

In this task we had to write part of a <a href="https://flask.palletsprojects.com/en/3.0.x/">Flask</a> application.
It would take in people's names, and their date of birth, and store it in a database.
Underneath the form to take in people's names, it would then display all the names and date of births from the database.

This was the first time I had used Flask, which is a server framework.

It was also my first time taking user input and using it for SQL, and I overlooked escaping a string, or using the built in function for handling user values.
This means that my app was at risk of SQL injection attacks.

I haven't fixed the code, as I wanted to leave it as how I wrote it when I first submitted it in early 2022.
