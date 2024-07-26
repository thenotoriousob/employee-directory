import { employees } from "./employees.js";

const employeeListEl = document.getElementById("employee-list");

function renderEmployees() {

    employees.forEach(employee => {
        employeeListEl.innerHTML += `
        <div class="employee-card">
            <img src="./images/photos/${employee.image}" class="avatar" alt="Avatar of employee ${employee.name}">
            <h2>${employee.name}</h2>
            <h3>${employee.title}</h3>
            ${employee.bio}
            <div class="socials-container">
                ${employee.social.twitter ?
                  `<span class="social"><a href="${employee.social.twitter}"><i class="fa-brands fa-twitter"></i></a></span>`
                  : ''
                 }
                 ${employee.social.linkedin ?
                  `<span class="social"><a href="${employee.social.linkedin}"><i class="fa-brands fa-linkedin"></i></a></span>`
                  : ''
                 }
            </div>
        </div>
        `
    })

}

renderEmployees();