<template>
  <div id="app">
    <form @submit.prevent="handleSubmit">
      <div class="form-item">
        <label>username</label>
        <x-input class="input" v-model="username" field="username"></x-input>
      </div>

      <div class="form-item">
        <label>email</label>
        <x-input class="input" v-model="email" field="email"></x-input>
      </div>

      <div class="form-item">
        <label>birthday</label>
        <x-input class="input" v-model="birthday" field="birthday"></x-input>
      </div>

      <div class="form-item">
        <label>bio</label>
        <x-textarea class="textarea" field="bio" v-model="bio"></x-textarea>
       <!--  <span v-text="errors.bio"></span> -->
      </div>
      <div>
      	<label>age</label>
      	<span v-vuerify="'age'">
      		<input type="text" value="age" name="" v-model="age" @change="getValue">
      		<div class="error" v-text="$vuerify.$errors['age']"></div>
      	</span>
      </div>
      <div class="form-item">
        <label>level</label>
        <x-select class="input" v-model="level" field="level" :options="dataSelect"></x-select>
        <p>{{level}}</p>
      </div>
      <div>
        <span v-vuerify="levelZH">
          <select v-model="levelZH" @change="getValue">
            <option value="">请选择</option>
            <option v-for="option in options" v-bind:value="option.value">
            {{ option.text }}
            </option>
          </select>
          <span>Selected: {{ levelZH }}</span>
          <div class="error" v-text="$vuerify.$errors['levelZH']"></div>
        </span>
      </div>
      <div>
        <span v-vuerify="sex">
          <label><input type="radio" v-model="sex" value="man" @change="getValue">男</label>
          <label><input type="radio" v-model="sex" value="women" @change="getValue">女</label>
        </span>
        <p>{{sex}}</p>
         <div class="error" v-text="$vuerify.$errors['sex']"></div>
      </div>
      <div>
        <span v-vuerify="hobby">
          <label><input type="checkbox" v-model="hobby" value="篮球" @change="getValue">篮球</label>
          <label><input type="checkbox" v-model="hobby" value="读书" @change="getValue">读书</label>
          <label><input type="checkbox" v-model="hobby" value="游戏" @change="getValue">游戏</label>
        </span>
        <p>{{hobby}}</p>
         <div class="error" v-text="$vuerify.$errors['hobby']"></div>
      </div>
      <div class="form-item">
        <input type="submit">
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      selected: '',
    options: [
      { text: 'One', value: '甲' },
      { text: 'Two', value: '乙' },
      { text: 'Three', value: '丙' }
    ],
      username: '',
      birthday: '',
      email: '',
      bio: '',
      age:'',
      level:'',
      levelZH:'',
      sex:'',
      hobby:[],
      dataSelect:[
        {	text:'one',value:'A'},
        { text:'two',value:'B'},
      	{text:'three',value:'C'}
      ]
    }
  },
  components: {
    XInput: {
      template: `
        <span v-vuerify.parent="field">
      		<input :value="value" @change="$emit('input', $event.target.value)">
      		<div class="error" v-text="$parent.$vuerify.$errors[field]"></div>
    		</span>
      `,
      props: ['value', 'field']
    },
    XSelect: {
			template: `
        <span v-vuerify.parent="field">
          <select  @change="$emit('input', $event.target.value)">
            <option value="">请选择</option>
						<option v-for="(option,index) in options" :value="option.value">{{option.text}}</option>
          </select>
      		<div class="error" v-text="$parent.$vuerify.$errors[field]"></div>
    		</span>
      `,
      props: ['value', 'field','options']
    },
    XTextarea: {
      template: `
		   <span v-vuerify.parent="field">
		      <textarea :value="value" @change="$emit('input', $event.target.value)"></textarea>
		      <div class="error" v-text="$parent.$vuerify.$errors[field]"></div>
		    </span>
      `,
     props: ['value', 'field']
    }
  },

  vuerify: {
    username: 'required',
    birthday: {
      test (val) {
        return /\d{4}-\d{1,2}-\d{1,2}/.test(val) && Date.parse(val)
      },
      message: '日期格式不正确 yyyy-mm-dd'
    },
    email: 'email',
    bio: {
      test: /\w{4,}/,
      message: '至少四位'
    },
    age: 'required',
    level: 'required',
    levelZH: 'required',
    sex: 'required',
    hobby: 'required'
  },

  computed: {
    errors () {
      return this.$vuerify.$errors
    }
  },
  methods: {
    handleSubmit () {
      if (this.$vuerify.check()) {
        alert(`welcome ${this.username}`) // eslint-disable-line
      }else {
        console.log(this.errors);
      }
      // console.log(this.$vuerify.all())
    },
    getValue(event) {
      return event.target.value
    }
  },
  updated() {
    console.log(this.level)
  },
};
</script>
<style>
label {
      min-width: 100px;
      display: inline-block;
      vertical-align: top;
    }
    .form-item {
      margin: 5px 0;
    }
    .input {
      display: inline-block;
    }
    .input input {
      height: 22px;
    }
    .vuerify-invalid,.vuerify-invalid textarea,.vuerify-invalid input{
      border-color: red;
    }
    .error{
    	color:red;
    }
</style>