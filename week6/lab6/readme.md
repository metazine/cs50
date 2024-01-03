# Tournament

The purpose of this pset was to evaluate the probability of a country's team winning a football tournament.

Each team was given a rating, and then I would perform a calculation to calculate their chance of winning the entire tournament.

To simulate a tournament I'd first have to simulate a round, where each team plays against one other team randomly.
If a team loses, then I discard them and simulate another round and so on until only one team is left.

To calculate who would win a game I would use a magic formula with a random number generator.

Then I would simulate ten thousand tournaments, and take the ratio of wins to tournaments played for each team to get the probability that each team would win.