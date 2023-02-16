<#import "template.ftl" as layout>
    <@layout.registrationLayout displayMessage=!messagesPerField.existsError('firstName','lastName','email','address','company','username','password','password-confirm'); section>
        <#if section="header">
            ${msg("registerTitle")}
            <#elseif section="form">
                <form id="kc-register-form" class="${properties.kcFormClass!}" action="${url.registrationAction}" method="post">
                    <div class="${properties.kcFormGroupClass!}">
                        <div class="${properties.kcLabelWrapperClass!}">
                            <label for="firstName" class="${properties.kcLabelClass!}">
                                ${msg("firstName")}
                            </label>
                        </div>
                        <div class="${properties.kcInputWrapperClass!}">
                            <input type="text" id="firstName" class="${properties.kcInputClass!}" name="firstName"
                                value="${(register.formData.firstName!'')}"
                                aria-invalid="<#if messagesPerField.existsError('firstName')>true</#if>" />
                                <span id="input-error-firstname" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                                    ${kcSanitize(messagesPerField.get('firstName'))?no_esc}
                                </span>
                        </div>
                    </div>
                    <div class="${properties.kcFormGroupClass!}">
                        <div class="${properties.kcLabelWrapperClass!}">
                            <label for="lastName" class="${properties.kcLabelClass!}">
                                ${msg("lastName")}
                            </label>
                        </div>
                        <div class="${properties.kcInputWrapperClass!}">
                            <input type="text" id="lastName" class="${properties.kcInputClass!}" name="lastName"
                                value="${(register.formData.lastName!'')}"
                                aria-invalid="<#if messagesPerField.existsError('lastName')>true</#if>" />
                                <span id="input-error-lastname" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                                    ${kcSanitize(messagesPerField.get('lastName'))?no_esc}
                                </span>
                        </div>
                    </div>
                    <div class="${properties.kcFormGroupClass!}">
                        <div class="${properties.kcLabelWrapperClass!}">
                            <label for="email" class="${properties.kcLabelClass!}">
                                ${msg("email")}
                            </label>
                        </div>
                        <div class="${properties.kcInputWrapperClass!}">
                            <input type="text" id="email" class="${properties.kcInputClass!}" name="email"
                                value="${(register.formData.email!'')}" autocomplete="email"
                                aria-invalid="<#if messagesPerField.existsError('email')>true</#if>" />
                                <span id="input-error-email" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                                    ${kcSanitize(messagesPerField.get('email'))?no_esc}
                                </span>
                        </div>
                    </div>
                    <div class="${properties.kcFormGroupClass!}">
                        <div class="${properties.kcLabelWrapperClass!}">
                            <label for="user.attributes.userAddress" class="${properties.kcLabelClass!}">
                                ${msg("address")}
                            </label>
                        </div>
                        <div class="${properties.kcInputWrapperClass!}">
                            <input type="text" id="user.attributes.userAddress" class="${properties.kcInputClass!}" name="user.attributes.userAddress"
                                value="${(register.formData['user.attributes.userAddress']!'')}" autocomplete="address"
                                aria-invalid="<#if messagesPerField.existsError('address')>true</#if>" />
                            <span id="input-error-address" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                                ${kcSanitize(messagesPerField.get('address'))?no_esc}
                            </span>
                        </div>
                    </div>
                    <div class="${properties.kcFormGroupClass!}">
                        <div class="${properties.kcLabelWrapperClass!}">
                            <label for="user.attributes.company" class="${properties.kcLabelClass!}">
                                ${msg("Entreprise")}
                            </label>
                        </div>
                        <div class="${properties.kcInputWrapperClass!}">
                            <input type="text" id="user.attributes.company" class="${properties.kcInputClass!}" name="user.attributes.company"
                                value="${(register.formData['user.attributes.company']!'')}" autocomplete="company"
                                aria-invalid="<#if messagesPerField.existsError('company')>true</#if>" />
                            <span id="input-error-company" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                                ${kcSanitize(messagesPerField.get('company'))?no_esc}
                            </span>
                        </div>
                    </div>
                    <#if !realm.registrationEmailAsUsername>
                        <div class="${properties.kcFormGroupClass!}">
                            <div class="${properties.kcLabelWrapperClass!}">
                                <label for="username" class="${properties.kcLabelClass!}">
                                    ${msg("username")}
                                </label>
                            </div>
                            <div class="${properties.kcInputWrapperClass!}">
                                <input type="text" id="username" class="${properties.kcInputClass!}" name="username"
                                    value="${(register.formData.username!'')}" autocomplete="username"
                                    aria-invalid="<#if messagesPerField.existsError('username')>true</#if>" />
                                    <span id="input-error-username" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                                        ${kcSanitize(messagesPerField.get('username'))?no_esc}
                                    </span>
                            </div>
                        </div>
                    </#if>
                    <#if passwordRequired??>
                        <div class="${properties.kcFormGroupClass!}">
                            <div class="${properties.kcLabelWrapperClass!}">
                                <label for="password" class="${properties.kcLabelClass!}">
                                    ${msg("password")}
                                </label>
                            </div>
                            <div class="${properties.kcInputWrapperClass!}">
                                <input type="password" id="password" class="${properties.kcInputClass!}" name="password"
                                    autocomplete="new-password"
                                    aria-invalid="<#if messagesPerField.existsError('password','password-confirm')>true</#if>" />
                                    <span id="input-error-password" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                                        ${kcSanitize(messagesPerField.get('password'))?no_esc}
                                    </span>
                            </div>
                        </div>
                        <div class="${properties.kcFormGroupClass!}">
                            <div class="${properties.kcLabelWrapperClass!}">
                                <label for="password-confirm"
                                    class="${properties.kcLabelClass!}">
                                    ${msg("passwordConfirm")}
                                </label>
                            </div>
                            <div class="${properties.kcInputWrapperClass!}">
                                <input type="password" id="password-confirm" class="${properties.kcInputClass!}"
                                    name="password-confirm"
                                    aria-invalid="<#if messagesPerField.existsError('password-confirm')>true</#if>" />
                                    <span id="input-error-password-confirm" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                                        ${kcSanitize(messagesPerField.get('password-confirm'))?no_esc}
                                    </span>
                            </div>
                        </div>
                    </#if>
                    <#if recaptchaRequired??>
                        <div class="form-group">
                            <div class="${properties.kcInputWrapperClass!}">
                                <div class="g-recaptcha" data-size="compact" data-sitekey="${recaptchaSiteKey}"></div>
                            </div>
                        </div>
                    </#if>
                    <div class="${properties.kcFormGroupClass!}">
                        <div id="kc-form-options" class="${properties.kcFormOptionsClass!}">
                            <div class="${properties.kcFormOptionsWrapperClass!}">
                                <span><a href="${url.loginUrl}">
                                        ${kcSanitize(msg("backToLogin"))?no_esc}
                                    </a></span>
                            </div>
                        </div>
                        <div id="kc-form-buttons" class="${properties.kcFormButtonsClass!}">
                            <input class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!}" type="submit" value="${msg("doRegister")}" />
                        </div>
                    </div>
                </form>
        </#if>
    </@layout.registrationLayout>

