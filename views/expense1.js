let form = document.getElementById('addForm');
let newItem = document.getElementById('item');
let description = document.getElementById('description');
let category = document.getElementById('sel1');
let addExpenseBtn = document.getElementById('additem');
let expenseAmt = 0;;



addExpenseBtn.addEventListener('click', function (e) {
    let inputData = {
        amount: newItem.value,
        description: description.value,
        category: category.value,
    }

    axios.post('http://localhost:3000/insert-data', inputData)
        .then(res => {
            console.log(res.data);
            const responseData = res.data.data;
            const expenseAmount = responseData.amount;
            const expenseDescription = responseData.description;
            const expenseCategory = responseData.category;

            const user = {
                amount: expenseAmount,
                description: expenseDescription,
                category: expenseCategory
            }

            let expense = document.getElementById('expense');
            expenseAmt = parseInt(expense.value) + parseInt(expenseAmount);
            document.getElementById('expense').value = expenseAmt;
            showDataOnTable(user, expenseAmount,responseData.id);

            let totalAmtElement = document.getElementById('totalAmt');
            let currentTotal = parseFloat(totalAmtElement.textContent.split(': ')[1]);
            updateTotalAmount(currentTotal + expenseAmount);


            // document.getElementById('totalAmt').textContent = "Total Amount Spent: " + expenseAmt;

            document.getElementById('item').value = "";
            document.getElementById('description').value = "";
            document.getElementById('sel1').value = "";


        })
        .catch(err => console.log(err));
});

function showDataOnTable(user, expenseAmt,expenseId) {
    let table = document.getElementById('datatable');
    let tr = document.createElement('tr');
    tr.classList = "table-info table-bordered text-xl-center fw-bold";
    tr.setAttribute('data-id', expenseId);
    tr.setAttribute('data-amount', user.amount);
    // tr.style.color = 'white';

    //creating row data elements

    
    let td2 = document.createElement('td');
    td2.textContent = user.amount;
    td2.style.textTransform = "capitalize";

    let td3 = document.createElement('td');
    td3.textContent = user.description;
    td3.style.textTransform = "capitalize";


    let td4 = document.createElement('td');
    td4.textContent = user.category;

    let editButton = document.createElement('button');
    editButton.classList = "btn btn-warning fw-bold"
    editButton.textContent = 'EDIT';

    let deleteButton = document.createElement('button');
    deleteButton.classList = "btn btn-danger fw-bold"
    deleteButton.textContent = 'DELETE';

    let td5 = document.createElement('td');
    td5.appendChild(editButton);

    let td6 = document.createElement('td');
    td6.appendChild(deleteButton);

    
    tr.append(td2);
    tr.append(td3);
    tr.append(td4);
    tr.append(td5);
    tr.append(td6);
    table.append(tr);

    editButton.addEventListener('click', function editfunction(e) {
        e.preventDefault();
        let parentNode = e.target.parentNode.parentNode;
        parentNode.remove();
        document.getElementById('item').value = user.expenseAmt;
        document.getElementById('description').value = user.description;
        document.getElementById('sel1').value = user.category;
        let expense = document.getElementById('expense');
        let expenseAmt = parseInt(expense.value) - user.expenseAmt;
        document.getElementById('expense').value = expenseAmt;
        document.getElementById('totalAmt').textContent = "Total Amount Spent: " + expenseAmt;

    });
    deleteButton.addEventListener('click', function deletefunction(event) {
        let currentRow = event.target.parentNode.parentNode;
        currentRow.remove();
        let expenseId = currentRow.getAttribute('data-id');
        let expenseAmount = parseFloat(currentRow.getAttribute('data-amount'));
        axios.delete(`http://localhost:3000/delete-expense/${expenseId}`)
        .then(() => {
            
            let expense = document.getElementById('expense');
            let expenseAmt = parseInt(expense.value) - expenseAmount;
            document.getElementById('expense').value = expenseAmt;
            updateTotalAmount(expenseAmt);
        })
        .catch(err => console.log(err));
    });
    
}

document.addEventListener('DOMContentLoaded', async function () {
    
    try {
        let res = await axios.get('http://localhost:3000/get-all-expenses');
        let expenseData = res.data;
        
        let totalAmount = 0;
        expenseData.forEach(expense => {
            totalAmount += expense.amount;
            // console.log(amount);
            showDataOnTable(expense,expense.amount,expense.id);
            
            // document.getElementById('totalAmt').textContent = "Total Amount Spent: " + amount;
        })
        updateTotalAmount(totalAmount);
    } catch (error) {
        console.log(error);
    }
});
function updateTotalAmount(amount) {
    let totalAmtElement = document.getElementById('totalAmt');
    totalAmtElement.textContent = "Total Amount Spent: " + amount;
}


