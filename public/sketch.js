let usernames = ["10401","10402","10403","10404","10405","10406","10407","10408","10409","10410","10411","10412","10413","10414","10415","10416","10417","10418","10419","10420"]
//let passwordBox;
let passwords = ["rladnjsghl","rlackdals","alscksghd","qkrdPgns","qkrwjddnr","qkrwnstkd","qkrwldlf","qotjwns","tjdwnsgur","thsxodnjs",'dhdbtkd','dntmdgus','dbxorbs','dlrjsdnjs','dlrnjsgus','dldudwns','dldndcjs','dlwowls','dlwngus','dlgusals'];
let WrongSig, submit, labelUsername, labelPassword, cnv, headline, button_todayjournal, button_manageplanner, date, button_goBack;
let journals = [];
let journalInput;
let root;
let topJournalButton = 300;
let selected = [false,false,false];
let colors = [
    
    
    ['rgb(255,255,255) ', 'rgb(47,79,79) ', 'rgb(200,240,220) ','rgb(130,160,160) ','rgb(0,0,0) '],
    
    ['rgb(255,255,255)', 'rgb(77,77,77)','rgb(177,216,119)','rgb(241, 106, 112)', 'rgb(140,220,218)'] ,
    
    [ 'rgb(255,255,255)', 'rgb(77,77,77)', 'rgb(202,231,229)', 'rgb(229,241,231)', 'rgb(112,199,228)']

]
let cC = 2;
let status = "";
let Focus = "cnv";
let stage = "login";  //"login"으로 시작   login-main-todayjournal-manageplanner

