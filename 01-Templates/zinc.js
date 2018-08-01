'use strict';

/* eslint-env browser */

let templateString = `
<li class="user">
<img class="user-photo" src="{{ picture.thumbnail }}" alt="Photo of {{ name.first }} {{ name.last }}">
<div class="user-name">{{ name.first }} {{ name.last }}</div>
<div class="user-location">{{ location.city }}, {{ location.state }}</div>
<div class="user-email">{{ email }}</div>
</li>`;

function renderTemplate(data, template, appendingElementId) {
    
            let regEx = /{{\s*([\w.]+)\s*}}/g;
            let HTML = template.replace(regEx, (match, templateValue) => {
                let templateValueArr = templateValue.split('.');
                return templateValueArr.reduce((acc, curr) => acc[curr], data)
            })
            document.getElementById(appendingElementId).insertAdjacentHTML('beforeend', HTML);
        

};


function populateList(arrayData, templateString, appendingElementId) {
    for (let i = 0; i < arrayData.length; i++) {
        let data = arrayData[i];
        renderTemplate(data, templateString, appendingElementId);
    };
}


function init() {
    fetch('https://randomuser.me/api/?results=5')
        .then(res => res.json())
        .then(json => populateList(json.results, templateString, 'z-user-list'));
}

document.addEventListener('DOMContentLoaded', init);