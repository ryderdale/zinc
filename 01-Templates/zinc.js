'use strict';

/* eslint-env browser */

//id will be z-user-list

let templateString = `
<li class="user">
<img class="user-photo" src="{{ picture.thumbnail }}" alt="Photo of {{ name.first }} {{ name.last }}">
<div class="user-name">{{ name.first }} {{ name.last }}</div>
<div class="user-location">{{ location.city }}, {{ location.state }}</div>
<div class="user-email">{{ email }}</div>
</li>`;

// const data = {
//     photo: data.picture.thumbnail,
//     firstName: data.name.first,
//     lastName: data.name.last,
//     city: data.location.city,
//     state: data.location.state,
//     email: data.email
// };

// () => {
function renderTemplate(data, template, appendingElementId) {
    fetch(`${template}.html`)
    .then(template => template.text())
    .then((template) => {
        let regEx = /{{\s*([\w.]+)\s*}}/g; 
        let HTML=template.replace(regEx, (match, templateValue) => {
            let templateValueArr = templateValue.split('.');
            return templateValueArr.reduce((acc ,curr) => acc[curr], data)
            })
        document.getElementById(appendingElementId).insertAdjacentHTML('beforeend', HTML);
        })
        
}; 


//     let HTML = templateString;
//     HTML = templateString.replace(/{{\s*([\w.]+)\s*}}/g, (match , templateValue) => {
//         //use for loop to determine if template value contains period(s)
        
//         for(let i=0; i<templateValue[i].length; i++) {
//             //if template value does not contain periods 
//             if (templateValue[i] == '.') {
//                 let objectPathArr = templateValue.split('.');
//                 console.log(objectPathArr);
//                 let objectValue = data[objectPathArr[0]];
//                 console.log(objectValue);
//                 for (let j=1; j<objectPathArr.length; j++) {
//                     objectValue = objectValue[objectPathArr[j]];
//                     console.log(objectValue);
//                 }
//             HTML = HTML.replace(`{{ ${templateValue} }}`, objectValue);
//             }
//             // if(templateValue[i] !== '.') {
//             //     let objectValue = data[templateValue];
//             //     HTML = HTML.replace(`{{ ${templateValue} }}`, objectValue);
//             //     } 
//             //if template value does contain periods then vaidage thorugh object and isolate nested value 
            
//         }
//         document.getElementById(appendingElementId).insertAdjacentHTML('beforeend', HTML);
//     })
// };




    function populateList (arrayData, templateString, appendingElementId) {
        for (let i=0; i<arrayData.length; i++) {
            let data = arrayData[i];
            renderTemplate(data, templateString, appendingElementId);
        };
        
        // console.log(results); // eslint-disable-line no-console
    }

    function appendChildTemplate(data, templateString, id) {

    }

    function init() {
        fetch('https://randomuser.me/api/?results=5')
            .then(res => res.json())
            .then(json => populateList(json.results, 'user', 'z-user-list'));
    }

    document.addEventListener('DOMContentLoaded', init);
// })();






// listItem.appendChild.createElement('img').classList.add('user-photo').setAttribute('src', '{{ photo }}').setAttribute('alt', 'Photo of {{ firstName }} {{ lastName }}') ;
// listItem.appendChild.createElement('div').classList.add('user-name').innerHTML = '{{ name.first }} {{ name.last }}';
// listItem.appendChild.createElement('div').classList.add('user-location').innerHTML = '{{ location.city }}, {{ location.state }}';
// listItem.appendChild.createElement('div').classList.add('user-email').innerHTML = '{{ email }}';
// let userList = document.getElementsById('z-user-list');
// userList.appendChild(listItem) 