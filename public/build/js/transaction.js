let splitBill = null;

module.exports = {
  init() {
    let $user = $('.transaction__user');
    let $inputField = $('.transaction__field-amount');
    let render = this.render;
    let reconcileSelected = this.reconcileSelected;
    splitBill = false;

    $inputField.on('keyup', (e) => {
      render();
    });

    $user.on('click', function(e) {
      reconcileSelected($(this));
      render();
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
    }
    else if (amount <= 9) {
      $selected.html(`$${debt / 2}`);
    }
    else {
      $selected.empty();
    }
  },
};