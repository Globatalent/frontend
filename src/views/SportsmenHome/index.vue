<template lang="pug">
  v-layout
    template(v-if="loading")
      loading
    template(v-else)
      b-col(sm="12")
        .user-header-block.d-flex.justify-content-center
          .cont-center.d-flex.flex-column
            .item
              b-img(:src='image',
                alt='img',
                rounded="circle",
                width="100px", height="100px")
            .item
              h2 {{ completeName }}

              template
                div
                  b-form-file.imagenInput(v-model='file',placeholder='JPG | PNG | JPEG',accept=".jpg, .png, .jpeg")
                div
                  b-button.changeImg(variant='info', @click='editSportsmenPicture') Confirm
      b-col(sm="12")
        b-alert(:show='dismissCountDown',
          dismissible,
          :variant= "statusUpdate == 'success' ? 'success' : 'danger'",
          @dismissed='dismissCountdown=0',
          @dismiss-count-down='countDownChanged')
            | {{ message }}
        b-tabs.nav-fill()
          b-tab(title='Information', active='').pt-4
            b-jumbotron.jumbotron-profile
              div.mb-4(align="center")
                h1
                  strong Overview
              hr
              b-row
                b-col.mt-2(align="center")
                  h4
                    b Total Suply : {{ totalSupply }} Tokens
                  h4
                    b Current Suply : {{ currentSupply }} Tokens
                b-col.mt-2(align="center")
                  h4
                    b Token Value : {{ tokenValue }}
                  h4
                    b Total Followers: {{ noOfLikes }}
              hr
            b-row
              b-col(sm="4")
                .gg
                  div(align="center")
                    h3
                      strong Social Networks
                  b-form.sign-up-form(@submit='updateSocialNetworks')
                    b-form-group.formInputColor.mt-2(label='Link Facebook')
                      b-form-input.inputTextColor(type='text', v-model.lazy='facebookLink')
                    b-form-group.formInputColor.mt-2(label='Link LinkedIn')
                      b-form-input.inputTextColor(type='text', v-model.lazy='linkedinLink')
                    b-form-group.formInputColor.mt-2(label='Link YouTube Channel')
                      b-form-input.inputTextColor(type='text', v-model.lazy='youtubeLink')
                    b-form-group.formInputColor.mt-2(label='Link Twitter')
                      b-form-input.inputTextColor(type='text', v-model.lazy='twitterLink')
                    b-form-group.formInputColor.mt-2(label='Link Vimeo')
                      b-form-input.inputTextColor(type='text', v-model.lazy='vimeoLink')
                    b-form-group.formInputColor.mt-2(label='Link Instagram')
                      b-form-input.inputTextColor(type='text', v-model.lazy='instagramLink')
                    b-form-group.mt-4
                      b-button.button-style(type='submit', block).colorButton
                        | Update Social Networks &nbsp;
                  hr
                  div(align="center")
                    h3
                      strong Personal Information
                  b-form.sign-up-form(@submit='updateProfileInfo')
                    b-form-group.formInputColor(label='Sport')
                      b-form-select.mb-3.inputTextColor(v-model='sport', :options='optionsSport')
                    b-form-group.formInputColor.mt-2(label='Country (Sports)')
                      b-form-select.mb-3.inputTextColor(v-model='country', :options='optionsCountry')
                    b-form-group.formInputColor.mt-2(label='Residence')
                      b-form-select.mb-3.inputTextColor(v-model='residence', :options='optionsResidence')
                    b-form-group.formInputColor.mt-2(label='Born')
                      b-form-input.inputTextColor(type='date', v-model.lazy='born')
                    b-form-group.formInputColor.mt-2(label='Birth Place')
                      b-form-input.inputTextColor(type='text', v-model.lazy='birthPlace')
                    b-form-group.formInputColor.mt-2(label='Height')
                      b-form-input.inputTextColor.mt-2( type='text', v-model.lazy='height')
                    b-form-group.formInputColor.mt-2(label='Weight')
                      b-form-input.inputTextColor(type='text', v-model.lazy='weight')
                    b-form-group.formInputColor.mt-2(label='Coach')
                      b-form-input.inputTextColor(type='text', v-model.lazy='coach')
                    b-form-group.formInputColor.mt-2(label='Team')
                      b-form-input.inputTextColor(type='text', v-model.lazy='team')
                    b-form-group.formInputColor.mt-2(label='ProDate')
                      b-form-input.inputTextColor(type='text', v-model.lazy='proDate')
                    b-form-group.formInputColor.mt-2(label='Skills')
                      b-form-input.inputTextColor(type='text', v-model.lazy='skills')
                    b-form-group.mt-4
                      b-button.button-style(type='submit', block).colorButton
                        | Update Personal Information &nbsp;
              b-col(sm="8")
                .gg
                  div(align="center")
                    h3
                      strong Bio
                  b-embed.mt-2(type='iframe', aspect='16by9', :src='videos', allowfullscreen='')
                  b-form.sign-up-form(@submit='updateBioInfo')
                    b-form-group.formInputColor.mt-2(label='YouTube Video')
                      b-form-input.inputTextColor(type='text', v-model.lazy='videos',pattern='^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.?be)\/.+$')
                    b-form-group.formInputColor.mt-2(label='Overview')
                      b-form-textarea.inputTextColor(type='textarea', v-model.lazy='about', rows= '5', max-rows="10")
                    b-form-group.formInputColor.mt-2(label='Description')
                      b-form-textarea.inputTextColor(type='textarea', v-model.lazy='descriptionText', rows= '25', max-rows="40")
                    b-form-group.mt-4
                      b-button.button-style(type='submit', block).colorButton
                        | Update Bio &nbsp;
          b-tab.gg.mt-4.tab-bold(title='Milestones')
            b-table(striped, hover, :items='itemsMilestones', :fields='fieldsMilestones', dark)
            b-jumbotron.jumbotron-profile
                b-form.sign-up-form(@submit='addMilestone')
                  b-row
                    b-col
                      b-form-group.formInputColor(label='Accomplishment')
                        b-form-input.inputTextColor(type='text', v-model='accomplishmentMilestones')
                    b-col
                      b-form-group.formInputColor(label='Year')
                        b-form-input.inputTextColor(type='text', v-model='yearMilestones')
                    b-col
                      b-form-group.formInputColor(label='Event')
                        b-form-input.inputTextColor(type='text', v-model='eventMilestones')
                  b-form-group.mt-4
                    b-button.button-style(type='submit', block).colorButton
                      | Add new Milestone &nbsp;
          b-tab.gg.mt-4(title='Expenses')
            b-table(striped, hover, :items='itemsExpenses', :fields='fieldsExpenses', dark)
            b-jumbotron.jumbotron-profile
                b-form.sign-up-form(@submit='addExpense')
                  b-row
                    b-col
                      b-form-group.formInputColor(label='Progress')
                        b-form-input.inputTextColor(type='text', v-model='progressExpense')
                    b-col
                      b-form-group.formInputColor(label='Expenses')
                        b-form-input.inputTextColor(type='text', v-model='expenseAmount')
                    b-col
                      b-form-group.formInputColor(label='Event')
                        b-form-input.inputTextColor(type='text', v-model='eventExpenses')
                    b-col
                      b-form-group.formInputColor(label='Year')
                        b-form-input.inputTextColor(type='text', v-model='yearExpense')
                  b-form-group.mt-4
                    b-button.button-style(type='submit',block).colorButton
                      | Add new Expense &nbsp;

