let form = document.getElementById('addForm');
let itemList = document.getElementById('items');
form.addEventListener('submit' , addItem);

function addItem(e){
    e.preventDefault();
    
    //get input value
    let newItem = document.getElementById('item').value;
    let description = document.getElementById('description').value;
    let category = document.getElementById('sel1').value;

    // CReate a new li element

    let li = document.createElement('li');

    //Add text node with input value
    li.appendChild(document.createTextNode(newItem + " "));
    li.appendChild(document.createTextNode(description+ " "));
    li.appendChild(document.createTextNode(category));
    
    //create a delete button

    let deleteButton = document.createElement('button');
    //add classes to delete button
    deleteButton.className = 'btn btn-danger btn-sm float-right delete';
    //Append text node 
    deleteButton.appendChild(document.createTextNode('Delete'));
    //Append button to li
    li.appendChild(deleteButton);
    //append li to list 
    //itemList.appendChild(li); 

    //create edit button
    let editButton = document.createElement('button');
    editButton.id = 'edit';
    editButton.className = 'btn btn-dark btn-sm float-right ';
    editButton.appendChild(document.createTextNode('EDIT'));
    //append 
    li.appendChild(editButton);
    itemList.appendChild(li); 
    let details_obj = {expense:e.target.item.value.toString(),
        description:e.target.description.value,
        category:e.target.sel1.value,
        }
        let userdetails_obj = JSON.stringify(details_obj);
        localStorage.setItem(e.target.description.value ,userdetails_obj );
        deleteButton.addEventListener('click',removeItem);
        function removeItem(e){
            if(e.target.classList.contains('delete')){
                    
                    let li = e.target.parentElement;
                    itemList.removeChild(li);
                    localStorage.removeItem(description);
            }   
        }
        editButton.addEventListener('click',editItem);
        let item = e.target.item.value;
        let desc = e.target.description.value;
        let categ = e.target.category.value;
        function editItem(e){
            e.preventDefault();
            let parentNode = e.target.parentNode;
            parentNode.remove();
            localStorage.removeItem(desc);
            document.getElementById('item').value = item;
            document.getElementById('description').value = desc;
            document.getElementById('sel1').value = categ;
        }

    
}



    