function setup(){
    cnv = createCanvas(1520,720);
    //lableUsername = createP("username:");
    headline = select('#headline');
    
    usernameBox = select('#username').addClass('login');
    passwordBox = select('#password').addClass('login');
    //submit = createButton('LOGIN').id('loginButton').class('login');
    WrongSig = createP().id('wrongSig').class('login');
    select("#labelforusername").class('login');
    select("#labelforpassword").class('login');
    
    button_todayjournal = createButton('오늘일지 ').id('todayjournalButton').class('main');
    button_manageplanner = createButton('플래너 관리').id('manageplannerButton').class('main');
    
    showDate = select('#journal').show().class('todayjournal');
    date = select('#date').class('todayjournal').input(datePicked);
    button_addjournal =select('#addjournalButton').class('todayjournal');
    Time = select('#Time').class('todayjournal');
    journalInput = createInput().id('journalInput').class('todayjournal');
    
    button_goBack = select('#goBackButton');
 
    document.documentElement.style.setProperty('--BcolorO',colors[cC][0]);
    document.documentElement.style.setProperty('--colorA',colors[cC][1]);
    document.documentElement.style.setProperty('--colorB',colors[cC][2]);
    document.documentElement.style.setProperty('--colorC',colors[cC][3]);
    document.documentElement.style.setProperty('--colorD',colors[cC][4]);
    
    
    button_addjournal.mousePressed(addJournal);
    button_goBack.mousePressed(goBack);
    button_todayjournal.mousePressed(changeFocus_todayjournal);
    button_manageplanner.mousePressed(changeFocus_manageplanner);
    passwordBox.mousePressed(changeFocus_passwordBox);
    usernameBox.mousePressed(changeFocus_usernameBox);
    cnv.mousePressed(changeFocus_cnv);
    //submit.mousePressed(submitted_username_password);
    
    
}
function submitted_username_password(){  //login 눌렀을때
    let usernameR = false;  //아이디가 맞는가
    let passwordR = false;  //비밀번호가 맞는가
    let usernameV = deleteSpace(trim(usernameBox.value()));
    let num;
    for(let i = 0; i<usernames.length; i++){
        if(usernames[i] == usernameV){
            usernameR = true;
            num = i;
        }
    }
    if(passwords[num] == passwordBox.value()){
        passwordR = true;
    }
    
    if(usernameR&&!passwordR){
        status = "wrongP";
        WrongSig.show();
        WrongSig.html("비밀번호를 잘못 입력하셨습니다.");
    }
    if(!usernameR){
        status = "wrongU";
        WrongSig.show();
        WrongSig.html("없는 아이디 입니다.");
    }
    if(usernameR&&passwordR){
        status = "";
        stage = "main";
        WrongSig.hide();
        WrongSig.html("");
    }
}
function draw(){
    background(getColorForP5(colors[cC][0]));
    strokeWeight(10);
    stroke(getColorForP5(colors[cC][3]));
    fill(getColorForP5(colors[cC][2]));
    rect(-20,-20,width+50,140);
    
    if(keyCode == 32){
        passwordBox.value("");
    }
    let l = selectAll('.login');
    if(stage == "login"){
        for(let i = 0; i<l.length; i++){
            l[i].removeClass('hide');
        }
        if(keyIsPressed&&keyCode == 13){
            submitted_username_password();
        }
        
    }
    else{
        for(let i = 0; i<l.length; i++){
            l[i].addClass('hide');
        }
    }
    let m = selectAll('.main');
    if(stage == "main"){
        for(let i = 0; i<m.length; i++){
            m[i].removeClass('hide');
        }
    }
    else{
        for(let i = 0; i<m.length; i++){
            m[i].addClass('hide');
        }
    }
    let tj = selectAll('.todayjournal');
    if(stage == "todayjournal"){
        for(let i = 0; i<tj.length; i++){
            tj[i].removeClass('hide');
        }
        showDate.style('display','grid');

        
    }
    else{
        for(let i = 0; i<tj.length; i++){
            tj[i].addClass('hide');
        }
    }
    let mp = selectAll('.manageplanner');
    if(stage == "manageplanner"){
        for(let i = 0; i<mp.length; i++){
            mp[i].removeClass('hide');
        }
    }
    else{
        for(let i = 0; i<mp.length; i++){
            mp[i].addClass('hide');
        }
    }
    
}
function IsAllFilled(){
    let b = false;
    if(countStringLength(date.value())>5&&countStringLength(Time.value())>3&&countStringLength(journalInput.value())>1){
        b = true;
    }
    return b;
}
function countStringLength(s){
    let S = s;
    let Ss = split(S,'');
    return Ss.length;
}
function addJournal(){
    if(stage == "todayjournal"){
        if(IsAllFilled()){
            addJournalDiv(date.value(),Time.value(),journalInput.value());
        }
    }
}
function addJournalDiv(d,t,j){
    let D = createDiv(d);
    D.class('journals').addClass('todayjournal').parent('journal');
    let T = createDiv(t);
    T.class('journals').addClass('todayjournal').parent('journal');
    let J = createDiv(j);
    J.class('journals').addClass('todayjournal').parent('journal').id('endjournalNew');
    topJournalButton+=40;
    let topArray = [topJournalButton,'px'];
    let top = join(topArray,'');
    date.style('top',top);
    button_addjournal.style('top',top);
    Time.style('top',top);
    journalInput.style('top',top);
}
function getColorForP5(s){
    let S = split(s,'gb(');
    let string = S[1];
    let S1 = split(string,')');
    let string1 = S1[0];
    let c = split(string1,',');
    let C = color(c[0],c[1],c[2]);
    return C;
}

function getWeekDay(d){
    
}
function datePicked(){
    let d = getDate(date.value());
    
    
}
function getDate(s){
    let Split = split(s,'-');
    return Split;
}
function changeFocus_todayjournal(){
    Focus = "todayjournal";
    stage = "todayjournal";
}
function changeFocus_manageplanner(){
    Focus = "manageplanner";
    stage = "manageplanner";
}
function changeFocus_cnv(){
    Focus = "cnv";
}
function changeFocus_usernameBox(){
    Focus = "usernameBox";
}
function changeFocus_passwordBox(){
    Focus = "passwordBox";
}
function deleteSpace(s){
    let m =split(s,'');
    while(m[m.length-1] == ' '){
        m = shorten(m);
    }
    return join(m,'');
}
function goBack(){
    switch(stage){
        case "login" :
            break;
        case "main" :
            break;
            stage = "login";
        case "todayjournal" :
            stage = 'main';
            date.value('');
            break;
        case "manageplanner" :
            stage = "main";
            break;
        default :
            console.log("ERROR  undefined stage for goBack-errorNote");
            break;
    }
}
