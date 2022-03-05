
#include <cs50.h>
#include <stdio.h>
#include <string.h>

// Max number of candidates
#define MAX 9

// Candidates have name and vote count
typedef struct
{
    string name;
    int votes;
}
candidate;

// Array of candidates
candidate candidates[MAX];

// Number of candidates
int candidate_count;

// Function prototypes
bool vote(string name);
void print_winner(void);

int main(int argc, string argv[])
{
    // Check for invalid usage
    if (argc < 2)
    {
        printf("Usage: plurality [candidate ...]\n");
        return 1;
    }

    // Populate array of candidates
    candidate_count = argc - 1;
    if (candidate_count > MAX)
    {
        printf("Maximum number of candidates is %i\n", MAX);
        return 2;
    }
    

    for (int i = 0; i < candidate_count; i++)
    {
        candidates[i].name = argv[i + 1];
        candidates[i].votes = 0;
    }

    int voter_count = get_int("Number of voters: ");

    // Loop over all voters
    for (int i = 0; i < voter_count; i++)
    {
        
        string name = get_string("Vote: ");
        bool validVote = false;
        
        // Check for invalid vote
        do
        {
            for (int j = 0; j < candidate_count; j++)
            {
                if(strcmp(candidates[j].name, name) == 0)
                {
                    validVote = true;
                    vote(name);
                    int debug = candidates[j].votes;
                    break;
                }
                validVote = false;
            }
            if (validVote == false) {
                printf("Invalid vote.\n");
                name = get_string("Vote: ");
            }
        }
        while (validVote == false);

    }
    
    // Display winner of election
    print_winner();
}

// Update vote totals given a new vote
bool vote(string name)
{
    for(int i = 0; i < candidate_count; i++)
    {
        if (strcmp(name, candidates[i].name) == 0)
        {
            candidates[i].votes ++;
            return true;
        }
    }
    // TODO
    return false;
}

// Print the winner (or winners) of the election
// Print the winner (or winners) of the election
void print_winner(void)
{
    int mostVotedCandidate[candidate_count];
    mostVotedCandidate[0] = 0;
    int k = 0;
    for (int i = 1; i < candidate_count; i++)
    {
        if (candidates[i].votes > candidates[mostVotedCandidate[0]].votes)
        {
            mostVotedCandidate[0] = i;
            for (int j = 1; j < candidate_count; j++){
                k = 0;
            }
        }
        else if (candidates[i].votes == candidates[mostVotedCandidate[0]].votes)
        {
            k += 1;
            mostVotedCandidate[k] = i;
        }
    }
    
    for (int i = 0; i < k+1; i++)
    {
        printf("%s\n", candidates[mostVotedCandidate[i]].name);
    }
    
    // TODO
    return;
}

