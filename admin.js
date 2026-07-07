// Ashish AI Studio V4 - Admin Panel

const ADMIN_PASSWORD = "Ashish@2026";

const loginBtn = document.getElementById("loginBtn");
const saveBtn = document.getElementById("saveBtn");

const password = document.getElementById("adminPassword");
const question = document.getElementById("question");
const answer = document.getElementById("answer");

const teachPanel = document.getElementById("teachPanel");
const knowledgeList = document.getElementById("knowledgeList");

// Hide Teach Panel
teachPanel.style.display = "none";

// Login
loginBtn.onclick = () => {

    if(password.value === ADMIN_PASSWORD){

        alert("Login Successful");

        teachPanel.style.display = "block";

    }else{

        alert("Wrong Password");

    }

};

// Load Data
let knowledge = JSON.parse(localStorage.getItem("knowledge")) || [];

showKnowledge();

// Save
saveBtn.onclick = () => {

    if(question.value.trim()==="" || answer.value.trim()===""){

        alert("Please fill all fields");

        return;

    }

    knowledge.push({

        id:Date.now(),

        question:question.value,

        answer:answer.value

    });

    localStorage.setItem("knowledge",JSON.stringify(knowledge));

    question.value="";

    answer.value="";

    showKnowledge();

    alert("Knowledge Saved");

};

// Show Knowledge
function showKnowledge(){

    if(knowledge.length===0){

        knowledgeList.innerHTML="No Knowledge Added";

        return;

    }

    knowledgeList.innerHTML="";

    knowledge.forEach((item,index)=>{

        knowledgeList.innerHTML+=`

        <div class="knowledge-item">

        <h3>Q. ${item.question}</h3>

        <p>${item.answer}</p>

        <button
