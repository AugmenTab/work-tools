const searchInput = document.querySelector('.search');
const result = document.querySelector('.code-data');

function findMatches(obdToMatch, obdList) {
    return obdList.filter(codes => {
        const regex = new RegExp(obdToMatch, 'gi');
        return codes.obdCode.match(regex);
    });
}

function displayMatches() {
    const matchArray = findMatches(this.value, obdList);
    const neutral = matchArray.map(codes => {
        `
            <div class="obd-code"></div>
            <div class="desc"></div>
        `;
    }).join('');
    const html = matchArray.map(({obdCode, desc}) => {
        return `
            <div class="obd-code"><strong>${obdCode}</strong></div>
            <div class="desc">${desc}</div>

        `;
    }).join('');
    if(matchArray.length === 1) {
        result.innerHTML = html;
    } else {
        result.innerHTML = neutral;
    };
}

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);