</template>

<script>
import VLayout from '@/layouts/Default.vue';
import ChartLine from '@/components/ChartLine.vue';
import Loading from '@/components/Loading.vue';
import mixinToken from '@/mixins/token';
import sportsMenServ from '@/services/sportsmen';
import sportsMenHomeServ from '@/services/sportsmenHome';


export default {
  name: 'SportsmenHome',
  components: {
    VLayout,
    ChartLine,
    Loading,
  },
  mixins: [
    mixinToken,
  ],
  async created() {
    this.loading = true;
    this.tokenData = this.getToken();
    this.sportsmenName = this.$route.params.sportsmenid;
    const imageAvailable = await sportsMenServ.checkSportsmenPicture(this.userName);
    this.image = imageAvailable ? sportsMenServ.getSportsmenPicturePath(this.userName) : require('../../assets/img/img_default.png');
    await Promise.all([
      this.getSportsInfo(this.userName),
      this.getUserInfo(this.userName),
      this.getSportsMilestones(this.userName),
      this.getSportsExpenses(this.userName),
      this.getSportsTokens(this.userName),
    ]);
    this.loading = false;
  },
  data() {
    return {
      optionsSport: [
        { value: null, text: 'Please select a country Sport' },
        { value: 'Aerobatics', text: 'Aerobatics' },
        { value: 'Air Racing', text: 'Air Racing' },
        { value: 'Aid climbing', text: 'Aid climbing' },
        { value: 'Airsoft', text: 'Airsoft' },
        { value: 'Badminton', text: 'Badminton' },
        { value: 'Ball badminton', text: 'Ball badminton' },
        { value: 'Beach Volleyball', text: 'Beach Volleyball' },    
        { value: 'Basketball', text: 'Basketball' },
        { value: 'Beach Basketball', text: 'Beach Basketball' },
        { value: 'Baseball', text: 'Baseball' },
        { value: 'British Baseball', text: 'British Baseball' },
        { value: 'BMX', text: 'BMX' },
        { value: 'Boxing', text: 'Boxing' },
        { value: 'Capoeira', text: 'Capoeira' },
        { value: 'Cricket', text: 'Cricket' },
        { value: 'Curling', text: 'Curling' },
        { value: 'Dodgeball', text: 'Dodgeball' },
        { value: 'Eskrima', text: 'Eskrima' },
        { value: 'Equitation', text: 'Equitation' },
        { value: 'Fight archery', text: 'Fight archery' },
        { value: 'Fistball', text: 'Fistball' },
        { value: 'Freestyle BMX', text: 'Freestyle BMX' },
        { value: 'Football tennis', text: 'Football tennis' },
        { value: 'Football', text: 'Football' },
        { value: 'Formula 1', text: 'Formula 1' },
        { value: 'Golf', text: 'Golf' },
        { value: 'Gymnastics', text: 'Gymnastics' },
        { value: 'Gungdo', text: 'Gungdo' },
        { value: 'Handball', text: 'Handball' },
        { value: 'Hooverball', text: 'Hooverball' },
        { value: 'Hockey', text: 'Hockey' },
        { value: 'Indoor archery', text: 'Indoor archery' },
        { value: 'Judo', text: 'Judo' },
        { value: 'Karate', text: 'Karate' },
        { value: 'Kickball', text: 'Kickball' },
        { value: 'Matball', text: 'Matball' },
        { value: 'Model Aircraft', text: 'Model Aircraft' },
        { value: 'Mountainneering', text: 'Mountainneering' },
        { value: 'Mountain unicycling', text: 'Mountain unicycling' },
        { value: 'Motorcycle Racing', text: 'Motorcycle Racing' },
        { value: 'Muay Thai', text: 'Muay Thai' },
        { value: 'Parachuting', text: 'Parachuting' },
        { value: 'Paragliding', text: 'Paragliding' },
        { value: 'Paramotoring', text: 'Paramotoring' },
        { value: 'Padel', text: 'Padel' },
        { value: 'Paintball', text: 'Paintball' },
        { value: 'Pocket Billiards', text: 'Pocket Billiards' },
        { value: 'Rally', text: 'Rally' },
        { value: 'Rockball', text: 'Rockball' },
        { value: 'Rock Climbing', text: 'Rock Climbing' },
        { value: 'Running', text: 'Running' },
        { value: 'Snooker', text: 'Snooker' },
        { value: 'Scootering', text: 'Scootering' },
        { value: 'Skateboarding', text: 'Skateboarding' },
        { value: 'Snowboarding', text: 'Snowboarding' },
        { value: 'Sipa', text: 'Sipa' },
        { value: 'Strickball', text: 'Strickball' },
        { value: 'Skiing', text: 'Skiing' },
        { value: 'Surfing', text: 'Surfing' },
        { value: 'Sumo', text: 'Sumo' },
        { value: 'Taekwondo', text: 'Taekwondo' },
        { value: 'Table Tennis', text: 'Table Tennis' },
        { value: 'Tennis', text: 'Tennis' },
        { value: 'Track cycling', text: 'Track cycling' },
        { value: 'Triathlon', text: 'Triathlon' },
        { value: 'Ultralight aviation', text: 'Ultralight aviation' },
        { value: 'Volleyball', text: 'Volleyball' },
        { value: 'Water Volleyball', text: 'Water Volleyball' },
        { value: 'Water Basketball', text: 'Water Basketball' },
        { value: 'Wakeboarding', text: 'Wakeboarding' },
        { value: 'Water Polo', text: 'Water Polo' },
        { value: 'Wireball', text: 'Wireball' },
        { value: 'Wrestling', text: 'Wrestling' },
      ],
      optionsResidence: [
        { value: null, text: 'Please select a residence' },
        { value: 'Afghanistan', text: 'Afghanistan' },
        { value: 'Åland Islands', text: 'Åland Islands' },
        { value: 'Albania', text: 'Albania' },
        { value: 'Algeria', text: 'Algeria' },
        { value: 'American Samoa', text: 'American Samoa' },
        { value: 'Andorra', text: 'Andorra' },
        { value: 'Angola', text: 'Angola' },
        { value: 'Anguilla', text: 'Anguilla' },
        { value: 'Antarctica', text: 'Antarctica' },
        { value: 'Antigua and Barbuda', text: 'Antigua and Barbuda' },
        { value: 'Argentina', text: 'Argentina' },
        { value: 'Armenia', text: 'Armenia' },
        { value: 'Aruba', text: 'Aruba' },
        { value: 'Australia', text: 'Australia' },
        { value: 'Austria', text: 'Austria' },
        { value: 'Azerbaijan', text: 'Azerbaijan' },
        { value: 'Bahamas', text: 'Bahamas' },
        { value: 'Bahrain', text: 'Bahrain' },
        { value: 'Bangladesh', text: 'Bangladesh' },
        { value: 'Barbados', text: 'Barbados' },
        { value: 'Belarus', text: 'Belarus' },
        { value: 'Belgium', text: 'Belgium' },
        { value: 'Belize', text: 'Belize' },
        { value: 'Benin', text: 'Benin' },
        { value: 'Bermuda', text: 'Bermuda' },
        { value: 'Bhutan', text: 'Bhutan' },
        { value: 'Bolivia', text: 'Bolivia, Plurinational State of' },
        { value: 'Bonaire', text: 'Bonaire, Sint Eustatius and Saba' },
        { value: 'Bosnia and Herzegovina', text: 'Bosnia and Herzegovina' },
        { value: 'Botswana', text: 'Botswana' },
        { value: 'Bouvet Island', text: 'Bouvet Island' },
        { value: 'Brazil', text: 'Brazil' },
        { value: 'British Indian Ocean Territory', text: 'British Indian Ocean Territory' },
        { value: 'Brunei Darussalam', text: 'Brunei Darussalam' },
        { value: 'Bulgaria', text: 'Bulgaria' },
        { value: 'Burkina Faso', text: 'Burkina Faso' },
        { value: 'Burundi', text: 'Burundi' },
        { value: 'Cambodia', text: 'Cambodia' },
        { value: 'Cameroon', text: 'Cameroon' },
        { value: 'Canada', text: 'Canada' },
        { value: 'Cape Verde', text: 'Cape Verde' },
        { value: 'Cayman Islands', text: 'Cayman Islands' },
        { value: 'Central African Republic', text: 'Central African Republic' },
        { value: 'Chad', text: 'Chad' },
        { value: 'Chile', text: 'Chile' },
        { value: 'China', text: 'China' },
        { value: 'Christmas Island', text: 'Christmas Island' },
        { value: 'Cocos Islands', text: 'Cocos (Keeling) Islands' },
        { value: 'Colombia', text: 'Colombia' },
        { value: 'Comoros', text: 'Comoros' },
        { value: 'Congo', text: 'Congo' },
        { value: 'Congo, the Democratic Republic of the', text: 'Congo, the Democratic Republic of the' },
        { value: 'Cook Islands', text: 'Cook Islands' },
        { value: 'Costa Rica', text: 'Costa Rica' },
        { value: 'Côte d`Ivoire', text: 'Côte d`Ivoire' },
        { value: 'Croatia', text: 'Croatia' },
        { value: 'Cuba', text: 'Cuba' },
        { value: 'Curaçao', text: 'Curaçao' },
        { value: 'Cyprus', text: 'Cyprus' },
        { value: 'Czech Republic', text: 'Czech Republic' },
        { value: 'Denmark', text: 'Denmark' },
        { value: 'Djibouti', text: 'Djibouti' },
        { value: 'Dominica', text: 'Dominica' },
        { value: 'Dominican Republic', text: 'Dominican Republic' },
        { value: 'Ecuador', text: 'Ecuador' },
        { value: 'Egypt', text: 'Egypt' },
        { value: 'El Salvador', text: 'El Salvador' },
        { value: 'Equatorial Guinea', text: 'Equatorial Guinea' },
        { value: 'Eritrea', text: 'Eritrea' },
        { value: 'Estonia', text: 'Estonia' },
        { value: 'Ethiopia', text: 'Ethiopia' },
        { value: 'Falkland Islands (Malvinas)', text: 'Falkland Islands (Malvinas)' },
        { value: 'Faroe Islands', text: 'Faroe Islands' },
        { value: 'Fiji', text: 'Fiji' },
        { value: 'Finland', text: 'Finland' },
        { value: 'France', text: 'France' },
        { value: 'French Guiana', text: 'French Guiana' },
        { value: 'French Polynesiana', text: 'French Polynesia' },
        { value: 'French Southern Territories', text: 'French Southern Territories' },
        { value: 'Gabon', text: 'Gabon' },
        { value: 'Gambia', text: 'Gambia' },
        { value: 'Georgia', text: 'Georgia' },
        { value: 'Germany', text: 'Germany' },
        { value: 'Ghana', text: 'Ghana' },
        { value: 'Gibraltar', text: 'Gibraltar' },
        { value: 'Greece', text: 'Greece' },
        { value: 'Greenland', text: 'Greenland' },
        { value: 'Grenada', text: 'Grenada' },
        { value: 'Guadeloupe', text: 'Guadeloupe' },
        { value: 'Guam', text: 'Guam' },
        { value: 'Guatemala', text: 'Guatemala' },
        { value: 'Guernsey', text: 'Guernsey' },
        { value: 'Guinea', text: 'Guinea' },
        { value: 'Guinea-Bissau', text: 'Guinea-Bissau' },
        { value: 'Guyana', text: 'Guyana' },
        { value: 'Haiti', text: 'Haiti' },
        { value: 'Heard Island and McDonald Islands"', text: 'Heard Island and McDonald Islands"' },
        { value: 'Holy See (Vatican City State)', text: 'Holy See (Vatican City State)' },
        { value: 'Honduras', text: 'Honduras' },
        { value: 'Hong Kong', text: 'Hong Kong' },
        { value: 'Hungary', text: 'Hungary' },
        { value: 'Iceland', text: 'Iceland' },
        { value: 'India', text: 'India' },
        { value: 'Indonesia', text: 'Indonesia' },
        { value: 'Iran, Islamic Republic of', text: 'Iran, Islamic Republic of' },
        { value: 'Iraq', text: 'Iraq' },
        { value: 'Ireland', text: 'Ireland' },
        { value: 'Isle of Man', text: 'Isle of Man' },
        { value: 'Israel', text: 'Israel' },
        { value: 'Italy', text: 'Italy' },
        { value: 'Jamaica', text: 'Jamaica' },
        { value: 'Japan', text: 'Japan' },
        { value: 'Jersey', text: 'Jersey' },
        { value: 'Jordan', text: 'Jordan' },
        { value: 'Kazakhstan', text: 'Kazakhstan' },
        { value: 'Kenya', text: 'Kenya' },
        { value: 'Kiribati', text: 'Kiribati' },
        { value: 'Korea, Democratic People`s Republic of', text: 'Korea, Democratic People`s Republic of' },
        { value: 'Korea, Republic of', text: 'Korea, Republic of' },
        { value: 'Kuwait', text: 'Kuwait' },
        { value: 'Kyrgyzstan', text: 'Kyrgyzstan' },
        { value: 'Lao People`s Democratic Republic', text: 'Lao People`s Democratic Republic' },
        { value: 'Latvia', text: 'Latvia' },
        { value: 'Lebanon', text: 'Lebanon' },
        { value: 'Lesotho', text: 'Lesotho' },
        { value: 'Liberia', text: 'Liberia' },
        { value: 'Libya', text: 'Libya' },
        { value: 'Liechtenstein', text: 'Liechtenstein' },
        { value: 'Lithuania', text: 'Lithuania' },
        { value: 'Luxembourg', text: 'Luxembourg' },
        { value: 'Macao', text: 'Macao' },
        { value: 'Macedonia', text: 'Macedonia, the Former Yugoslav Republic of' },
        { value: 'Madagascar', text: 'Madagascar' },
        { value: 'Malawi', text: 'Malawi' },
        { value: 'Malaysia', text: 'Malaysia' },
        { value: 'Maldives', text: 'Maldives' },
        { value: 'Mali', text: 'Mali' },
        { value: 'Malta', text: 'Malta' },
        { value: 'Marshall Islands', text: 'Marshall Islands' },
        { value: 'Martinique', text: 'Martinique' },
        { value: 'Mauritania', text: 'Mauritania' },
        { value: 'Mauritius', text: 'Mauritius' },
        { value: 'Mayotte', text: 'Mayotte' },
        { value: 'Mexico', text: 'Mexico' },
        { value: 'Micronesia, Federated States of', text: 'Micronesia, Federated States of' },
        { value: 'Moldova, Republic of', text: 'Moldova, Republic of' },
        { value: 'Monaco', text: 'Monaco' },
        { value: 'Mongolia', text: 'Mongolia' },
        { value: 'Montenegro', text: 'Montenegro' },
        { value: 'Montserrat', text: 'Montserrat' },
        { value: 'Morocco', text: 'Morocco' },
        { value: 'Mozambique', text: 'Mozambique' },
        { value: 'Myanmar', text: 'Myanmar' },
        { value: 'Namibia', text: 'Namibia' },
        { value: 'Nauru', text: 'Nauru' },
        { value: 'Nepal', text: 'Nepal' },
        { value: 'Netherlands', text: 'Netherlands' },
        { value: 'New Caledonia', text: 'New Caledonia' },
        { value: 'New Zealand', text: 'New Zealand' },
        { value: 'Nicaragua', text: 'Nicaragua' },
        { value: 'Niger', text: 'Niger' },
        { value: 'Nigeria', text: 'Nigeria' },
        { value: 'Netherlands', text: 'Netherlands' },
        { value: 'Niue', text: 'Niue' },
        { value: 'Norfolk Island', text: 'Norfolk Island' },
        { value: 'Northern Mariana Islands', text: 'Northern Mariana Islands' },
        { value: 'Norway', text: 'Norway' },
        { value: 'Oman', text: 'Oman' },
        { value: 'Pakistan', text: 'Pakistan' },
        { value: 'Palau', text: 'Palau' },
        { value: 'Palestine, State of', text: 'Palestine, State of' },
        { value: 'Panama', text: 'Panama' },
        { value: 'Papua New Guinea', text: 'Papua New Guinea' },
        { value: 'Paraguay', text: 'Paraguay' },
        { value: 'Peru', text: 'Peru' },
        { value: 'Philippines', text: 'Philippines' },
        { value: 'Pitcairn', text: 'Pitcairn' },
        { value: 'Poland', text: 'Poland' },
        { value: 'Portugal', text: 'Portugal' },
        { value: 'Puerto Rico', text: 'Puerto Rico' },
        { value: 'Qatar', text: 'Qatar' },
        { value: 'Réunion', text: 'Réunion' },
        { value: 'Romania', text: 'Romania' },
        { value: 'Russian Federation', text: 'Russian Federation' },
        { value: 'Rwanda', text: 'Rwanda' },
        { value: 'Saint Barthélemy', text: 'Saint Barthélemy' },
        { value: 'Saint Helena', text: 'Saint Helena, Ascension and Tristan da Cunha' },
        { value: 'Saint Kitts and Nevis', text: 'Saint Kitts and Nevis' },
        { value: 'Saint Lucia', text: 'Saint Lucia' },
        { value: 'Saint Martin (French part)', text: 'Saint Martin (French part)' },
        { value: 'Saint Pierre and Miquelon', text: 'Saint Pierre and Miquelon' },
        { value: 'Saint Vincent and the Grenadines', text: 'Saint Vincent and the Grenadines' },
        { value: 'Samoa', text: 'Samoa' },
        { value: 'San Marino', text: 'San Marino' },
        { value: 'Sao Tome and Principe', text: 'Sao Tome and Principe' },
        { value: 'Saudi Arabia', text: 'Saudi Arabia' },
        { value: 'Senegal', text: 'Senegal' },
        { value: 'Serbia', text: 'Serbia' },
        { value: 'Seychelles', text: 'Seychelles' },
        { value: 'Sierra Leone', text: 'Sierra Leone' },
        { value: 'Singapore', text: 'Singapore' },
        { value: 'Sint Maarten', text: 'Sint Maarten' },
        { value: 'Slovakia', text: 'Slovakia' },
        { value: 'Slovenia', text: 'Slovenia' },
        { value: 'Solomon Islands', text: 'Solomon Islands' },
        { value: 'Somalia', text: 'Somalia' },
        { value: 'South Africa', text: 'South Africa' },
        { value: 'South Georgia and the South Sandwich Islands', text: 'South Georgia and the South Sandwich Islands' },
        { value: 'South Sudan', text: 'South Sudan' },
        { value: 'Spain', text: 'Spain' },
        { value: 'Sri Lanka', text: 'Sri Lanka' },
        { value: 'Sudan', text: 'Sudan' },
        { value: 'Suriname', text: 'Suriname' },
        { value: 'Svalbard and Jan Mayen', text: 'Svalbard and Jan Mayen' },
        { value: 'Swaziland', text: 'Swaziland' },
        { value: 'Sweden', text: 'Sweden' },
        { value: 'Switzerland', text: 'Switzerland' },
        { value: 'Syrian Arab Republica', text: 'Syrian Arab Republic' },
        { value: 'Taiwan', text: 'Taiwan, Province of China' },
        { value: 'Tajikistan', text: 'Tajikistan' },
        { value: 'Tanzania', text: 'Tanzania, United Republic of' },
        { value: 'Thailand', text: 'Thailand' },
        { value: 'Timor-Leste', text: 'Timor-Leste' },
        { value: 'Togo', text: 'Togo' },
        { value: 'Tokelau', text: 'Tokelau' },
        { value: 'Tonga', text: 'Tonga' },
        { value: 'Trinidad and Tobago', text: 'Trinidad and Tobago' },
        { value: 'Tunisia', text: 'Tunisia' },
        { value: 'Turkey', text: 'Turkey' },
        { value: 'Turkmenistan', text: 'Turkmenistan' },
        { value: 'Turks and Caicos Islands', text: 'Turks and Caicos Islands' },
        { value: 'Tuvalu', text: 'Tuvalu' },
        { value: 'Uganda', text: 'Uganda' },
        { value: 'Ukraine', text: 'Ukraine' },
        { value: 'United Arab Emirates', text: 'United Arab Emirates' },
        { value: 'United Kingdom', text: 'United Kingdom' },
        { value: 'United States', text: 'United States' },
        { value: 'Uruguay', text: 'Uruguay' },
        { value: 'Uzbekistan', text: 'Uzbekistan' },
        { value: 'Vanuatu', text: 'Vanuatu' },
        { value: 'Venezuela', text: 'Venezuela, Bolivarian Republic of' },
        { value: 'Viet Nam', text: 'Viet Nam' },
        { value: 'Virgin Islands, British', text: 'Virgin Islands, British' },
        { value: 'Virgin Islands, U.S.', text: 'Virgin Islands, U.S.' },
        { value: 'Wallis and Futuna', text: 'Wallis and Futuna' },
        { value: 'Western Sahara', text: 'Western Sahara' },
        { value: 'Yemen', text: 'Yemen' },
        { value: 'Zambia', text: 'Zambia' },
        { value: 'Zimbabwe', text: 'Zimbabwe' },
      ],
      optionsCountry: [
        { value: null, text: 'Please select a Country' },
        { value: 'Afghanistan', text: 'Afghanistan' },
        { value: 'Åland Islands', text: 'Åland Islands' },
        { value: 'Albania', text: 'Albania' },
        { value: 'Algeria', text: 'Algeria' },
        { value: 'American Samoa', text: 'American Samoa' },
        { value: 'Andorra', text: 'Andorra' },
        { value: 'Angola', text: 'Angola' },
        { value: 'Anguilla', text: 'Anguilla' },
        { value: 'Antarctica', text: 'Antarctica' },
        { value: 'Antigua and Barbuda', text: 'Antigua and Barbuda' },
        { value: 'Argentina', text: 'Argentina' },
        { value: 'Armenia', text: 'Armenia' },
        { value: 'Aruba', text: 'Aruba' },
        { value: 'Australia', text: 'Australia' },
        { value: 'Austria', text: 'Austria' },
        { value: 'Azerbaijan', text: 'Azerbaijan' },
        { value: 'Bahamas', text: 'Bahamas' },
        { value: 'Bahrain', text: 'Bahrain' },
        { value: 'Bangladesh', text: 'Bangladesh' },
        { value: 'Barbados', text: 'Barbados' },
        { value: 'Belarus', text: 'Belarus' },
        { value: 'Belgium', text: 'Belgium' },
        { value: 'Belize', text: 'Belize' },
        { value: 'Benin', text: 'Benin' },
        { value: 'Bermuda', text: 'Bermuda' },
        { value: 'Bhutan', text: 'Bhutan' },
        { value: 'Bolivia', text: 'Bolivia, Plurinational State of' },
        { value: 'Bonaire', text: 'Bonaire, Sint Eustatius and Saba' },
        { value: 'Bosnia and Herzegovina', text: 'Bosnia and Herzegovina' },
        { value: 'Botswana', text: 'Botswana' },
        { value: 'Bouvet Island', text: 'Bouvet Island' },
        { value: 'Brazil', text: 'Brazil' },
        { value: 'British Indian Ocean Territory', text: 'British Indian Ocean Territory' },
        { value: 'Brunei Darussalam', text: 'Brunei Darussalam' },
        { value: 'Bulgaria', text: 'Bulgaria' },
        { value: 'Burkina Faso', text: 'Burkina Faso' },
        { value: 'Burundi', text: 'Burundi' },
        { value: 'Cambodia', text: 'Cambodia' },
        { value: 'Cameroon', text: 'Cameroon' },
        { value: 'Canada', text: 'Canada' },
        { value: 'Cape Verde', text: 'Cape Verde' },
        { value: 'Cayman Islands', text: 'Cayman Islands' },
        { value: 'Central African Republic', text: 'Central African Republic' },
        { value: 'Chad', text: 'Chad' },
        { value: 'Chile', text: 'Chile' },
        { value: 'China', text: 'China' },
        { value: 'Christmas Island', text: 'Christmas Island' },
        { value: 'Cocos Islands', text: 'Cocos (Keeling) Islands' },
        { value: 'Colombia', text: 'Colombia' },
        { value: 'Comoros', text: 'Comoros' },
        { value: 'Congo', text: 'Congo' },
        { value: 'Congo, the Democratic Republic of the', text: 'Congo, the Democratic Republic of the' },
        { value: 'Cook Islands', text: 'Cook Islands' },
        { value: 'Costa Rica', text: 'Costa Rica' },
        { value: 'Côte d`Ivoire', text: 'Côte d`Ivoire' },
        { value: 'Croatia', text: 'Croatia' },
        { value: 'Cuba', text: 'Cuba' },
        { value: 'Curaçao', text: 'Curaçao' },
        { value: 'Cyprus', text: 'Cyprus' },
        { value: 'Czech Republic', text: 'Czech Republic' },
        { value: 'Denmark', text: 'Denmark' },
        { value: 'Djibouti', text: 'Djibouti' },
        { value: 'Dominica', text: 'Dominica' },
        { value: 'Dominican Republic', text: 'Dominican Republic' },
        { value: 'Ecuador', text: 'Ecuador' },
        { value: 'Egypt', text: 'Egypt' },
        { value: 'El Salvador', text: 'El Salvador' },
        { value: 'Equatorial Guinea', text: 'Equatorial Guinea' },
        { value: 'Eritrea', text: 'Eritrea' },
        { value: 'Estonia', text: 'Estonia' },
        { value: 'Ethiopia', text: 'Ethiopia' },
        { value: 'Falkland Islands (Malvinas)', text: 'Falkland Islands (Malvinas)' },
        { value: 'Faroe Islands', text: 'Faroe Islands' },
        { value: 'Fiji', text: 'Fiji' },
        { value: 'Finland', text: 'Finland' },
        { value: 'France', text: 'France' },
        { value: 'French Guiana', text: 'French Guiana' },
        { value: 'French Polynesiana', text: 'French Polynesia' },
        { value: 'French Southern Territories', text: 'French Southern Territories' },
        { value: 'Gabon', text: 'Gabon' },
        { value: 'Gambia', text: 'Gambia' },
        { value: 'Georgia', text: 'Georgia' },
        { value: 'Germany', text: 'Germany' },
        { value: 'Ghana', text: 'Ghana' },
        { value: 'Gibraltar', text: 'Gibraltar' },
        { value: 'Greece', text: 'Greece' },
        { value: 'Greenland', text: 'Greenland' },
        { value: 'Grenada', text: 'Grenada' },
        { value: 'Guadeloupe', text: 'Guadeloupe' },
        { value: 'Guam', text: 'Guam' },
        { value: 'Guatemala', text: 'Guatemala' },
        { value: 'Guernsey', text: 'Guernsey' },
        { value: 'Guinea', text: 'Guinea' },
        { value: 'Guinea-Bissau', text: 'Guinea-Bissau' },
        { value: 'Guyana', text: 'Guyana' },
        { value: 'Haiti', text: 'Haiti' },
        { value: 'Heard Island and McDonald Islands"', text: 'Heard Island and McDonald Islands"' },
        { value: 'Holy See (Vatican City State)', text: 'Holy See (Vatican City State)' },
        { value: 'Honduras', text: 'Honduras' },
        { value: 'Hong Kong', text: 'Hong Kong' },
        { value: 'Hungary', text: 'Hungary' },
        { value: 'Iceland', text: 'Iceland' },
        { value: 'India', text: 'India' },
        { value: 'Indonesia', text: 'Indonesia' },
        { value: 'Iran, Islamic Republic of', text: 'Iran, Islamic Republic of' },
        { value: 'Iraq', text: 'Iraq' },
        { value: 'Ireland', text: 'Ireland' },
        { value: 'Isle of Man', text: 'Isle of Man' },
        { value: 'Israel', text: 'Israel' },
        { value: 'Italy', text: 'Italy' },
        { value: 'Jamaica', text: 'Jamaica' },
        { value: 'Japan', text: 'Japan' },
        { value: 'Jersey', text: 'Jersey' },
        { value: 'Jordan', text: 'Jordan' },
        { value: 'Kazakhstan', text: 'Kazakhstan' },
        { value: 'Kenya', text: 'Kenya' },
        { value: 'Kiribati', text: 'Kiribati' },
        { value: 'Korea, Democratic People`s Republic of', text: 'Korea, Democratic People`s Republic of' },
        { value: 'Korea, Republic of', text: 'Korea, Republic of' },
        { value: 'Kuwait', text: 'Kuwait' },
        { value: 'Kyrgyzstan', text: 'Kyrgyzstan' },
        { value: 'Lao People`s Democratic Republic', text: 'Lao People`s Democratic Republic' },
        { value: 'Latvia', text: 'Latvia' },
        { value: 'Lebanon', text: 'Lebanon' },
        { value: 'Lesotho', text: 'Lesotho' },
        { value: 'Liberia', text: 'Liberia' },
        { value: 'Libya', text: 'Libya' },
        { value: 'Liechtenstein', text: 'Liechtenstein' },
        { value: 'Lithuania', text: 'Lithuania' },
        { value: 'Luxembourg', text: 'Luxembourg' },
        { value: 'Macao', text: 'Macao' },
        { value: 'Macedonia', text: 'Macedonia, the Former Yugoslav Republic of' },
        { value: 'Madagascar', text: 'Madagascar' },
        { value: 'Malawi', text: 'Malawi' },
        { value: 'Malaysia', text: 'Malaysia' },
        { value: 'Maldives', text: 'Maldives' },
        { value: 'Mali', text: 'Mali' },
        { value: 'Malta', text: 'Malta' },
        { value: 'Marshall Islands', text: 'Marshall Islands' },
        { value: 'Martinique', text: 'Martinique' },
        { value: 'Mauritania', text: 'Mauritania' },
        { value: 'Mauritius', text: 'Mauritius' },
        { value: 'Mayotte', text: 'Mayotte' },
        { value: 'Mexico', text: 'Mexico' },
        { value: 'Micronesia, Federated States of', text: 'Micronesia, Federated States of' },
        { value: 'Moldova, Republic of', text: 'Moldova, Republic of' },
        { value: 'Monaco', text: 'Monaco' },
        { value: 'Mongolia', text: 'Mongolia' },
        { value: 'Montenegro', text: 'Montenegro' },
        { value: 'Montserrat', text: 'Montserrat' },
        { value: 'Morocco', text: 'Morocco' },
        { value: 'Mozambique', text: 'Mozambique' },
        { value: 'Myanmar', text: 'Myanmar' },
        { value: 'Namibia', text: 'Namibia' },
        { value: 'Nauru', text: 'Nauru' },
        { value: 'Nepal', text: 'Nepal' },
        { value: 'Netherlands', text: 'Netherlands' },
        { value: 'New Caledonia', text: 'New Caledonia' },
        { value: 'New Zealand', text: 'New Zealand' },
        { value: 'Nicaragua', text: 'Nicaragua' },
        { value: 'Niger', text: 'Niger' },
        { value: 'Nigeria', text: 'Nigeria' },
        { value: 'Netherlands', text: 'Netherlands' },
        { value: 'Niue', text: 'Niue' },
        { value: 'Norfolk Island', text: 'Norfolk Island' },
        { value: 'Northern Mariana Islands', text: 'Northern Mariana Islands' },
        { value: 'Norway', text: 'Norway' },
        { value: 'Oman', text: 'Oman' },
        { value: 'Pakistan', text: 'Pakistan' },
        { value: 'Palau', text: 'Palau' },
        { value: 'Palestine, State of', text: 'Palestine, State of' },
        { value: 'Panama', text: 'Panama' },
        { value: 'Papua New Guinea', text: 'Papua New Guinea' },
        { value: 'Paraguay', text: 'Paraguay' },
        { value: 'Peru', text: 'Peru' },
        { value: 'Philippines', text: 'Philippines' },
        { value: 'Pitcairn', text: 'Pitcairn' },
        { value: 'Poland', text: 'Poland' },
        { value: 'Portugal', text: 'Portugal' },
        { value: 'Puerto Rico', text: 'Puerto Rico' },
        { value: 'Qatar', text: 'Qatar' },
        { value: 'Réunion', text: 'Réunion' },
        { value: 'Romania', text: 'Romania' },
        { value: 'Russian Federation', text: 'Russian Federation' },
        { value: 'Rwanda', text: 'Rwanda' },
        { value: 'Saint Barthélemy', text: 'Saint Barthélemy' },
        { value: 'Saint Helena', text: 'Saint Helena, Ascension and Tristan da Cunha' },
        { value: 'Saint Kitts and Nevis', text: 'Saint Kitts and Nevis' },
        { value: 'Saint Lucia', text: 'Saint Lucia' },
        { value: 'Saint Martin (French part)', text: 'Saint Martin (French part)' },
        { value: 'Saint Pierre and Miquelon', text: 'Saint Pierre and Miquelon' },
        { value: 'Saint Vincent and the Grenadines', text: 'Saint Vincent and the Grenadines' },
        { value: 'Samoa', text: 'Samoa' },
        { value: 'San Marino', text: 'San Marino' },
        { value: 'Sao Tome and Principe', text: 'Sao Tome and Principe' },
        { value: 'Saudi Arabia', text: 'Saudi Arabia' },
        { value: 'Senegal', text: 'Senegal' },
        { value: 'Serbia', text: 'Serbia' },
        { value: 'Seychelles', text: 'Seychelles' },
        { value: 'Sierra Leone', text: 'Sierra Leone' },
        { value: 'Singapore', text: 'Singapore' },
        { value: 'Sint Maarten', text: 'Sint Maarten' },
        { value: 'Slovakia', text: 'Slovakia' },
        { value: 'Slovenia', text: 'Slovenia' },
        { value: 'Solomon Islands', text: 'Solomon Islands' },
        { value: 'Somalia', text: 'Somalia' },
        { value: 'South Africa', text: 'South Africa' },
        { value: 'South Georgia and the South Sandwich Islands', text: 'South Georgia and the South Sandwich Islands' },
        { value: 'South Sudan', text: 'South Sudan' },
        { value: 'Spain', text: 'Spain' },
        { value: 'Sri Lanka', text: 'Sri Lanka' },
        { value: 'Sudan', text: 'Sudan' },
        { value: 'Suriname', text: 'Suriname' },
        { value: 'Svalbard and Jan Mayen', text: 'Svalbard and Jan Mayen' },
        { value: 'Swaziland', text: 'Swaziland' },
        { value: 'Sweden', text: 'Sweden' },
        { value: 'Switzerland', text: 'Switzerland' },
        { value: 'Syrian Arab Republica', text: 'Syrian Arab Republic' },
        { value: 'Taiwan', text: 'Taiwan, Province of China' },
        { value: 'Tajikistan', text: 'Tajikistan' },
        { value: 'Tanzania', text: 'Tanzania, United Republic of' },
        { value: 'Thailand', text: 'Thailand' },
        { value: 'Timor-Leste', text: 'Timor-Leste' },
        { value: 'Togo', text: 'Togo' },
        { value: 'Tokelau', text: 'Tokelau' },
        { value: 'Tonga', text: 'Tonga' },
        { value: 'Trinidad and Tobago', text: 'Trinidad and Tobago' },
        { value: 'Tunisia', text: 'Tunisia' },
        { value: 'Turkey', text: 'Turkey' },
        { value: 'Turkmenistan', text: 'Turkmenistan' },
        { value: 'Turks and Caicos Islands', text: 'Turks and Caicos Islands' },
        { value: 'Tuvalu', text: 'Tuvalu' },
        { value: 'Uganda', text: 'Uganda' },
        { value: 'Ukraine', text: 'Ukraine' },
        { value: 'United Arab Emirates', text: 'United Arab Emirates' },
        { value: 'United Kingdom', text: 'United Kingdom' },
        { value: 'United States', text: 'United States' },
        { value: 'Uruguay', text: 'Uruguay' },
        { value: 'Uzbekistan', text: 'Uzbekistan' },
        { value: 'Vanuatu', text: 'Vanuatu' },
        { value: 'Venezuela', text: 'Venezuela, Bolivarian Republic of' },
        { value: 'Viet Nam', text: 'Viet Nam' },
        { value: 'Virgin Islands, British', text: 'Virgin Islands, British' },
        { value: 'Virgin Islands, U.S.', text: 'Virgin Islands, U.S.' },
        { value: 'Wallis and Futuna', text: 'Wallis and Futuna' },
        { value: 'Western Sahara', text: 'Western Sahara' },
        { value: 'Yemen', text: 'Yemen' },
        { value: 'Zambia', text: 'Zambia' },
        { value: 'Zimbabwe', text: 'Zimbabwe' },
      ],
      addTokensResult: null,
      tokensToBuy: null,
      chartData: {
        labels: [],
        datasets: [],
      },
      file: 'prueba',
      chartOptions: {
        responsive: true,
        legend: {
          position: 'bottom',
          labels: {
            fontColor: '#fafafa',
          },
        },
      },
      priceAmountToken: null,
      tokenAmount: '',
      supporterSportsmen: false,
      investorSportsmen: false,
      image: '../assets/img/img_default.png',
      sportsmenName: '',
      tokenData: null,
      loading: null,
      overview: null,
      noOfLikes: this.noOfLikes,
      country: this.country,
      residence: this.residence,
      sport: this.sport,
      born: this.birthPlace,
      birthPlace: '',
      height: '',
      weight: '',
      videos: '',
      coach: '',
      proDate: '',
      team: '',
      skills: '',
      about: '',
      descriptionText: '',
      facebookLink: '',
      linkedinLink: '',
      twitterLink: '',
      youtubeLink: '',
      vimeoLink: '',
      instagramLink: '',
      currentSupply: '',
      tokenValue: '',
      totalSupply: '',
      tokenName: '',
      tokenCapitalization: null,
      amountCorrect: false,
      tuMadre: false,
      fieldsExpenses: [
        {
          key: 'progress',
          label: 'Progress',
          sortable: true,
        },
        {
          key: 'expenses',
          label: 'Expenses',
          sortable: true,
        },
        {
          key: 'event',
          label: 'Event',
          sortable: true,
        },
        {
          key: 'year',
          label: 'Year',
          sortable: true,
        },
      ],
      itemsExpenses: [],
      fieldsMilestones: [
        {
          key: 'accomplishment',
          label: 'Accomplishment',
          sortable: true,
        },
        {
          key: 'year',
          label: 'Year',
          sortable: true,
        },
        {
          key: 'event',
          label: 'Event',
          sortable: true,
        },
      ],
      itemsMilestones: null,
      days: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      dismissCountDown: false,
      statusUpdate: null,
      accomplishmentMilestones: null,
      yearMilestones: null,
      eventMilestones: null,
      progressExpense: null,
      expenseAmount: null,
      eventExpenses: null,
      yearExpense: null,
    };
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    addExpense() {
      const expense = {
        progress: this.progressExpense,
        expenses: this.expenseAmount,
        event: this.eventExpenses,
        year: this.yearExpense,
      };
      this.itemsExpenses.push(expense);
      const data = {
        expenses: this.itemsExpenses,
      };
      return sportsMenHomeServ.updateSportsmenInfo(data, this.userName)
        .then((res) => {
          Object.assign(this, res.data);
          this.dismissCountDown = 3;
          this.statusUpdate = 'success';
          this.message = 'Successful update ';
          this.progressExpense = null;
          this.expenseAmount = null;
          this.eventExpenses = null;
          this.yearExpense = null;
        })
        .catch((/* err */) => {
          // console.debug(err);
          this.dismissCountDown = 3;
          this.statusUpdate = 'danger';
          this.message = 'Failed to update ';
          this.progressExpense = null;
          this.expenseAmount = null;
          this.eventExpenses = null;
          this.yearExpense = null;
        });
    },
    addMilestone() {
      const milestones = {
        accomplishment: this.accomplishmentMilestones,
        year: this.yearMilestones,
        event: this.eventMilestones,
      };
      this.itemsMilestones.push(milestones);
      const data = {
        milestones: this.itemsMilestones,
      };
      return sportsMenHomeServ.updateSportsmenInfo(data, this.userName)
        .then((res) => {
          Object.assign(this, res.data);
          this.dismissCountDown = 3;
          this.statusUpdate = 'success';
          this.message = 'Successful update ';
          this.accomplishmentMilestones = null;
          this.yearMilestones = null;
          this.eventMilestones = null;
        })
        .catch((/* err */) => {
          // console.debug(err);
          this.dismissCountDown = 3;
          this.statusUpdate = 'danger';
          this.message = 'Failed to update ';
          this.accomplishmentMilestones = null;
          this.yearMilestones = null;
          this.eventMilestones = null;
        });
    },
    updateSocialNetworks() {
      const rrss = {
        social: {
          facebookLink: this.facebookLink,
          linkedinLink: this.linkedinLink,
          twitterLink: this.twitterLink,
          youtubeLink: this.youtubeLink,
          vimeoLink: this.vimeoLink,
          instagramLink: this.instagramLink,
        },
      };
      return sportsMenHomeServ.updateSportsmenInfo(rrss, this.userName)
        .then((res) => {
          Object.assign(this, res.data);
          this.dismissCountDown = 3;
          this.statusUpdate = 'success';
          this.message = 'Successful update Social Networks';
        })
        .catch((/* err */) => {
          // console.debug(err);
          this.dismissCountDown = 3;
          this.statusUpdate = 'danger';
          this.message = 'Failed to update Social Networks';
        });
    },
    updateBioInfo() {
      const bio = {
        overview: {
          about: this.about,
          noOfLikes: this.noOfLikes,
        },
        info: {
          videos: this.videos.replace('watch?v=', 'embed/'),
          descriptionText: this.descriptionText,
        },
      };
      return sportsMenHomeServ.updateSportsmenInfo(bio, this.userName)
        .then((res) => {
          Object.assign(this, res.data);
          this.dismissCountDown = 3;
          this.statusUpdate = 'success';
          this.message = 'Successful update Bio';
          setTimeout(() => {
            window.location.href = '/#/sportsmenHome';
          }, 1000);
        })
        .catch((/* err */) => {
          // console.debug(err);
          this.dismissCountDown = 3;
          this.statusUpdate = 'danger';
          this.message = 'Failed to update Bio';
        });
    },

    updateProfileInfo() {
      const profileData = {
        personalInfo: {
          residence: this.residence,
          sport: this.sport,
          country: this.country,
          born: this.born,
          birthPlace: this.birthPlace,
          height: this.height,
          weight: this.weight,
          coach: this.coach,
          proDate: this.proDate,
          team: this.team,

        },
        overview: {
          country: this.country,
          sport: this.sport,
          about: this.about,
          noOfLikes: this.noOfLikes,
        },
      };
      return sportsMenHomeServ.updateSportsmenInfo(profileData, this.userName)
        .then((res) => {
          Object.assign(this, res.data);
          this.dismissCountDown = 3;
          this.statusUpdate = 'success';
          this.message = 'Successful update profile';
        })
        .catch((/* err */) => {
          // console.debug(err);
          this.dismissCountDown = 3;
          this.statusUpdate = 'danger';
          this.message = 'Failed to update profile';
        });
    },
    getSportsInfo(sportsmenName) {
      return sportsMenServ.getSportsmenInformation(sportsmenName)
        .then((res) => {
          Object.assign(this, res.data);
        })
        .catch((/* err */) => {
          // console.debug(err);
        });
    },
    getUserInfo(sportsmenName) {
      return sportsMenServ.getSportsmen(this.sportsmenName)
        .then((res) => {
          Object.assign(this, res.data);
        })
        .catch((/* err */) => {
          // console.debug(err);
        });
    },
    getSportsMilestones(sportsmenName) {
      return sportsMenServ.getSportsmenMilestones(sportsmenName)
        .then((res) => {
          this.itemsMilestones = res.data;
        })
        .catch((/* err */) => {
          // console.debug(err);
        });
    },
    getSportsExpenses(sportsmenName) {
      return sportsMenServ.getSportsmenExpenses(sportsmenName)
        .then((res) => {
          this.itemsExpenses = res.data;
        })
        .catch((/* err */) => {
          // console.debug(err);
        });
    },
    getSportsTokens(sportsmenName) {
      return sportsMenServ.getSportsmenTokens(sportsmenName)
        .then((res) => {
          Object.assign(this, res.data.tokens);
        })
        .catch((/* err */) => {
          // console.debug(err);
        });
    },

    editSportsmenPicture() {
      const fd = new FormData();
      fd.append('newPicture', this.file);
      console.log(this.file);
      const tipoFichero = this.file.type;

      if ('image/jpeg' === tipoFichero || 'image/jpg' === tipoFichero || 'image/png' === tipoFichero) {
        console.log('Antes de llamar al metodo del servicio');
        return sportsMenServ.setSportsmenPicturePath(this.userName, fd)
          .then((/* res */) => {
            setTimeout(() => {
              location.reload();
            }, 1000);
          })
          .catch((err) => {
            console.debug(err);
          });
      }
      alert('imagen vacía o formato de imagen no valido');
    },
  },
  computed: {
    userName() {
      return this.tokenData.sub.username;
    },
  },
};
</script>

