document.getElementById('resumeform')?.addEventListener('submit', function (event) {
    event.preventDefault();

    const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement;
    const nameElement = document.getElementById('name') as HTMLInputElement;
    const emailElement = document.getElementById('email') as HTMLInputElement;
    const phoneElement = document.getElementById('phone') as HTMLInputElement;
    const resumeUrlElement = document.getElementById('resumeUrl') as HTMLInputElement;
    const educationElement = document.getElementById('education') as HTMLInputElement;
    const experienceElement = document.getElementById('experience') as HTMLInputElement;
    const skillsElement = document.getElementById('skills') as HTMLInputElement;

    if (profilePictureInput && nameElement && emailElement && phoneElement && resumeUrlElement && educationElement && experienceElement && skillsElement) {
        const name = nameElement.value;
        const email = emailElement.value;
        const phone = phoneElement.value;
        const resumeUrl = resumeUrlElement.value;
        const education = educationElement.value;
        const experience = experienceElement.value;
        const skills = skillsElement.value;

        const profilePictureFile = profilePictureInput.files?.[0];
        const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : "";

        const resumeOutput = `
            <h2>Resume</h2>
            ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profilePicture">` : ""}
            <p><strong>Name:</strong> <span id="edit-name" class="editable">${name}</span></p>
            <p><strong>Email:</strong> <span id="edit-email" class="editable">${email}</span></p>
            <p><strong>Phone Number:</strong> <span id="edit-phone" class="editable">${phone}</span></p>
            
            <h3>Education</h3>
            <p id="edit-education" class="editable">${education}</p>
            
            <h3>Experience</h3>
            <p id="edit-experience" class="editable">${experience}</p>
            
            <h3>Skills</h3>
            <p id="edit-skills" class="editable">${skills}</p>
        `;

        const resumeOutputElement = document.getElementById('resumeOutput');
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput;
            makeEditable();    
            
            // Add share and download buttons
            const shareButton = document.createElement('button');
            shareButton.id = 'shareResume';
            shareButton.innerText = 'Share Resume';
            resumeOutputElement.appendChild(shareButton);

            const downloadButton = document.createElement('button');
            downloadButton.id = 'downloadResume';
            downloadButton.innerText = 'Download as PDF';
            resumeOutputElement.appendChild(downloadButton);

            // Event listener for sharing resume
            shareButton.addEventListener('click', function () {
                const customURL = resumeUrl || name.split(' ').join('').toLowerCase();
                const uniqueURL = `${customURL}.vercel.app/resume`;
                prompt('Share this link:', uniqueURL);
            });

            // Event listener for downloading resume as PDF
            downloadButton.addEventListener('click', function () {
                const element = document.getElementById('resumeOutput');
                if (element) {
                    // Temporarily hide share/download buttons in the PDF
                    shareButton.style.display = 'none';
                    downloadButton.style.display = 'none';

                    // Generate PDF using html2pdf
                    const options = {
                        filename: `${resumeUrl || name}.pdf`,
                        image: { type: 'jpeg', quality: 0.98 },
                        html2canvas: { scale: 2 },
                        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
                    };

                    (window as any).html2pdf().from(element).set(options).save().then(() => {
                        // Show buttons again after download
                        shareButton.style.display = 'block';
                        downloadButton.style.display = 'block';
                    }).catch((error: any) => {
                        console.error('PDF generation error:', error);
                    });
                }
            });
        }
    } else {
        console.error('One or more form elements are missing');
    }
});

function makeEditable() {
    const editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(element => {
        element.addEventListener('click', function () {
            const currentElement = element as HTMLElement;
            const currentValue = currentElement.textContent || "";

            if (currentElement.tagName === "P" || currentElement.tagName === "SPAN") {
                const input = document.createElement('input');
                input.type = "text";
                input.value = currentValue;
                input.classList.add('editing-input');

                input.addEventListener('blur', function () {
                    currentElement.textContent = input.value;
                    currentElement.style.display = 'inline';
                    input.remove();
                });

                currentElement.style.display = 'none';
                currentElement.parentNode?.insertBefore(input, currentElement);
                input.focus();
            }
        });
    });
}
