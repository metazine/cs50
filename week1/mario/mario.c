#include <stdio.h>
#include <cs50.h>

int main(void) {
    int height;
    bool drawnGapOnce = false;
    bool drawnRightsideOnce = false;

    do{
        height = get_int("How tall do you want your pyramid to be: ");
    }
    while(height <= 0 || height > 8);

    int drawnHashtags = 0;
    for(int i = 1; i < height + 1; i++) {
        for(int j = 0; j < height + 3; j++) {
            //creates the spaces before the Hashtags
            if (height - i > j) {
                printf(" ");
            }
            //creates the Hashtags on the left side
            else if (height - i <= j && drawnHashtags < i) {
                printf("#");
                drawnHashtags++;
            }
            //creates the gap in the middle
            else if (drawnGapOnce == false) {
                printf("  ");
                drawnGapOnce = true;
            }
            //creates the right side
            else if(drawnRightsideOnce == false){
                for(int x = 0; x < drawnHashtags; x++){
                    printf("#");
                }
                drawnRightsideOnce = true;
            }
        }
        //resetting variables for a new layer
        printf("\n");
        drawnHashtags = 0;
        drawnGapOnce = false;
        drawnRightsideOnce = false;
    }
}
