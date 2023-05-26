const loginBtn = document.querySelector("#LoginBtn");
const form=document.querySelector('form');
const navigateToRegister=document.getElementById('navigateToRegister');

 const registeredDataOfUserAndAdmin=JSON.parse(localStorage.getItem('RegisterData'))


loginBtn.addEventListener('click',(e)=>{
    e.preventDefault()
 
    const userName = document.querySelector("#LoginInputUserName").value;
    const password = document.querySelector("#LoginInputpassword").value;
     for(const registeredAcc of registeredDataOfUserAndAdmin){
        
        if(userName==registeredAcc.userName&&password==registeredAcc.password){
            if(registeredAcc.userType=='User'){
              
                const encodedUserUsername =encodeURIComponent(registeredAcc.userName);
                window.location.href=`../Home/User/User.html?username=${encodedUserUsername}`  
            }
            else{
              
                const encodedAdminUsername =encodeURIComponent(registeredAcc.userName);
                window.location.href=`../Home/Admin/admin.html?username=${encodedAdminUsername}`
            }      
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                // footer: '<a href="">Why do I have this issue?</a>'
              })
        }
     }
     form.reset()
    
})


navigateToRegister.addEventListener('click',(e)=>{
      e.preventDefault()
      window.location.href="../Register/Register.html";
    })


