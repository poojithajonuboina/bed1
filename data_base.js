const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("college.db",(err)=>{
    if(err){
        console.log(err.message);
    }else{
        console.log("connected to college.db");
    }
});

db.run(`
    CREATE TABLE IF NOT EXISTS students(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT,
    age INTEGER,
    course TEXT
    )
`,(err)=>{
    if(err){
        console.error(err.message);
    }else{
        console.log("Student table created");
        }
    });

const students =[
    ["vijju","vijju@gmail.com",22,"ECE"],
    ["pooji","pooji@gmail.com",19,"CSE"],
    ["Brahmani","brahmani@gmail.com",19,"AIML"],
    ["pavani","pavani@gmail.com",19,"AIML"],
    ["pujji","pujji@gmail.com",19,"AIML"]

]; 

const sql =`
    INSERT INTO students(name,email,age,course)
    VALUES(?,?,?,?)
    `;
students.forEach((student)=>{
    db.run(sql,student,(err)=>{
        if(err){
            console.error(err.message);
        }
    });
}); 
setTimeout(()=>{
    db.all("SELECT * FROM students",[],(err,rows)=>{
        if(err){
            console.error(err.message);
            return;
        }
        console.log("\n Student Data:");
        console.table(rows);

        db.close();
    });
},500);
