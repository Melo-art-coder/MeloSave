// =======================
// NOTIFICATION
// =======================

function showNotification(message){

const box=document.getElementById("notification");

if(box){

box.textContent=message;
box.classList.add("show");

setTimeout(()=>{
box.classList.remove("show");
},3000);

}else{

console.log(message);

}

}



// =======================
// SIGN UP
// =======================

const signupForm=document.getElementById("signupForm");

if(signupForm){

signupForm.addEventListener("submit",function(e){

e.preventDefault();


const name=document.querySelector(
'input[placeholder="Full Name"]'
).value;


const email=document.querySelector(
'input[placeholder="Email Address"]'
).value;


const password=document.querySelector(
'input[placeholder="Password"]'
).value;



const user={
name:name,
email:email,
password:password
};


localStorage.setItem(
"melSaveUser",
JSON.stringify(user)
);


showNotification(
"Account created successfully 💜"
);


setTimeout(()=>{

window.location.href="login.html";

},1000);


});

}



// =======================
// LOGIN
// =======================


const loginForm=document.getElementById("loginForm");


if(loginForm){

loginForm.addEventListener("submit",function(e){

e.preventDefault();


const email=document.querySelector(
'input[placeholder="Email Address"]'
).value;


const password=document.querySelector(
'input[placeholder="Password"]'
).value;


const user=JSON.parse(
localStorage.getItem("melSaveUser")
);



if(user &&
email===user.email &&
password===user.password){


localStorage.setItem(
"loginMessage",
"Welcome back "+user.name+" 💜"
);


window.location.href="dashboard.html";


}else{


showNotification(
"Incorrect email or password ❌"
);


}


});

}



// =======================
// WELCOME MESSAGE
// =======================


const welcome=document.getElementById(
"welcomeMessage"
);


if(welcome){

const user=JSON.parse(
localStorage.getItem("melSaveUser")
);


if(user){

const hour=new Date().getHours();


let text =
hour<12
?"Good Morning"
:hour<18
?"Good Afternoon"
:"Good Evening";


welcome.textContent=
`${text}, ${user.name} 💜`;

}

}
// =======================
// ADD INCOME
// =======================

const addIncomeBtn=document.getElementById(
"addIncomeBtn"
);


if(addIncomeBtn){

addIncomeBtn.onclick=function(){

const amount=prompt(
"Enter income amount 💜"
);


if(amount){

let income=
Number(localStorage.getItem("balance"))||0;


income+=Number(amount);


localStorage.setItem(
"balance",
income
);


saveTransaction(
"+ Income",
amount
);


showNotification(
"Income added successfully 💜"
);


setTimeout(()=>{
location.reload();
},1000);


}

};

}



// =======================
// ADD EXPENSE
// =======================


const addExpenseBtn=document.getElementById(
"addExpenseBtn"
);


if(addExpenseBtn){

addExpenseBtn.onclick=function(){


const amount=prompt(
"Enter expense amount 💜"
);


if(amount){


let expense=
Number(localStorage.getItem("expenses"))||0;


expense+=Number(amount);


localStorage.setItem(
"expenses",
expense
);


saveTransaction(
"- Expense",
amount
);


showNotification(
"Expense added successfully 💜"
);


setTimeout(()=>{
location.reload();
},1000);


}

};

}



// =======================
// BALANCE DISPLAY
// =======================


const totalBalance=document.getElementById(
"totalBalance"
);


if(totalBalance){


const income=
Number(localStorage.getItem("balance"))||0;


const expense=
Number(localStorage.getItem("expenses"))||0;


totalBalance.textContent=
"₦"+(income-expense).toLocaleString();


}




// =======================
// BUDGET
// =======================


const setBudgetBtn=document.getElementById(
"setBudgetBtn"
);


if(setBudgetBtn){


setBudgetBtn.onclick=function(){


const budget=prompt(
"Enter monthly budget 💜"
);


if(budget){


localStorage.setItem(
"monthlyBudget",
budget
);


showNotification(
"Budget saved successfully 💜"
);


setTimeout(()=>{
location.reload();
},1000);


}


};


}



const monthlyBudget=document.getElementById(
"monthlyBudget"
);


if(monthlyBudget){


const budget=
Number(localStorage.getItem("monthlyBudget"))||0;


monthlyBudget.textContent=
"₦"+budget.toLocaleString();


}





// =======================
// SAVINGS GOAL
// =======================


const setSavingsBtn=document.getElementById(
"setSavingsBtn"
);


if(setSavingsBtn){


setSavingsBtn.onclick=function(){


const goal=prompt(
"Enter your savings goal 💜"
);


if(goal){


localStorage.setItem(
"savingsGoal",
goal
);


showNotification(
"Savings goal created 💜"
);


setTimeout(()=>{
location.reload();
},1000);


}


};


}




// =======================
// TRANSACTIONS
// =======================


function saveTransaction(type,amount){


let transactions=
JSON.parse(
localStorage.getItem("transactions")
)||[];



transactions.push({

type:type,

amount:amount,

date:new Date().toLocaleDateString()

});



localStorage.setItem(
"transactions",
JSON.stringify(transactions)
);


}



const transactionList=document.getElementById(
"transactionList"
);



if(transactionList){


let transactions=
JSON.parse(
localStorage.getItem("transactions")
)||[];



transactions.reverse().forEach(function(item){


let li=document.createElement("li");


li.textContent=
`${item.type} ₦${Number(item.amount).toLocaleString()} - ${item.date}`;


transactionList.appendChild(li);


});


}
// =======================
// PROFILE DETAILS
// =======================


const profileName=document.getElementById(
"profileName"
);

const profileEmail=document.getElementById(
"profileEmail"
);


const user=JSON.parse(
localStorage.getItem("melSaveUser")
);



if(user){

if(profileName){

profileName.textContent=user.name;

}


if(profileEmail){

profileEmail.textContent=user.email;

}

}




// =======================
// PROFILE IMAGE UPLOAD
// =======================


const imageUpload=document.getElementById(
"imageUpload"
);


const profileImage=document.getElementById(
"profileImage"
);



if(profileImage){


const savedImage=
localStorage.getItem("profileImage");


if(savedImage){

profileImage.src=savedImage;

}

}



if(imageUpload && profileImage){


imageUpload.onchange=function(){


const file=this.files[0];


if(file){


const reader=new FileReader();



reader.onload=function(){


localStorage.setItem(
"profileImage",
reader.result
);


profileImage.src=
reader.result;


};



reader.readAsDataURL(file);


}


};


}





// =======================
// LOGOUT
// =======================


const logoutBtn=document.getElementById(
"logoutBtn"
);



if(logoutBtn){


logoutBtn.onclick=function(){


localStorage.removeItem(
"loginMessage"
);



showNotification(
"Logged out successfully 💜"
);



setTimeout(()=>{

window.location.href="login.html";


},1000);



};


}





// =======================
// DARK MODE
// =======================


const themeToggle=document.getElementById(
"themeToggle"
);



if(localStorage.getItem("theme")==="dark"){


document.body.classList.add(
"dark-mode"
);



if(themeToggle){

themeToggle.textContent="☀️";

}

}




if(themeToggle){


themeToggle.onclick=function(){


document.body.classList.toggle(
"dark-mode"
);



if(document.body.classList.contains(
"dark-mode"
)){


localStorage.setItem(
"theme",
"dark"
);



themeToggle.textContent="☀️";


}else{


localStorage.setItem(
"theme",
"light"
);



themeToggle.textContent="🌙";


}



};


  }
