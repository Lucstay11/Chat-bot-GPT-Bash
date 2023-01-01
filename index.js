//AUTHOR https://github.com/Lucstay11/Chat-bot-GPT-Bash
var d = new Date();
var hour = d.getHours();
var min = d.getMinutes();
if(hour<10){hour="0"+hour;}
if(min<10){min="0"+min;}
var hours = hour + ":" + min;
var n = true;
var m;
var tab=[];

//_________________________________SETTINGS_______________________________________
//          The settings can by change in the web or over here
//Setting parameter: Change bot settings here
 const Bot = {
             name:"My Bot",
             photocolor:"#35CDE4",
             backgroundcolor:"#4885A4",
             wallpapper:"url('src/wall/wallpapper7.jpg')",
             firstmessage: "Hello I m your bot and I help you",
             status:"online",
             firstdate: hours
             };
//Setting command: Execute shell command or script with alias
var Command = {
                hello:"echo hello",
              };
//Setting your API CHAT GPT
var API_KEY = ""; //Your API KEY
var MAX_COUNT_TEXT = 4000; // The max word of the chat gpt response
//_________________________________________________________________________________
    var audiosend = new Audio('src/send.mp3');
    var audioreceive = new Audio('src/receive.mp3');
    var monthlist = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    var month = monthlist[d.getMonth()];
    var day = d.getDate() + " " + month;
    var chat = document.querySelector("#box-message-data");
    var chatbox = document.querySelector("#box-message");
    document.querySelector("#header").style.backgroundColor=Bot.backgroundcolor;
    document.querySelector("body").style.backgroundImage=Bot.wallpapper;
    document.querySelector("#user-name").innerHTML=Bot.name;
    document.querySelector("#user-photo").innerHTML=Bot.name.slice(0,1);
    document.querySelector("#user-photo").style.backgroundColor=Bot.photocolor;
    document.querySelector("#user-status").innerHTML=Bot.status;
    document.querySelector("#first-mess").innerHTML=Bot.firstmessage;
    document.querySelector("#first-date").innerHTML=Bot.firstdate;
    document.querySelector("#day").innerHTML=day;
    inputname.value=document.querySelector("#user-name").innerHTML;
    apikey.value=API_KEY;
    apiword.value=MAX_COUNT_TEXT;
