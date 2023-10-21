const Student = require('../model/student');
const Interview = require('../model/interview');

//rendering interview ejs
module.exports.home = async function(req,res){
  try{
    const students = await Student.find({}); // Fetch students
    const interview = await Interview.find({}).populate('user').populate({path:'student'});
    return res.render('interview',{
      title:"Interview List",
      interview: interview,
      students : students
    })
  }catch(err){
    console.log('Error in fetching interview',err);
  }
  
}

//creating new interview for student
module.exports.create = async function(req,res){

  try{
    const student = await Student.findById(req.body.student);
    if(student){
      const newinterview = await Interview.create({
        date : req.body.date,
        company:req.body.company,
        result:req.body.result,
        student: req.body.student,
        user: req.body.user
      })
      console.log("New interview created",newinterview);

      const stu = await Student.findById(student.id);
      console.log(stu);
      stu.interviews.push(newinterview);
      stu.save();
      return res.redirect('/interview');
    }
    
  }catch(err){
    console.log('Error in creating interview',err);
  }
  
}