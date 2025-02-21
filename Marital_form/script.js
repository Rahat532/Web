// Show "Other" occupation input if selected
function toggleOtherOccupation() {
    let occupation = document.getElementById("occupation").value;
    let otherInput = document.getElementById("otherOccupation");
    
    if (occupation === "Other") {
        otherInput.style.display = "block";
        otherInput.setAttribute("required", "true");
    } else {
        otherInput.style.display = "none";
        otherInput.removeAttribute("required");
    }
}

// Form Submission
document.getElementById("biodataForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Collect form data
    let formData = new FormData(event.target);

    // Convert FormData to a plain object
    let biodata = {};
    formData.forEach((value, key) => {
        biodata[key] = value;
    });

    // Convert to query string and redirect
    let queryParams = new URLSearchParams(biodata).toString();
    window.location.href = "submitted.html?" + queryParams;
});

// Populate submitted biodata on submitted.html page
document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.includes("submitted.html")) {
        let params = new URLSearchParams(window.location.search);
        let biodata = Object.fromEntries(params);
        
        let displayDiv = document.getElementById("biodataDisplay");
        if (displayDiv) {
            // Personal Details
            const personalDetails = document.getElementById("personalDetails");
            personalDetails.innerHTML = `
                <div class="field"><strong>Full Name:</strong> ${biodata.name || "N/A"}</div>
                <div class="field"><strong>Email:</strong> ${biodata.email || "N/A"}</div>
                <div class="field"><strong>Phone:</strong> ${biodata.phone || "N/A"}</div>
                <div class="field"><strong>Address:</strong> ${biodata.address || "N/A"}</div>
                <div class="field"><strong>Date of Birth:</strong> ${biodata.dob || "N/A"}</div>
                <div class="field"><strong>Gender:</strong> ${biodata.gender || "N/A"}</div>
                <div class="field"><strong>Weight (kg):</strong> ${biodata.weight || "N/A"}</div>
            `;

            // Education & Occupation
            const educationOccupation = document.getElementById("educationOccupation");
            educationOccupation.innerHTML = `
                <div class="field"><strong>Education Background:</strong> ${biodata.education || "N/A"}</div>
                <div class="field"><strong>Nationality:</strong> ${biodata.nationality || "N/A"}</div>
                <div class="field"><strong>Blood Group:</strong> ${biodata.bloodGroup || "N/A"}</div>
                <div class="field"><strong>Marital Status:</strong> ${biodata.marital || "N/A"}</div>
                <div class="field"><strong>Occupation:</strong> ${biodata.occupation || "N/A"}</div>
                ${biodata.otherOccupation ? `<div class="field"><strong>Other Occupation:</strong> ${biodata.otherOccupation}</div>` : ""}
                <div class="field"><strong>Hobbies:</strong> ${biodata.hobbies || "N/A"}</div>
            `;
        }
    }
});
// Add Sibling Fields Dynamically
let siblingCounter = 1; // Start with 1 since we already have one sibling field

document.getElementById("addSibling").addEventListener("click", function () {
    siblingCounter++;
    const siblingFields = document.getElementById("siblingFields");

    const siblingGroup = document.createElement("div");
    siblingGroup.className = "sibling-group";
    siblingGroup.innerHTML = `
        <div class="form-group">
            <label for="siblingName${siblingCounter}">Sibling's Name:</label>
            <input type="text" id="siblingName${siblingCounter}" placeholder="Enter sibling's name" required>
        </div>
        <div class="form-group">
            <label for="siblingOccupation${siblingCounter}">Sibling's Occupation:</label>
            <input type="text" id="siblingOccupation${siblingCounter}" placeholder="Enter sibling's occupation" required>
        </div>
        <div class="form-group">
            <label for="siblingMaritalStatus${siblingCounter}">Marital Status:</label>
            <select id="siblingMaritalStatus${siblingCounter}" required>
                <option value="">Select</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
            </select>
        </div>
        <div class="form-group">
            <label>Is Student:</label>
            <div class="inline-group">
                <label><input type="radio" name="siblingIsStudent${siblingCounter}" value="Yes" required> Yes</label>
                <label><input type="radio" name="siblingIsStudent${siblingCounter}" value="No"> No</label>
            </div>
        </div>
        <div class="form-group" id="siblingClassSection${siblingCounter}" style="display: none;">
            <label for="siblingClass${siblingCounter}">Class/Grade:</label>
            <input type="text" id="siblingClass${siblingCounter}" placeholder="Enter class/grade">
        </div>
        <hr>
    `;

    siblingFields.appendChild(siblingGroup);

    // Add event listener for the new "Is Student" radio buttons
    document.querySelectorAll(`input[name="siblingIsStudent${siblingCounter}"]`).forEach(radio => {
        radio.addEventListener("change", function () {
            const classSection = document.getElementById(`siblingClassSection${siblingCounter}`);
            const classInput = document.getElementById(`siblingClass${siblingCounter}`);
            
            if (this.value === 'Yes') {
                classSection.style.display = 'block';
                classInput.setAttribute('required', 'true');
            } else {
                classSection.style.display = 'none';
                classInput.removeAttribute('required');
            }
        });
    });
});