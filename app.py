from flask import Flask, jsonify, request, url_for
from flask_cors import CORS
import pymysql
import os
import requests

app = Flask(__name__)
CORS(app)


@app.route("/")
def index():
    return "user not found"


@app.route("/addexercise", methods=["POST"])
def addExercise():
    baseUrl = "http://192.168.0.38:5000"
    # dbserver = os.getenv("DATASERVER")
    dbserver = "therapy-tracker.c0fjba4pwhsd.us-west-2.rds.amazonaws.com"
    # dbuser = os.getenv("DATAUSER")
    dbuser = "admin"
    # dbpassword = os.getenv("DATAPASSWORD")
    dbpassword = "4s8ecf8of7xj85yn8soehn58ytvs4y5s"
    # dbname = os.getenv("DATABASENAME")
    dbname = "therapytrackerdb"
    conn = pymysql.connect(host=dbserver, user=dbuser,
                           password=dbpassword, database=dbname)
    conn.autocommit(True)
    crsr = conn.cursor()

    json = request.get_json()
    name = json["name"]
    description = json["description"]
    userid = json["user_id"]
    # pwd = json["pwd"]

    sql = "INSERT INTO exercises (name, description) VALUES (%s, %s)"
    crsr.execute(sql, (name, description))
    exerciseid = crsr.lastrowid

    sql = "INSERT INTO user_exercises (user_id, exercise_id) VALUES (%s, %s)"
    crsr.execute(sql, (userid, exerciseid))

    res = requests.post(
        baseUrl + "/" + url_for('fetchExercises'), json={'user_id': userid})

    if res.status_code == 200:
        return jsonify({"exercises": res.json().get("exercises", [])})
    else:
        return jsonify({"error": res})


@app.route("/fetchexercises", methods=["POST"])
def fetchExercises():
    # dbserver = os.getenv("DATASERVER")
    dbserver = "therapy-tracker.c0fjba4pwhsd.us-west-2.rds.amazonaws.com"
    # dbuser = os.getenv("DATAUSER")
    dbuser = "admin"
    # dbpassword = os.getenv("DATAPASSWORD")
    dbpassword = "4s8ecf8of7xj85yn8soehn58ytvs4y5s"
    # dbname = os.getenv("DATABASENAME")
    dbname = "therapytrackerdb"
    conn = pymysql.connect(host=dbserver, user=dbuser,
                           password=dbpassword, database=dbname)
    conn.autocommit(True)
    crsr = conn.cursor()

    json = request.get_json()
    userid = json["user_id"]

    # the incoming call should have the id of the user, returned by the api beforehand...

    # sql = "SELECT (exercise_id) FROM user_exercises WHERE user_id = %s"
    sql = "select e.name, e.description from user_exercises ue join exercises e on ue.exercise_id = e.id where ue.user_id = %s"
    crsr.execute(sql, (userid))
    res = crsr.fetchall()

    # res is now a list of ids, these ids need to  be used to fetch all the exercises and their names and descriptions

    return jsonify({"exercises": res})


@app.route("/login", methods=["POST"])
def login():
    # dbserver = os.getenv("DATASERVER")
    dbserver = "therapy-tracker.c0fjba4pwhsd.us-west-2.rds.amazonaws.com"
    # dbuser = os.getenv("DATAUSER")
    dbuser = "admin"
    # dbpassword = os.getenv("DATAPASSWORD")
    dbpassword = "4s8ecf8of7xj85yn8soehn58ytvs4y5s"
    # dbname = os.getenv("DATABASENAME")
    dbname = "therapytrackerdb"
    conn = pymysql.connect(host=dbserver, user=dbuser,
                           password=dbpassword, database=dbname)
    conn.autocommit(True)
    crsr = conn.cursor()

    json = request.get_json()
    user = json["username"]
    pwd = json["password"]

    # have database check if the incoming user exists
    # if not, ask them to input a password
    # return their name and display it somewhere

    sql = "SELECT id FROM login WHERE username = %s AND password = %s"

    crsr.execute(sql, (user, pwd))
    res = crsr.fetchone()

    return jsonify({"user_row": res})

@app.route("/fetchuser", methods=["POST"])
def fetchUser():
    # dbserver = os.getenv("DATASERVER")
    dbserver = "therapy-tracker.c0fjba4pwhsd.us-west-2.rds.amazonaws.com"
    # dbuser = os.getenv("DATAUSER")
    dbuser = "admin"
    # dbpassword = os.getenv("DATAPASSWORD")
    dbpassword = "4s8ecf8of7xj85yn8soehn58ytvs4y5s"
    # dbname = os.getenv("DATABASENAME")
    dbname = "therapytrackerdb"
    conn = pymysql.connect(host=dbserver, user=dbuser,
                           password=dbpassword, database=dbname)
    conn.autocommit(True)
    crsr = conn.cursor()

    json = request.get_json()
    userid = json["user_id"]


    # have database check if the incoming user exists
    # if not, ask them to input a password
    # return their name and display it somewhere

    sql = "SELECT username FROM login WHERE id = %s"

    crsr.execute(sql, (userid))
    res = crsr.fetchone()

    return jsonify({"user_row": res})

@app.route("/registeruser", methods=["POST"])
def newUser():
    # dbserver = os.getenv("DATASERVER")
    dbserver = "therapy-tracker.c0fjba4pwhsd.us-west-2.rds.amazonaws.com"
    # dbuser = os.getenv("DATAUSER")
    dbuser = "admin"
    # dbpassword = os.getenv("DATAPASSWORD")
    dbpassword = "4s8ecf8of7xj85yn8soehn58ytvs4y5s"
    # dbname = os.getenv("DATABASENAME")
    dbname = "therapytrackerdb"
    conn = pymysql.connect(host=dbserver, user=dbuser,
                           password=dbpassword, database=dbname)
    conn.autocommit(True)
    crsr = conn.cursor()
    json = request.get_json()
    user = json["username"]
    pwd = json["password"]

    sql = "INSERT INTO login (username, password) VALUES (%s, %s)"
    crsr.execute(sql, (user, pwd))
    userid = crsr.lastrowid

    # sql = "SELECT username FROM login WHERE id = %s"
    # crsr.execute(sql, (userId))
    # res = crsr.fetchone()

    return jsonify({"userid": userid})


if __name__ == "__main__":
    # app.run()
    app.run(host='0.0.0.0', port=5000)
