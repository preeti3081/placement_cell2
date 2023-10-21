const Student = require('../model/student');
const Interview = require('../model/interview');
const fs = require('fs');
const fastcsv = require('fast-csv');

//rendering student ejs
module.exports.home = async function(req,res){
    try{
        const interviews = await Interview.find({});
        const student = await Student.find({}).populate('user').populate({path: 'interviews'});
        return res.render('student',{
            title:"Student List",
            student: student,
            interviews: interviews
        });
    }catch(err){
        console.log('Error in fetching student',err);
    }
}

//creating new student
module.exports.create = async function(req,res){
    try{
        // Parse the interviews from the request body and ensure it's an array
        const interviews = Array.isArray(req.body.interviews) ? req.body.interviews : [];

        const newstudent = await Student.create({
            batch: req.body.batch,
            name: req.body.name,
            college: req.body.college,
            placement:req.body.placement,
            dsa: req.body.dsa,
            webd:req.body.webd,
            react: req.body.react,
            interviews: interviews,
            user: req.body.user
        })
        console.log("New student created",newstudent);
        return res.redirect('/student');

    }catch(err){
        console.log('Error in creating student',err);
    }
}
// download report
module.exports.downloadCsv = async function (req, res) {
    try {
        const students = await Student.find({})
        .populate({
            path: 'interviews',
            select : 'company date result',
        })
        

        let data = '';
        let no = 1;
        const csv = [];
        csv.push(['S.No, Name,College, Placement,DSA Score, WebDev Score, React Score, Interviews']);
        for (let student of students) {
            data =
              no +
              ',' +
              student.name +
              ',' +
              student.college +
              ',' +
              student.placement +
              ',' +
              student.dsa +
              ',' +
              student.webd +
              ',' +
              student.react;
            
            if (student.interviews.length > 0) {
                data+= ','+ JSON.stringify(student.interviews);
            
            }
            no++;
            csv += '\n' + data;
    
        const dataFile = fs.writeFile(
        'report/data.csv',
        csv,
        function (error, data) {
          if (error) {
            console.log(error);
            return res.redirect('back');
          }
          console.log('Report generated successfully');
          return res.download('report/data.csv');
        });
    }}catch(err){
        console.log('Error in generating report',err);
        return res.redirect('back');
    }
};