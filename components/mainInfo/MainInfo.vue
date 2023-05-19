<template>
  <div
    v-if="
      dealFields.selectedOptionTypeCompany === 'fl' ||
      dealFields.selectedOptionTypeCompany === 'ip' ||
      dealFields.selectedOptionTypeCompany === 'ul' ||
      dealFields.selectedOptionTypeCompany === 'other'
    "
  >
    <div class="row align-items-start">
      <div class="col">
        <legend>Основная информация</legend>

        <label for="iinBin" class="form-label">БИН/ИИН</label>
        <input
          id="iinBin"
          type="number"
          class="form-control needs-validation"
          v-model="dealFields.iinBin"
          @change="setSessionData()"
          placeholder="12 цифр"
          required
        />

        <button
          id="a-data"
          type="submit"
          class="custom-button"
          @click="getAData()"
        >
          Проверить
        </button>

        <div
          id="spinnerAData"
          style="margin-left: 50%; margin-right: 50%"
          class="spinner-border d-none"
          role="status"
        >
          <span class="sr-only"></span>
        </div>

        <label for="company-list" class="form-label">От компании</label>
        <select
          id="company-list"
          class="form-select"
          v-model="dealFields.selectedFromCompany"
          @change="setSessionData()"
        >
          <option v-for="company in companyList" :value="company.key">
            {{ company.value }}
          </option>
        </select>

        <label for="node-list" class="form-label">Подключение от узла</label>
        <select
          id="node-list"
          class="form-select"
          v-model="dealFields.selectedNodeList"
          @change="setSessionData()"
        >
          <option value="" selected>Выбрать</option>
          <option v-for="optical in opticalList" :value="optical.key">
            {{ optical.value }}
          </option>
        </select>
        <label for="tv-list" class="form-label">Подключение по ТВ</label>
        <select
          id="tv-list"
          class="form-select"
          v-model="dealFields.selectedTvList"
          @change="setSessionData()"
        >
          <option value="" selected>Выбрать</option>
          <option v-for="tv in tvList" :value="tv.key">{{ tv.value }}</option>
        </select>

        <label for="connectionAddress" class="form-label"
          >Адрес подключения</label
        >
        <input
          id="connectionAddress"
          type="text"
          class="form-control needs-validation"
          v-model="dealFields.connectionAddress"
          @change="setSessionData()"
          required
        />

        <label for="legalAddress" class="form-label">Юридический адрес</label>
        <input
          id="legalAddress"
          type="text"
          class="form-control needs-validation"
          v-model="dealFields.legalAddress"
          @change="setSessionData()"
          required
        />

        <label for="email" class="form-label">E-mail</label>
        <input
          id="email"
          type="email"
          class="form-control needs-validation"
          v-model="dealFields.email"
          @change="setSessionData()"
          required
        />

        <label for="kbe" class="form-label">Кбе</label>
        <input
          id="kbe"
          type="text"
          class="form-control needs-validation"
          maxlength="2"
          v-model="dealFields.kbe"
          @change="setSessionData()"
          required
        />

        <div
          v-if="
            dealFields.selectedOptionTypeCompany === 'ip' ||
            dealFields.selectedOptionTypeCompany === 'ul' ||
            dealFields.selectedOptionTypeCompany === 'other'
          "
        >
          <label for="clientName" class="form-label">Наименование</label>
          <input
            id="clientName"
            type="text"
            class="form-control needs-validation"
            disabled
            v-model="dealFields.clientName"
            @change="setSessionData()"
            required
          />
        </div>

        <div v-if="dealFields.selectedOptionTypeCompany === 'fl'">
          <label for="clientName" class="form-label">ФИО</label>
          <input
            id="clientName"
            type="text"
            class="form-control needs-validation"
            v-model="dealFields.clientName"
            @change="setSessionData()"
            required
          />
        </div>
      </div>

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
    </div>
  </div>
</template>

<script>
export default {
  name: "MainINfo",
  mounted() {
    const field = sessionStorage.getItem(params.entity_id);
    if (field) {
      this.dealFields = JSON.parse(field);
    }
    this.getServiceList();

    // Добавление в select -> seacrh
    var vueThis = this;
    $(document).ready(function () {
      $("#company-list")
        .select2()
        .on("change", function () {
          vueThis.dealFields.selectedFromCompany = $(this).val();
          sessionStorage.setItem(
            params.entity_id,
            JSON.stringify(vueThis.dealFields)
          );
        });
      $("#tv-list")
        .select2()
        .on("change", function () {
          console.log("$(this).val()", $(this).val());
          vueThis.dealFields.selectedTvList = $(this).val();
          sessionStorage.setItem(
            params.entity_id,
            JSON.stringify(vueThis.dealFields)
          );
        });
    });
  },
  method: {
    setSessionData() {
      sessionStorage.setItem(params.entity_id, JSON.stringify(this.dealFields));
    },
  },
};
</script>
