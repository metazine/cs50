#include <ctype.h>
#include <cs50.h>
#include <stdio.h>
#include <string.h>
#include <math.h>

int gradeTest(string text);


int main(void)
{
    string text = get_string("Text: ");
    int grade = gradeTest(text);
    if (grade > 15)
    {
        printf("Grade 16+\n");
    }
    else if (grade < 2)
    {
        printf("Before Grade 1\n");
    }
    else
    {
    printf("Grade %i\n", grade);
    }
}

int gradeTest(string text)
{

    float letters = 0;
    float sentences = 0;
    float words = 1;
    {

        char sentenceChars[3] = {'.', '?', '!'};
        int textLength = strlen(text);

        for (int i = 0 ; i < textLength ; i++)
        {
            //lower case ascii = 97 --> 122 //upper case ascii = 65 --> 90
            char lowerChar = tolower(text[i]);
            if (97 <= lowerChar && lowerChar <= 122)
            {
                letters++;
            }
            else if(lowerChar == ' ')
            {
                words++;
            }
            else
            {
                for(int j = 0; j < 3; j++)
                {
                    if (lowerChar ==  sentenceChars[j])
                    {
                        sentences++;
                        break;
                    }
                }
            }
        }
    }

    printf("letters %f\nwords %f\n sentences %f\n", letters, words, sentences);
    

    float L = letters / words * 100.0;
    float S = sentences / words * 100.0;

    int index = round(0.0588 * L - 0.296 * S - 15.8);

    return index;
}
