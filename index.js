import { employees } from "./employees-optional.js";

const roleSearchEl = document.getElementById("roles");
const nameSearchEl = document.getElementById("search-name");

let filteredEmployees = [...employees];

roleSearchEl.addEventListener("change", (e) => {
    renderEmployees(e.target.value, nameSearchEl.value);
})

nameSearchEl.addEventListener("input", (e) => {
    renderEmployees(roleSearchEl.value, e.target.value);
});

function renderEmployees(team, name = "") {

    const employeeListEl = document.getElementById("employee-list");

    /* Could just use employees in filterEmployeesByTeam but I wanted to write it
       so that both functions are independent of eath other */
    filteredEmployees = [...employees];

    filteredEmployees = filterEmployeesByTeam(team);

    filteredEmployees = filterEmployeesByName(name);

    employeeListEl.innerHTML = '';
    filteredEmployees.forEach(member => {
            
        employeeListEl.innerHTML += `
            <div class="employee-card">
                <img src="./images/photos/${member.image}" class="avatar" alt="Avatar of employee ${member.name}">
                <h2>${member.name}</h2>
                <h3>${member.title}</h3>
                ${member.bio}
                <div class="socials-container">
                    ${member.social.twitter ?
                      `<span class="social"><a href="${member.social.twitter}"><i class="fa-brands fa-twitter"></i></a></span>`
                      : ''
                    }
                    ${member.social.linkedin ?
                      `<span class="social"><a href="${member.social.linkedin}"><i class="fa-brands fa-linkedin"></i></a></span>`
                      : ''
                    }
                </div>
            </div>
            `;
    });

};

function filterEmployeesByTeam(team = "everyone") {
    return filteredEmployees.reduce((members, currentMember) => 
        team === "everyone" || currentMember.team === team
            ? members.concat(currentMember.members)
            : members
    ,[]);
}

function filterEmployeesByName(name) {
  return filteredEmployees.reduce((members, currentMember) =>
      name === "" || currentMember.name.toLowerCase().includes(name.toLowerCase()) /* Make search case insensitive */
            ? members.concat(currentMember)
            : members
  ,[]);
}

function initialisePage() {

    renderRoles();

    renderEmployees("everyone");
}

function renderRoles() {
    
    roleSearchEl.innerHTML = `<option value="everyone">Everyone</option>`;
    employees.forEach(team => {
        roleSearchEl.innerHTML += `
        <option value="${team.team}">${team.team}</option>
        `;
    });

};

initialisePage();

// function renderEmployees(team, name = "") {

//     employeeListEl.innerHTML = '';
//     employees.forEach(employee => {
            
//         if (team === "everyone" || employee.team === team) {

//             employee.members.forEach(member => {

//                 if (name === "" || member.name.toLowerCase().includes(name.toLowerCase())) {
//                     employeeListEl.innerHTML += `
//                     <div class="employee-card">
//                         <img src="./images/photos/${member.image}" class="avatar" alt="Avatar of employee ${member.name}">
//                         <h2>${member.name}</h2>
//                         <h3>${member.title}</h3>
//                         ${member.bio}
//                         <div class="socials-container">
//                             ${member.social.twitter ?
//                               `<span class="social"><a href="${member.social.twitter}"><i class="fa-brands fa-twitter"></i></a></span>`
//                               : ''
//                             }
//                             ${member.social.linkedin ?
//                               `<span class="social"><a href="${member.social.linkedin}"><i class="fa-brands fa-linkedin"></i></a></span>`
//                               : ''
//                             }
//                         </div>
//                     </div>
//                     `;
//                 };
//             });
//         };

//         if (!roles.includes(employee.team)) {
//             roles.push(employee.team);
//         };
//     });

// };

// function renderRoles() {
    
//     roleSearchEl.innerHTML = `<option value="everyone">Everyone</option>`;
//     roles.forEach(role => {
//         roleSearchEl.innerHTML += `
//         <option value="${role}">${role.charAt(0).toUpperCase() + role.slice(1)}</option>
//         `;
//     });

// };
