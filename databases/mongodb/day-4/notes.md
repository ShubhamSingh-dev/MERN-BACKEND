# AGGREGATION IN MONGODB
1. TO WRITE AGGREGATE QUERY
2. A PIPELINE OPERATION
![alt text](image.png)
IT GROUP THE DATA FROM MULTIPLE DOCUMENTS INTO A SINGLE DOCUMENT BASED ON SPECIFIED EXPRESSION
Aggregation Pipeline
The aggregation process in mongodb consists of several stages , each stage transforming the data in some way.
The output of one stage is fed as the input to the next stage and so on until the final stage produces the desired result

### Key Concepts

1. **Pipeline**: A sequence of stages where each stage transforms the data.
2. **Stages**: Each stage in the pipeline performs a specific operation on the data.
3. **Operators**: MongoDB provides various operators like `$match`, `$group`, `$sort`, `$project`, etc.

​
db.collection.aggregate(pipeline , options)
​

### Common Aggregation Stages

- **$match**: Filters documents to pass only those that match the specified condition.
- **$group**: Groups documents by a specified field and can perform operations like sum, average, etc.
- **$sort**: Sorts the documents based on a specified field.
- **$project**: Reshapes each document in the stream, such as by adding or removing fields.
  ​
  db.teachers.aggregate([{$match:{gender:"Male"}}])

//Return all the
​
db.teachers.insertMany([
{ _id: 1, name: "Arun Sharma", age: 45, gender: "Male" },
{ _id: 2, name: "Meena Gupta", age: 39, gender: "Female" },
{ _id: 3, name: "Rajesh Kumar", age: 50, gender: "Male" },
{ _id: 4, name: "Anjali Verma", age: 42, gender: "Female" },
{ _id: 5, name: "Suresh Patil", age: 36, gender: "Male" },
{ _id: 6, name: "Pooja Rani", age: 29, gender: "Female" },
{ _id: 7, name: "Vikram Singh", age: 33, gender: "Male" },
{ _id: 8, name: "Kavita Das", age: 40, gender: "Female" },
{ _id: 9, name: "Amit Trivedi", age: 47, gender: "Male" },
{ _id: 10, name: "Nisha Jain", age: 35, gender: "Female" },
{ _id: 11, name: "Rakesh Bhardwaj", age: 38, gender: "Male" },
{ _id: 12, name: "Smita Bansal", age: 31, gender: "Female" },
{ _id: 13, name: "Harish Chand", age: 49, gender: "Male" },
{ _id: 14, name: "Swati Mehta", age: 28, gender: "Female" },
{ _id: 15, name: "Deepak Joshi", age: 37, gender: "Male" },
{ _id: 16, name: "Sunita Sharma", age: 41, gender: "Female" },
{ _id: 17, name: "Ashok Singh", age: 44, gender: "Male" },
{ _id: 18, name: "Priya Kapoor", age: 34, gender: "Female" },
{ _id: 19, name: "Manoj Deshmukh", age: 48, gender: "Male" },
{ _id: 20, name: "Ritu Agarwal", age: 30, gender: "Female" }
]);
​
Group Teachers by age
db.teachers.aggregate([{$group:{_id:"$age"}}])
​
the $group operator groups documents by the age field , creating a new documents for each unique age value
the _id field in the group stage specifies the field based on which the documents will be grouped 
 Group teacher by age and show all teachers names per age group
db.teachers.aggregate([{$group:{\_id:"$age" , names:{$push:"$name"}}}])
​
$group:{\_id:expression,field1:expression , field2:expression , ...}
​
this Teachernames field uses the $push operator to add the name fields from each document in the group to an array
Group teachers by age and also show complete documents per age group
db.teachers.aggregate([{$group:{\_id:"$age" , students:{$push:"$$ROOT"}}}])
​
Give a count per age of male teacher
db.teachers.aggregate([{$match:{gender:"Male"}},{$group:{_id:"$age" , number:{$sum:1}}}])
​

