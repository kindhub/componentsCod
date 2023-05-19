<template>
  <div class="col">
    <div
      v-if="
        dealFields.selectedOptionTypeCompany === 'ip' ||
        dealFields.selectedOptionTypeCompany === 'ul' ||
        dealFields.selectedOptionTypeCompany === 'other'
      "
    >
      <legend>Банковские реквизиты</legend>
      <label for="checkingAccount" class="form-label">Расчетный счет</label>
      <input
        id="checkingAccount"
        type="text"
        class="form-control needs-validation"
        v-model="dealFields.checkingAccount"
        @change="setSessionData()"
        placeholder="Начинается на код страны(KZ), плюс цифры от 15 до 20 символов"
        required
      />

      <label for="bik" class="form-label">БИК</label>
      <input
        id="bik"
        type="text"
        class="form-control needs-validation"
        v-model="dealFields.bik"
        @change="setSessionData()"
        placeholder="8 символов, все с большой буквы "
        required
      />

      <label for="bank" class="form-label">Банк</label>
      <input
        id="bank"
        type="text"
        class="form-control needs-validation"
        v-model="dealFields.bank"
        @change="setSessionData()"
        required
      />
    </div>

    <legend>Данные о подписанте</legend>

    <label for="signatoreFullName" class="form-label">Подписант ФИО</label>
    <input
      id="signatoreFullName"
      type="text"
      class="form-control needs-validation"
      v-model="dealFields.signatoreFullName"
      @change="setSessionData()"
      required
    />

    <label for="signatorePhone" class="form-label"
      >Подписант сотовый номер</label
    >
    <input
      id="signatorePhone"
      type="text"
      class="form-control needs-validation"
      v-model="dealFields.signatorePhone"
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
      <label for="positionSignatory" class="form-label"
        >Должность подписанта</label
      >
      <input
        id="positionSignatory"
        type="text"
        class="form-control needs-validation"
        v-model="dealFields.positionSignatory"
        @change="setSessionData()"
        required
      />

      <label for="reasonForSigning" class="form-label"
        >Основание для подписания</label
      >
      <input
        id="reasonForSigning"
        type="text"
        class="form-control needs-validation"
        v-model="dealFields.reasonForSigning"
        @change="setSessionData()"
        required
      />
    </div>

    <div v-if="dealFields.selectedOptionTypeCompany === 'fl'">
      <label for="numberUdv" class="form-label">№ удостоверения</label>
      <input
        id="numberUdv"
        type="text"
        class="form-control needs-validation"
        v-model="dealFields.numberUdv"
        @change="setSessionData()"
        required
      />

      <label for="udvFrom" class="form-label">Срок действует от</label>
      <input
        id="udvFrom"
        type="date"
        class="form-control needs-validation"
        v-model="dealFields.udvFrom"
        @change="setSessionData()"
        required
      />
      <label for="udvTo" class="form-label">Срок действует до</label>
      <input
        id="udvTo"
        type="date"
        class="form-control needs-validation"
        v-model="dealFields.udvTo"
        @change="setSessionData()"
        required
      />
    </div>

    <legend>Вложения</legend>

    <div class="row">
      <div
        v-if="
          dealFields.selectedOptionTypeCompany === 'ip' ||
          dealFields.selectedOptionTypeCompany === 'fl'
        "
      >
        <div class="col">
          <label for="udvFront" class="form-label">УДВ (Лицевая)</label>
          <input
            type="file"
            class="form-control needs-validation"
            id="udvFront"
            required
          />
        </div>
        <div class="col">
          <label for="udvBack" class="form-label">УДВ (Обратная)</label>
          <input
            type="file"
            class="form-control needs-validation"
            id="udvBack"
            required
          />
        </div>

        <div v-if="dealFields.selectedOptionTypeCompany === 'ip'">
          <div class="col">
            <label for="ipCoupon" class="form-label">Талон ИП</label>
            <input
              type="file"
              class="form-control needs-validation"
              id="ipCoupon"
              required
            />
          </div>
        </div>
      </div>
      <div
        v-if="
          dealFields.selectedOptionTypeCompany === 'ul' ||
          dealFields.selectedOptionTypeCompany === 'other'
        "
      >
        <div class="col">
          <label for="registrationCertificate" class="form-label"
            >Свидетельство о регистрации</label
          >
          <input
            type="file"
            class="form-control needs-validation"
            id="registrationCertificate"
            required
          />
        </div>
        <div class="col">
          <label for="orderForDirector" class="form-label"
            >Приказ на Директора/Доверенность</label
          >
          <input
            type="file"
            class="form-control needs-validation"
            id="orderForDirector"
            required
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BankRequisites",
  method: {
    setSessionData() {
      sessionStorage.setItem(params.entity_id, JSON.stringify(this.dealFields));
    },
  },
};
</script>