async function send(){

  let msg=document.getElementById("msg").value;

  document.getElementById("box").innerHTML +=
  "<div class='user'>👤 You: "+msg+"</div>";

  let res=await fetch("api/chat",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({message:msg})
  });

  let data=await res.json();

  document.getElementById("box").innerHTML +=
  "<div class='ai'>🤖 Ashish AI: "+data.reply+"</div>";
}
