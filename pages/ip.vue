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
      <v-card class="mx-2 my-2 flex-grow-1">
        <v-card-title class="d-flex align-center">
          <v-text-field
            label="Overlap Check"
            v-model="anotherV4"
            variant="outlined"
            density="compact"
            placeholder="Another IPv4 Address or CIDR"
            clearable
            hide-details
            style="min-width: 260px"
            @input="calculate"
          />
          <v-tooltip text="Swap" location="top">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                variant="plain"
                icon="mdi-swap-horizontal"
                @click="swap"
              >
              </v-btn>
            </template>
          </v-tooltip>
        </v-card-title>
        <v-card-text>
          {{ overlap }}
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
const anotherV4 = ref("");
const overlap = ref("N/A");

type V4Addr = [number, number, number, number] | undefined;
type Mask = number | undefined;

function parseAddr(s: string) {
  // check if addr is valid
  let addr: V4Addr = undefined;
  const addrPartsStr = s.split(".");
  while (addrPartsStr.length < 4) addrPartsStr.push("0"); // pad with 0
  if (addrPartsStr.length == 4) {
    const addrNumbers = addrPartsStr.map((x) => Number(x || 0));
    if (!addrNumbers.some((x) => x < 0 || x > 255 || isNaN(x)))
      addr = addrNumbers as V4Addr;
  }
  return addr;
}

function parseMask(s: string) {
  let mask: Mask = undefined;
  const maskNumber = Number(s) as number;
  if (maskNumber >= 0 && maskNumber <= 32) mask = maskNumber;
  return mask;
}

function calculate() {
  let [rawAddrStr, rawMaskStr] = v4.value.split("/");
  if (rawAddrStr === "" || rawAddrStr === undefined) rawAddrStr = "0.0.0.0";
  if (rawMaskStr === "" || rawMaskStr === undefined) rawMaskStr = "32";

  // check if addr is valid
  const addr = parseAddr(rawAddrStr);
  v4result["IPv4 Address"] =
    addr == undefined ? "Invalid Address" : addr.join(".");

  // check if mask is valid
  const mask = parseMask(rawMaskStr);
  v4result.Netmask = mask == undefined ? "Invalid Mask" : mask.toString();

  // calculate network address and broadcast address
  // and update host range and number of hosts
  v4result["Network Address"] = getNetworkAddress(addr, mask);
  v4result["Broadcast Address"] = getBroadcastAddress(addr, mask);
  const hostRange = `${v4result["Network Address"]} - ${v4result["Broadcast Address"]}`;
  v4result["Host Range"] = hostRange;
  hostNumber.value =
    mask == undefined ? "Invalid" : (2 ** (32 - mask)).toString();

  // calculate others
  v4result["IP Class"] = getIpClass(addr);
  v4result["IP Type"] = getIpType(addr);
  v4result["Subnet Mask"] = getSubnetMask(addr, mask);
  overlap.value = getOverlap(addr, mask);
}

function getNetworkAddress(addr: V4Addr, mask: Mask) {
  if (addr === undefined || mask === undefined) return "Invalid";

  const binAddrStr = addr.map((x) => x.toString(2).padStart(8, "0")).join("");
  const binNetAddrStr = binAddrStr.slice(0, mask) + "0".repeat(32 - mask);
  const netAddr = binNetAddrStr.match(/.{8}/g)?.map((x) => parseInt(x, 2));
  const netAddrStr = netAddr?.join(".") || "Invalid";
  return netAddrStr;
}

function getBroadcastAddress(addr: V4Addr, mask: Mask) {
  if (addr === undefined || mask === undefined) return "Invalid";

  const binAddrStr = addr.map((x) => x.toString(2).padStart(8, "0")).join("");
  const binBroadcastAddrStr = binAddrStr.slice(0, mask) + "1".repeat(32 - mask);
  const broadcastAddr = binBroadcastAddrStr
    .match(/.{8}/g)
    ?.map((x) => parseInt(x, 2));
  const broadcastAddrStr = broadcastAddr?.join(".") || "Invalid";
  return broadcastAddrStr;
}

