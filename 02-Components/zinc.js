'use strict';
/* eslint-env browser */
const userData = {
    picture: {
        thumbnail: 'https://f4.bcbits.com/img/0001142378_10.jpg'
    },
    name: {
        first: 'Jack',
        last: 'Burton'
    },
    location: {
        city: 'San Francisco',
        state: 'CA'
    },
    email: 'jack.burton@example.com'
};

const userData2 = {
    picture: {
        thumbnail: 'https://f4.bcbits.com/img/0001142378_10.jpg'
    },
    name: {
        first: 'Jack2',
        last: 'Burton'
    },
    location: {
        city: 'San Francisco',
        state: 'CA'
    },
    email: 'jack.burton@example.com'
};

const Zinc = {
    components: {}
};

Zinc.registerComponent = function (configObject) {

    Zinc.components[configObject.elementName] = {
        elementName: configObject.elementName,
        templateFile: configObject.templateFile,
        dataObject: configObject.dataObject,
        controler: configObject.controler
    }
    // console.log(Zinc.registerComponent);
};
// Zinc.registerComponent('user-item', 'user', userData);
// Zinc.registerComponent('user-item2', 'user', userData2);



(() => {
    function renderComponent(element, content, data, controler) {
        let userItem = document.querySelector(element);
        let currentComponent = Zinc.components[element];
        console.log(currentComponent);
        fetch(`${content}.html`)
            .then(content => content.text())
            .then((content) => {
                let regEx = /{{\s*([\w.]+)\s*}}/g;
                let HTML = content.replace(regEx, (match, templateValue) => {
                    let templateValueArr = templateValue.split('.');
                    return templateValueArr.reduce((acc, curr) => acc[curr], data)
                })
                userItem.insertAdjacentHTML('beforeend', HTML);
                controler(currentComponent);
            })
        // console.log(element, content); // eslint-disable-line no-console
    }
    Zinc.renderComponents = function (components) {
        fetch(`index.html`)
            .then(index => index.text())
            .then((index) => {
                let regEx = /(?<=<)[\w-]+(?=>)/g; 
                let htmlElements = index.match(regEx);
                console.log(htmlElements);
                for (let i = 0; i<htmlElements.length; i++) {
                    console.log(htmlElements[i]);
                    if(components.hasOwnProperty(htmlElements[i]) === true) {
                        console.log('true');
                        renderComponent(Zinc.components[htmlElements[i]]['elementName'], Zinc.components[htmlElements[i]]['templateFile'], Zinc.components[htmlElements[i]]['dataObject'], Zinc.components[htmlElements[i]].controler);
                    }
                }
            })
        }
               
        //create for loop to put every possible element into an array
        //where elementName of array exisis as property renderComponemt
        

            
    

   let toggleHighlight  = function (component) {
        let listItem = document.querySelector(component['elementName']).childNodes[0];
        console.log(listItem);
        listItem.addEventListener('click', () => {
            listItem.classList.toggle('toggleBackground');
        })
    }

    function init() {
        fetch('https://randomuser.me/api/?results=5')
        .then(res => res.json())
        .then(json => {
           for(let i=0; i<json.results.length; i++) {
               let configObject = {
                elementName: `user-item${i}`,
                templateFile: 'user',
                dataObject: json.results[i],
                controler: toggleHighlight
               };
            Zinc.registerComponent(configObject);
           }
        }).then(()=>Zinc.renderComponents(Zinc.components))
        
    
    };
    //     Zinc.renderComponents(Zinc.components);

       
    // }


    document.addEventListener('DOMContentLoaded', init);
})();