<script>
    const form = document.getElementById("kc-register-form")

    const firstname = document.getElementById("firstName")
    const firstnameErrorMessage = "Veuillez entrer votre prénom"
    const firstnameErrorElement = document.getElementById("input-error-firstname")

    const lastname = document.getElementById("lastName")
    const lastnameErrorMessage = "Veuillez entrer votre nom"
    const lastnameErrorElement = document.getElementById("input-error-lastname")

    const email = document.getElementById("email")
    const emailErrorMessage = "Veuillez entrer votre adresse email"
    const emailErrorElement = document.getElementById("input-error-email")

    const address = document.getElementById("user.attributes.userAddress")
    const addressErrorMessage = "Veuillez entrer votre adresse"
    const addressErrorElement = document.getElementById("input-error-address")

    const company = document.getElementById("user.attributes.company")
    const companyErrorMessage = "Veuillez entrer le nom de votre entreprise"
    const companyErrorElement = document.getElementById("input-error-company")

    const username = document.getElementById("username")
    const usernameErrorMessage = "Veuillez entrer votre nom d'utilisateur"
    const usernameErrorElement = document.getElementById("input-error-username")

    const password = document.getElementById("password")
    const passwordErrorMessage = "Veuillez entrer votre mot de passe"
    const passwordErrorElement = document.getElementById("input-error-password")

    const passwordConfirm = document.getElementById("password-confirm")
    const passwordConfirmErrorMessage = "Veuillez confirmer votre mot de passe"
    const passwordConfirmErrorElement = document.getElementById("input-error-password-confirm")

    form.addEventListener("submit", e => {
        if (firstname.value == "") {
            e.preventDefault()
            firstnameErrorElement.textContent = firstnameErrorMessage;
            firstname.setAttribute("aria-invalid", "true")
        }

        if (lastname.value == "") {
            e.preventDefault()
            lastnameErrorElement.textContent = lastnameErrorMessage;
            lastname.setAttribute("aria-invalid", "true")
        }

        if (email.value == "") {
            e.preventDefault()
            emailErrorElement.textContent = emailErrorMessage;
            email.setAttribute("aria-invalid", "true")
        }

        if (address.value == "") {
            e.preventDefault()
            addressErrorElement.textContent = addressErrorMessage;
            address.setAttribute("aria-invalid", "true")
        }

        if (company.value == "") {
            e.preventDefault()
            companyErrorElement.innerHTML = companyErrorMessage
            company.setAttribute("aria-invalid", "true")
        }

        if (username.value == "") {
            e.preventDefault()
            usernameErrorElement.textContent = usernameErrorMessage;
            username.setAttribute("aria-invalid", "true")
        }

        if (password.value == "") {
            e.preventDefault()
            passwordErrorElement.textContent = passwordErrorMessage;
            password.setAttribute("aria-invalid", "true")
        }

        if (passwordConfirm.value == "") {
            e.preventDefault()
            passwordConfirmErrorElement.textContent = passwordConfirmErrorMessage;
            passwordConfirm.setAttribute("aria-invalid", "true")
        }
    })
</script>