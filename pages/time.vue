<template>
  <div>
    <!-- form -->
    <div class="mx-2">
      <!-- toggle live -->
      <v-btn-toggle mandatory v-model="live" class="mb-3" style="width: 100%">
        <v-btn
          :value="true"
          :disabled="live"
          style="flex-grow: 1"
          prepend-icon="mdi-timer-sync-outline"
        >
          Live
        </v-btn>
        <v-btn
          :value="false"
          :disabled="!live"
          style="flex-grow: 1"
          prepend-icon="mdi-timer-edit-outline"
        >
          Manual
        </v-btn>
      </v-btn-toggle>

      <!-- live -->
      <div v-if="live" class="d-flex mb-3 align-center">
        <v-text-field
          type="number"
          label="Refresh Interval (ms)"
          v-model="intervalMs"
          variant="outlined"
          density="compact"
          hide-details
          @input="resetTimer"
        />
      </div>

      <!-- manual -->
      <div v-else class="d-flex mb-3">
        <v-row no-gutters>
          <v-col :cols="display.smAndUp.value ? 4 : 12">
            <v-select
              label="From"
              :items="Object.keys(result)"
              variant="outlined"
              density="compact"
              hide-details
              v-model="fromFormat"
              :class="display.smAndUp.value ? 'mr-3' : 'mb-3'"
            />
          </v-col>
          <v-col :cols="display.smAndUp.value ? 8 : 12" class="d-flex">
            <v-text-field
              label="Value"
              v-model="fromValue"
              variant="outlined"
              density="compact"
              hide-details
              :class="display.smAndUp.value ? 'mr-3' : 'mb-3 mr-3'"
              @keydown.enter="calculate"
              @input="calculate"
            />
          </v-col>
        </v-row>
      </div>
    </div>

    <!-- cards -->
    <div class="d-flex flex-wrap">
      <v-card
        v-for="(value, name) in result"
        :key="name"
        class="mx-2 mb-2 flex-grow-1"
      >
        <v-card-title class="d-flex align-center">
          {{ name }}
          <v-tooltip text="Copy" location="top">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                variant="plain"
                icon="mdi-content-copy"
                v-clipboard:copy="value"
                v-clipboard:success="() => emitter.emit('toast', 'Copied')"
              >
              </v-btn>
            </template>
          </v-tooltip>
        </v-card-title>
        <client-only>
          <v-card-text>
            {{ value }}
          </v-card-text>
        </client-only>
      </v-card>

      <v-card
        v-for="(item, i) in custom"
        :key="i"
        class="mx-2 my-2 flex-grow-1"
      >
        <v-card-title class="d-flex align-center">
          <v-combobox
            v-model="item.tz"
            :items="timezones"
            label="Timezone"
            variant="outlined"
            density="compact"
            hide-details
            class="mr-3"
          />
          <v-tooltip text="Copy" location="top">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                variant="plain"
                icon="mdi-content-copy"
                v-clipboard:copy="item.txt"
                v-clipboard:success="() => emitter.emit('toast', 'Copied')"
              >
              </v-btn>
            </template>
          </v-tooltip>
          <v-tooltip text="Remove" location="top">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                variant="plain"
                icon="mdi-close"
                @click="custom.splice(i, 1)"
              >
              </v-btn>
            </template>
          </v-tooltip>
        </v-card-title>
        <v-card-text>
          {{ item.txt }}
        </v-card-text>
      </v-card>
      <v-card
        class="mx-2 my-2 flex-grow-1 d-flex align-center justify-center"
        style="min-height: 100px"
        @click="
          custom.push({ tz: timezones[0], txt: '' });
          update();
        "
      >
        <v-icon> mdi-plus </v-icon>
        <v-card-subtitle> Custom Timezone </v-card-subtitle>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify";

useDttkMeta({
  title: "Time Calculator",
  description:
    "Free online time calculator. Quickly convert between UTC, timestamps, ISO, and more.",
  path: "/time",
});

const display = useDisplay();
const emitter = useEmitter();

