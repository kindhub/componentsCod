async function add(arguments) {// params = params || {};
    // const jqueryUrl = 'https://code.jquery.com/jquery-3.6.0.min.js'

    BX.loadCSS("https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css")
    // BX.loadCSS("https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css")
    // BX.loadCSS("https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css")
    // BX.loadCSS("https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.14.0-beta2/css/bootstrap-select.min.css")
    // BX.loadScript("https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js")
    // BX.loadScript("https://cdn.jsdelivr.net/npm/vue@2.x/dist/vue.js")
    // BX.loadScript("https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.js")
    // BX.loadScript("https://cdnjs.cloudflare.com/ajax/libs/axios/0.27.2/axios.min.js")

    // BX.loadScript("https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.14.0-beta2/js/bootstrap-select.min.js")

    BX.loadScript("https://code.jquery.com/jquery-3.6.0.min.js")
    BX.loadScript("https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js")
    BX.loadCSS("https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css")

    // var loaded_cdn = [];
    // const scripts = [...document.scripts];
    // const hasJquery = scripts.some(item => {
    //     return item.src === jqueryUrl
    // })
    // console.log('qqqq', hasJquery)
    // console.log(scripts)
    // if (!hasJquery) {
    //     console.log('set jquery')
    //     BX.loadScript("https://code.jquery.com/jquery-3.6.0.min.js")
    // }
    // for (let i = 0; i < scripts.length; i++) {
    //     const script = scripts[i];
    //     scrs.push(script.src)
    //
    //     if ()
    //     // if (script.src != ""){
    //     // }
    //     // console.log(script.src);
    // }

    // console.log(scrs)
    const params = JSON.parse(arguments)
    // console.log(params)
    // Убедимся что тип сущности передан
    if (!params.entity_type) {
        return;
    }

    // Убедимся что идентификатор сущности передан
    if (!params.entity_id) {
        return;
    }

    // Убедимся что идентификатор пользователя передан
    if (!params.user_id) {
        return;
    }

    var editButton = BX.findChildByClassName(document, "crm-entity-wrap", true)

    // const resp = await fetch('');
    const resp = await fetch('');
    const html_data = await resp.text()

    var newInterface = BX.create('div', {
        html: html_data
    });

    await BX.insertBefore(newInterface, editButton)


    BX.Vue.create({
        el: '#app-add', data: {
            userId: params.user_id,
            dealId: params.entity_id,
            companyList: [],
            opticalList: [],
            tvList: [],
            dealFields: {
                /*
                * Выбор бизнес процесса
                * */
                bitrixBusinessProcessId: null, /*
                * Поля всех типов киентов
                * */
                selectedOptionTypeCompany: null,
                iinBin: null,
                selectedFromCompany: null,
                selectedNodeList: null,
                selectedTvList: null,
                connectionAddress: "Казахстан, Алматы, #### район, улица #### ##",
                legalAddress: null,
                email: null,
                kbe: null,
                clientName: null, /*
                * Контактные лица - общие
                * */
                contactNameTech: null,
                contactPhoneTech: null,
                contactNameAgreement: null,
                contactPhoneAgreement: null,
                contactNamePayment: null,
                contactPhonePayment: null,
                agreementId: null,
                agreementDate: null, /*
                * Контактные лица - ИП/ТОО/АО/Другие
                * */
                directorFullName: null, /*
                * Банковские реквизиты - ИП/ТОО/АО/Другие
                * */
                checkingAccount: null,
                bik: null,
                bank: null, /*
                * Данные о подписанте - Общие
                * */
                signatoreFullName: null,
                signatorePhone: null, /*
                * Данные о подписанте - ИП/ТОО/АО/Другие
                * */
                positionSignatory: null,
                reasonForSigning: null, /*
                * Данные о подписанте - ФЛ
                * */
                numberUdv: null,
                udvFrom: null,
                udvTo: null, /*
                * Вложения - ФЛ/ИП
                * */
                udvFront: null,
                udvBack: null, /*
                * Вложения - ИП
                * */
                ipCoupon: null, /*
                * Вложения - ТОО/АО/Другие
                * */
                registrationCertificate: null,
                orderForDirector: null
            },
            extensions: {
                udvFront: null, udvBack: null, ipCoupon: null, registrationCertificate: null, orderForDirector: null
            }
        }, methods: {
            /*
            * Загрузка session данных
            * */
            setSessionData() {
                sessionStorage.setItem(params.entity_id, JSON.stringify(this.dealFields))
            }, async getServiceList() {
                let getServiceListData = {
                    bitrix_user_id: this.userId
                }

                await $.ajax({
                    url: '',
                    data: JSON.stringify(getServiceListData),
                    type: 'POST',
                    headers: {
                        "Accept": "application/json; odata=verbose"
                    }
                }).done(data => {
                    let response = JSON.parse(data)
                    this.companyList = response.company
                    this.opticalList = response.optical
                    this.tvList = response.tv
                });
            }, async getAData() {
                let request = {
                    iinBin: this.dealFields.iinBin,
                    dealId: this.dealId,
                    selectedOptionTypeCompany: this.dealFields.selectedOptionTypeCompany,
                }

                if (this.dealFields.iinBin !== null) {

                    if (this.dealFields.iinBin.length === 12 && this.dealFields.iinBin !== null) {
                        try {
                            $("#spinnerAData").removeClass("d-none")
                            let get = document.getElementById('a-data')
                            get.setAttribute('disabled', '')

                            await $.ajax({
                                url: '',
                                data: JSON.stringify(request),
                                type: 'POST',
                                headers: {
                                    "Accept": "application/json; odata=verbose"
                                }
                            }).done(data => {
                                let response = JSON.parse(data)
                                if (response.success == true) {
                                    let legal_address = response.data.data.basic.legal_address
                                    let fullname_director = response.data.data.basic.fullname_director
                                    let name_ru = response.data.data.basic.short_name

                                    this.dealFields.legalAddress = legal_address.toLowerCase()
                                    this.dealFields.directorFullName = fullname_director
                                    this.dealFields.clientName = name_ru
                                } else {
                                    alert(response.message)
                                }

                            })
                        } catch (e) {
                            alert("Обратитесь к администратору, ошибка:" + e)
                        } finally {
                            $("#spinnerAData").addClass("d-none")
                            let get = document.getElementById('a-data')
                            get.removeAttribute('disabled', '')
                        }
                    } else {
                        alert("Длина символов должна быть 12")
                    }
                } else {
                    alert("Введите ИИН/БИН")
                }
            }, async saveData() {
                let validate = await this.validate()

                if (this.dealFields.selectedFromCompany !== null) {
                    if (this.dealFields.selectedTvList !== null || this.dealFields.selectedNodeList !== null) {
                        console.log(this.dealFields.selectedNodeList)
                        console.log(this.dealFields.selectedTvList)
                        if ((!!this.dealFields.selectedNodeList || !!this.dealFields.selectedTvList) && !(!!this.dealFields.selectedNodeList && !!this.dealFields.selectedTvList)) {
                            if (validate) {
                                $("#spinnerSaveAndStart").removeClass("d-none")
                                let get = document.getElementById('saveAndStart')
                                get.setAttribute('disabled', '')

                                let requestData = {
                                    dealId: this.dealId,
                                    userId: this.userId,
                                    iinBin: this.dealFields.iinBin,
                                    selectedOptionTypeCompany: this.dealFields.selectedOptionTypeCompany,
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

                                    // udvFront: this.dealFields.udvFront,
                                    // udvBack: this.dealFields.udvBack,
                                    // ipCoupon: this.dealFields.ipCoupon,
                                    // registrationCertificate: this.dealFields.registrationCertificate,
                                    // orderForDirector: this.dealFields.orderForDirector,
                                }

                                if (this.dealFields.selectedOptionTypeCompany === 'ip') {
                                    const fileInputIpCoupon = document.getElementById('ipCoupon');
                                    const fileNameIpCoupon = fileInputIpCoupon.files[0].name;
                                    const fileExtensionIpCoupon = fileNameIpCoupon.split('.').pop();
                                    this.extensions.ipCoupon = fileExtensionIpCoupon
                                    requestData['ipCoupon'] = this.dealFields.ipCoupon
                                    requestData['extensionsIpCoupon'] = this.extensions.ipCoupon
                                }

                                if (this.dealFields.selectedOptionTypeCompany === 'ip' || this.dealFields.selectedOptionTypeCompany === 'fl') {
                                    const fileInputUdvFront = document.getElementById('udvFront');
                                    const fileNameUdvFront = fileInputUdvFront.files[0].name;
                                    const fileExtensionUdvFront = fileNameUdvFront.split('.').pop();
                                    this.extensions.udvFront = fileExtensionUdvFront
                                    requestData['udvFront'] = this.dealFields.udvFront
                                    requestData['extensionsUdvFront'] = this.extensions.udvFront

                                    const fileInputUdvBack = document.getElementById('udvBack');
                                    const fileNameUdvBack = fileInputUdvBack.files[0].name;
                                    const fileExtensionUdvBack = fileNameUdvBack.split('.').pop();
                                    this.extensions.udvBack = fileExtensionUdvBack
                                    requestData['udvBack'] = this.dealFields.udvBack
                                    requestData['extensionsUdvBack'] = this.extensions.udvBack
                                }

                                if (this.dealFields.selectedOptionTypeCompany === 'ul' || this.dealFields.selectedOptionTypeCompany === 'other') {
                                    const fileInputregistrationCertificate = document.getElementById('registrationCertificate');
                                    const fileNameregistrationCertificate = fileInputregistrationCertificate.files[0].name;
                                    const fileExtensionregistrationCertificate = fileNameregistrationCertificate.split('.').pop();
                                    this.extensions.registrationCertificate = fileExtensionregistrationCertificate
                                    requestData['registrationCertificate'] = this.dealFields.registrationCertificate
                                    requestData['extensionsregistrationCertificate'] = this.extensions.registrationCertificate

                                    const fileInputorderForDirector = document.getElementById('orderForDirector');
                                    const fileNameorderForDirector = fileInputorderForDirector.files[0].name;
                                    const fileExtensionorderForDirector = fileNameorderForDirector.split('.').pop();
                                    this.extensions.orderForDirector = fileExtensionorderForDirector
                                    requestData['orderForDirector'] = this.dealFields.orderForDirector
                                    requestData['extensionsorderForDirector'] = this.extensions.orderForDirector
                                }

                                if (this.dealFields.selectedOptionTypeCompany === 'ip' || this.dealFields.selectedOptionTypeCompany === 'other' || this.dealFields.selectedOptionTypeCompany === 'ul') {
                                    requestData['directorFullName'] = this.dealFields.directorFullName;
                                    requestData['agreementId'] = this.dealFields.agreementId;
                                    requestData['agreementDate'] = this.dealFields.agreementDate;
                                    requestData['checkingAccount'] = this.dealFields.checkingAccount;
                                    requestData['bik'] = this.dealFields.bik;
                                    requestData['bank'] = this.dealFields.bank;
                                    requestData['positionSignatory'] = this.dealFields.positionSignatory;
                                    requestData['reasonForSigning'] = this.dealFields.reasonForSigning;
                                } else if (this.dealFields.selectedOptionTypeCompany === 'fl') {
                                    requestData['numberUdv'] = this.dealFields.numberUdv;
                                    requestData['udvFrom'] = this.dealFields.udvFrom;
                                    requestData['udvTo'] = this.dealFields.udvTo;
                                }

                                try {
                                    await $.ajax({
                                        url: '',
                                        data: JSON.stringify(requestData),
                                        type: 'POST',
                                        headers: {
                                            "Accept": "application/json; odata=verbose"
                                        }
                                    }).done(data => {
                                        let response = JSON.parse(data)
                                        if (response.success === false) {
                                            alert(response.message)
                                            location.reload()
                                        } else {
                                            location.reload()
                                        }
                                    })
                                } catch (e) {
                                    alert("Обратитесь к администратору, ошибка:" + e)
                                } finally {
                                    // this.showpopup()
                                }
                            }
                        }
                        else {
                            alert('123 ntcn Выберете значение в поле Подключение от узла, либо в поле Подключение по ТВ ')
                        }
                    } else {
                        alert('Выберете значение в поле Подключение от узла, либо в поле Подключение по ТВ ')
                    }
                } else {
                    alert('Выберете значение в поле От компании')
                }
            }, async validate() {
                document.querySelectorAll('.needs-validation').forEach((el) => {
                    // console.log(el)
                    el.classList.remove('is-invalid')
                });

                const iinBinRegex = /^[0-9]{12}$/;
                const stringRURegex = /^[А-Яа-яЁё]/;
                const stringENGRegex = /^[A-Za-z]/;
                const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                const kbeRegex = /^[0-9]{2}$/;
                const phoneRegex = /^\+?77([0124567][0-8]\d{7})$/;
                const checkingAccount = /^[A-ZА-Я0-9]{15,20}$/;
                const bikRegex = /^[A-Z0-9]{8}/;
                const intRegex = /^[0-9]/;
                const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
                const stringRegex = /^[А-Яа-яЁё]|^[A-Za-z]/;
                var isValid = true;

                if (!iinBinRegex.test(this.dealFields.iinBin)) {
                    $('#iinBin').addClass('is-invalid')
                    isValid = false;
                } else {
                    $('#iinBin').addClass('is-valid')
                }

                if (!stringRURegex.test(this.dealFields.connectionAddress)) {
                    $('#connectionAddress').addClass('is-invalid')
                    isValid = false;
                } else {
                    $('#connectionAddress').addClass('is-valid')
                }

                if (!stringRURegex.test(this.dealFields.legalAddress)) {
                    $('#legalAddress').addClass('is-invalid')
                    isValid = false;
                } else {
                    $('#legalAddress').addClass('is-valid')
                }

                if (!emailRegex.test(this.dealFields.email)) {
                    $('#email').addClass('is-invalid')
                    isValid = false;
                } else {
                    $('#email').addClass('is-valid')
                }

                if (!kbeRegex.test(this.dealFields.kbe)) {
                    $('#kbe').addClass('is-invalid')
                    isValid = false;
                } else {
                    $('#kbe').addClass('is-valid')
                }

                if (!stringRegex.test(this.dealFields.clientName)) {
                    $('#clientName').addClass('is-invalid')
                    isValid = false;
                } else {
                    $('#clientName').addClass('is-valid')
                }

                if (!stringRURegex.test(this.dealFields.contactNameTech)) {
                    $('#contactNameTech').addClass('is-invalid')
                    isValid = false;
                } else {
                    $('#contactNameTech').addClass('is-valid')
                }

                if (!phoneRegex.test(this.dealFields.contactPhoneTech)) {
                    $('#contactPhoneTech').addClass('is-invalid')
                    isValid = false;
                } else {
                    $('#contactPhoneTech').addClass('is-valid')
                }

                if (!stringRURegex.test(this.dealFields.contactNameAgreement)) {
                    $('#contactNameAgreement').addClass('is-invalid')
                    isValid = false;
                } else {
                    $('#contactNameAgreement').addClass('is-valid')
                }

                if (!phoneRegex.test(this.dealFields.contactPhoneAgreement)) {
                    $('#contactPhoneAgreement').addClass('is-invalid')
                    isValid = false;
                } else {
                    $('#contactPhoneAgreement').addClass('is-valid')
                }

                if (!stringRURegex.test(this.dealFields.contactNamePayment)) {
                    $('#contactNamePayment').addClass('is-invalid')
                    isValid = false;
                } else {
                    $('#contactNamePayment').addClass('is-valid')
                }

                if (!phoneRegex.test(this.dealFields.contactPhonePayment)) {
                    $('#contactPhonePayment').addClass('is-invalid')
                    isValid = false;
                } else {
                    $('#contactPhonePayment').addClass('is-valid')
                }


                if (this.dealFields.selectedOptionTypeCompany !== 'fl') {
                    // Банковские реквизиты
                    if (!checkingAccount.test(this.dealFields.checkingAccount)) {
                        $('#checkingAccount').addClass('is-invalid')
                        isValid = false;
                    } else {
                        $('#checkingAccount').addClass('is-valid')
                    }

                    if (!bikRegex.test(this.dealFields.bik)) {
                        $('#bik').addClass('is-invalid')
                        isValid = false;
                    } else {
                        $('#bik').addClass('is-valid')
                    }

                    if (!stringRegex.test(this.dealFields.bank)) {
                        $('#bank').addClass('is-invalid')
                        isValid = false;
                    } else {
                        $('#bank').addClass('is-valid')
                    }

                    // Данные о подписанте
                    if (!stringRURegex.test(this.dealFields.positionSignatory)) {
                        $('#positionSignatory').addClass('is-invalid')
                        isValid = false;
                    } else {
                        $('#positionSignatory').addClass('is-valid')
                    }

                    if (!stringRURegex.test(this.dealFields.reasonForSigning)) {
                        $('#reasonForSigning').addClass('is-invalid')
                        isValid = false;
                    } else {
                        $('#reasonForSigning').addClass('is-valid')
                    }
                }


                if (this.dealFields.selectedOptionTypeCompany === 'fl') {
                    // Данные о подписанте
                    if (!intRegex.test(this.dealFields.numberUdv)) {
                        $('#numberUdv').addClass('is-invalid')
                        isValid = false;
                    } else {
                        $('#numberUdv').addClass('is-valid')
                    }

                    if (!dateRegex.test(this.dealFields.udvFrom)) {
                        $('#udvFrom').addClass('is-invalid')
                        isValid = false;
                    } else {
                        $('#udvFrom').addClass('is-valid')
                    }

                    if (!dateRegex.test(this.dealFields.udvTo)) {
                        $('#udvTo').addClass('is-invalid')
                        isValid = false;
                    } else {
                        $('#udvTo').addClass('is-valid')
                    }
                }

                if (this.dealFields.selectedOptionTypeCompany === 'ip') {
                    // Вложение
                    let ipCoupon = document.getElementById('ipCoupon').value
                    if (ipCoupon != '') {
                        $('#ipCoupon').addClass('is-valid')
                        const toBase64 = file => new Promise((resolve, reject) => {
                            const reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onload = () => resolve(reader.result);
                            reader.onerror = error => reject(error);
                        });

                        const file = document.getElementById('ipCoupon').files[0];
                        this.dealFields.ipCoupon = await toBase64(file)
                    } else {
                        $('#ipCoupon').addClass('is-invalid')
                        isValid = false;
                    }
                }

                if (this.dealFields.selectedOptionTypeCompany === 'ip' || this.dealFields.selectedOptionTypeCompany === 'fl') {
                    // Вложение
                    let udvFront = document.getElementById('udvFront').value
                    if (udvFront != '') {
                        $('#udvFront').addClass('is-valid')
                        const toBase64 = file => new Promise((resolve, reject) => {
                            const reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onload = () => resolve(reader.result);
                            reader.onerror = error => reject(error);
                        });

                        const file = document.getElementById('udvFront').files[0];
                        this.dealFields.udvFront = await toBase64(file)
                    } else {
                        $('#udvFront').addClass('is-invalid')
                        isValid = false;
                    }

                    let udvBack = document.getElementById('udvBack').value
                    if (udvBack != '') {
                        $('#udvBack').addClass('is-valid')
                        const toBase64 = file => new Promise((resolve, reject) => {
                            const reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onload = () => resolve(reader.result);
                            reader.onerror = error => reject(error);
                        });

                        const file = document.getElementById('udvBack').files[0];
                        this.dealFields.udvBack = await toBase64(file)
                    } else {
                        $('#udvBack').addClass('is-invalid')
                        isValid = false;
                    }
                }

                if (this.dealFields.selectedOptionTypeCompany === 'ul' || this.dealFields.selectedOptionTypeCompany === 'other') {
                    // Вложение
                    let registrationCertificate = document.getElementById('registrationCertificate').value
                    if (registrationCertificate != '') {
                        $('#registrationCertificate').addClass('is-valid')
                        const toBase64 = file => new Promise((resolve, reject) => {
                            const reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onload = () => resolve(reader.result);
                            reader.onerror = error => reject(error);
                        });

                        const file = document.getElementById('registrationCertificate').files[0];
                        this.dealFields.registrationCertificate = await toBase64(file)
                    } else {
                        $('#registrationCertificate').addClass('is-invalid')
                        isValid = false;
                    }

                    let orderForDirector = document.getElementById('orderForDirector').value
                    if (orderForDirector != '') {
                        $('#orderForDirector').addClass('is-valid')
                        const toBase64 = file => new Promise((resolve, reject) => {
                            const reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onload = () => resolve(reader.result);
                            reader.onerror = error => reject(error);
                        });

                        const file = document.getElementById('orderForDirector').files[0];
                        this.dealFields.orderForDirector = await toBase64(file)
                    } else {
                        $('#orderForDirector').addClass('is-invalid')
                        isValid = false;
                    }
                }

                if (!stringRURegex.test(this.dealFields.signatoreFullName)) {
                    $('#signatoreFullName').addClass('is-invalid')
                    isValid = false;
                } else {
                    $('#signatoreFullName').addClass('is-valid')
                }

                if (!phoneRegex.test(this.dealFields.signatorePhone)) {
                    $('#signatorePhone').addClass('is-invalid')
                    isValid = false;
                } else {
                    $('#signatorePhone').addClass('is-valid')
                }

                if (!isValid) {
                    return false;
                } else {
                    return true
                }
            },
        },

        mounted() {
            const field = sessionStorage.getItem(params.entity_id)
            if (field) {
                this.dealFields = JSON.parse(field)
            }
            this.getServiceList()


            // Добавление в select -> seacrh
            var vueThis = this
            $(document).ready(function () {
                $("#company-list").select2().on('change', function () {
                    vueThis.dealFields.selectedFromCompany = $(this).val()
                    sessionStorage.setItem(params.entity_id, JSON.stringify(vueThis.dealFields))
                });
                $("#node-list").select2().on('change', function () {
                    vueThis.dealFields.selectedNodeList = $(this).val()
                    sessionStorage.setItem(params.entity_id, JSON.stringify(vueThis.dealFields))
                });
                $("#tv-list").select2().on('change', function () {
                    console.log('$(this).val()',$(this).val())
                    vueThis.dealFields.selectedTvList = $(this).val()
                    sessionStorage.setItem(params.entity_id, JSON.stringify(vueThis.dealFields))
                });
            })

        },

        // watch: {
        //     // эта функция запускается при любом изменении вопроса
        //     companyList: function (newVal, oldVal) {
        //         console.log('watch', newVal, oldVal)
        //     }
        // },
        // computed:{
        //     abc(){
        //         return this.companyList
        //     }
        // }
    });
}
