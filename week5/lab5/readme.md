# Inheritance

This program was made to produce a potential family tree with people's blood types.

It worked by first by running a create family function.

The `create_family` function would first create a person with an unknown blood type.
An argument saying how many more generations above the newly created person would also be passed to the function.

If there are no more generations then it would give the new person a blood type with two "alleles" picked randomly from "A", "B" or "O".
Then the new person's parent pointers are set to be null.

If there are more generations above it then it calls `create_family()` twice, to make a mother and father.
The newly created person sets their parent pointers to point to the mother and father, and sets their blood type to be randomly chosen from the two parents two alleles.

Once the `create_family()` function finishes running through all its branches, the family tree can then be printed using a `print_family()` function.
`print_family()` recursively goes through the family tree and prints it to stdout using indentation to represent the depth in the tree.


