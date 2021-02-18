function updateAvatarSrc(inputURLA){
    if (inputURLA.value !== ""){
        document.getElementById("inputImage").src = inputURLA.value;
    } else {
        document.getElementById("inputImage").src = "https://www.w3schools.com/howto/img_avatar.png";
    }
}

document.addEventListener("DOMContentLoaded", function (e) {
    let myProfile = JSON.parse(localStorage.getItem('UserProfile'));

    let inputURLAvatar = document.getElementById("inputURLAvatar");
    let inputName = document.getElementById("inputName");
    let inputSurname = document.getElementById("inputSurname");
    let inputAge = document.getElementById("inputAge");
    let inputEmail = document.getElementById("inputEmail");
    let inputPhone = document.getElementById("inputPhone");

    if (myProfile !== null){
        inputURLAvatar.value = myProfile.avatar;
        updateAvatarSrc(inputURLAvatar);
        inputName.value = myProfile.name;
        inputSurname.value = myProfile.surname;
        inputAge.value = myProfile.age;
        inputEmail.value = myProfile.email;
        inputPhone.value = myProfile.phone;
    }

    inputURLAvatar.addEventListener("input", function(e){
        updateAvatarSrc(inputURLAvatar);
    })

    document.getElementById("submitBtn").addEventListener("click", function(e){
        let form = document.getElementById("needs-validation");
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
        } else {
            e.preventDefault();
            e.stopPropagation();
            form.classList.add("was-validated");
        }
    });
});