<style lang="stylus" scoped>
  @import '../../assets/stylus/colors.styl'
  white-text = #e5e5e5
  .tab-pane.card-body,
  .gg
    padding 20px !important
    background-color #36404a
    border-radius 5px
    margin-bottom 15px
  .bg-block
    background-color #36404a
    color white-text
  .overview-block-1
    .content
      display grid
      grid-template-columns 3fr 4fr
  .overview-block-2
    text-align center
    padding 10px
  .block
    &.block-top
      padding-bottom 25px
      border-bottom: 1px solid #4f555d;
    &.block-bottom
      padding-top 25px
      display grid
      grid-template-columns 1fr 1fr
  .jumbotron-profile
    background-color #36404a
    ul
      li
        h3
          margin-bottom 0
          font-size 20px
          color #a4aaaf
          font-weight: bold;
        p
          font-size 15px
  .user-header-block
    width 100%
    .item
      text-align center
    .heart
      color red
      cursor pointer
      margin-left 10px
  .super-input
    .cont
      width 300px
  .button-style
    background-color rgb(51, 90, 161)
    border-color rgb(51, 90, 161)
  .failAlert
    color red
  .formInputColor
    margin-bottom 0
    font-size 20px
    color #a4aaaf
    font-weight bold
  .inputTextColor
    background-color #36404a
    border-color #ffffff
    color #ffffff
  .colorButton
    background-color rgb(51, 90, 161)
    border-color rgb(51, 90, 161)
  .changeImg
    margin-top 5%
    margin-bottom 10%
    background-color rgb(51, 90, 161)
    border  rgb(51, 90, 161)  
  .imagenInput
    margin-top 5%
</style>
