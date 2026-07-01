// URL of the deployed Google Apps Script Web App
// Replace this with your actual Web App URL after deployment
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwLzfjbYMrRxfbnX4Gq3DNmk5HEXxfqyA2k1ctgvLuOdClg4ME3dTyz31ulyW8pguaIbA/exec";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("resultForm");
    const resultCard = document.getElementById("resultCard");
    const resetBtn = document.getElementById("resetBtn");
    const submitBtn = document.getElementById("submitBtn");
    const btnText = document.querySelector(".btn-text");
    const btnLoader = document.getElementById("btnLoader");

    const resultIcon = document.getElementById("resultIcon");
    const resultTitle = document.getElementById("resultTitle");
    const resultMessage = document.getElementById("resultMessage");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const zone = document.getElementById("zone").value;
        const name = document.getElementById("name").value.trim();
        const mobile = document.getElementById("mobile").value.trim();
        const rollNumber = document.getElementById("rollNumber").value.trim();

        if (!zone || !name || !mobile || !rollNumber) {
            alert("Please fill in all fields correctly.");
            return;
        }

        // UI Loading state
        btnText.style.display = "none";
        btnLoader.style.display = "block";
        submitBtn.disabled = true;

        // Check against the dataset in data.js
        const isQualified = typeof qualifiedRollNumbers !== 'undefined' && qualifiedRollNumbers.has(rollNumber);
        const status = isQualified ? "Qualified" : "Not Qualified";

        // Send Data to Google Sheets if URL is configured
        if (GOOGLE_SCRIPT_URL) {
            try {
                const formData = new URLSearchParams();
                formData.append("name", name);
                formData.append("mobile", mobile);
                formData.append("rollNumber", rollNumber);
                formData.append("zone", zone);
                formData.append("status", status);

                await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    body: formData
                });
                // Note: no-cors mode doesn't allow reading the response, 
                // but it successfully sends the data.
            } catch (error) {
                console.error("Error saving data:", error);
            }
        }

        // Show Result
        form.style.display = "none";
        resultCard.style.display = "block";

        if (isQualified) {
            resultIcon.className = "result-icon success";
            resultIcon.innerHTML = "✓";
            resultTitle.textContent = "Congratulations!";
            resultTitle.style.color = "var(--success-color)";
            resultMessage.innerHTML = `Dear <strong>${name}</strong>, your roll number <strong>${rollNumber}</strong> has been shortlisted for the Physical Efficiency Test (PET).`;
        } else {
            resultIcon.className = "result-icon error";
            resultIcon.innerHTML = "✕";
            resultTitle.textContent = "Not Qualified";
            resultTitle.style.color = "var(--error-color)";
            resultMessage.innerHTML = `Dear <strong>${name}</strong>, we regret to inform you that your roll number <strong>${rollNumber}</strong> is not in the shortlisted list for PET.`;
        }

        // Restore button state
        btnText.style.display = "inline";
        btnLoader.style.display = "none";
        submitBtn.disabled = false;
    });

    resetBtn.addEventListener("click", () => {
        resultCard.style.display = "none";
        form.style.display = "block";
        form.reset();
    });
});
