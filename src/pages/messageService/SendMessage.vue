<template>
    <form class="form" @submit.prevent="submitForm">
        <h2 class="form-title">发送短信</h2>
        <div class="form-field">
            <label for="key">密钥ID：</label>
            <input id="key" type="text" v-model.trim="key" :class="{'error': !keyId}" required>
            <span class="form-error-message" v-show="!keyId">请输入密钥ID</span>
        </div>
        <div class="form-field">
            <label for="secret">密钥值：</label>
            <input id="secret" type="text" v-model="secret" :class="{ 'error': !keySecret }" required>
            <span class="form-error-message" v-show="!keySecret">请输入密钥值</span>
        </div>
        <div class="form-field">
            <label for="mobile">手机号：</label>
            <input id="mobile" type="text" v-model="mobile" :class="{ 'error': !validMobile }" required>
            <span class="form-error-message" v-show="!validMobile">请输入手机号</span>
        </div>
        <div class="form-field">
            <label for="signature">短信签名：</label>
            <input id="signature" type="text" v-model="signature" :class="{ 'error': !validSignature }" required>
            <span class="form-error-message" v-show="!validSignature">请输入短信签名</span>
        </div>
        <div class="form-field">
            <label for="template">短信模板：</label>
            <input id="template" type="text" v-model="template" :class="{ 'error': !validTemplate }" required>
            <span class="form-error-message" v-show="!validTemplate">请输入短信模板</span>
        </div>
        <div class="form-field">
            <button type="submit" :disabled="!validForm">发送</button>
        </div>
    </form>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: '',
            key: '',
            secret: '',
            mobile: '',
            signature: '',
            template: '',
            keyId: false,
            keySecret: false,
            validMobile: false,
            validSignature: false,
            validTemplate: false,
        }
    },
    computed: {
        validForm() {
            return this.keyId && this.keySecret && this.validMobile && this.validSignature && this.validTemplate;
        }
    },
    methods: {
        submitForm() {
            if (!this.validForm) {
                return;
            }
            //提交表单
        }
    },
    watch: {
        //验证用户名
        username: function (val) {
            this.validUsername = (val.length >= 4) && /^[a-zA-Z0-9_]+$/.test(val);
        },
        //验证密码
        password: function (val) {
            this.validPassword = val.length >= 6;
        }
    }
}
</script>

<style>
.form {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f2f2f2;
    border-radius: 10px;
}
.form-title {
    font-size: 24px;
    margin-bottom: 20px;
    text-align: center;
}
.form-field {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
}
.form-field label {
    font-size: 18px;
    margin-bottom: 10px;
}
.form-field input {
    font-size: 16px;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #ffffff;
    color: #333333;
}
.form-field input.error {
    border: 2px solid #ff6633;
}
.form-error-message {
    color: #ff6633;
    margin-top: 5px;
    font-size: 14px;
    display: none;
}
.form-error-message.active {
    display: block;
}
.form-field button {
    font-size: 18px;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #ff6633;
    color: #ffffff;
    cursor: pointer;
}
.form-field button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
}
</style>
