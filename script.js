let transactions = [
    {
        id: 1,
        date: "2026-10-29",
        amount: -400,
        status: 'success',
        type: 'expense'
    },

    {
        id: 2,
        date: "2026-11-01",
        amount: -400,
        status: 'success',
        type: 'expense'
    },

    {
        id: 3,
        date: "2026-11-03",
        amount: -400,
        status: 'success',
        type: 'expense'
    }
];

let monthlyIncome = 2758;
let monthlyExpenses = 1754;
const today = new Date().toISOString().split('T')[0];

document.getElementById('incomeDate').value = today;
document.getElementById('expenseDate').value = today;


function openIncomeModal() {
    document.getElementById('incomeModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function openExpenseModal() {
    document.getElementById('expenseModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.style.overflow = 'auto';
    document.querySelector('#' + modalId + ' .message-container').innerHTML = '';

    if(modalId === 'incomeModal') {
        document.getElementById('incomeForm').reset();
        document.getElementById('incomeDate').value = today;
    } else {
        document.getElementById('expenseForm').reset();
        document.getElementById('expenseDate').value = today;
    }
}

window.addEventListener('click', function (e) {
    if(e.target.classList.contains('modal')) {
        closeModal(e.target.id);
    }
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeModal('incomeModal');
        closeModal('expenseModal');
    }
});

function addAmount() {
    const amount = parseFloat(document.getElementById('incomeAmount').value);
    const category = document.getElementById('incomeCategory').value;
    const description = document.getElementById('incomeDescription').value;
    const date = document.getElementById('incomeDate').value;

    if(!amount || !category || !description || !date) {
        document.querySelector('#incomeForm .message-container').innerHTML = 'please fill in all required fields';
        return;
    }

    const newTransaction = {
        id : transactions.length + 1,
        date : date,
        category : category.charAt(0).toUpperCase() + category.slice(1),
        amount : amount,
        status  : 'Success',
        type : 'income',
        description : description
    }

    transactions.unshift(newTransaction);

    monthlyIncome += amount;
    updateDashboard();
    updateTransactionTable();

    closeModal('incomeModal');
    showNotifications('Income added successfully', 'success');
}

function addExpense() {
    const amount = parseFloat(document.getElementById('expenseAmount').value);
    const category = document.getElementById('expenseCategory').value;
    const description = document.getElementById('expenseDescription').value;
    const date = document.getElementById('expenseDate').value;

    if(!amount || !category || !description || !date) {
        document.querySelector('#expenseForm .message-container').innerHTML = 'please fill in all required fields';
        return;
    }

    const newTransaction = {
        id : transactions.length + 1,
        date : date,
        category : category.charAt(0).toUpperCase() + category.slice(1),
        amount : -amount,
        status  : 'Success',
        type : 'expense',
        description : description
    }

    transactions.unshift(newTransaction);

    monthlyExpenses += amount;
    updateDashboard();
    updateTransactionTable();

    closeModal('incomeModal');
    showNotifications('Expense added successfully', 'success');
}