const live = ref(true);
const intervalMs = ref(1000);
const timerHandle = ref<number | null>(null);
const result = reactive({
  UTC: "",
  "Timestamp (ms)": "",
  ISO: "",
  Locale: "",
  Literal: "",
});
const fromFormat = ref<keyof typeof result>("Timestamp (ms)");
const fromValue = ref("");
const timezones = ref([
  // https://stackoverflow.com/questions/38399465/how-to-get-list-of-all-timezones-in-javascript
  "Europe/Andorra",
  "Asia/Dubai",
  "Asia/Kabul",
  "Europe/Tirane",
  "Asia/Yerevan",
  "Antarctica/Casey",
  "Antarctica/Davis",
  "Antarctica/DumontDUrville", // https://bugs.chromium.org/p/chromium/issues/detail?id=928068
  "Antarctica/Mawson",
  "Antarctica/Palmer",
  "Antarctica/Rothera",
  "Antarctica/Syowa",
  "Antarctica/Troll",
  "Antarctica/Vostok",
  "America/Argentina/Buenos_Aires",
  "America/Argentina/Cordoba",
  "America/Argentina/Salta",
  "America/Argentina/Jujuy",
  "America/Argentina/Tucuman",
  "America/Argentina/Catamarca",
  "America/Argentina/La_Rioja",
  "America/Argentina/San_Juan",
  "America/Argentina/Mendoza",
  "America/Argentina/San_Luis",
  "America/Argentina/Rio_Gallegos",
  "America/Argentina/Ushuaia",
  "Pacific/Pago_Pago",
  "Europe/Vienna",
  "Australia/Lord_Howe",
  "Antarctica/Macquarie",
  "Australia/Hobart",
  "Australia/Currie",
  "Australia/Melbourne",
  "Australia/Sydney",
  "Australia/Broken_Hill",
  "Australia/Brisbane",
  "Australia/Lindeman",
  "Australia/Adelaide",
  "Australia/Darwin",
  "Australia/Perth",
  "Australia/Eucla",
  "Asia/Baku",
  "America/Barbados",
  "Asia/Dhaka",
  "Europe/Brussels",
  "Europe/Sofia",
  "Atlantic/Bermuda",
  "Asia/Brunei",
  "America/La_Paz",
  "America/Noronha",
  "America/Belem",
  "America/Fortaleza",
  "America/Recife",
  "America/Araguaina",
  "America/Maceio",
  "America/Bahia",
  "America/Sao_Paulo",
  "America/Campo_Grande",
  "America/Cuiaba",
  "America/Santarem",
  "America/Porto_Velho",
  "America/Boa_Vista",
  "America/Manaus",
  "America/Eirunepe",
  "America/Rio_Branco",
  "America/Nassau",
  "Asia/Thimphu",
  "Europe/Minsk",
  "America/Belize",
  "America/St_Johns",
  "America/Halifax",
  "America/Glace_Bay",
  "America/Moncton",
  "America/Goose_Bay",
  "America/Blanc-Sablon",
  "America/Toronto",
  "America/Nipigon",
  "America/Thunder_Bay",
  "America/Iqaluit",
  "America/Pangnirtung",
  "America/Atikokan",
  "America/Winnipeg",
  "America/Rainy_River",
  "America/Resolute",
  "America/Rankin_Inlet",
  "America/Regina",
  "America/Swift_Current",
  "America/Edmonton",
  "America/Cambridge_Bay",
  "America/Yellowknife",
  "America/Inuvik",
  "America/Creston",
  "America/Dawson_Creek",
  "America/Fort_Nelson",
  "America/Vancouver",
  "America/Whitehorse",
  "America/Dawson",
  "Indian/Cocos",
  "Europe/Zurich",
  "Africa/Abidjan",
  "Pacific/Rarotonga",
  "America/Santiago",
  "America/Punta_Arenas",
  "Pacific/Easter",
  "Asia/Shanghai",
  "Asia/Urumqi",
  "America/Bogota",
  "America/Costa_Rica",
  "America/Havana",
  "Atlantic/Cape_Verde",
  "America/Curacao",
  "Indian/Christmas",
  "Asia/Nicosia",
  "Asia/Famagusta",
  "Europe/Prague",
  "Europe/Berlin",
  "Europe/Copenhagen",
  "America/Santo_Domingo",
  "Africa/Algiers",
  "America/Guayaquil",
  "Pacific/Galapagos",
  "Europe/Tallinn",
  "Africa/Cairo",
  "Africa/El_Aaiun",
  "Europe/Madrid",
  "Africa/Ceuta",
  "Atlantic/Canary",
  "Europe/Helsinki",
  "Pacific/Fiji",
  "Atlantic/Stanley",
  "Pacific/Chuuk",
  "Pacific/Pohnpei",
  "Pacific/Kosrae",
  "Atlantic/Faroe",
  "Europe/Paris",
  "Europe/London",
  "Asia/Tbilisi",
  "America/Cayenne",
  "Africa/Accra",
  "Europe/Gibraltar",
  "America/Godthab",
  "America/Danmarkshavn",
  "America/Scoresbysund",
  "America/Thule",
  "Europe/Athens",
  "Atlantic/South_Georgia",
  "America/Guatemala",
  "Pacific/Guam",
  "Africa/Bissau",
  "America/Guyana",
  "Asia/Hong_Kong",
  "America/Tegucigalpa",
  "America/Port-au-Prince",
  "Europe/Budapest",
  "Asia/Jakarta",
  "Asia/Pontianak",
  "Asia/Makassar",
  "Asia/Jayapura",
  "Europe/Dublin",
  "Asia/Jerusalem",
  "Asia/Kolkata",
  "Indian/Chagos",
  "Asia/Baghdad",
  "Asia/Tehran",
  "Atlantic/Reykjavik",
  "Europe/Rome",
  "America/Jamaica",
  "Asia/Amman",
  "Asia/Tokyo",
  "Africa/Nairobi",
  "Asia/Bishkek",
  "Pacific/Tarawa",
  "Pacific/Enderbury",
  "Pacific/Kiritimati",
  "Asia/Pyongyang",
  "Asia/Seoul",
  "Asia/Almaty",
  "Asia/Qyzylorda",
  "Asia/Qostanay", // https://bugs.chromium.org/p/chromium/issues/detail?id=928068
  "Asia/Aqtobe",
  "Asia/Aqtau",
  "Asia/Atyrau",
  "Asia/Oral",
  "Asia/Beirut",
  "Asia/Colombo",
  "Africa/Monrovia",
  "Europe/Vilnius",
  "Europe/Luxembourg",
  "Europe/Riga",
  "Africa/Tripoli",
  "Africa/Casablanca",
  "Europe/Monaco",
  "Europe/Chisinau",
  "Pacific/Majuro",
  "Pacific/Kwajalein",
  "Asia/Yangon",
  "Asia/Ulaanbaatar",
  "Asia/Hovd",
  "Asia/Choibalsan",
  "Asia/Macau",
  "America/Martinique",
  "Europe/Malta",
  "Indian/Mauritius",
  "Indian/Maldives",
  "America/Mexico_City",
  "America/Cancun",
  "America/Merida",
  "America/Monterrey",
  "America/Matamoros",
  "America/Mazatlan",
  "America/Chihuahua",
  "America/Ojinaga",
  "America/Hermosillo",
  "America/Tijuana",
  "America/Bahia_Banderas",
  "Asia/Kuala_Lumpur",
  "Asia/Kuching",
  "Africa/Maputo",
  "Africa/Windhoek",
  "Pacific/Noumea",
  "Pacific/Norfolk",
  "Africa/Lagos",
  "America/Managua",
  "Europe/Amsterdam",
  "Europe/Oslo",
  "Asia/Kathmandu",
  "Pacific/Nauru",
  "Pacific/Niue",
  "Pacific/Auckland",
  "Pacific/Chatham",
  "America/Panama",
  "America/Lima",
  "Pacific/Tahiti",
  "Pacific/Marquesas",
  "Pacific/Gambier",
  "Pacific/Port_Moresby",
  "Pacific/Bougainville",
  "Asia/Manila",
  "Asia/Karachi",
  "Europe/Warsaw",
  "America/Miquelon",
  "Pacific/Pitcairn",
  "America/Puerto_Rico",
  "Asia/Gaza",
  "Asia/Hebron",
  "Europe/Lisbon",
  "Atlantic/Madeira",
  "Atlantic/Azores",
  "Pacific/Palau",
  "America/Asuncion",
  "Asia/Qatar",
  "Indian/Reunion",
  "Europe/Bucharest",
  "Europe/Belgrade",
  "Europe/Kaliningrad",
  "Europe/Moscow",
  "Europe/Simferopol",
  "Europe/Kirov",
  "Europe/Astrakhan",
  "Europe/Volgograd",
  "Europe/Saratov",
  "Europe/Ulyanovsk",
  "Europe/Samara",
  "Asia/Yekaterinburg",
  "Asia/Omsk",
  "Asia/Novosibirsk",
  "Asia/Barnaul",
  "Asia/Tomsk",
  "Asia/Novokuznetsk",
  "Asia/Krasnoyarsk",
  "Asia/Irkutsk",
  "Asia/Chita",
  "Asia/Yakutsk",
  "Asia/Khandyga",
  "Asia/Vladivostok",
  "Asia/Ust-Nera",
  "Asia/Magadan",
  "Asia/Sakhalin",
  "Asia/Srednekolymsk",
  "Asia/Kamchatka",
  "Asia/Anadyr",
  "Asia/Riyadh",
  "Pacific/Guadalcanal",
  "Indian/Mahe",
  "Africa/Khartoum",
  "Europe/Stockholm",
  "Asia/Singapore",
  "America/Paramaribo",
  "Africa/Juba",
  "Africa/Sao_Tome",
  "America/El_Salvador",
  "Asia/Damascus",
  "America/Grand_Turk",
  "Africa/Ndjamena",
  "Indian/Kerguelen",
  "Asia/Bangkok",
  "Asia/Dushanbe",
  "Pacific/Fakaofo",
  "Asia/Dili",
  "Asia/Ashgabat",
  "Africa/Tunis",
  "Pacific/Tongatapu",
  "Europe/Istanbul",
  "America/Port_of_Spain",
  "Pacific/Funafuti",
  "Asia/Taipei",
  "Europe/Kiev",
  "Europe/Uzhgorod",
  "Europe/Zaporozhye",
  "Pacific/Wake",
  "America/New_York",
  "America/Detroit",
  "America/Kentucky/Louisville",
  "America/Kentucky/Monticello",
  "America/Indiana/Indianapolis",
  "America/Indiana/Vincennes",
  "America/Indiana/Winamac",
  "America/Indiana/Marengo",
  "America/Indiana/Petersburg",
  "America/Indiana/Vevay",
  "America/Chicago",
  "America/Indiana/Tell_City",
  "America/Indiana/Knox",
  "America/Menominee",
  "America/North_Dakota/Center",
  "America/North_Dakota/New_Salem",
  "America/North_Dakota/Beulah",
  "America/Denver",
  "America/Boise",
  "America/Phoenix",
  "America/Los_Angeles",
  "America/Anchorage",
  "America/Juneau",
  "America/Sitka",
  "America/Metlakatla",
  "America/Yakutat",
  "America/Nome",
  "America/Adak",
  "Pacific/Honolulu",
  "America/Montevideo",
  "Asia/Samarkand",
  "Asia/Tashkent",
  "America/Caracas",
  "Asia/Ho_Chi_Minh",
  "Pacific/Efate",
  "Pacific/Wallis",
  "Pacific/Apia",
  "Africa/Johannesburg",
]);
const custom = reactive([] as { tz: string; txt: string }[]);

