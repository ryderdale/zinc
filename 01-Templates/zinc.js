'use strict';

/* eslint-env browser */

//id will be z-user-list

let templateString = `
<li class="user">
<img class="user-photo" src="{{ thumbnail }}" alt="Photo of {{ first }} {{ last }}">
<div class="user-name">{{ first }} {{ last }}</div>
<div class="user-location">{{ city }}, {{ state }}</div>
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
function renderTemplate(data, templateString, appendingElementId, dataKey) {
    // regExSplit = 
    // regexRplace = /{{\s(.*?)\s}}/gm; 
    if (dataKey) {

    }
    else {
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
        let newTemplateString = templateString;
        for (let prop in data) {
            console.log(prop);
            console.log(data[prop]);
            // console.log(data.gender);
            // console.log(prop.value);
            for (let i=0; i<templateProperties.length; i++) {
                if(prop === templateProperties[i]) {
                    console.log('match', prop, "with", data[prop]);
                    newTemplateString = newTemplateString.replace(`{{ ${templateProperties[i]} }}`, data[prop]);
                }  
                else {
                    for(let subprop in data[prop]) {
                        if(subprop === templateProperties[i]) {
                            console.log('match',subprop, 'with', data[prop][subprop]);
                            newTemplateString = newTemplateString.replace(`{{ ${templateProperties[i]} }}`, data[prop][subprop]);
                        }
                    }
                }
            } 
        }
        document.getElementById(appendingElementId).insertAdjacentHTML('beforeend', newTemplateString);
    }
    
}
        
//repeat sub matching object to teplate value logic for sub properties of data tree
//add if statement for if dataKey



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