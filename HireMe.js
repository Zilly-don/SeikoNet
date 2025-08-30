function subscribe(plan) {
    alert(`You have subscribed to the ${plan}. Thank you!`);
  }





  document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const jobPostForm = document.getElementById('jobPostForm');
    const companyLogoInput = document.getElementById('companyLogo');
    const logoPreview = document.getElementById('logoPreview');
    const changeLogoBtn = document.getElementById('changeLogoBtn');
    const previewBtn = document.getElementById('previewBtn');
    const previewModal = document.getElementById('previewModal');
    const closeModal = document.querySelector('.close-modal');
    const closePreviewBtn = document.querySelector('.close-preview');
    const previewContent = document.getElementById('previewContent');
    const confirmPostBtn = document.getElementById('confirmPostBtn');
    const successModal = document.getElementById('successModal');
    const closeSuccessModal = document.getElementById('closeSuccessModal');
    const descriptionTools = document.querySelectorAll('.tool-btn');
    const jobDescription = document.getElementById('jobDescription');

    // Logo Upload and Preview
    companyLogoInput.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();
            
            reader.onload = function(event) {
                logoPreview.innerHTML = `<img src="${event.target.result}" alt="Company Logo">`;
            };
            
            reader.readAsDataURL(file);
        }
    });

    changeLogoBtn.addEventListener('click', function() {
        companyLogoInput.click();
    });

    // Description Formatting Tools
    descriptionTools.forEach(tool => {
        tool.addEventListener('click', function() {
            const tag = this.getAttribute('data-tag');
            insertTextAtCursor(jobDescription, tag);
        });
    });

    // Preview Modal
    previewBtn.addEventListener('click', function() {
        if (validateForm()) {
            generatePreview();
            previewModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    });

    closeModal.addEventListener('click', function() {
        previewModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    closePreviewBtn.addEventListener('click', function() {
        previewModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Confirm Post
    confirmPostBtn.addEventListener('click', function() {
        previewModal.style.display = 'none';
        successModal.style.display = 'block';
    });

    closeSuccessModal.addEventListener('click', function() {
        successModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        jobPostForm.reset();
        logoPreview.innerHTML = '<i class="fas fa-camera"></i><span>Upload Logo</span>';
    });

    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === previewModal) {
            previewModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (e.target === successModal) {
            successModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            jobPostForm.reset();
            logoPreview.innerHTML = '<i class="fas fa-camera"></i><span>Upload Logo</span>';
        }
    });

    // Form Submission
    jobPostForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            generatePreview();
            previewModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    });

    // Helper Functions
    function validateForm() {
        let isValid = true;
        const requiredFields = jobPostForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = 'var(--error-color)';
                isValid = false;
                
                // Add event to remove error styling when user starts typing
                field.addEventListener('input', function() {
                    if (this.value.trim()) {
                        this.style.borderColor = 'var(--border-color)';
                    }
                });
            }
        });
        
        // Validate logo upload
        if (!companyLogoInput.files || companyLogoInput.files.length === 0) {
            logoPreview.style.borderColor = 'var(--error-color)';
            isValid = false;
            
            companyLogoInput.addEventListener('change', function() {
                if (this.files && this.files.length > 0) {
                    logoPreview.style.borderColor = 'var(--border-color)';
                }
            });
        }
        
        // Validate date is in the future
        const deadline = new Date(document.getElementById('applicationDeadline').value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (deadline <= today) {
            alert('Please select a future date for the application deadline.');
            isValid = false;
        }
        
        return isValid;
    }

    function generatePreview() {
        const formData = new FormData(jobPostForm);
        const companyName = formData.get('companyName');
        const jobTitle = formData.get('jobTitle');
        const jobCategory = formData.get('jobCategory');
        const jobType = formData.get('jobType');
        const minSalary = formData.get('minSalary');
        const maxSalary = formData.get('maxSalary');
        const salaryPeriod = formData.get('salaryPeriod');
        const deadline = new Date(formData.get('applicationDeadline')).toLocaleDateString();
        const jobDescription = formData.get('jobDescription');
        
        let logoPreviewHTML = '';
        if (companyLogoInput.files && companyLogoInput.files.length > 0) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.querySelector('.preview-logo').src = e.target.result;
            };
            reader.readAsDataURL(companyLogoInput.files[0]);
            logoPreviewHTML = `<img src="" class="preview-logo" alt="${companyName} Logo">`;
        } else {
            logoPreviewHTML = `<div class="preview-logo"><i class="fas fa-building"></i></div>`;
        }
        
        let salaryHTML = '';
        if (minSalary || maxSalary) {
            const periodText = {
                'hourly': 'per hour',
                'monthly': 'per month',
                'yearly': 'per year'
            }[salaryPeriod];
            
            salaryHTML = `<span><i class="fas fa-money-bill-wave"></i> $${minSalary || '?'} - $${maxSalary || '?'} ${periodText}</span>`;
        }
        
        const typeText = {
            'full-time': 'Full-time',
            'part-time': 'Part-time',
            'contract': 'Contract',
            'internship': 'Internship',
            'remote': 'Remote'
        }[jobType];
        
        const categoryText = {
            'technology': 'Technology',
            'marketing': 'Marketing',
            'design': 'Design',
            'finance': 'Finance',
            'healthcare': 'Healthcare',
            'education': 'Education',
            'other': 'Other'
        }[jobCategory];
        
        previewContent.innerHTML = `
            <div class="preview-job-header">
                ${logoPreviewHTML}
                <div class="preview-job-title">
                    <h3>${jobTitle}</h3>
                    <div class="preview-company-name">${companyName}</div>
                </div>
            </div>
            
            <div class="preview-job-meta">
                <span><i class="fas fa-briefcase"></i> ${typeText}</span>
                <span><i class="fas fa-tag"></i> ${categoryText}</span>
                ${salaryHTML}
                <span><i class="fas fa-calendar-times"></i> Apply by ${deadline}</span>
            </div>
            
            <div class="preview-job-description">
                <h4>Job Description</h4>
                ${jobDescription.replace(/\n/g, '<br>')}
            </div>
        `;
    }

    function insertTextAtCursor(textarea, tag) {
        const startPos = textarea.selectionStart;
        const endPos = textarea.selectionEnd;
        const selectedText = textarea.value.substring(startPos, endPos);
        const beforeText = textarea.value.substring(0, startPos);
        const afterText = textarea.value.substring(endPos);
        
        // Simple tag insertion (for bold, italic)
        if (tag === '<strong>' || tag === '<em>') {
            const closingTag = tag.replace('<', '</');
            textarea.value = beforeText + tag + selectedText + closingTag + afterText;
        } 
        // List insertion
        else if (tag.includes('<li>')) {
            const lines = selectedText.split('\n');
            let listItems = '';
            
            for (const line of lines) {
                if (line.trim()) {
                    listItems += tag.replace('<li></li>', `<li>${line}</li>`);
                }
            }
            
            textarea.value = beforeText + listItems + afterText;
        }
        
        // Set cursor position after inserted text
        textarea.focus();
        textarea.selectionStart = textarea.selectionEnd = startPos + tag.length;
    }
});

// Assistance
 document.getElementById('showContactBtn').addEventListener('click', function() {
            const contactInfo = document.getElementById('contactInfo');
            
            if (contactInfo.style.display === 'none' || contactInfo.style.display === '') {
                contactInfo.style.display = 'block';
                this.textContent = 'Hide Contact Information';
            } else {
                contactInfo.style.display = 'none';
                this.textContent = 'Show Contact Information';
            }
        });