//_____________________________________________
// START OF CODING THE CHAT
//_____________________________________________
  function message(action,data){
   const inputicon = document.querySelector("#input-icon");
   const input = document.querySelector("#input");
   var imgbash = document.querySelector("#box-input #imgbash");
     switch(action){
      case "input":
         if(!input.value==""){
          inputicon.style.display="none"; //
          btnsend.style.display="block";
          }                              //
         else{
          inputicon.style.display="flex";
          btnsend.style.display="none";    //
          }
          if(input.value.slice(0,1)=="#"){  //   VERIF INPUT
           input.style.color="maroon";
           imgbash.src="src/script-shell.png";  //
           }
         else if(input.value.slice(0,1)=="$"){  //
           input.style.color="black";
           imgbash.src="src/bash.png";  //
           }else{input.style.color="grey";imgbash.src="src/chat-gpt-logo.jpg";}
        break;;
      case "send":
                 function shell_and_gpt(){
                 var arg = input.value.slice(0,1);
                 var Input = input.value.slice(1);
                 var command = input.value.substr(1);
                 var command_script = command.split(" ")[0];
                 var command_script_arg = command.substr(command_script.length);
                 var retour = true;
                 var bgright = "bg-gpt";bgright=messtrans.innerHTML!="Transparent"?"":"bg-gpt"; //check transparence message
                     if(arg=="$" || arg=="#"){ //if user choose bash or alias shell  => prepare ajax command
                      bgright=messtrans.innerHTML!="Transparent"?"":"bg-shell"; //check transparence message with ternaire condition
                     if(command_script_arg.length==0){command_script_arg="";};
                     if(arg=="#"){if(command_script in Command){if(command_script_arg==""){command=`${Command[command_script]}`;}else{command=`${Command[command_script]} ${command_script_arg}`;};bgright=messtrans.innerHTML!="Transparent"?"":"bg-script";}else{retour=false;input.value="#alias not found";}}
                 $.ajax({
                 type:"post",
                 url:"command.php",
                 data:{command:command},
                 success:function(result){
                  if(!result=="" && retour==true){ // Show the result of the message in left
                 audioreceive.play();
                 chat.innerHTML+=
                 `
                 <div class='message-left'>
                 ${bashlogo.innerHTML}
                 <p style='margin-left:10px;'>${result}</p>
                 <div style='display:flex;float:right;'>
                 <span style='font-size:0.8em;float:right;'>${hours}</span>
                 </div>
                 </div>
                 </div>
                 `;
                 chatbox.scrollTop = chatbox.scrollHeight;
                    }}})
                    }
                    if(!input.value=="" && arg!="$" && arg!="#"){ //Use fetch to request Chat GPT Api
                           setTimeout(()=>{imgbash.src="src/loading.gif";},300)
                             fetch('https://api.openai.com/v1/completions',{
                               method:"POST",
                               headers: {
                               "Content-type": "application/json",
                               Authorization: `Bearer ${apikey.value}`,
                                },
                               body: JSON.stringify({
                               prompt:input.value,
                               max_tokens:MAX_COUNT_TEXT,
                               model: "text-davinci-003",
                                }),
                               })
                               .then(response => response.json())
                               .then(data => {
                                 imgbash.src="src/chat-gpt-logo.jpg";
                                 audioreceive.play();
                                 chat.innerHTML+=
                                 `
                                 <div class='message-left'>
                                 ${bashlogo.innerHTML}
                                 <p style='margin-left:10px;'>${data.choices[0].text.replace(/\n/g, '<br>')}</p>
                                 <div style='display:flex;float:right;'>
                                 <span style='font-size:0.8em;float:right;'>${hours}</span>
                                 </div>
                                 </div>
                                 </div>
                                 `;localstorage('Save_chat',chat.innerHTML);chatbox.scrollTop = chatbox.scrollHeight;})
                                 .catch(error => {input.value="Connexion error";input.style.color="crimson";});
                         }

                 if(!input.value=="" && retour==true){
                  if(arg!="$" && arg!="#"){Input=input.value;}
                 audiosend.play();
                 inputicon.style.display="flex";
                 btnsend.style.display="none";
                 chat.innerHTML+=  //Show the input command in message right
                 `
                 <div class='message-right ${bgright}'>
                 ${bashlogo.innerHTML}
                 <p style='margin-left:10px;background-color:white;border-radius:6px;box-shadow:0px 0px 10px black;'>${Input}</p>
                 <div style='display:flex;float:right;'>
                 <span style='color:#086D01;font-size:0.8em;float:right;'>${hours}</span>
                 <span style='color:#086D01;font-size:0.8em;' class='material-icons-outlined'>done_all</span>
                 </div>
                 </div>
                 </div>
                 `;
                 chatbox.scrollTop = chatbox.scrollHeight;
                 input.value="";
                  }
                 }
                 setTimeout(()=>{localstorage('Save_chat',chat.innerHTML);},2000)
                 shell_and_gpt();
                 break;;
                 case "history_input":
                    var nb = document.querySelectorAll(".message-right p");
                    if(n==true){m=nb.length;n=false;}
                    if(data=='up' && m>0){m--;input.value=nb[m].innerHTML;}
                    if(data=='down' && m<nb.length-1){m++;input.value=nb[m].innerHTML;}
                 break;;
     }
addEventListener('keypress',(e)=>{if(e.key=="Enter"){message('send');}})
   }


//SETTING PANNELS
    function setting(action,ID,data){
      var modalset = document.querySelector("#ModalSet");
      var nb = document.querySelectorAll(".message-right");
        switch(action){
          case "setting":
                 modalset.style.display = "block";
                 window.onclick = function(event) {
                 if (event.target == modalset) {
                     modalset.style.display = "none";
                  }}
                break;;
          case "del_mess":
                chat.innerHTML="";
                localstorage('Del_chat');
                tab=[];
                break;;
          case "sound":
                if(ID==1){
                  sound.innerHTML="Add sound";
                  audiosend.muted = true;
                  audioreceive.muted = true;
                  setsound.innerHTML="volume_off";
                  setsound.style.color="crimson";
                  sound.value=2;
                  localstorage('Sound',"false");
                 }else{
                  sound.innerHTML="Remove sound";
                  audiosend.muted = false;
                  audioreceive.muted = false;
                  setsound.innerHTML="volume_up";
                  setsound.style.color="black";
                  sound.value=1;
                  localstorage('Sound',"true");
                  }
                break;;
          case "background":
                localstorage('Wallpapper',`url('src/wall/wallpapper${ID}.${data}')`);
                document.querySelector("body").style.backgroundImage=`url('src/wall/wallpapper${ID}.${data}')`;
                break;;
          case "trans_mess":
             for(i=0;i<nb.length;i++){tab.push(nb[i].className.split(" ")[1]);}
                if(messtrans.innerHTML=="Transparent"){
                  for(i=0;i<nb.length;i++){nb[i].classList.remove("bg-gpt","bg-shell","bg-script");}
                     messtrans.innerHTML="Visible";
                     document.querySelector("#header").style.backgroundColor="";
                     localStorage.setItem('Transparent', true);
                   }else{
                     messtrans.innerHTML="Transparent";
                     for(i=0;i<nb.length;i++){nb[i].classList.add(tab[i]);}
                     document.querySelector("#header").style.backgroundColor=Bot.backgroundcolor;
                     localStorage.setItem('Transparent', false);
                   }
                break;;
          case "name":
                document.querySelector("#user-name").innerHTML=data;
                localstorage('Name',data);
                break;;
          case "add_alias":
                 if(alias.value!="" && command.value!=""){
                   Command[alias.value]=command.value;
                   document.querySelector("#list-alias").innerHTML+=`#<span class="alias" style="margin-bottom:-10px;color:black;">${alias.value}</span>:<span class="command" style="color:grey;">${command.value}</span><br>`;
                   alias.value="";command.value="";
                   setTimeout(()=>{localstorage('Save_alias',document.querySelector("#list-alias").innerHTML);},2000)
                   }else{alias.placeholder="Enter value";command.placeholder="Enter value";}
               break;;
          case "del_alias":
                 if(ID==1){
                    localStorage.removeItem('Save_alias');
                    document.querySelector("#list-alias").innerHTML=document.querySelector("#list-alias").innerHTML;
                    }
               break;;
          case "set_gpt":
               if(btnsetgpt.innerHTML=="chevron_right"){btnsetgpt.innerHTML="chevron_left";boxsetgpt.style.display="block";}
                  else{btnsetgpt.innerHTML="chevron_right";boxsetgpt.style.display="none";}
               break;;
          case "set_api_gpt":
                 if(ID==1){localstorage('Api_key',data);}
                   else{localstorage('Api_word',data);}
               break;;
          }
    }
    if(Object.keys(Command)==""){document.querySelector("#list-alias").innerHTML+=`<p style="text-align:center;"><i class="fa fa-spinner"></i>Any alias</p>`;}
     else{
    for(let i in Command){
       document.querySelector("#list-alias").innerHTML+=`#<span class="alias" style="margin-bottom:-10px;color:black;">${i}</span><span class="command" style="color:grey;">${Command[i]}</span><br>`;
       }
     }

