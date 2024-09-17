var _a;
(_a = document.getElementById('resumeform')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    var _a;
    event.preventDefault();
    var profilePictureInput = document.getElementById('profilePicture');
    var nameElement = document.getElementById('name');
    var emailElement = document.getElementById('email');
    var phoneElement = document.getElementById('phone');
    var resumeUrlElement = document.getElementById('resumeUrl');
    var educationElement = document.getElementById('education');
    var experienceElement = document.getElementById('experience');
    var skillsElement = document.getElementById('skills');
    if (profilePictureInput && nameElement && emailElement && phoneElement && resumeUrlElement && educationElement && experienceElement && skillsElement) {
        var name_1 = nameElement.value;
        var email = emailElement.value;
        var phone = phoneElement.value;
        var resumeUrl_1 = resumeUrlElement.value;
        var education = educationElement.value;
        var experience = experienceElement.value;
        var skills = skillsElement.value;
        var profilePictureFile = (_a = profilePictureInput.files) === null || _a === void 0 ? void 0 : _a[0];
        var profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : "";
        var resumeOutput = "\n            <h2>Resume</h2>\n            ".concat(profilePictureURL ? "<img src=\"".concat(profilePictureURL, "\" alt=\"Profile Picture\" class=\"profilePicture\">") : "", "\n            <p><strong>Name:</strong> <span id=\"edit-name\" class=\"editable\">").concat(name_1, "</span></p>\n            <p><strong>Email:</strong> <span id=\"edit-email\" class=\"editable\">").concat(email, "</span></p>\n            <p><strong>Phone Number:</strong> <span id=\"edit-phone\" class=\"editable\">").concat(phone, "</span></p>\n            \n            <h3>Education</h3>\n            <p id=\"edit-education\" class=\"editable\">").concat(education, "</p>\n            \n            <h3>Experience</h3>\n            <p id=\"edit-experience\" class=\"editable\">").concat(experience, "</p>\n            \n            <h3>Skills</h3>\n            <p id=\"edit-skills\" class=\"editable\">").concat(skills, "</p>\n        ");
        var resumeOutputElement = document.getElementById('resumeOutput');
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput;
            makeEditable();
            // Add share and download buttons
            var shareButton_1 = document.createElement('button');
            shareButton_1.id = 'shareResume';
            shareButton_1.innerText = 'Share Resume';
            resumeOutputElement.appendChild(shareButton_1);
            var downloadButton_1 = document.createElement('button');
            downloadButton_1.id = 'downloadResume';
            downloadButton_1.innerText = 'Download as PDF';
            resumeOutputElement.appendChild(downloadButton_1);
            // Event listener for sharing resume
            shareButton_1.addEventListener('click', function () {
                var customURL = resumeUrl_1 || name_1.split(' ').join('').toLowerCase();
                var uniqueURL = "".concat(customURL, ".vercel.app/resume");
                prompt('Share this link:', uniqueURL);
            });
            // Event listener for downloading resume as PDF
            downloadButton_1.addEventListener('click', function () {
                var element = document.getElementById('resumeOutput');
                if (element) {
                    // Temporarily hide share/download buttons in the PDF
                    shareButton_1.style.display = 'none';
                    downloadButton_1.style.display = 'none';
                    // Generate PDF using html2pdf
                    var options = {
                        filename: "".concat(resumeUrl_1 || name_1, ".pdf"),
                        image: { type: 'jpeg', quality: 0.98 },
                        html2canvas: { scale: 2 },
                        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
                    };
                    window.html2pdf().from(element).set(options).save().then(function () {
                        // Show buttons again after download
                        shareButton_1.style.display = 'block';
                        downloadButton_1.style.display = 'block';
                    }).catch(function (error) {
                        console.error('PDF generation error:', error);
                    });
                }
            });
        }
    }
    else {
        console.error('One or more form elements are missing');
    }
});
function makeEditable() {
    var editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(function (element) {
        element.addEventListener('click', function () {
            var _a;
            var currentElement = element;
            var currentValue = currentElement.textContent || "";
            if (currentElement.tagName === "P" || currentElement.tagName === "SPAN") {
                var input_1 = document.createElement('input');
                input_1.type = "text";
                input_1.value = currentValue;
                input_1.classList.add('editing-input');
                input_1.addEventListener('blur', function () {
                    currentElement.textContent = input_1.value;
                    currentElement.style.display = 'inline';
                    input_1.remove();
                });
                currentElement.style.display = 'none';
                (_a = currentElement.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(input_1, currentElement);
                input_1.focus();
            }
        });
    });
}
