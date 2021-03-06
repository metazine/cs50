#include <cs50.h>
#include <stdio.h>
#include <string.h>


// Max number of candidates
#define MAX 9

// preferences[i][j] is number of voters who prefer i over j
int preferences[MAX][MAX];

// locked[i][j] means i is locked in over j
bool locked[MAX][MAX];

// Each pair has a winner, loser
typedef struct
{
    int winner;
    int loser;
}
pair;

// Array of candidates
string candidates[MAX];
pair pairs[MAX * (MAX - 1) / 2];

int pair_count;
int candidate_count;

// Function prototypes
bool vote(int rank, string name, int ranks[]);
void record_preferences(int ranks[]);
void bubbleSort(int n);
void add_pairs(void);
void sort_pairs(void);
void lock_pairs(void);
bool find_cycles(int startPosition[], int lastPosition[], int pairsLocked);
void print_winner(void);

int main(int argc, string argv[])
{
    // Check for invalid usage
    if (argc < 2)
    {
        printf("Usage: tideman [candidate ...]\n");
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
        candidates[i] = argv[i + 1];
    }

    // Clear graph of locked in pairs
    for (int i = 0; i < candidate_count; i++)
    {
        for (int j = 0; j < candidate_count; j++)
        {
            locked[i][j] = false;
        }
    }

    pair_count = 0;
    int voter_count = get_int("Number of voters: ");

    // Query for votes
    for (int i = 0; i < voter_count; i++)
    {
        // ranks[i] is voter's ith preference
        int ranks[candidate_count];

        // Query for each rank
        for (int j = 0; j < candidate_count; j++)
        {
            string name = get_string("Rank %i: ", j + 1);

            if (!vote(j, name, ranks))
            {
                printf("Invalid vote.\n");
                return 3;
            }
        }

        record_preferences(ranks);

        printf("\n");
    }

    add_pairs();
    sort_pairs();
    lock_pairs();
    print_winner();
    //for (int i = 0; i < pair_count; i++)
    //{
    //    printf("%i\n", pairs[i].winAmount);
    //}

    return 0;
}

// Update ranks given a new vote
bool vote(int rank, string name, int ranks[])
{
    // TODO
    for (int i = 0; i < candidate_count; i ++)
    {
        if (strcmp(name,candidates[i]) == 0){
            ranks[rank] = i;
            return true;
        }
    }
    return false;
}

// Update preferences given one voter's ranks
void record_preferences(int ranks[])
{
    for(int i = 0; i < candidate_count; i ++)
    {
        for(int j = i + 1; j < candidate_count; j++)
        {
            preferences[ranks[i]][ranks[j]]++;
        }
    }

    // TODO
    return;
}

// Record pairs of candidates where one is preferred over the other
void add_pairs(void)
{
    pair_count = 0;

    for (int i = 0; i < candidate_count; i++)
    {
        for (int j = 0; j < candidate_count; j++)
        {
            if (preferences[i][j] > preferences[j][i])
            {
                pairs[pair_count].winner = i;
                pairs[pair_count].loser = j;
                pair_count ++;
            }
        }
    }
    // TODO
    return;
}

// Sort pairs in decreasing order by strength of victory
void sort_pairs(void)
{
    bubbleSort(pair_count);
}

void bubbleSort(int n)
    {
        int swapCount = 0;
        //bubble sort (small number of things I need to sort and takes low time to implement)
        for (int i = 0; i < n - 1; i++)
        {
            if (preferences[pairs[i].winner] - preferences[pairs[i].loser] <
            preferences[pairs[i + 1].winner] - preferences[pairs[i + 1].loser])
            {
                int tempStore = pairs[i + 1].winner;
                pairs[i + 1].winner = pairs[i].winner;
                pairs[i].winner = tempStore;

                tempStore = pairs[i + 1].loser;
                pairs[i + 1].loser = pairs[i].loser;
                pairs[i].loser = tempStore;

                swapCount++;
            }
        }

        if(swapCount != 0)
            bubbleSort(n - 1);
    }

// Lock pairs into the candidate graph in order, without creating cycles
void lock_pairs(void)
{
    int pairsLocked = 0;
    for (int i = 0; i < pair_count; i++)
    {
        locked[pairs[i].winner][pairs[i].loser] = true;

        pairsLocked ++;

        int startPosition[2];
        startPosition[0] = pairs[i].winner;
        startPosition[1] = pairs[i].loser;

        if (find_cycles(startPosition, startPosition, pairsLocked))
        {
            locked[pairs[i].winner][pairs[i].loser] = false;
        }
    }
    // TODO
    return;
}

bool find_cycles(int startPosition[], int lastPosition[], int pairsLocked)
{
    for (int i = 0; i < candidate_count; i++)
    {
        if (locked[lastPosition[1]][i])
            {
                int currentPosition[2];
                currentPosition[0] = lastPosition[1];
                currentPosition[1] = i;

                if(currentPosition[0] == startPosition[0] && currentPosition[1] == startPosition[1])
                {
                    return true;
                }
                if(find_cycles(startPosition, currentPosition, pairsLocked))
                {
                    return true;
                }
            }
    }
    return false;
}
// Print the winner of the election
void print_winner(void)
{
    int source;
    for (int i = 0; i < candidate_count; i++)
    {
        
        for (int j = 0; j < candidate_count; j++)
        {
            if (locked[j][i])
            {
                break;
            }
            else if (j + 1 == candidate_count)
            {
                source = i;
            }
        }
    }
    printf("%s\n", candidates[source]);
    // TODO
    return;
}
