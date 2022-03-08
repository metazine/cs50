# plurality.c

## What is plurality voting
Plurality voting is a system better known as first past the post.
  The person with most votes wins.
  
Each voter gets one vote.

## How it works

User enters the name of the candidates as command line argument

User is then prompted to enter how many voters there will be.

User is then prompted for each voter to enter the name of the candidate they want.
If the user doesn't enter a valid candidate name they are prompted again.

It takes the vote sees what candidate it is for and adds one to their rating in a score array.

At the end the candidate with the most counts in the array wins.

The print winner function then prints the winner.
