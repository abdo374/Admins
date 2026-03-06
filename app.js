// إعداد Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBq3xB7lhLsXgCe8gxiMix3J1EQdsSaGhI",
  authDomain: "mosabaqa.firebaseapp.com",
  databaseURL: "https://mosabaqa-default-rtdb.firebaseio.com",
  projectId: "mosabaqa",
  storageBucket: "mosabaqa.firebasestorage.app",
  messagingSenderId: "733373390039",
  appId: "1:733373390039:web:5302caddef55299765e492"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();


// تسجيل دخول الأدمن
let currentAdmin = "";

function login(){

let user=document.getElementById("user").value;
let pass=document.getElementById("pass").value;

if(pass === "2026"){   // كلمة السر هي الأساس

currentAdmin = user; // أي اسم يكتبه الأدمن سيتم حفظه

document.getElementById("login").style.display="none";
document.getElementById("adminPanel").style.display="block";

loadStudents();

}else{

alert("كلمة المرور غير صحيحة");

}

}

// تحميل الطلاب
function loadStudents(){

db.ref("students").on("value",(snapshot)=>{

let data=snapshot.val();

let table=document.querySelector("#table tbody");
table.innerHTML="";

for(let id in data){

let student=data[id];

let tr=`
<tr>
<td>${student.name || ""}</td>
<td>${student.sheikh || ""}</td>
<td>${student.parts || ""}</td>
<td>${student.status || ""}</td>
<td>${student.admin || ""}</td>

<td>
<button onclick="acceptStudent('${id}')">قبول</button>
<button onclick="rejectStudent('${id}')">رفض</button>

<button onclick="editStudent(
'${id}',
'${student.name}',
'${student.sheikh}',
'${student.parts}'
)">تعديل</button>

</td>

</tr>
`;

table.innerHTML+=tr;

}

});

}

// إضافة طالب
function addStudent(){

let name=document.getElementById("name").value;
let sheikh=document.getElementById("sheikh").value;
let parts=document.getElementById("parts").value;

if(name==="" || sheikh==="" || parts===""){

alert("اكمل البيانات");

return;

}

db.ref("students").push({

name:name,
sheikh:sheikh,
parts:parts,
status:"قيد المراجعة",
admin:"",
time:new Date().toLocaleString()

});

document.getElementById("name").value="";
document.getElementById("sheikh").value="";
document.getElementById("parts").value="";

}

// قبول الطالب
function acceptStudent(id){

db.ref("students/"+id).update({

status:"مقبول",
admin:currentAdmin,
time:new Date().toLocaleString()

});

}

// رفض الطالب
function rejectStudent(id){

db.ref("students/"+id).update({

status:"مرفوض",
admin:currentAdmin

});

}

// البحث
function searchTable(){

let input=document.getElementById("search").value.toLowerCase();
let rows=document.querySelectorAll("#table tbody tr");

rows.forEach(row=>{

row.style.display=row.innerText.toLowerCase().includes(input) ? "" : "none";

});

}