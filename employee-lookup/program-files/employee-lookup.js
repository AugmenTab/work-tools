const deptTriggers = document.querySelectorAll('.departments > div');
const deptBackground = document.querySelectorAll('.dropdownBackground');
const deptNav = document.querySelectorAll('#department-nav');

function findEmployees(wordToMatch, employees) {
    return employees.filter(employee => {
        const regex = new RegExp(wordToMatch, 'gi')
        if (spanishCheck.checked == true) {
            return employee.spanish == true && (employee.first.match(regex) || employee.last.match(regex) || employee.dept.match(regex) || employee.extension.match(regex) || employee.email.match(regex)) || employee.title.match(regex)
        } else {
            return employee.first.match(regex) || employee.last.match(regex) || employee.dept.match(regex) || employee.extension.match(regex) || employee.email.match(regex) || employee.title.match(regex)
        }
    });
}

function displayEmployees() {
    const matchArray = findEmployees(registrySearchInput.value, employees);
    console.log(matchArray)
    const neutral = matchArray.map(employee => {
        ``;
    }).join('');
    const html = matchArray.map(employee => {
        return `
            <div class="result">
                <div class="employee-name">${employee.first} ${employee.last}</div>
                <div>${employee.dept} - ${employee.title}</div>
                <div>${employee.extension}</div>
                <div><a href="mailto:${employee.email}@company.com">${employee.email}@company.com</a></div>
            </div>
        `;
    }).join('');
    if(registrySearchInput.value === "" || matchArray.length === 0) {
        employeeResults.innerHTML = neutral;
    } else {
        employeeResults.innerHTML = html;
    };
}

const registrySearchInput = document.querySelector('#employee-search');
const employeeResults = document.querySelector('.results');
const spanishCheck = document.querySelector('#spanish');

registrySearchInput.addEventListener('keyup', displayEmployees);
registrySearchInput.addEventListener('change', displayEmployees);
spanishCheck.addEventListener('click', displayEmployees);

window.addEventListener('keydown',function(e){if(e.keyIdentifier=='U+000A'||e.keyIdentifier=='Enter'||e.keyCode==13){if(e.target.nodeName=='INPUT'&&e.target.type=='text'){e.preventDefault();return false;}}},true);

/*
function handleDeptEnter() {
    this.classList.add('trigger-enter');
    setTimeout(() => this.classList.add('trigger-enter-active'), 150);
    
}

function handleDeptLeave() {
    this.classList.remove('trigger-enter', 'trigger-enter-active');
    
}
*/

//deptTriggers.forEach(trigger => trigger.addEventListener('mouseenter', handleDeptEnter));
//deptTriggers.forEach(trigger => trigger.addEventListener('mouseleave', handleDeptLeave));
