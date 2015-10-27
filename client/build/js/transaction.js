'use strict';
const render = require('./render');
const components = require('components');

let splitBill = null;
let hasValidAmount = null;

const init = () => {
  let $user = $('.transaction__user');
  let $inputField = $('.transaction__field-amount');
  let $submitButton = $('.transaction__submit');

  splitBill = false;
  hasValidAmount = false;

  $inputField.on('keyup', (e) => {
    renderTransaction();
  });

  $user.on('click', function(e) {
    reconcileSelected($(this));
    renderTransaction();
  });

  $submitButton.on('click', (e) => {
    e.preventDefault();
    submitTransaction();
  });
};

const saveTransaction = () => {
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
      render(components.record, data);
    },
    error(err) {
      console.log(err);
    }
  });
};

const submitTransaction = () => {
  let hasDebtors = $('.selected').length > 0;
  let description = $('.transaction__field-description').val();
  let hasDescription = description !== '';

  if (hasDebtors && hasValidAmount && hasDescription) {
    saveTransaction();
  } else {
    return;
  }
};

const reconcileSelected = ($this) => {
  let $userCheckbox = $this.find('.transaction__user-checkbox');
  let $userDebt = $this.find('.transaction__user-debt');

  $userDebt.toggleClass('selected');
  if ($userDebt.hasClass('selected')) {
    $userCheckbox.prop('checked', true);
  } else {
    $userCheckbox.prop('checked', false);
    $userDebt.empty();
  }
};

const renderTransaction = () => {
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
};

module.exports = init;