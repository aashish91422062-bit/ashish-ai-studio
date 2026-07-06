import fs from "fs";

const file="./data/knowledge.json";

function loadDB(){
  if(!fs.existsSync(file)) return {};
  return JSON.parse(fs.readFileSync(file));
}

function saveDB(db){
  fs.writeFileSync(file, JSON.stringify(db,null,2));
}

async function gemini(msg){

  const prompt="You are Ashish AI. Always respond clearly and helpfully. User: "+msg;

  const res=await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key="+process.env.GEMINI_API_KEY,
    {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        contents:[{parts:[{text:prompt}]}]
      })
    }
  );

  const data=await res.json();

  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
}

export default async function handler(req,res){

  let {message}=req.body;
  let key=message.toLowerCase();

  let db=loadDB();

  if(db[key]){
    return res.json({reply:db[key]});
  }

  let reply=await gemini(message);

  db[key]=reply;
  saveDB(db);

  res.json({reply});
}
