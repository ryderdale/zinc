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
        for(let component in components) {
            renderComponent(Zinc.components[component]['elementName'], Zinc.components[component]['templateFile'], Zinc.components[component]['dataObject'], Zinc.components[component].controler);
        }
    }

   let toggleHighlight  = function (component) {
        let listItem = document.querySelector(component['elementName']).childNodes[0];
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