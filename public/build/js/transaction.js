module.exports = {
  $amountField: $('.transaction__field-amount'),
  $checkboxs: $('.transaction__user-checkbox'),
  $debtContainer: $('.transaction__user-debt'),
  $info: $('.transaction__info'),
  checked: 0,
  init() {
    this.$amountField.on('keyup', (e) => {
      this.updateUserDebt();
    });

    this.$checkboxs.on('click', (e) => {
      this.counter();
    });
  },
  updateUserDebt() {
    let input = this.$amountField.val();
    let amount = parseInt(input);

    console.log(amount);
    if (amount > 9) {
      this.$debtContainer.html(`$${amount}`);
    }
    else if (amount <= 9) {
      this.$debtContainer.html(`$${amount / 2}`);
    }
    else {
      this.$debtContainer.empty();
    }
  },
  counter() {
    let checked = 0;
    let total = this.$checkboxs.length;
    $.each(this.$checkboxs, function() {
      let isChecked = $(this).is(':checked');
      if (isChecked) {
        ++checked;
      }
    });
    this.checked = checked;
    if (this.checked > 1) {
      this.updateBrowserCounter();
    }
    if (this.checked <= 1) {
      this.removeBrowserCounter();
    }
  },
  removeBrowserCounter() {
    this.$info.empty();
  },
  updateBrowserCounter() {
    this.$info.html(`Split ${this.checked} ways`);
  }

};