function getIpClass(addr: V4Addr) {
  if (addr === undefined) return "Invalid";
  if (addr[0] >= 0 && addr[0] <= 127) return "A";
  if (addr[0] >= 128 && addr[0] <= 191) return "B";
  if (addr[0] >= 192 && addr[0] <= 223) return "C";
  if (addr[0] >= 224 && addr[0] <= 239) return "D";
  if (addr[0] >= 240 && addr[0] <= 255) return "E";
  return "Others";
}

function getIpType(addr: V4Addr) {
  if (addr === undefined) return "Invalid";
  if (addr[0] === 10) return "Private";
  if (addr[0] === 172 && addr[1] >= 16 && addr[1] <= 31) return "Private";
  if (addr[0] === 192 && addr[1] === 168) return "Private";
  if (addr[0] === 169 && addr[1] === 254) return "Private";
  if (addr[0] === 127) return "Loopback";
  if (addr[0] >= 224 && addr[0] <= 239) return "Multicast";
  if (addr[0] === 255 && addr[1] === 255) return "Broadcast";
  return "Public";
}

function getSubnetMask(addr: V4Addr, mask: Mask) {
  if (addr === undefined || mask === undefined) return "Invalid";

  const binMaskStr = "1".repeat(mask) + "0".repeat(32 - mask);
  const subnetMask = binMaskStr.match(/.{8}/g)?.map((x) => parseInt(x, 2));
  const subnetMaskStr = subnetMask?.join(".") || "Invalid";
  return subnetMaskStr;
}

function getOverlap(addr: V4Addr, mask: Mask) {
  if (addr === undefined || mask === undefined) return "Invalid";
  const netAddr = addrToNum(getNetworkAddress(addr, mask));
  const broadcastAddr = addrToNum(getBroadcastAddress(addr, mask));

  if (anotherV4.value === "") return "N/A";
  let [rawAddrStr, rawMaskStr] = anotherV4.value.split("/");
  if (rawMaskStr === "" || rawMaskStr === undefined) rawMaskStr = "32";
  const anotherAddr = parseAddr(rawAddrStr);
  const anotherMask = parseMask(rawMaskStr);
  if (anotherAddr === undefined || anotherMask === undefined) return "Invalid";
  const anotherNetAddr = addrToNum(getNetworkAddress(anotherAddr, anotherMask));
  const anotherBroadcastAddr = addrToNum(
    getBroadcastAddress(anotherAddr, anotherMask)
  );

  if (
    netAddr === undefined ||
    broadcastAddr === undefined ||
    anotherNetAddr === undefined ||
    anotherBroadcastAddr === undefined
  )
    return "Invalid";

  // check containment
  if (netAddr <= anotherNetAddr && broadcastAddr >= anotherBroadcastAddr)
    return `${addr.join(".")}/${mask} contains ${anotherAddr.join(
      "."
    )}/${anotherMask}`;
  if (netAddr >= anotherNetAddr && netAddr <= anotherBroadcastAddr)
    return `${anotherAddr.join(".")}/${anotherMask} contains ${addr.join(
      "."
    )}/${mask}`;

  // check overlap
  if (
    (netAddr >= anotherNetAddr && netAddr <= anotherBroadcastAddr) ||
    (broadcastAddr >= anotherNetAddr && broadcastAddr <= anotherBroadcastAddr)
  )
    return "Overlap";
  return "No overlap";
}

function addrToNum(s: string) {
  const addr = parseAddr(s);
  if (addr === undefined) return undefined;
  return addr.reduce((acc, cur, idx) => acc + cur * 256 ** (3 - idx), 0);
}

function swap() {
  const temp = v4.value;
  v4.value = anotherV4.value;
  anotherV4.value = temp;
  calculate();
}

onMounted(calculate);
</script>
