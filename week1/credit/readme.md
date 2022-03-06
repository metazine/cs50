# credit.c
## What it does

This is an algorithm that determines whether or not a credit card number is valid for AMEX, Mastercard and Visa.
  
It can output four different values depending on the number inputted:
* AMEX
* Mastercard
* Visa
* Invalid

# How it works

It follows some basic rules to determine which company distributes the card number

### Visa

* Begins with the number 4
* Is 14 or 16 digits long

### AMEX

* Is 15 digits long
* Starts with either '34' or '37'

### Mastercard

* Is 16 digits long
* Starts with '51', '52', '53', '54', or '55'

## Luhn's algorithm

To work out if a card number is valid:

1. start on the right most digit
2. move left one digit
3. take its value and multiply it by two
4. add the sum of the digits together
5. repeat this for every second digit moving right to left
6. Total all of this together

<pre>
5 1 9 9 9 9 2 3 1 2 6 4 1 4 6 5
^   ^   ^   ^   ^   ^   ^   ^  

6 * 2 = 12 ➡️ 1 + 2 = 3
1 * 2 = 02 ➡️ 0 + 2 = 2
6 * 2 = 12 ➡️ 1 + 2 = 3
1 * 2 = 02 ➡️ 0 + 2 = 2
2 * 2 = 04 ➡️ 0 + 4 = 4
9 * 2 = 18 ➡️ 1 + 8 = 9
9 * 2 = 18 ➡️ 1 + 8 = 9
5 * 2 = 10 ➡️ 1 + 0 = 1

3 + 2 + 3 + 2 + 4 + 9 + 9 + 1 = 33
</pre>

7. Then total together the remaining digits

<pre>
5 1 9 9 9 9 2 3 1 2 6 4 1 4 6 5
  ^   ^   ^   ^   ^   ^   ^   ^
  1 + 9 + 9 + 3 + 2 + 4 + 4 + 5 = 37
</pre>

8. Total your totals and divide them by 10
9. If you are left with an integer then you have a valid credit card number.
10. Otherwise it is invalid

<pre>
33 + 37 = 60

60 / 10 = 6

6 is an integer
Number is valid!
</pre>
