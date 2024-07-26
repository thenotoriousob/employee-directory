import { employees } from "./employees.js";

const employeeListEl = document.getElementById("employee-list");
const roleSearchEl = document.getElementById("roles");
const nameSearchEl = document.getElementById("search-name");
const roles = [];

roleSearchEl.addEventListener("change", (e) => {
    renderEmployees(e.target.value, nameSearchEl.value);
})

nameSearchEl.addEventListener("input", (e) => {
    renderEmployees(roleSearchEl.value, e.target.value);
});

function renderEmployees(team, name = "") {

    employeeListEl.innerHTML = '';
    employees.filter(employee => {

        if ((team === "everyone" || employee.team === team) && (name === "" || employee.name.includes(name))) {
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
          `;
        }

        if (!roles.includes(employee.team)) {
            roles.push(employee.team);
        };
    })

};

function renderRoles() {
    
    roleSearchEl.innerHTML = `<option value="everyone">Everyone</option>`;
    roles.forEach(role => {
        roleSearchEl.innerHTML += `
        <option value="${role}">${role}</option>
        `;
    });

};

renderEmployees("everyone");

renderRoles();