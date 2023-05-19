<template>
  <div class="col">
    <button
      id="saveAndStart"
      type="submit"
      class="custom-button"
      @click="saveData()"
    >
      Запустить подключение
    </button>
    <div
      id="spinnerSaveAndStart"
      style="margin-left: 50%; margin-right: 50%"
      class="spinner-border d-none"
      role="status"
    >
      <span class="sr-only"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "SaveAndStart",
  methods: {
      async saveData() {
        let validate = await this.validate();
    
        if (this.dealFields.selectedFromCompany !== null) {
          if (
            this.dealFields.selectedTvList !== null ||
            this.dealFields.selectedNodeList !== null
          ) {
            console.log(this.dealFields.selectedNodeList);
            console.log(this.dealFields.selectedTvList);
            if (
              (!!this.dealFields.selectedNodeList ||
                !!this.dealFields.selectedTvList) &&
              !(
                !!this.dealFields.selectedNodeList &&
                !!this.dealFields.selectedTvList
              )
            ) {
              if (validate) {
                $("#spinnerSaveAndStart").removeClass("d-none");
                let get = document.getElementById("saveAndStart");
                get.setAttribute("disabled", "");
    
                let requestData = {
                  dealId: this.dealId,
                  userId: this.userId,
                  iinBin: this.dealFields.iinBin,
                  selectedOptionTypeCompany:
                    this.dealFields.selectedOptionTypeCompany,
                  selectedFromCompany: this.dealFields.selectedFromCompany,
                  selectedTvList: this.dealFields.selectedTvList,
                  selectedNodeList: this.dealFields.selectedNodeList,
                  connectionAddress: this.dealFields.connectionAddress,
                  legalAddress: this.dealFields.legalAddress,
                  email: this.dealFields.email,
                  kbe: this.dealFields.kbe,
                  clientName: this.dealFields.clientName,
    
                  contactNameTech: this.dealFields.contactNameTech,
                  contactPhoneTech: this.dealFields.contactPhoneTech,
                  contactNameAgreement: this.dealFields.contactNameAgreement,
                  contactPhoneAgreement: this.dealFields.contactPhoneAgreement,
                  contactNamePayment: this.dealFields.contactNamePayment,
                  contactPhonePayment: this.dealFields.contactPhonePayment,
    
                  signatoreFullName: this.dealFields.signatoreFullName,
                  signatorePhone: this.dealFields.signatorePhone,
                };
    
                if (this.dealFields.selectedOptionTypeCompany === "ip") {
                  const fileInputIpCoupon = document.getElementById("ipCoupon");
                  const fileNameIpCoupon = fileInputIpCoupon.files[0].name;
                  const fileExtensionIpCoupon = fileNameIpCoupon.split(".").pop();
                  this.extensions.ipCoupon = fileExtensionIpCoupon;
                  requestData["ipCoupon"] = this.dealFields.ipCoupon;
                  requestData["extensionsIpCoupon"] = this.extensions.ipCoupon;
                }
    
                if (
                  this.dealFields.selectedOptionTypeCompany === "ip" ||
                  this.dealFields.selectedOptionTypeCompany === "fl"
                ) {
                  const fileInputUdvFront = document.getElementById("udvFront");
                  const fileNameUdvFront = fileInputUdvFront.files[0].name;
                  const fileExtensionUdvFront = fileNameUdvFront.split(".").pop();
                  this.extensions.udvFront = fileExtensionUdvFront;
                  requestData["udvFront"] = this.dealFields.udvFront;
                  requestData["extensionsUdvFront"] = this.extensions.udvFront;
    
                  const fileInputUdvBack = document.getElementById("udvBack");
                  const fileNameUdvBack = fileInputUdvBack.files[0].name;
                  const fileExtensionUdvBack = fileNameUdvBack.split(".").pop();
                  this.extensions.udvBack = fileExtensionUdvBack;
                  requestData["udvBack"] = this.dealFields.udvBack;
                  requestData["extensionsUdvBack"] = this.extensions.udvBack;
                }
    
                if (
                  this.dealFields.selectedOptionTypeCompany === "ul" ||
                  this.dealFields.selectedOptionTypeCompany === "other"
                ) {
                  const fileInputregistrationCertificate = document.getElementById(
                    "registrationCertificate"
                  );
                  const fileNameregistrationCertificate =
                    fileInputregistrationCertificate.files[0].name;
                  const fileExtensionregistrationCertificate =
                    fileNameregistrationCertificate.split(".").pop();
                  this.extensions.registrationCertificate =
                    fileExtensionregistrationCertificate;
                  requestData["registrationCertificate"] =
                    this.dealFields.registrationCertificate;
                  requestData["extensionsregistrationCertificate"] =
                    this.extensions.registrationCertificate;
    
                  const fileInputorderForDirector =
                    document.getElementById("orderForDirector");
                  const fileNameorderForDirector =
                    fileInputorderForDirector.files[0].name;
                  const fileExtensionorderForDirector = fileNameorderForDirector
                    .split(".")
                    .pop();
                  this.extensions.orderForDirector = fileExtensionorderForDirector;
                  requestData["orderForDirector"] =
                    this.dealFields.orderForDirector;
                  requestData["extensionsorderForDirector"] =
                    this.extensions.orderForDirector;
                }
    
                if (
                  this.dealFields.selectedOptionTypeCompany === "ip" ||
                  this.dealFields.selectedOptionTypeCompany === "other" ||
                  this.dealFields.selectedOptionTypeCompany === "ul"
                ) {
                  requestData["directorFullName"] =
                    this.dealFields.directorFullName;
                  requestData["agreementId"] = this.dealFields.agreementId;
                  requestData["agreementDate"] = this.dealFields.agreementDate;
                  requestData["checkingAccount"] = this.dealFields.checkingAccount;
                  requestData["bik"] = this.dealFields.bik;
                  requestData["bank"] = this.dealFields.bank;
                  requestData["positionSignatory"] =
                    this.dealFields.positionSignatory;
                  requestData["reasonForSigning"] =
                    this.dealFields.reasonForSigning;
                } else if (this.dealFields.selectedOptionTypeCompany === "fl") {
                  requestData["numberUdv"] = this.dealFields.numberUdv;
                  requestData["udvFrom"] = this.dealFields.udvFrom;
                  requestData["udvTo"] = this.dealFields.udvTo;
                }
    
                try {
                  await $.ajax({
                    url: "",
                    data: JSON.stringify(requestData),
                    type: "POST",
                    headers: {
                      Accept: "application/json; odata=verbose",
                    },
                  }).done((data) => {
                    let response = JSON.parse(data);
                    if (response.success === false) {
                      alert(response.message);
                      location.reload();
                    } else {
                      location.reload();
                    }
                  });
                } catch (e) {
                  alert("Обратитесь к администратору, ошибка:" + e);
                } finally {
                  // this.showpopup()
                }
              }
            } else {
              alert(
                "123 ntcn Выберете значение в поле Подключение от узла, либо в поле Подключение по ТВ "
              );
            }
          } else {
            alert(
              "Выберете значение в поле Подключение от узла, либо в поле Подключение по ТВ "
            );
          }
        } else {
          alert("Выберете значение в поле От компании");
        }
      }
  }
};
</script>
