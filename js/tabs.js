

let animals = [];

let currently_edited_animal = null;

const animals_name = document.getElementById('animals__name');
const description = document.getElementById('description');
const daily_expense = document.getElementById('daily__expense');
const type_animal = document.getElementById('type__animals');

function on_submit_click(){
    
    const animals_name_v = animals_name.value;
    const description_v = description.value;
    const daily_expense_v = daily_expense.value;
    const type_animal_v = type_animal.value;
    document.getElementById("title_cr_ed").innerHTML = "Create animals";
    if (currently_edited_animal === null) {
           
            animals.push({name: animals_name_v, description: description_v,
            daily_expense: daily_expense_v, type_animal: type_animal_v
        })
    } else {
        currently_edited_animal.name = animals_name_v
        currently_edited_animal.description = description_v
        currently_edited_animal.daily_expense = daily_expense_v
        currently_edited_animal.type_animal = type_animal_v

        currently_edited_animal = null
    }
    

    console.log(animals)

    animals_name.value = ''
    description.value = ''
    daily_expense.value = ''
    type_animal.value = ''

    on_click_tab("all")
}

const img_urls = {
    dog: '/img/dog.jpeg',
    cat: '/img/cat.jpg',
    hamster: '/img/hamster.jpg',
    parrot: '/img/parrot.jpg',
};

function generate_card(animal_obj, indx) {
    const card = document.getElementById('cardi').cloneNode(true);
    card.removeAttribute("id");
    card.classList.remove("content--hidden")
    const card_img = card.querySelector("#img__card")
    const card_title = card.querySelector("#title__card")
    const card_p1 = card.querySelector("#p1__card")
    const card_p2 = card.querySelector("#p2__card")
    const rem_but= card.querySelector("#card__remove")
    const ed_but = card.querySelector("#edit_animal_but")

    card_img.src = img_urls[animal_obj.type_animal]
    card_title.innerHTML = animal_obj.name
    card_p1.innerHTML = animal_obj.description
    card_p2.innerHTML = animal_obj.daily_expense
    rem_but.addEventListener("click", () => {
        animals.splice(indx,1)
        update_cards()
    });

    ed_but.addEventListener("click", () => {
        document.getElementById("title_cr_ed").innerHTML = "Edit animals";
        on_click_tab("create");
        setup_edit(animal_obj);

       
    })

    return card;
}

function setup_edit(animal_obj){


    animals_name.value = animal_obj.name
    description.value = animal_obj.description
    daily_expense.value = animal_obj.daily_expense
    type_animal.value = animal_obj.type_animal

    currently_edited_animal = animal_obj

}


const tab_data = {
    all: {
        button: document.getElementById("all_animals_but"),
        content: document.getElementsByClassName("all_animals_content"),
        callback: update_cards,
    },
    create: {
        button: document.getElementById("create_animal_but"),
        content: document.getElementsByClassName("create_animal_content")
    },

};



const animal_list_node = document.getElementById("animal_card_list");

function on_click_tab(key) {

    for (let tab_name in tab_data) {
        tab_data[tab_name].button.classList.remove("tab--active");
        for (let elem of tab_data[tab_name].content){
            elem.classList.add("content--hidden");
        }
        
    }


    tab_data[key].button.classList.add("tab--active");

    for (let elem of tab_data[key].content){
        elem.classList.remove("content--hidden");
    }
    if ('callback' in tab_data[key]) {
        tab_data[key].callback();
    }

}

for (let key in tab_data) {
    tab_data[key].button.addEventListener("click", () => {
        on_click_tab(key);
    });
}

function update_cards() {
    const node_list = animals.map(generate_card);
    animal_list_node.replaceChildren(...node_list);
}
