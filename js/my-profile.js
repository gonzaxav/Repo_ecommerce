document.addEventListener("DOMContentLoaded", function (e) {
    let myProfile = JSON.parse(localStorage.getItem('UserProfile'));

    if (myProfile !== null){
        let inputURLAvatar = document.getElementById("inputURLAvatar");
        let inputName = document.getElementById("inputName");
        let inputSurname = document.getElementById("inputSurname");
        let inputAge = document.getElementById("inputAge");
        let inputEmail = document.getElementById("inputEmail");
        let inputPhone = document.getElementById("inputPhone");

        inputURLAvatar.value = myProfile.avatar;
        inputName.value = myProfile.name;
        inputSurname.value = myProfile.surname;
        inputAge.value = myProfile.age;
        inputEmail.value = myProfile.email;
        inputPhone.value = myProfile.phone;
    }

    document.getElementById("submitBtn").addEventListener("click", function(e){
        let inputURLAvatar = document.getElementById("inputURLAvatar");
        let inputName = document.getElementById("inputName");
        let inputSurname = document.getElementById("inputSurname");
        let inputAge = document.getElementById("inputAge");
        let inputEmail = document.getElementById("inputEmail");
        let inputPhone = document.getElementById("inputPhone");

        let camposCompletos = true;

        if (inputName.value === ''){
            inputName.classList.add("invalid");
            camposCompletos = false;
        }

        if (inputSurname.value === ''){
            inputSurname.classList.add("invalid");
            camposCompletos = false;
        }

        if (inputEmail.value === ''){
            inputEmail.classList.add("invalid");
            camposCompletos = false;
        }

        if (camposCompletos){
            localStorage.setItem('UserProfile', JSON.stringify({
                avatar: inputURLAvatar.value,
                name: inputName.value,
                surname: inputSurname.value,
                age: inputAge.value,
                email: inputEmail.value,
                phone: inputPhone.value
            }));
        }else{
            alert("Debes ingresar los datos!");
        }
    });
});