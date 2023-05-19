<template>
  <div id="app-add">
    <div class="row align-items-start">
      <legend>Тип компании</legend>
      <div class="col">
        <select
          v-model="dealFields.selectedOptionTypeCompany"
          @change="setSessionData()"
          class="form-select"
        >
          <option value="ip">ИП</option>
          <option value="fl">Физическое лицо</option>
          <option value="ul">ТОО/АО</option>
          <option value="other">Другой тип</option>
        </select>
      </div>
    </div>
    <SaveAndStart @saveData="saveData" ref="saveStart" />
    <MainInfo
      :userId="userId"
      :dealId="dealId"
      :dealFields="dealFields"
      :extensions="extensions"
    />
    <ContactPersons
      :companyList="companyList"
      :opticalList="opticalList"
      :tvList="tvList"
    />
    <BankReqisites />
  </div>
</template>

<script>
import SaveAndStart from "component/SaveAndStart.vue";
import MainInfo from "component/mainInfo/MainInfo.vue";
import ContactPersons from "component/contactPersons/ContactPersons.vue";
import BankReqisites from "component/bankReqisites/BankReqisites.vue";

export default {
  name: "App",
  components: {
    SaveAndStart,
    MainInfo,
    ContactPersons,
    BankReqisites,
  },
  data() {
    return {
      userId: params.user_id,
      dealId: params.entity_id,
      opticalList: [],
      tvList: [],
      dealFields: {
        // Выбор бизнес процесса
        bitrixBusinessProcessId: null,
        // Поля всех типов киентов
        selectedOptionTypeCompany: null,
        iinBin: null,
        selectedFromCompany: null,
        selectedNodeList: null,
        selectedTvList: null,
        connectionAddress: "Казахстан, Алматы, #### район, улица #### ##",
        legalAddress: null,
        email: null,
        kbe: null,
        clientName: null,
        //   Контактные лица - общие
        contactNameTech: null,
        contactPhoneTech: null,
        contactNameAgreement: null,
        contactPhoneAgreement: null,
        contactNamePayment: null,
        contactPhonePayment: null,
        agreementId: null,
        agreementDate: null,
        //  Контактные лица - ИП/ТОО/АО/Другие
        directorFullName: null,
        // Банковские реквизиты - ИП/ТОО/АО/Другие
        checkingAccount: null,
        bik: null,
        bank: null,
        // Данные о подписанте - Общие
        signatoreFullName: null,
        signatorePhone: null,
        // Данные о подписанте - ИП/ТОО/АО/Другие
        positionSignatory: null,
        reasonForSigning: null,
        // Данные о подписанте - ФЛ
        numberUdv: null,
        udvFrom: null,
        udvTo: null,
        // Вложения - ФЛ/ИП
        udvFront: null,
        udvBack: null,
        //  Вложения - ИП
        ipCoupon: null,
        // Вложения - ТОО/АО/Другие
        registrationCertificate: null,
        orderForDirector: null,
      },
      extensions: {
        udvFront: null,
        udvBack: null,
        ipCoupon: null,
        registrationCertificate: null,
        orderForDirector: null,
      },
    };
  },
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
      $("#node-list")
        .select2()
        .on("change", function () {
          vueThis.dealFields.selectedNodeList = $(this).val();
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
  methods: {
    setSessionData() {
      sessionStorage.setItem(params.entity_id, JSON.stringify(this.dealFields));
      this.$refs.saveStart.saveData();
    },
    async getServiceList() {
      let getServiceListData = {
        bitrix_user_id: this.userId,
      };

      await $.ajax({
        url: "",
        data: JSON.stringify(getServiceListData),
        type: "POST",
        headers: {
          Accept: "application/json; odata=verbose",
        },
      }).done((data) => {
        let response = JSON.parse(data);
        this.companyList = response.company;
        this.opticalList = response.optical;
        this.tvList = response.tv;
      });
    },
  },
};
</script>

<style>
.custom-button {
  padding: 6px 6px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  transition-duration: 0.4s;
  cursor: pointer;
  background-color: #0033ff;
  color: white;
  border: solid #d5d5d5;
  width: 100%;
}

.custom-button:hover {
  background-color: #04b60d;
  color: white;
}

.custom-button:disabled {
  background-color: #d5d5d5;
}
</style>
