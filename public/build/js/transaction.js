let checked = 0;
let counter = 0;
let $amountField = $('.transaction__field-amount');
let $checkboxs = $('.transaction__user-checkbox');
let $debtContainer = $('.transaction__user-debt');
let $info = $('.transaction__info');

module.exports = {

  init() {
    $amountField.on('keyup', (e) => {
      this.updateUserDebt();
    });

    $checkboxs.on('click', (e) => {
      this.runCounter();
    });
  },
  updateUserDebt() {
    let input = $amountField.val();
    let amount = parseInt(input);

    if (amount > 9) {
      $debtContainer.html(`$${amount}`);
    }
    else if (amount <= 9) {
      $debtContainer.html(`$${amount / 2}`);
    }
    else {
      $debtContainer.empty();
    }
  },
  incrementCounter($this) {
    let isChecked = $this.is(':checked');
    if (isChecked) {
      counter += 1;
    }
  },
  iterateCheckboxs(callback) {
    $.each($checkboxs, function() {
      callback($(this));
    });
  },
  runCounter() {
    this.iterateCheckboxs(this.incrementCounter);
    checked = counter;
    if (checked > 1) {
      this.updateBrowserCounter();
    }
    else if (checked <= 1) {
      this.removeBrowserCounter();
    }
    counter = 0;
  },
  setUserSelected($this) {
    let index = $this.data('user');
    let $container = $('.user' + index);
    $container.addClass('selected');
  },
  removeBrowserCounter() {
    $info.empty();
  },
  updateBrowserCounter() {
    $info.html(`Split ${checked} ways`);
  }

};