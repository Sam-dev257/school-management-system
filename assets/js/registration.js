/*================================================*/
/*==== STUDENT REGISTRATION FORM ================*/
/*================================================*/


/*================================================*/
/*==== GET FORM ELEMENTS =========================*/
/*================================================*/

const form = document.getElementById("studentForm");

const sections = document.querySelectorAll(".form-section");

const nextButtons = document.querySelectorAll(".btn-next");

const prevButtons = document.querySelectorAll(".btn-prev");

const studentId = document.getElementById("student_id");

const firstName = document.getElementById("first_name");

const lastName = document.getElementById("last_name");

const studentPhoto = document.getElementById("student_photo");

const photoPreview = document.getElementById("photoPreview");


/*================================================*/
/*==== CURRENT SECTION ===========================*/
/*================================================*/

let currentSection = 0;


/*================================================*/
/*==== STUDENT POSITION ==========================*/
/*================================================*/

let studentPosition =
    Number(localStorage.getItem("studentPosition")) || 1;


/*================================================*/
/*==== GENERATE STUDENT ID =======================*/
/*================================================*/

function generateStudentId() {

    const firstNameValue = firstName.value.trim();

    const lastNameValue = lastName.value.trim();


    if (firstNameValue && lastNameValue) {

        const firstNameFormatted =
            firstNameValue.toUpperCase();


        const lastNameFormatted =
            lastNameValue
                .substring(0, 3)
                .toUpperCase();


        const positionFormatted =
            String(studentPosition).padStart(3, "0");


        studentId.value =
            firstNameFormatted +
            "-" +
            lastNameFormatted +
            "-" +
            positionFormatted;

    } else {

        studentId.value = "";

    }
}


/*================================================*/
/*==== UPDATE STUDENT ID =========================*/
/*================================================*/

if (firstName && lastName) {

    firstName.addEventListener(
        "input",
        generateStudentId
    );


    lastName.addEventListener(
        "input",
        generateStudentId
    );

}


/*================================================*/
/*==== SHOW SECTION ==============================*/
/*================================================*/

function showSection(index) {

    sections.forEach(function(section) {

        section.classList.remove("active");

    });


    if (sections[index]) {

        sections[index].classList.add("active");

    }

}


/*================================================*/
/*==== VALIDATE SECTION ==========================*/
/*================================================*/

function validateSection(section) {

    const fields = section.querySelectorAll(
        "input, select, textarea"
    );


    let valid = true;


    fields.forEach(function(field) {

        if (field.hasAttribute("required")) {

            if (!field.value.trim()) {

                field.style.borderColor = "red";

                valid = false;

            } else {

                field.style.borderColor = "";

            }

        }

    });


    return valid;

}


/*================================================*/
/*==== NEXT BUTTON ===============================*/
/*================================================*/

nextButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const current =
            sections[currentSection];


        if (!validateSection(current)) {

            alert(
                "Veuillez remplir tous les champs obligatoires."
            );

            return;

        }


        if (currentSection < sections.length - 1) {

            currentSection++;

            showSection(currentSection);

        }

    });

});


/*================================================*/
/*==== PREVIOUS BUTTON ===========================*/
/*================================================*/

prevButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        if (currentSection > 0) {

            currentSection--;

            showSection(currentSection);

        }

    });

});


/*================================================*/
/*==== FORM SUBMIT ===============================*/
/*================================================*/

if (form) {

    form.addEventListener("submit", function(event) {

        event.preventDefault();

        const grade =
            document.getElementById("grade");

        const academicYear =
            document.getElementById("academic_year");

        const current =
            sections[currentSection];


        if (!validateSection(current)) {

            alert(
                "Veuillez remplir tous les champs obligatoires."
            );

            return;

        }

/*================================================*/
/*==== espas saa sepou m ka ajoute nan view infomation elev la ===============================*/
/*================================================*/

        const students =
    JSON.parse(localStorage.getItem("students")) || [];

    const dateOfBirth =
    document.getElementById("date_of_birth");

    const placeOfBirth =
    document.getElementById("place_of_birth");

    const gender =
    document.getElementById("gender");

    const student = {

    studentId: studentId.value,

    firstName: firstName.value,

    lastName: lastName.value,

    dateOfBirth: dateOfBirth.value,

    placeOfBirth: placeOfBirth.value,

    gender: gender.value,

    grade: grade.value,

    academicYear: academicYear.value

    };


    students.push(student);


    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );


        alert(
            "L'inscription de l'élève a été enregistrée avec succès."
        );
        
        studentPosition++;
        localStorage.setItem(
            "studentPosition",
            studentPosition
        );


        /*==== RESET FORM ====*/

        form.reset();


        /*==== RETURN TO FIRST SECTION ====*/

        currentSection = 0;

        showSection(currentSection);


        /*==== RESET STUDENT ID ====*/

        if (studentId) {

            studentId.value = "";

        }


        /*==== RESET PHOTO PREVIEW ====*/

        if (photoPreview) {

            photoPreview.src = "";

        }

    });

}


/*================================================*/
/*==== STUDENT PHOTO PREVIEW =====================*/
/*================================================*/

if (studentPhoto && photoPreview) {

    studentPhoto.addEventListener(
        "change",
        function() {

            const file =
                studentPhoto.files[0];


            if (file) {

                const imageURL =
                    URL.createObjectURL(file);

                photoPreview.src = imageURL;

            } else {

                photoPreview.src = "";

            }

        }
    );

}


/*================================================*/
/*==== SHOW FIRST SECTION ========================*/
/*================================================*/

if (sections.length > 0) {

    showSection(currentSection);

}