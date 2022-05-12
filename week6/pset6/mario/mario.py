from cs50 import get_int

def main():
    while True:
        height = get_int("Height: ")
        if height <= 8 and height > 0:
            break

    drawPyramid(height)

def drawPyramid(height):
    for i in range(height):
        print(" " * (height - (i + 1)) + "#" * (i + 1), end = '')
        print("  ", end = '')
        print("#" * (i + 1))

main()
