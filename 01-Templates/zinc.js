'use strict';

/* eslint-env browser */

//id will be z-user-list

(() => {
    function renderTemplate(data, templateString) 
        regExSplit = 
        regexRplace = /{{\s(.*?)\s}}/gm; 
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
        templateString.replace(/{{\s(.*?)\s}}/gm, (match, captured) =>  {
        for (prop in data) {
            for (i=0; i<templateProperties.length; i++) {
                if(prop === templateProperties[i]) {
                    templateValue = prop.value;  
                    } 
                }
            }
            
        });

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
       
        console.log(results); // eslint-disable-line no-console
    });

    function populateList (data, templateString) {
        let listItem = document.createElement('li'); 
        let userList = document.getElementsById('z-user-list');
        let subdata = data.results; 
        for (i=0; i<subdata.length; i++) {
            let functionData = subdata[i];
            renderTemplate(functionData, templateString);
            userList.appendChild(listItem);
        };
        
        console.log(results); // eslint-disable-line no-console
    }

    function appendChildTemplate(data, templateString, id) {

    }

    function init() {
        fetch('https://randomuser.me/api/?results=5')
            .then(res => res.json())
            .then(json => renerTemplate(json.results,templateString));
    }

    document.addEventListener('DOMContentLoaded', init);
})();



let templateString = `
listItem.appendChild.createElement('img').classList.add('user-photo').setAttribute('src', '{{ photo }}').setAttribute('alt', 'Photo of {{ firstName }} {{ lastName }}') ;
listItem.appendChild.createElement('div').classList.add('user-name').innerHTML = '{{ name.first }} {{ name.last }}';
listItem.appendChild.createElement('div').classList.add('user-location').innerHTML = '{{ location.city }}, {{ location.state }}';
listItem.appendChild.createElement('div').classList.add('user-email').innerHTML = '{{ email }}';
let userList = document.getElementsById('z-user-list');
userList.appendChild(listItem) `