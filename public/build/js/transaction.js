let $amountField = $('.transaction__field-amount');
let $checkboxs = $('.transaction__user-checkbox');
let $user = $('.transaction__user');
let $selected = $('.selected');
let $info = $('.transaction__info');
let $debtContainer = $('.transaction__user-debt');
let splitting = false;

module.exports = {
  init() {
    $amountField.on('keyup', (e) => {
      this.updateUserDebt();
    });
    let self = this;
    $user.on('click', function(e) {
      let $checkbox = $(this).find('.transaction__user-checkbox');
      let $debt = $(this).find('.transaction__user-debt');
      $debt.toggleClass('selected');
      if ($debt.hasClass('selected')) {
        $checkbox.prop('checked', true);
      }
      else {
        $debt.empty();
        $checkbox.prop('checked', false);
      }

      self.updateUserDebt();
    });
  },
  updateUserDebt() {
    let input = $amountField.val();
    let amount = parseInt(input);
    let payees = $('.selected').length;
    let debt = (amount / payees);

    if (payees > 1) {
      $info.html(`Split ${payees} ways`);
      splitting = true;
    }
    else if (payees <= 1) {
      $info.empty();
      splitting = false;
    }

    if (amount > 9) {
      $('.selected').html(`$${debt}`);
    }
    else if (amount <= 9) {
      $('.selected').html(`$${debt / 2}`);
    }
  },
};