Give a count per age of male students and sort them by count in desc manner
db.teachers.aggregate([{$match:{gender:"Male"}},{$group:{_id:"$age" , number:{$sum:1}}} , {$sort:{number:-1}}])
​
We can create pipeline as much as we want
Find Hobbies per age group
db.students.insertMany([
{
name: "Aakash Mehra",
hobbies: ["Reading", "Cycling", "Coding"],
identity: { hasPancard: true, hasAdharcard: true },
bio: "Passionate learner and aspiring software developer.",
experience: { company: "TechWorld", duration: "6 months", neglect: false },
age: 22
},
{
name: "Sanya Gupta",
hobbies: ["Painting", "Dancing"],
identity: { hasPancard: false, hasAdharcard: true },
bio: "Creative thinker with a love for art and technology.",
experience: { company: "CreativeHub", duration: "3 months", neglect: false },
age: 21
},
{
name: "Rohan Verma",
hobbies: ["Gaming", "Traveling"],
identity: { hasPancard: true, hasAdharcard: false },
bio: "Enthusiastic gamer and travel blogger.",
experience: { company: "GameZone", duration: "1 year", neglect: false },
age: 23
},
{
name: "Pooja Sharma",
hobbies: ["Cooking", "Gardening", "Yoga"],
identity: { hasPancard: true, hasAdharcard: true },
bio: "Health and wellness advocate, sharing positivity.",
experience: { company: "GreenLife", duration: "8 months", neglect: false },
age: 25
},
{
name: "Karan Desai",
hobbies: ["Photography", "Blogging"],
identity: { hasPancard: true, hasAdharcard: true },
bio: "Capturing moments and turning them into stories.",
experience: { company: "PhotoSnap", duration: "1 year", neglect: false },
age: 24
},
{
name: "Isha Anand",
hobbies: ["Sketching", "Music", "Reading"],
identity: { hasPancard: false, hasAdharcard: true },
bio: "Art lover exploring the intersections of creativity and technology.",
experience: { company: "Artify", duration: "5 months", neglect: false },
age: 20
},
{
name: "Amit Raj",
hobbies: ["Running", "Chess"],
identity: { hasPancard: true, hasAdharcard: false },
bio: "Logical thinker with a knack for problem-solving.",
experience: { company: "SmartMove", duration: "4 months", neglect: false },
age: 22
},
{
name: "Neha Singh",
hobbies: ["Writing", "Photography"],
identity: { hasPancard: false, hasAdharcard: true },
bio: "Exploring the world through words and visuals.",
experience: { company: "WriteItUp", duration: "7 months", neglect: false },
age: 23
},
{
name: "Vivek Tiwari",
hobbies: ["Coding", "Robotics"],
identity: { hasPancard: true, hasAdharcard: true },
bio: "Tech enthusiast focused on creating smart solutions.",
experience: { company: "RoboTech", duration: "2 years", neglect: false },
age: 26
},
{
name: "Anjali Chawla",
hobbies: ["Baking", "Crafting"],
identity: { hasPancard: false, hasAdharcard: true },
bio: "Turning passion into delicious art.",
experience: { company: "BakeHouse", duration: "1 year", neglect: false },
age: 22
}
]);
​
db.students.aggregate([{$group:{_id:"$age" , hobbies:{$push:"$hobbies"}}}])
​
$unwind
 db.students.aggregate([{$unwind:"$hobbies"},{$group:{\_id:"$age" , hobbies:{$push:"$hobbies"}}}])
​
Find number of students per each hobbies
 db.students.aggregate([{$unwind:"$hobbies"},{$group:{\_id:"$hobbies" , count:{$sum:1}}}])
​
Find Average age of all students
db.students.aggregate([{$group:{_id:null , averageAge:{$avg:"$age"}}}])
​
if you specify \_id:null in the $group operator , it means that all the documents in the collection will be grouped together into a single group
Find the total number of hobbies for all the students in a collection
db.students.aggregate([{$unwind:"$hobbies"},{$group:{\_id:null , count:{$sum:1}}}])
​
second way
db.students.aggregate([{$group:{\_id:null , count:{$sum:{$size:"$hobbies"}}}}])
​
third way
 db.students.aggregate([
...   {
...     $addFields: {
...       hobbiesCount: { $size: { $ifNull: ["$hobbies", []] } }
... }
... },
... {
... $group: {
...       _id: null,
...       count: { $sum: "$hobbiesCount" }
... }
... }
... ]);
​
List all hobbies
db.students.aggregate([{$unwind:"$hobbies"},{$group:{_id:null , allHabit:{$push:"$hobbies"}}}])
​
$addToSet
db.students.aggregate([{$unwind:"$hobbies"},{$group:{\_id:null , allHabit:{$addToSet:"$hobbies"}}}])
​
$FILTER 
$filter:{
input:<array Expression>,
as:<identifier>,
cond:<expression>
}
​
Input : Specifies the array expression to filter
as: Specifies a variable name that can be used inside the condition expression to reference the current element of the input array.
condition: Specifies the condition that must be met in order for an element to be included in the result set. The Expression must return either true or false.
db.studentMarks.insertMany([
{
name: "Rahul Gupta",
age: 21,
scores: [95, 88, 76, 65, 89] x
},
{
name: "Ananya Sharma",
age: 19,
scores: [78, 85, 90, 72, 80] y
},
{
name: "Vikram Singh",
age: 22,  
 scores: [65, 70, 68, 85, 75] x
},
{
name: "Meera Nair",
age: 20,
scores: [88, 92, 81, 74, 69]
},
{
name: "Siddharth Rao",
age: 23,
scores: [91, 84, 79, 82, 87] x
}
]);

[x,x,x,y] =

​
Find average of scores for students whose age is greater than 20.
db.studentMarks.aggregate([
{
$addFields: {
      filteredScores: {
        $filter: {
          input: "$scores",
as: "score",
cond: { $gt: ["$age", 20] } // Filter logic here
}
}
}
},
{
$group: {
      _id: null,
      avgScore: { $avg: { $avg: "$filteredScores" } }
}
}
]);
