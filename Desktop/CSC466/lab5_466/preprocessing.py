from typing import overload
import matplotlib.pyplot as plt
import numpy as np
from numpy.lib.function_base import average
import pandas as pd
import os
import sys
from num2words import num2words
from decimal import Decimal
from nltk.stem import PorterStemmer
import math
import time


class Vector():
    def __init__(self, index):
        self.index = index
        self.words = []
        self.tf_idf = []
        self.cosine_similarity = []
        self.okapi = []
        self.frequency = []

def get_stopwords_from_file(file):
        with open(file, 'r') as f:
            stopwords = f.read().splitlines()
            #get rid of spaces  
            stopwords = [word.strip() for word in stopwords]
            #lowercase
            stopwords = [word.lower() for word in stopwords]

        return stopwords

def get_stopwords(type):
    #get stopwords from file
    if type == "short":
        stopwords = get_stopwords_from_file("stopwords/stopwords-short.txt")
    elif type == "long":
        stopwords = get_stopwords_from_file("stopwords/stopwords-long.txt")
    elif type == "medium":
        stopwords = get_stopwords_from_file("stopwords/stopwords-medium.txt")
    elif type == "mysql":
        stopwords = get_stopwords_from_file("stopwords/stopwords-mysql.txt")
    elif type == "onix":
        stopwords = get_stopwords_from_file("stopwords/stopwords-onix.txt")
    return stopwords


def get_words_from_file(file, stopwords, stemmer):
    overall_words = []
    with open(file, 'r') as f:
        line = f.read().splitlines()
        for words in line:
            words = words.replace("."," ")
            words = words.replace("-"," ")
            words = words.split()
            #lowercase
            words = [word.lower() for word in words]
            #remove all punctuation
            words = [word.translate(str.maketrans('', '', '!"#$%&\'()*+.,-/:;<=>?@[\\]^_`{|}~')) for word in words]
            #get rid of stop words 
            words = [word for word in words if word not in stopwords]
            #get rid of words with only one letter
            words = [word for word in words if len(word) > 1]
            #number to word conversion
            words = [num2words(word) if word.isdigit() == True else word for word in words]
            #stem words nltk
            if (stemmer == True):
                words = [PorterStemmer().stem(word) for word in words]
            #add to overall_words
            overall_words.extend(words)
    return overall_words

def remove_ds_store(dir):
    #remove .DS_Store
    dir = [dir for dir in dir if dir != ".DS_Store"]
    return dir

def write_groundtruth(groundtruth_overall):
    #write groundtruth_overall to file
    with open("groundtruth_overall.txt", 'w') as f:
        for line in groundtruth_overall:
            f.write(str(line) + "\n")


def get_all_words(stopword_type, stemmer):
    #get stopwords
    stopwords = get_stopwords(stopword_type)
    #get all directories in C50
    c50_dirs = os.listdir("C50")
    #remove .DS_Store   
    c50_dirs = remove_ds_store(c50_dirs)
    #get all directories in c50_dirs
    all_words = []
    vectors = []
    groundtruth_overall = []
    count = 0
    sum_length = 0
    for dir in c50_dirs:
        #get all directories in C50/dir
        c50_dirs_dir = os.listdir("C50/" + dir)
        #remove .DS_Store
        c50_dirs_dir = remove_ds_store(c50_dirs_dir)
        #get all files in C50/dir/dir
        for next_dir in c50_dirs_dir:
            c50_dirs_dir_files = os.listdir("C50/" + dir + "/" + next_dir)
            #remove .DS_Store
            c50_dirs_dir_files = remove_ds_store(c50_dirs_dir_files)
            #get all files in C50/dir/dir/dir
            for file in c50_dirs_dir_files:
                #get all words in file
                #groundtruth_overall.append([file, next_dir])

                vector = Vector(count)
                words = get_words_from_file("C50/" + dir + "/" + next_dir + "/" + file, stopwords, stemmer)

                vector.words = words
                
                #make words a dictionary and set to frequency
                # words_dict = {}
                # for word in words:
                #     words_dict[word] = 0
                # for word in words:
                #     words_dict[word] += 1
                


                vectors.append(vector)
                all_words.extend(words)

                #get length of file
                length = len(words)
                sum_length += length


                count += 1
    
    average_length = sum_length / count
    #get all unique words and sort them
    all_words = list(set(all_words))
    all_words.sort()
    #write_groundtruth(groundtruth_overall)
    return all_words, vectors, average_length

