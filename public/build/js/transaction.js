let splitBill = null;
let hasValidAmount = null;


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
    let payees = [];
    let description = $('.transaction__field-description').val();
    let total = $('.transaction__field-amount').val();

    $.each($('.selected'), function() {
      let user = $(this).parent().data('user');
      let debt = $(this).text();
      let payee = {user, debt};
      payees.push(payee);
    });

    let transaction = {
      total: total,
      description: description,
      payees: payees
    };
    console.log(transaction);
    $.ajax({
      url: '/expenses/new',
      type: 'POST',
      data: JSON.stringify(transaction),
      contentType: 'application/json; charset=utf-8',
      success(data) {
        console.log(data);
      },
      error(err) {
        console.log(err);
      }
    });
  },
  submitTransaction() {
    let hasPayees = $('.selected').length > 0;
    let description = $('.transaction__field-description').val();
    let hasDescription = description !== '';

    if (hasPayees && hasValidAmount && hasDescription) {
      exp.saveTransaction();
    }
    else {
      return;
    }
  },
  reconcileSelected($this) {
    let $userCheckbox = $this.find('.transaction__user-checkbox');
    let $userDebt = $this.find('.transaction__user-debt');

    $userDebt.toggleClass('selected');
    if ($userDebt.hasClass('selected')) {
      $userCheckbox.prop('checked', true);
    }
    else {
      $userCheckbox.prop('checked', false);
      $userDebt.empty();
    }
  },
  render() {
    let $notification = $('.transaction__info');
    let value = $('.transaction__field-amount').val();
    let amount = parseInt(value);
    let $selected = $('.selected');
    let payees = $selected.length;
    let debt = (amount / payees);

    if (payees > 1) {
      $notification.html(`Split ${payees} ways`);
      splitBill = true;
    }
    else if (payees <= 1) {
      $notification.empty();
      splitBill = false;
    }

    if (amount > 9) {
      $selected.html(`$${debt}`);
      hasValidAmount = true;
    }
    else if (amount <= 9) {
      $selected.html(`$${debt / 2}`);
      hasValidAmount = true;
    }
    else {
      $selected.empty();
      hasValidAmount = false;
    }
  },
};

module.exports = exp;