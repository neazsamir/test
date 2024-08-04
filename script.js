document.addEventListener('DOMContentLoaded', function() {
    const OTP_LENGTH = 6;
    const otpContainer = document.getElementById('otpContainer');
    const otpInputs = document.getElementById('otpInputs');
    const submitOtpButton = document.getElementById('submitOtp');
    const otpError = document.getElementById('otpError');
    const otpTitle = document.getElementById('otpTitle');

    // Generate OTP input fields
    for (let i = 0; i < OTP_LENGTH; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.maxLength = '1';
        input.addEventListener('input', handleOtpInput);
        otpInputs.appendChild(input);
    }

    function handleOtpInput(e) {
        const currentInput = e.target;
        if (currentInput.nextElementSibling && currentInput.value) {
            currentInput.nextElementSibling.focus();
        }
        if (!currentInput.value && currentInput.previousElementSibling) {
            currentInput.previousElementSibling.focus();
        }
    }

    function validateOtp(otp) {
        const storedPassword = localStorage.getItem('storedPassword');
        return otp === storedPassword;
    }

    function setPassword(otp) {
        localStorage.setItem('storedPassword', otp);
    }

    submitOtpButton.addEventListener('click', function() {
        const otp = Array.from(otpInputs.getElementsByTagName('input'))
                        .map(input => input.value)
                        .join('');

        if (localStorage.getItem('storedPassword') === null) {
            // No password set yet, set the new password
            if (otp.length === OTP_LENGTH) {
                setPassword(otp);
                otpContainer.classList.remove('active');
                document.body.style.overflow = 'auto'; // Enable scrolling if it was disabled
            } else {
                otpError.textContent = 'Please enter a 6-digit password.';
            }
        } else {
            // Validate existing password
            if (validateOtp(otp)) {
                otpContainer.classList.remove('active');
                document.body.style.overflow = 'auto'; // Enable scrolling if it was disabled
            } else {
                otpError.textContent = 'Invalid password. Please try again.';
            }
        }
    });

    function showOtpContainer() {
        if (localStorage.getItem('storedPassword') === null) {
            // Prompt to set password if none is set
            otpTitle.textContent = 'Set Password';
            otpContainer.classList.add('active');
            document.body.style.overflow = 'hidden'; // Disable scrolling while the OTP box is active
        } else {
            // Prompt to enter password if one is already set
            otpTitle.textContent = 'Enter Password';
            otpContainer.classList.add('active');
            document.body.style.overflow = 'hidden'; // Disable scrolling while the OTP box is active
        }
    }

    showOtpContainer();
});