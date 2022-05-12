// Implements a dictionary's functionality
// Credit goes to Dan Bernstein for creating the hash I am using called the djb2 hash

#include <stdlib.h>
#include <stdbool.h>
#include <stdio.h>
#include <string.h>
#include <ctype.h>

#include "dictionary.h"

// Represents a node in a hash table
typedef struct node
{
    char word[LENGTH + 1];
    struct node *next;
}
node;

// Number of buckets in hash table (2 ^ 18)

const unsigned int N = 65357;

// Hash table
node *table[N];

// Returns true if word is in dictionary, else false
bool check(const char *word)
{
  int wordLength = strlen(word);
	char *lowercasedWord = malloc(sizeof(char) * (wordLength + 1));
	for (int i = 0; i < wordLength + 1; i++)
	{
		lowercasedWord[i] =  tolower(word[i]);
	}

	unsigned int wordHash = hash(lowercasedWord);
	int wordHashIndex = wordHash % N;

	if (table[wordHashIndex] != NULL)
	{
		node *head = table[wordHashIndex];

		while (strcmp(head->word, lowercasedWord) != 0)
		{
			if (head->next == NULL)
			{
				free(lowercasedWord);
				return false;
			}
			head = head->next;
		}
		free(lowercasedWord);
		return true;
	}

	free(lowercasedWord);
    return false;
}

// Hashes word to a number
unsigned int hash(const char *word)
{
    // Using Dan Bernstein's djb2 hashing algorithm

	unsigned int hash = 5381;
	int wordlen = strlen(word);
	for (int i = 0; i < wordlen; i++)
	{
		hash = ((hash << 5) + hash) + word[i];
	}

	// TODO
    return hash;
}

// Loads dictionary into memory, returning true if successful, else false
bool load(const char *dictionary)
{
    // TODO
	FILE *dictFile = fopen(dictionary, "r");
	if (dictFile == NULL)
	{
		return false;
	}
	for (int i = 0; i < N; i++)
	{
		table[i] = NULL;
	}
	char word[LENGTH + 1];


	int count = 0;
	while (fgetc(dictFile) != EOF)
	{
		fseek(dictFile, -1, SEEK_CUR);
		for(int i = 0; i <= LENGTH; i++)
		{
			word[i] = fgetc(dictFile);
			if (word[i] == '\n')
			{
				word[i] = '\0';
				break;
			}
		}
		// char word contains full words here
		count ++;
		unsigned int wordHash = hash(word);

		int wordHashIndex = wordHash % N;

		node *pointerToFirstItemInHash = table[wordHashIndex];

		node *wordNode = malloc(sizeof(node));
		wordNode->next = pointerToFirstItemInHash;

    	for (int i = 0; i < strlen(word); i++)
		{
			wordNode->word[i] = word[i];
		}
		wordNode->word[strlen(word) + 1] = '\0';
		table[wordHashIndex] = wordNode;
	}
	fclose(dictFile);
	return true;
}

// Returns number of words in dictionary if loaded, else 0 if not yet loaded
unsigned int size(void)
{
	int count = 0;
	for (int i = 0; i < N; i ++)
	{
		if (table[i] != NULL)
		{
			count++;
			node *head = table[i];
			while (head->next != NULL)
			{
				count++;
				head = head->next;
			}
		}
	}
	return count;
	// TODO

}

// Unloads dictionary from memory, returning true if successful, else false
bool unload(void)
{
	int largestCount = 0;
	for (int i = 0; i < N; i++)
	{
		int count =0;
		if(table[i] != NULL)
		{
			node *head = table[i];
			node *tmp = head;
			while (head != NULL)
			{
				head = head->next;
				free (tmp);
				tmp = head;
				count++;
			}
			if (count > largestCount)
			{
				largestCount = count;
			}
		}
	}
	// TODO
    return true;
}
