const searchInput = document.querySelector('.search');
const result = document.querySelector('.data');
var btns = document.querySelectorAll('.btn');
var dept = sessionStorage.getItem("dept") || "";

setDepartment(dept);

for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function(e) {
        setButtonActive(e.target);
        displayMatch(searchInput.value);
        sessionStorage.setItem('dept', dept);
    });
}

function setButtonActive(btn) {
    var current = document.getElementsByClassName("active");
    if (current.length !== 0) {
        current[0].className = current[0].className.replace(" active", "");
    }
    btn.className += " active";
    dept = btn.value;
}

function setDepartment(department) {
    if (!department) {
        return;
    }
    activeDepartmentBtn = document.getElementById(department);
    setButtonActive(activeDepartmentBtn)
}

function findMatch(codeToMatch, shoplist) {
    return shoplist.filter(shops => {
        const regex = new RegExp(codeToMatch, 'gi');
        return shops.pCode.match(regex);
    });
}

function displayMatch(code) {
    const matchArray = findMatch(code, shoplist);
    const neutral = matchArray.map(shops => {
        `
        <div class="data">
            <div id="name"></div>
            <div id="phone"></div>
            <br>
            <div id="address1"></div>
            <div id="address2"></div>
            <br>
            <div id="payMethod"></div>
            <div id="fax"></div>
            <div id="email"></div>
            <br>
            <div id="rep"></div>
            <div id="contact"></div>
            <br>
            <div id="notes"></div>
        </div>
        `;
    }).join('');
    const htmlC = matchArray.map(shops => {
        return `
            <div class="data">
                <div id="name">${shops.shopName}</div>
                <div id="phone">${shops.phoneNumber}</div>
                <br>
                <div id="address1">${shops.address}</div>
                <div id="address2">${shops.city}, ${shops.state} ${shops.zip}</div>
                <br>
                <div id="payMethod"><strong>${shops.payMethod}</strong></div>
                <div id="fax">${shops.faxNumber}</div>
                <div id="email"><a href="mailto:${shops.email}">${shops.email}</a></div>
                <br>
                <div id="rep"><a href="mailto:${shops.repEmail}">${shops.rep}</a></div>
                <div id="contact"><a href="mailto:${shops.contactCEmail}">${shops.contactC}</a></div>
                <br>
                <div id="notes">${shops.notesC}</div>
            </div> 
        `;
    }).join('');
    const htmlCS = matchArray.map(shops => {
        return `
            <div class="data">
                <div id="name">${shops.shopName}</div>
                <div id="phone">${shops.phoneNumber}</div>
                <br>
                <div id="address1">${shops.address}</div>
                <div id="address2">${shops.city}, ${shops.state} ${shops.zip}</div>
                <br>
                <div id="payMethod"><strong>${shops.payMethodCS}</strong></div>
                <div id="fax">${shops.faxNumber}</div>
                <div id="email"><a href="mailto:${shops.email}">${shops.email}</a></div>
                <br>
                <div id="rep"><a href="mailto:${shops.repEmail}">${shops.rep}</a></div>
                <div id="contact"><a href="mailto:${shops.contactCSEmail}">${shops.contactCS}</a></div>
                <br>
                <div id="notes">${shops.notesCS}</div>
            </div>
        `;
    }).join('');
    const htmlP = matchArray.map(shops => {
        return `
            <div class="data">
                <div id="name">${shops.shopName}</div>
                <div id="phone">${shops.phoneNumber}</div>
                <br>
                <div id="address1">${shops.address}</div>
                <div id="address2">${shops.city}, ${shops.state} ${shops.zip}</div>
                <br>
                <div id="paymethod"><strong>${shops.payMethod}</strong></div>
                <div id="fax">${shops.faxNumber}</div>
                <div id="email"><a href="mailto:${shops.email}">${shops.email}</a></div>
                <br>
                <div id="rep"><a href="mailto:${shops.repEmail}">${shops.rep}</a></div>
                <div id="contact"><a href="mailto:${shops.contactPEmail}">${shops.contactP}</a></div>
                <br>
                <div id="notes">${shops.notesP}</div>
            </div>
        `;
    }).join('');

    if(matchArray.length === 1 && dept === "claims") {
        result.innerHTML = htmlC;
    } else if(matchArray.length === 1 && dept === "custsrv"){
	    result.innerHTML = htmlCS;
    } else if(matchArray.length === 1 && dept === "payments"){
	    result.innerHTML = htmlP;
    } else {
        result.innerHTML = neutral;
    };
}

var timeout = setTimeout("location.reload(true);" ,300000);

function resetTimeout() {
    clearTimeout(timeout);
    timeout = setTimeout("location.reload(true);" ,300000);
}

searchInput.addEventListener('input', e => {
    displayMatch(e.target.value);
});
searchInput.addEventListener('keydown', resetTimeout);