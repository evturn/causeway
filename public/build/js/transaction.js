module.exports = {
  $amount: $('.transaction__field-amount'),
  $checkboxs: $('.transaction__user-checkbox'),
  checked: 0,
  init() {
    this.$checkboxs.on('click', (e) => {
      this.counter();
    });
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
  }
};