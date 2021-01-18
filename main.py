import random
import os


def show_results(password_list, number_of_options, number_of_words):
    os.system('clear')
    print("--[ Random Passphrase Generator ]--\n")

    if int(number_of_options) > 1:
        print("[ Results ]")

        group_iterator = 1
        array_iterator = 0

        while group_iterator <= number_of_options:
            words_to_print = group_iterator * number_of_words
            print("\nGroup", str(group_iterator) + ":")
            while array_iterator < words_to_print:
                print(password_list[array_iterator], end=" ")
                array_iterator += 1
            group_iterator += 1
        print("\n")

    else:
        result = ""
        for word in range(len(password_list)):
            result += password_list[word] + " "
        print("Result:", result + "\n")


def match_words(generated_rolls, number_of_options, number_of_words):
    list_file = open("eff_list.txt", "r")
    word_list = list_file.readlines()
    list_file.close()
    new_password = []

    for entry in range(len(generated_rolls)):
        for word in word_list:
            if generated_rolls[entry] in word:
                trimmed_word = word.split("\t")
                trimmed_word = trimmed_word[1]
                trimmed_word = trimmed_word.split("\t")
                trimmed_word = trimmed_word[0]
                trimmed_word = trimmed_word.split("\n")
                trimmed_word = trimmed_word[0]
                new_password.append(trimmed_word)

    show_results(new_password, number_of_options, number_of_words)


def generate_numbers(number_of_options, number_of_words):
    generated_rolls = []
    group_total = 5

    for option in range(number_of_options):
        for roll in range(number_of_words):
            roll_group = ""
            for roll_value in range(group_total):
                roll_group = roll_group + str(random.randint(1, group_total))
            generated_rolls.append(roll_group)

    match_words(generated_rolls, number_of_options, number_of_words)


def password_generator():
    os.system('clear')
    input_check1 = False
    input_check2 = False
    number_of_words = 0
    number_of_options = 0

    print("--[ Random Passphrase Generator ]--\n")

    while (input_check1 != True):
        try:
            number_of_words = int(input("How many words in the passphrase? "))
            if (number_of_words > 0):
                input_check1 = True
        except ValueError:
            print('Numbers only, please.')

    while (input_check2 != True):
        try:
            number_of_options = int(input("How many passphrases generated? "))
            if (number_of_options > 0):
                input_check2 = True
        except ValueError:
            print('Numbers only, please.')

    generate_numbers(number_of_options, number_of_words)


password_generator()
