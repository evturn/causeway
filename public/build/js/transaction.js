let $amountField = $('.transaction__field-amount');
let $user = $('.transaction__user');
let splitBill = null;

module.exports = {
  init() {
    let callback = this.callback;
    let reconcileSelected = this.reconcileSelected;
    splitBill = false;

    $amountField.on('keyup', (e) => {
      callback();
    });

    $user.on('click', function(e) {
      reconcileSelected($(this));
      callback();
    });
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
  callback() {
    let $notification = $('.transaction__info');
    let input = $amountField.val();
    let amount = parseInt(input);
    let payees = $('.selected').length;
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
      $('.selected').html(`$${debt}`);
    }
    else if (amount <= 9) {
      $('.selected').html(`$${debt / 2}`);
    }
    else {
      $('.selected').empty();
    }
  },
};