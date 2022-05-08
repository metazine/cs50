#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <stdbool.h>

bool jpegCheck(uint8_t header[], uint8_t chunk[]);

int main(int argc, char *argv[])
{
    if(argc != 2)
    {
        printf("Usage: ./recover image\n");
        return 1;
    }


    FILE *f = fopen(argv[1], "r");

    uint8_t header[4];
    uint8_t chunk[512];

    while (1)
    {
        fread(header, sizeof(uint8_t), 4, f);
        if (jpegCheck(header, chunk))
        {
            fseek(f, - 4, SEEK_CUR);
            break;
        }

    }

    char filename[50];
    for (int i = 0; i < 50; i++)
    {
        sprintf(filename, "%03i.jpg", i);
        FILE *toWrite = fopen(filename, "wb");

        while (true)
        {
            fread(chunk, sizeof(uint8_t), 512, f);
            fwrite(chunk, sizeof(uint8_t), 512, toWrite);
            if (fgetc(f) == EOF)
                break;
            fseek(f, -1, SEEK_CUR);
            fread(header, sizeof(uint8_t), 4, f);
            fseek(f, -4, SEEK_CUR);
            if(jpegCheck(header, chunk))
            {
                printf("%i\n",i);
                fclose(toWrite);
                break;
            }


        }
    }

}

bool jpegCheck(uint8_t head[], uint8_t chunk[])
{
    if(head[0] == 0xff && head[1] == 0xd8 && head[2] == 0xff && (head[3] & 0xf0) == 0xe0)
    {
        return true;
    }
    else
    {
        return false;
    }

}
