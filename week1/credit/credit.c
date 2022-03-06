
#include <stdio.h>
#include <cs50.h>
#include <math.h>

int firstTwoNumbers(long creditNumber, int length)
{
    long lengthMinusTwo = pow(10, length - 3);
    long remaining = creditNumber % lengthMinusTwo;
    long firstTwo = (creditNumber - remaining)/ pow(10, length - 2);

    return(firstTwo);
}




int luhnCheck(long creditNumber, int length)
{
    int checkPartOne = 0;
    {
        long findRemainder;
        long newRemainder = 1;
        long prevRemainder = 1;
        int everyOtherNumber;



        for (int i = 0; i < length; i += 2)
        {
            findRemainder = pow(10, i);
            prevRemainder = creditNumber % (findRemainder * 10);
            newRemainder = creditNumber % (findRemainder * 100);
            everyOtherNumber = (newRemainder - prevRemainder)/ (findRemainder * 10);
            if ((everyOtherNumber * 2) > 9)
            {
                everyOtherNumber = 1 + ((everyOtherNumber * 2) % 10);
            }
            else
            {
                everyOtherNumber *= 2;
            }
            checkPartOne += everyOtherNumber;

        }

    }

    int checkPartTwo = 0;
    {
        long findRemainder;
        long newRemainder = 1;
        long prevRemainder = 1;
        int everyOtherNumber;



        for (int i = 0; i < length + 1; i += 2)
        {
            findRemainder = pow(10, i);
            prevRemainder = creditNumber % findRemainder;
            newRemainder = creditNumber % (findRemainder * 10);
            everyOtherNumber = (newRemainder - prevRemainder)/ (findRemainder);

            checkPartTwo += everyOtherNumber;

        }

    }

    int check = checkPartOne + checkPartTwo;
    if ((check % 10) != 0)
    {
        return(false);
    }
    else
    {
        return(true);
    }

}


int main(void)
{
    long creditNumber;
    do
    {
        creditNumber = get_long("Please enter your (fake) credit card number.");
    }
    while(creditNumber <  0);


    string creditType;
    int creditLength;
    for (int i = 0; i < 5; i++){
        long lengthCheck = (pow(10, i))*1000000000000;
        creditLength = i + 13;
        if (lengthCheck  <= creditNumber && creditNumber < (lengthCheck*10))
        {
            if (creditLength != 14)
            {
                break;
            }
            else
            {
                creditType = "INVALID";
            }

        }
    }

    int firstTwo = firstTwoNumbers(creditNumber, creditLength);
    if(creditLength == 15)
    {
        if(firstTwo == 34 || firstTwo == 37)
        {
            creditType = "AMEX";
        }
        else
        {
           creditType = "INVALID";
        }
    }

    else if(creditLength == 16)
    {
        if(firstTwo > 50 && firstTwo < 56)
        {
            creditType = "MASTERCARD";

        }
        else if (((firstTwo - (firstTwo % 10))/10) == 4){
            creditType = "VISA";
        }
        else
        {
            creditType = "INVALID";
        }

    }
    else
    {
        if(((firstTwo - (firstTwo % 10))/10) == 4)
        {
            creditType = "VISA";
        }
        else
        {
            creditType = "INVALID";
        }
    }

    if (luhnCheck(creditNumber, creditLength) == false)
    {
        creditType = "INVALID";
    }

    printf("%s\n", creditType);


}