def tf_idf(all_words, vectors, stopword_type):
    #make all_words into a dictionary set to 0
    all_words_dict = dict.fromkeys(all_words, 0)
    #get total number of documents
    total_documents = len(vectors)
    overall_tf_idf = []
    #get tf_idf for each word
    for vector in vectors:
        words_dict = dict.fromkeys(all_words, 0)
        for word in vector.words:
            #add to all_words_dict
            all_words_dict[word] += 1 #word occurs in this document
            #get tf
            tf = vector.words[word] / sum(vector.words.values())
            #get idf
            idf = math.log(total_documents / len(vector.words))
            #get tf_idf
            tf_idf = tf * idf
            #add to words_dict
            words_dict[word] = tf_idf
        x = np.asarray(list(words_dict.values()), dtype=np.float32)
        vector.tf_idf = x
        overall_tf_idf.append(x)

    return all_words_dict, vectors, overall_tf_idf
                
            

def get_frequency_matrix(all_words, stopword_type, vectors):
    for vector in vectors:
        vector.frequency = np.asarray([vector.words.count(word) for word in all_words], dtype=np.float64)
        print(vector.words)
        print(len(vector.frequency))
        sys.exit()

def cosine_similarity(vector1, overall_tf_idf, overall_tf_idf_magnitude):
    #get dot product of vector1 and overall_tf_idf
    dot_product = np.dot(overall_tf_idf, vector1)
    #get magnitude of vector1
    vector1_magnitude = np.linalg.norm(vector1)
    #get magnitude of overall_tf_idf
    #get cosine similarity
    cosine_similarity = dot_product / (vector1_magnitude * overall_tf_idf_magnitude)
    return cosine_similarity


def get_cosine_similarity(vectors, overall_tf_idf):
    #get cosine similarity for each vector
    overall_cosine_similarities = []
    overall_tf_idf_magnitude = np.linalg.norm(overall_tf_idf)
    for vector in vectors:
        x = cosine_similarity(vector.tf_idf, overall_tf_idf, overall_tf_idf_magnitude)
        overall_cosine_similarities.append(x)
        vector.cosine_similarity = x
    return overall_cosine_similarities, vectors
       
def get_okapi_similarity(vectors, overall_tf_idf, all_words_dict, average_length):
    #get okapi similarity for each vector
    k1 = 1.5
    k2 = 500
    b = 0.75
    overall_okapi_similarities = []
    n = len(vectors)
    for vector in vectors:
        for vector2 in vectors:
            okapi_similarity = 0
            for word in vector.words.keys():
                try:
                    vector2.words[word]
                except:
                    continue

                try:
                    vector.words[word]
                except:
                    continue    
                
                okapi_similarity +=  math.log( (n - all_words_dict[word] + 0.5)/(all_words_dict[word] + 0.5) ) * \
                    ( (k1+1) * vector2.words[word]) / (k1 * (1 - b + b * sum(vector2.words.values())/average_length) + vector2.words[word]) * \
                    ( (k2+1) * vector.words[word] ) / (k2 + vector.words[word] )

            overall_okapi_similarities.append(okapi_similarity)
            vector.okapi_similarity = okapi_similarity
        return overall_okapi_similarities, vectors



def main():
    stopword_type = "short"
    stemming = False
    #time
    start_time = time.time()
    all_words, vectors, average_length = get_all_words(stopword_type, stemming) #make sure to add in ability to change short to long stopwords
    #end time
    end_time = time.time()
    print("Time to get all words: " + str(end_time - start_time))
    #start time
    start_time = time.time()
    all_words_dict, vectors, overall_tf_idf = tf_idf(all_words, vectors, stopword_type)
    #end time
    end_time = time.time()
    print("Time to get tf_idf: " + str(end_time - start_time))
    #turn overall_tf_idf into numpy array
    overall_tf_idf = np.asarray(overall_tf_idf, dtype=np.float32)


    #start time
    start_time = time.time()
    vectors = get_frequency_matrix(all_words, stopword_type, vectors)
    #end time
    end_time = time.time()
    print("Time to get frequency matrix: " + str(end_time - start_time))
   
    # #start time
    # start_time = time.time()
    # #get cosine similarity
    # overall_cosine_similarities, vectors = get_cosine_similarity(vectors, overall_tf_idf)
    # #end time
    # end_time = time.time()
    # print("Time to get cosine similarity: " + str(end_time - start_time))

    #start time
    start_time = time.time()
    #get okapi
    okapi_similarities, vectors = get_okapi_similarity(vectors, overall_tf_idf, all_words_dict, average_length)
    #end time
    end_time = time.time()
    print("Time to get okapi similarity: " + str(end_time - start_time))
    


    # print(len(all_words))
    # print(all_words[:1000])
    #frequency_matrix(all_words, stopword_type)

main()