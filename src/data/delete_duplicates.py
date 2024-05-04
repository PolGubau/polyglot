# function that receives a json file with an array of questions, all of them have a title, if any of the questions have the same title AND THE SAME TYPE, the function will delete the duplicates and return the new array of questions

# All fields can be the same but ID or title+type

import json
import sys





def delete_duplicates(questions):
    new_questions = []
    for i in questions:
        if i not in new_questions:# if the question is not in the new array, add it
            
            # check if the ID is in the array

            for j in new_questions:
                if i['id'] == j['id']:
                    # generate a new ID
                    i['id'] = str(int(i['id']) + 1) 
                    break

            # check if any item with the same title and type are already in the new array

            for j in new_questions:
                if i['title'] == j['title'] and i['type'] == j['type']:
                    break
            else:                
                new_questions.append(i)
    return new_questions


# generate a new json file with the new array of questions
def generate_json(new_questions,name='level-1-parsed.json'):
    with open(name, 'w') as file:
        json.dump(new_questions, file)


# read the json file send when running the script via command line (e.g. python delete_duplicates.py level-1.json)

if __name__ == '__main__':
    with open(sys.argv[1], 'r') as file:


         questions = json.load(file)
    new_questions = delete_duplicates(questions)
    generate_json(new_questions,sys.argv[1])
    print('Duplicates deleted')
    print('New file generated')
    print('New file name: level-1-parsed.json')
    print('Number of questions in the new file: ', len(new_questions))
    print('Number of questions in the original file: ', len(questions))
    print('Number of duplicates deleted: ', len(questions) - len(new_questions))

# run the script via command line
# python delete_duplicates.py level-1.json

