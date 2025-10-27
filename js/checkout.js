// Exercise 6
const validate = () => {
	let error = 0;
	// Get the input fields
	const fName = document.getElementById("fName");
	const fEmail = document.getElementById("fEmail");
	const fAddress = document.getElementById("fAddress");
	const fLastN = document.getElementById("fLastN");
	const fPassword = document.getElementById("fPassword");
	const fPhone = document.getElementById("fPhone");

	// Get the error elements
	const errorName = document.getElementById("errorName");
	const errorEmail = document.getElementById("errorEmail");  
	const errorAddress = document.getElementById("errorAddress");
	const errorLastN = document.getElementById("errorLastN");
	const errorPassword = document.getElementById("errorPassword");
	const errorPhone = document.getElementById("errorPhone");

	// clear errors
	resetErrors(fName, errorName);
    resetErrors(fEmail, errorEmail);
	resetErrors(fAddress, errorAddress);
	resetErrors(fLastN, errorLastN);
	resetErrors(fPassword, errorPassword);
	resetErrors(fPhone, errorPhone);
	
	// Validate fields entered by the user: name, phone, password, and email
	if (!/^[A-Za-zÀ-ÿ\s]+$/.test(fName.value.trim())) {
        error++;
        showError(fName, errorName, "Name must contain only letters and spaces.");
    } else if (fName.value.trim().length < 3) {
        error++;
        showError(fName, errorName, "Name must be at least 3 characters.");
    }

	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(fEmail.value.trim())) {
        error++;
        showError(fEmail, errorEmail, "Please enter a valid email.");
	}

	if (!/^[A-Za-zÀ-ÿ\s]+$/.test(fLastN.value.trim())) {
		error++;
		showError(fLastN, errorLastN, "Last name must contain only letters and spaces.");
	} else if (fLastN.value.trim().length < 3) {
		error++;
		showError(fLastN, errorLastN, "Last name must be at least 3 characters.");
	}

	if (fAddress.value.trim().length < 3) {
		error++;
		showError(fAddress, errorAddress, "Address must be at least 3 characters.");
	}

	if (!/^\d{3,}$/.test(fPhone.value.trim())) {
		error++;
		showError(fPhone, errorPhone, "Phone number must contain only digits and must be at least 3 characters.");
	}

	const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).+$/;
    if (!passwordRegex.test(fPassword.value.trim())) {
        error++;
        showError(fPassword, errorPassword, "Password must include both letters and numbers.");
    }
	 
	if(error>0){
		alert("Please fill in all required fields.");
	}else{
		alert("Form submitted successfully");
	}
}
const showError = (input, errorElement, errorMessage) => {
	input.classList.add("is-invalid");
	errorElement.textContent = errorMessage;
	errorElement.style.display = "block";
}

const resetErrors = (input, errorElement) => {
	input.classList.remove("is-invalid");
	errorElement.style.display = "none";
	errorElement.textContent = "";
}