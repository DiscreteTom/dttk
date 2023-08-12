<template>
  <div>
    <v-text-field
      label="IPv4 Address or CIDR"
      v-model="v4"
      variant="outlined"
      density="compact"
      hint="E.g. '127.0.0.1', '192.168.0.0/32'"
      clearable
      class="mb-3"
      @input="calculate"
    />

    <div class="d-flex flex-wrap">
      <v-card
        v-for="(value, name) in v4result"
        :key="name"
        class="mx-2 my-2 flex-grow-1"
      >
        <v-card-title class="d-flex align-center">
          {{ name }}
          <span v-if="name == 'Host Range'" class="ml-2">
            (#{{ hostNumber }})
          </span>
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
        <v-card-text>
          {{ value || "Loading" }}
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
useDttkMeta({
  title: "IP Address Calculator",
  description: "Calculate IP address ranges, subnet masks, and more.",
  path: "/ip",
});

const emitter = useEmitter();

const v4 = ref("127.0.0.1");
const v4result = reactive({
  "IPv4 Address": "",
  Netmask: "",
  "Network Address": "",
  "Broadcast Address": "",
  "Host Range": "",
  "IP Class": "",
  "IP Type": "",
  "Subnet Mask": "",
});
const hostNumber = ref("");

type V4Addr = [number, number, number, number] | undefined;
type Mask = number | undefined;

function calculate() {
  let [rawAddrStr, rawMaskStr] = v4.value.split("/");
  if (rawAddrStr === "" || rawAddrStr === undefined) rawAddrStr = "0.0.0.0";
  if (rawMaskStr === "" || rawMaskStr === undefined) rawMaskStr = "32";

  // check if addr is valid
  let addr: V4Addr = undefined;
  const addrPartsStr = rawAddrStr.split(".");
  while (addrPartsStr.length < 4) addrPartsStr.push("0"); // pad with 0
  if (addrPartsStr.length == 4) {
    const addrNumbers = addrPartsStr.map((x) => Number(x || 0));
    if (!addrNumbers.some((x) => x < 0 || x > 255 || isNaN(x)))
      addr = addrNumbers as V4Addr;
  }
  v4result["IPv4 Address"] =
    addr == undefined ? "Invalid Address" : addr.join(".");

  // check if mask is valid
  let mask: Mask = undefined;
  const maskNumber = Number(rawMaskStr) as number;
  if (maskNumber >= 0 && maskNumber <= 32) mask = maskNumber;
  v4result.Netmask = mask == undefined ? "Invalid Mask" : mask.toString();

  // calculate network address and broadcast address
  // and update host range and number of hosts
  const netAddrStr = updateNetworkAddress(addr, mask);
  const broadcastAddrStr = updateBroadcastAddress(addr, mask);
  const hostRange = `${netAddrStr} - ${broadcastAddrStr}`;
  v4result["Host Range"] = hostRange;
  hostNumber.value =
    mask == undefined ? "Invalid" : (2 ** (32 - mask)).toString();

  // calculate others
  updateIpClass(addr);
  updateIpType(addr);
  updateSubnetMask(addr, mask);
}

function updateNetworkAddress(addr: V4Addr, mask: Mask) {
  if (addr === undefined || mask === undefined) {
    v4result["Network Address"] = "Invalid";
    return;
  }
  const binAddrStr = addr.map((x) => x.toString(2).padStart(8, "0")).join("");
  const binNetAddrStr = binAddrStr.slice(0, mask) + "0".repeat(32 - mask);
  const netAddr = binNetAddrStr.match(/.{8}/g)?.map((x) => parseInt(x, 2));
  const netAddrStr = netAddr?.join(".") || "Invalid";
  v4result["Network Address"] = netAddrStr;
  return netAddrStr;
}

function updateBroadcastAddress(addr: V4Addr, mask: Mask) {
  if (addr === undefined || mask === undefined) {
    v4result["Broadcast Address"] = "Invalid";
    return;
  }
  const binAddrStr = addr.map((x) => x.toString(2).padStart(8, "0")).join("");
  const binBroadcastAddrStr = binAddrStr.slice(0, mask) + "1".repeat(32 - mask);
  const broadcastAddr = binBroadcastAddrStr
    .match(/.{8}/g)
    ?.map((x) => parseInt(x, 2));
  const broadcastAddrStr = broadcastAddr?.join(".") || "Invalid";
  v4result["Broadcast Address"] = broadcastAddrStr;
  return broadcastAddrStr;
}

function updateIpClass(addr: V4Addr) {
  if (addr === undefined) {
    v4result["IP Class"] = "Invalid";
    return;
  } else if (addr[0] >= 0 && addr[0] <= 127) v4result["IP Class"] = "A";
  else if (addr[0] >= 128 && addr[0] <= 191) v4result["IP Class"] = "B";
  else if (addr[0] >= 192 && addr[0] <= 223) v4result["IP Class"] = "C";
  else if (addr[0] >= 224 && addr[0] <= 239) v4result["IP Class"] = "D";
  else if (addr[0] >= 240 && addr[0] <= 255) v4result["IP Class"] = "E";
  else v4result["IP Class"] = "Others";
}

function updateIpType(addr: V4Addr) {
  if (addr === undefined) {
    v4result["IP Type"] = "Invalid";
    return;
  } else if (addr[0] === 10) v4result["IP Type"] = "Private";
  else if (addr[0] === 172 && addr[1] >= 16 && addr[1] <= 31)
    v4result["IP Type"] = "Private";
  else if (addr[0] === 192 && addr[1] === 168) v4result["IP Type"] = "Private";
  else if (addr[0] === 169 && addr[1] === 254) v4result["IP Type"] = "Private";
  else if (addr[0] === 127) v4result["IP Type"] = "Loopback";
  else if (addr[0] >= 224 && addr[0] <= 239) v4result["IP Type"] = "Multicast";
  else if (addr[0] === 255 && addr[1] === 255)
    v4result["IP Type"] = "Broadcast";
  else v4result["IP Type"] = "Public";
}

function updateSubnetMask(addr: V4Addr, mask: Mask) {
  if (addr === undefined || mask === undefined) {
    v4result["Subnet Mask"] = "Invalid";
    return;
  }
  const binMaskStr = "1".repeat(mask) + "0".repeat(32 - mask);
  const subnetMask = binMaskStr.match(/.{8}/g)?.map((x) => parseInt(x, 2));
  const subnetMaskStr = subnetMask?.join(".") || "Invalid";
  v4result["Subnet Mask"] = subnetMaskStr;
}

onMounted(calculate);
</script>
