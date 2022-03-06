# credit.c
## What it does

This is an algorithm that determines whether or not a credit card number is valid for AMEX, Mastercard and Visa.
  
It can output four different values depending on the number inputted:
* AMEX
* Mastercard
* Visa
* Invalid

## How it works

It follows some basic rules to determine which company distributes the card number

### Visa

* Begins with the number 4
* Is 14 or 16 digits long

### AMEX

* Is 15 digits long
* Starts with either '34' or '37'

## Mastercard

* Is 16 digits long
* Starts with '51', '52', '53', '54', or '55'
