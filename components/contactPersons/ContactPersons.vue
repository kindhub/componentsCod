<template>
  <div class="col">
    <legend>Контактные лица</legend>
    <label for="contactNameTech" class="form-label"
      >Контактное лицо (по тех вопросам)</label
    >
    <input
      id="contactNameTech"
      type="text"
      class="form-control needs-validation"
      v-model="dealFields.contactNameTech"
      @change="setSessionData()"
      required
    />

    <label for="contactPhoneTech" class="form-label"
      >Сотовый номер (по тех вопросам)</label
    >
    <input
      id="contactPhoneTech"
      type="text"
      v-model="dealFields.contactPhoneTech"
      class="form-control needs-validation"
      @change="setSessionData()"
      placeholder="+7701XXXXXXX"
      required
    />

    <label for="contactNameAgreement" class="form-label"
      >Контактное лицо (по Договору)</label
    >
    <input
      id="contactNameAgreement"
      type="text"
      class="form-control needs-validation"
      v-model="dealFields.contactNameAgreement"
      @change="setSessionData()"
      required
    />

    <label for="contactPhoneAgreement" class="form-label"
      >Сотовый номер (по Договору)</label
    >
    <input
      id="contactPhoneAgreement"
      type="text"
      class="form-control needs-validation"
      v-model="dealFields.contactPhoneAgreement"
      @change="setSessionData()"
      required
      placeholder="+7701XXXXXXX"
    />

    <label for="contactNamePayment" class="form-label"
      >Контактное лицо (по оплате)</label
    >
    <input
      id="contactNamePayment"
      type="text"
      class="form-control needs-validation"
      v-model="dealFields.contactNamePayment"
      @change="setSessionData()"
      required
    />

    <label for="contactPhonePayment" class="form-label"
      >Сотовый номер (по оплате)</label
    >
    <input
      id="contactPhonePayment"
      type="text"
      class="form-control needs-validation"
      v-model="dealFields.contactPhonePayment"
      @change="setSessionData()"
      required
      placeholder="+7701XXXXXXX"
    />

    <div
      v-if="
        dealFields.selectedOptionTypeCompany === 'ip' ||
        dealFields.selectedOptionTypeCompany === 'ul' ||
        dealFields.selectedOptionTypeCompany === 'other'
      "
    >
      <label for="directorFullName" class="form-label">ФИО Директора</label>
      <input
        id="directorFullName"
        type="text"
        class="form-control needs-validation"
        disabled
        v-model="dealFields.directorFullName"
        @change="setSessionData()"
        required
      />
    </div>

    <label for="agreementId" class="form-label">Номер договора</label>
    <input
      id="agreementId"
      type="text"
      class="form-control needs-validation"
      disabled
      v-model="dealFields.agreementId"
      @change="setSessionData()"
      required
    />

    <label for="agreementDate" class="form-label"
      >Дата составления договора</label
    >
    <input
      id="agreementDate"
      type="text"
      class="form-control needs-validation"
      disabled
      v-model="dealFields.agreementDate"
      @change="setSessionData()"
      required
    />
  </div>
</template>

<script>
export default {
  name: "ContactPersons",
  method: {
    setSessionData() {
      sessionStorage.setItem(params.entity_id, JSON.stringify(this.dealFields));
    },
  },
};
</script>