/**
 * Calculate results by using the provided date.
 */
function update(date = new Date()) {
  result.UTC = date.toUTCString();
  result.ISO = date.toISOString();
  result.Locale = date.toLocaleString();
  result.Literal = date.toString();
  result["Timestamp (ms)"] = date.getTime().toString();
  custom.map((e) => {
    if (timezones.value.includes(e.tz))
      e.txt = date.toLocaleString(navigator.language, { timeZone: e.tz });
  });
}

function applyTimer() {
  clearTimer();
  timerHandle.value = window.setInterval(() => update(), intervalMs.value);
  update();
}
function clearTimer() {
  if (timerHandle.value !== null) {
    clearInterval(timerHandle.value);
    timerHandle.value = null;
  }
}
function resetTimer() {
  clearTimer();
  applyTimer();
}

/**
 * Calculate results by using user's input.
 */
function calculate() {
  let date;
  switch (fromFormat.value) {
    case "Timestamp (ms)":
      date = new Date(parseInt(fromValue.value));
      break;
    default:
      date = new Date(fromValue.value);
      break;
  }
  update(date);
}

function updateFromValue() {
  fromValue.value = result[fromFormat.value];
}

onMounted(() => applyTimer());
onUnmounted(() => clearTimer());

watch(live, (val) => {
  if (val) {
    resetTimer();
  } else {
    clearTimer();
    updateFromValue();
  }
});

watch(fromFormat, () => {
  updateFromValue();
});
</script>
