let splitBill = null;
let hasValidAmount = null;
let render = require('./render');
let components = require('components');
const exp = {
  init() {
    let $user = $('.transaction__user');
    let $inputField = $('.transaction__field-amount');
    let $submitButton = $('.transaction__submit');
    let render = this.render;
    let reconcileSelected = this.reconcileSelected;
    let submitTransaction = this.submitTransaction;
    splitBill = false;
    hasValidAmount = false;

    $inputField.on('keyup', (e) => {
      render();
    });

    $user.on('click', function(e) {
      reconcileSelected($(this));
      render();
    });

    $submitButton.on('click', function(e) {
      e.preventDefault();
      submitTransaction();
    });
  },
  saveTransaction() {
    let debtors = [];
    let description = $('.transaction__field-description').val();
    let total = $('.transaction__field-amount').val();
    let groupId = $('.mod-transaction').data('group-id');

    $.each($('.selected'), function() {
      let user = $(this).parent().data('id');
      let debt = $(this).text().replace('$', '');
      let debtor = {user, debt};
      debtors.push(debtor);
    });

    let transaction = {
      total: total,
      description: description,
      debtors: debtors,
      groupId: groupId
    };
    $.ajax({
      url: '/expenses/new',
      type: 'POST',
      data: JSON.stringify(transaction),
      contentType: 'application/json; charset=utf-8',
      success(data) {
        console.log(data);
        render(components.record, data);
      },
      error(err) {
        console.log(err);
      }
    });
  },
  submitTransaction() {
    let hasDebtors = $('.selected').length > 0;
    let description = $('.transaction__field-description').val();
    let hasDescription = description !== '';

    if (hasDebtors && hasValidAmount && hasDescription) {
      exp.saveTransaction();
    } else {
      return;
    }
  },
  reconcileSelected($this) {
    let $userCheckbox = $this.find('.transaction__user-checkbox');
    let $userDebt = $this.find('.transaction__user-debt');

    $userDebt.toggleClass('selected');
    if ($userDebt.hasClass('selected')) {
      $userCheckbox.prop('checked', true);
    } else {
      $userCheckbox.prop('checked', false);
      $userDebt.empty();
    }
  },
  render() {
    let $notification = $('.transaction__info');
    let value = $('.transaction__field-amount').val();
    let amount = parseInt(value);
    let $selected = $('.selected');
    let debtors = $selected.length;
    let debt = (amount / debtors);

    if (debtors > 1) {
      $notification.html(`Split ${debtors} ways`);
      splitBill = true;
    } else if (debtors <= 1) {
      $notification.empty();
      splitBill = false;
    }

    if (amount > 9) {
      $selected.html(`$${debt}`);
      hasValidAmount = true;
    } else if (amount <= 9) {
      $selected.html(`$${debt / 2}`);
      hasValidAmount = true;
    } else {
      $selected.empty();
      hasValidAmount = false;
    }
  },
};

module.exports = exp;