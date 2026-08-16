/*================================================*/
/*==== STUDENT LIST ==============================*/
/*================================================*/


/*================================================*/
/*==== GET STUDENT LIST ELEMENT ==================*/
/*================================================*/

    const studentList =
    document.getElementById("studentList");

    const studentModal =
    document.getElementById("studentModal");

    const studentDetails =
    document.getElementById("studentDetails");

    const closeModal =
    document.getElementById("closeModal");

/*================================================*/
/*==== GET SAVED STUDENTS ========================*/
/*================================================*/

let students =
    JSON.parse(localStorage.getItem("students")) || [];


/*================================================*/
/*==== DISPLAY STUDENTS ==========================*/
/*================================================*/

function displayStudents() {

    studentList.innerHTML = "";


    if (students.length === 0) {

        const row =
            document.createElement("tr");

        row.innerHTML = `
            <td colspan="6">
                Aucun élève enregistré.
            </td>
        `;

        studentList.appendChild(row);

        return;
    }


    students.forEach(function(student, index) {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${student.studentId}
            </td>

            <td>
                ${student.firstName}
            </td>

            <td>
                ${student.lastName}
            </td>

            <td>
                ${student.grade}
            </td>

            <td>
                ${student.academicYear}
            </td>

            <td>
                <button
                    type="button"
                    onclick="viewStudent(${index})"
                >
                    Voir
                </button>

                <button
                    type="button"
                    onclick="editStudent(${index})"
                >
                    Modifier
                </button>

                <button 
                    type="button"
                    onclick="deleteStudent(${index})"
                    >
                    Suprimer

                </button>
            </td>

        `;


        studentList.appendChild(row);

    });

}

/*================================================*/
/*==== INITIAL DISPLAY ===========================*/
/*================================================*/

if (studentList) {

    displayStudents();
}

function deleteStudent(index) {

    const confirmDelete =
        confirm("Voulez-vous supprimer cet élève ?");

    if (!confirmDelete) {
        return;
    }

    students.splice(index, 1);

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    displayStudents();
}

function editStudent(index) {

    localStorage.setItem(
        "editStudentIndex",
        index
    );

    window.location.href =
        "registration.html";

}

/*================================================*/
/*==== VIEW STUDENT ==============================*/
/*================================================*/

function viewStudent(index) {

    const student = students[index];


    studentDetails.innerHTML = `

        <p>
            <strong>ID étudiant :</strong>
            ${student.studentId}
        </p>

        <p>
            <strong>Prénom :</strong>
            ${student.firstName}
        </p>

        <p>
            <strong>Nom :</strong>
            ${student.lastName}
        </p>

        <p>
            <strong>Classe :</strong>
            ${student.grade}
        </p>

        <p>
            <strong>Année académique :</strong>
            ${student.academicYear}
        </p>

        <p>
            <strong>Date de naissance :</strong>
            ${student.dateOfBirth}
        </p>

        <p>
            <strong>Lieu de naissance :</strong>
            ${student.placeOfBirth}
        </p>

        <p>
            <strong>Genre :</strong>
            ${student.gender}
        </p>

    `;


    studentModal.style.display = "flex";

}

closeModal.addEventListener(
    "click",
    function() {

        studentModal.style.display = "none";

    }
);
