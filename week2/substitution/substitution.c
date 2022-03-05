#include <ctype.h>
#include <cs50.h>
#include <stdio.h>
#include <string.h>


int main(int argc, char * argv[])
{
    bool valid;

    if (argc == 2 && argv[1][26] != '\0') {
        valid = false;
        printf("Key must contain 26 characters.\n");
        return 1;
    }
    else if (argc != 2)
    {
        valid = false;
        printf("Usage: ./substitution key\n");
        valid = false;
        return 1;
    }
    else
    {
        valid = true;
    }
    
    for (int i = 0; i < strlen(argv[1]); i++) 
    {
        int alphabetical = isalpha(argv[1][i]);
        if(alphabetical == 0)
        {
            printf("You must use letters not any symbols.\n");
            return 1;
        }
        for(int j = 0; j < strlen(argv[1]); j++)
        {
            if(tolower(argv[1][i]) == tolower(argv[1][j]) && i != j)
            {
                printf("You can't have repeated letters in your key.\n");
                return 1;
            }
        }
    }

    char * plainText = get_string("plaintext: ");

    char cipherText[strlen(plainText)];
    {
        for (int i = 0; i <= strlen(plainText) + 1; i++)
        {
            if (plainText[i] >= 97 && plainText[i] <= 122)
            {
                int position = plainText[i] - 97;
                char encryptedChar = tolower(argv[1][position]);
                cipherText[i] = encryptedChar;
                char debug = cipherText[i]; 
            }
            else if(plainText[i] >= 65 && plainText[i] <= 90)
            {
                int position = plainText[i] - 65;
                char encryptedChar = toupper(argv[1][position]);
                cipherText[i] = encryptedChar;
            }
            else
            {
                cipherText[i] = plainText[i];
            }
            
        }
    }
    if (valid == true) {
        printf("ciphertext: %s\n", cipherText);
        return 0;
    }
}
