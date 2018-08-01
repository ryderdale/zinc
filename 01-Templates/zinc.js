'use strict';

/* eslint-env browser */

//id will be z-user-list

let templateString = `
<li class="user">
<img class="user-photo" src="{{ photo }}" alt="Photo of {{ firstName }} {{ lastName }}">
<div class="user-name">{{ firstName }} {{ lastName }}</div>
<div class="user-location">{{ city }}, {{ state }}</div>
<div class="user-email">{{ email }}</div>
</li>`;

// const data = {
//     photo: user.picture.thumbnail,
//     firstName: user.name.first,
//     lastName: user.name.last,
//     city: user.location.city,
//     state: user.location.state,
//     email: user.email
// };

// () => {
function renderTemplate(data, templateString, appendingElementId) {
    // regExSplit = 
    // regexRplace = /{{\s(.*?)\s}}/gm; 
    let stringArr = templateString.split(/{{(.*?)}}/);
    let templateProperties = [];
    for (let i = 0; i<stringArr.length; i++) {
        if(i%2 == 1) {
            console.log(i);
            let intraArr = stringArr[i].split(" ");
            console.log(intraArr);
            templateProperties.push(intraArr.join(""));  
        }
    };
    console.log(templateProperties);
    let newTemplateString;
    for (let prop in data) {
        console.log(prop);
        console.log(data[prop]);
        // console.log(data.gender);
        // console.log(prop.value);
        for (let i=0; i<templateProperties.length; i++) {
            if(prop === templateProperties[i]) {
                console.log('match', prop, "with", data[prop]);
                newTemplateString = templateString.replace(`{{ ${templateProperties[i]} }}`, data[prop]);
            }  
        } 
    }
    document.getElementById(appendingElementId).insertAdjacentHTML('beforeend', newTemplateString);
}
        
    // });
// };
// templateString.replace(/{{\s(.*?)\s}}/gm, (match, captured) =>  {

        // for (let i=0; i<templateProperties.length; i++) {
        //     templateProperties[i] = 'data.' + templateProperties[i];
        // }
        // console.log(templateProperties);
        // let 
        // for(let i = 0; i<stringArr.length; i++ ) {
        //     if(i%2 == 1) {
        //         strinArr[i] = templateProperties[0];
        //         stringArr.splice(0);
        // }
        // let renderedTemplate = stringArr.join('');
        // console.log(readyTemplate);
       
        // console.log(results); // eslint-disable-line no-console
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
            .then(json => populateList(json.results,templateString, 'z-user-list'));
    }

    document.addEventListener('DOMContentLoaded', init);
// })();






// listItem.appendChild.createElement('img').classList.add('user-photo').setAttribute('src', '{{ photo }}').setAttribute('alt', 'Photo of {{ firstName }} {{ lastName }}') ;
// listItem.appendChild.createElement('div').classList.add('user-name').innerHTML = '{{ name.first }} {{ name.last }}';
// listItem.appendChild.createElement('div').classList.add('user-location').innerHTML = '{{ location.city }}, {{ location.state }}';
// listItem.appendChild.createElement('div').classList.add('user-email').innerHTML = '{{ email }}';
// let userList = document.getElementsById('z-user-list');
// userList.appendChild(listItem) 