//LOCALSTORAGE
function localstorage(key,data){
        switch(key){
          case "Wallpapper":
    localStorage.setItem('Wallpapper', data);
            break;;
          case "Sound":
    localStorage.setItem('Sound', data);
            break;;
          case "Transparent":
    localStorage.setItem('Transparent', data);
            break;;
          case "Name":
    localStorage.setItem('Name', data);
            break;;
          case "Save_chat":
    localStorage.setItem('Chat', data);
            break;;
          case "Save_alias":
    localStorage.setItem('Save_alias', data);
            break;;
          case "Del_chat":
    localStorage.removeItem('Chat', data);
            break;;
          case "Api_key":
    localStorage.setItem('Api_key', data);
            break;;
          case "Api_word":
    localStorage.setItem('Api_word', data);
            break;;
          default:
      if(localStorage.getItem('Wallpapper')!=null){
        document.querySelector("body").style.backgroundImage=localStorage.getItem('Wallpapper');
       }
      if(localStorage.getItem('Name')!=null){
      document.querySelector("#user-name").innerHTML=localStorage.getItem('Name');
      inputname.value=localStorage.getItem('Name');
      document.querySelector("#user-photo").innerHTML=localStorage.getItem('Name').slice(0,1);
       }
       if(localStorage.getItem('Sound')!=null){
         if(localStorage.getItem('Sound')=="false"){
                  sound.innerHTML="Add sound";
                  audiosend.muted = true;
                  audioreceive.muted = true;
                  setsound.innerHTML="volume_off";
                  setsound.style.color="crimson";
                  sound.value=2;
            }else{
                  sound.innerHTML="Remove sound";
                  audiosend.muted = false;
                  audioreceive.muted = false;
                  setsound.innerHTML="volume_up";
                  setsound.style.color="black";
                  sound.value=1;
                 }
       }
       if(localStorage.getItem('Chat')!=null){
        document.querySelector("#box-message-data").innerHTML=localStorage.getItem('Chat');
        chatbox.scrollTop = chatbox.scrollHeight;
       }
       if(localStorage.getItem('Api_key')!=null){
         apikey.value=localStorage.getItem('Api_key');
       }
       if(localStorage.getItem('Api_word')!=null){
         apiword.value=localStorage.getItem('Api_word');
         MAX_COUNT_TEXT=4000;
       }
       if(localStorage.getItem('Transparent')!=null){
          nb = document.querySelectorAll(".message-right");
          if(localStorage.getItem('Transparent')=="false"){
              messtrans.innerHTML="Transparent";
              for(i=0;i<nb.length;i++){nb[i].classList.add(tab[i]);}
              document.querySelector("#header").style.backgroundColor=Bot.backgroundcolor;
             }else{
              for(i=0;i<nb.length;i++){nb[i].classList.remove("bg-gpt","bg-shell","bg-script");}
                messtrans.innerHTML="Visible";
                document.querySelector("#header").style.backgroundColor="";
              }
       }
      if(localStorage.getItem('Save_alias')!=null){
        document.querySelector("#list-alias").innerHTML=localStorage.getItem('Save_alias');
             var al = document.querySelectorAll(".alias");
             var co = document.querySelectorAll(".command");
             Command = {};
             for(i=0;i<al.length;i++){
              Command[al[i].textContent]=co[i].textContent;
             }
        }
      }
    }
    localstorage();
