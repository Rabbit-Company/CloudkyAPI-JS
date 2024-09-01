// src/errors.ts
var Errors;
((Errors) => {
  Errors.list = {
    0: { message: "Success", httpCode: 200 },
    404: { message: "Invalid API endpoint", httpCode: 404 },
    1000: { message: "Bearer Token is missing in Authorization header.", httpCode: 401 },
    1001: { message: "Not all required data provided in json format.", httpCode: 400 },
    1002: { message: "Registration is disabled on this server.", httpCode: 403 },
    1003: { message: "The username must be 4 to 30 characters long and contain only lowercase letters, numbers, and hyphens.", httpCode: 400 },
    1004: { message: "Password must be hashed using Blake2b algorithm.", httpCode: 400 },
    1005: { message: "Provided file name can not contain special characters.", httpCode: 400 },
    1006: { message: "Provided file is invalid.", httpCode: 400 },
    1007: { message: "Username is already registered.", httpCode: 409 },
    1008: { message: "Provided API Secret Key in Bearer Token is invalid.", httpCode: 401 },
    1009: { message: "Provided email is invalid.", httpCode: 400 },
    1010: { message: "Max file size is 50GB.", httpCode: 413 },
    1011: { message: "Username and Password are missing in Authorization header.", httpCode: 401 },
    1012: { message: "Provided username is invalid.", httpCode: 400 },
    1013: { message: "Provided password is invalid.", httpCode: 400 },
    1014: { message: "Password is incorrect.", httpCode: 401 },
    1015: { message: "Redis connection error.", httpCode: 500 },
    1016: { message: "Provided token is invalid.", httpCode: 401 },
    1017: { message: "Provided token is incorrect or it has expired.", httpCode: 401 },
    1018: { message: "Username and Token are missing in Authorization header.", httpCode: 401 },
    1019: { message: "Provided account type in invalid.", httpCode: 400 },
    1020: { message: "Provided uploadID needs to be UUIDv4", httpCode: 400 },
    1021: { message: "Provided expiration timestamp is invalid.", httpCode: 400 },
    1022: { message: "Share Link can not be created on non-existing file or folder.", httpCode: 400 },
    1023: { message: "Provided share link is invalid.", httpCode: 400 },
    1024: { message: "Provided OTP is invalid.", httpCode: 400 },
    1025: { message: "Your password is too weak!", httpCode: 400 },
    2000: { message: "Something went wrong while trying to perform this action. Please try again later.", httpCode: 500 },
    5000: { message: "Server is unreachable!", httpCode: 503 },
    9999: { message: "Your do not have permission to perform this action.", httpCode: 403 }
  };
  function get(id) {
    return Errors.list[id];
  }
  Errors.get = get;
  function getJson(id) {
    return { error: id, info: Errors.list[id].message };
  }
  Errors.getJson = getJson;
})(Errors ||= {});
var errors_default = Errors;

// src/validate.ts
var Validate;
((Validate) => {
  function username(username2) {
    if (["null", "com1", "lpt1", "admin"].includes(username2))
      return false;
    if (username2.includes("--"))
      return false;
    return /^([a-z][a-z0-9\-]{3,29})$/.test(username2);
  }
  Validate.username = username;
  function password(password2) {
    return /^[a-z0-9]{128}$/i.test(password2);
  }
  Validate.password = password;
  function url(url2) {
    try {
      new URL(url2);
      return true;
    } catch {
      return false;
    }
  }
  Validate.url = url;
  function email(email2) {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i.test(email2);
  }
  Validate.email = email;
  function accountType(type) {
    return [0, 1].includes(type);
  }
  Validate.accountType = accountType;
  function otp(otp2) {
    if (otp2 == null)
      return false;
    return otp2.length == 0 || otp2.length == 6 || otp2.length == 44;
  }
  Validate.otp = otp;
  function token(token2) {
    return /^[a-z0-9]{128}$/i.test(token2);
  }
  Validate.token = token;
  function positiveInteger(number) {
    if (typeof number == "undefined" || number == null)
      return false;
    return number >>> 0 === parseFloat(number);
  }
  Validate.positiveInteger = positiveInteger;
  function yubiKey(id) {
    return id.length == 44;
  }
  Validate.yubiKey = yubiKey;
  function license(license2) {
    return license2.length == 29;
  }
  Validate.license = license;
  function json(json2) {
    try {
      JSON.parse(json2);
      return true;
    } catch {
    }
    return false;
  }
  Validate.json = json;
  function response(response2) {
    return typeof response2.error === "number" && typeof response2.info === "string";
  }
  Validate.response = response;
  function userFilePathName(filePathName) {
    if (filePathName.includes(".."))
      return false;
    return /^[a-zA-Z0-9\/_. -]+$/.test(filePathName);
  }
  Validate.userFilePathName = userFilePathName;
  function userFilePathNames(filePathNames) {
    for (let i = 0;i < filePathNames.length; i++) {
      if (filePathNames[i].includes(".."))
        return false;
      if (!/^[a-zA-Z0-9\/_. -]+$/.test(filePathNames[i]))
        return false;
    }
    return true;
  }
  Validate.userFilePathNames = userFilePathNames;
  function expiration(expiration2) {
    return Number(expiration2) > Date.now();
  }
  Validate.expiration = expiration;
  function sharelink(id) {
    return /^([A-Za-z0-9]{15})$/.test(id);
  }
  Validate.sharelink = sharelink;
})(Validate ||= {});
var validate_default = Validate;

// node_modules/@rabbit-company/blake2b/src/blake2b.js
var Blake2b;
(function(Blake2b2) {
  const v = new Uint32Array(32);
  const m = new Uint32Array(32);
  const BLAKE2B_IV32 = new Uint32Array([
    4089235720,
    1779033703,
    2227873595,
    3144134277,
    4271175723,
    1013904242,
    1595750129,
    2773480762,
    2917565137,
    1359893119,
    725511199,
    2600822924,
    4215389547,
    528734635,
    327033209,
    1541459225
  ]);
  const SIGMA8 = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    14,
    10,
    4,
    8,
    9,
    15,
    13,
    6,
    1,
    12,
    0,
    2,
    11,
    7,
    5,
    3,
    11,
    8,
    12,
    0,
    5,
    2,
    15,
    13,
    10,
    14,
    3,
    6,
    7,
    1,
    9,
    4,
    7,
    9,
    3,
    1,
    13,
    12,
    11,
    14,
    2,
    6,
    5,
    10,
    4,
    0,
    15,
    8,
    9,
    0,
    5,
    7,
    2,
    4,
    10,
    15,
    14,
    1,
    11,
    12,
    6,
    8,
    3,
    13,
    2,
    12,
    6,
    10,
    0,
    11,
    8,
    3,
    4,
    13,
    7,
    5,
    15,
    14,
    1,
    9,
    12,
    5,
    1,
    15,
    14,
    13,
    4,
    10,
    0,
    7,
    6,
    3,
    9,
    2,
    8,
    11,
    13,
    11,
    7,
    14,
    12,
    1,
    3,
    9,
    5,
    0,
    15,
    4,
    8,
    6,
    2,
    10,
    6,
    15,
    14,
    9,
    11,
    3,
    0,
    8,
    12,
    2,
    13,
    7,
    1,
    4,
    10,
    5,
    10,
    2,
    8,
    4,
    7,
    6,
    1,
    5,
    15,
    11,
    9,
    14,
    3,
    12,
    13,
    0,
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    14,
    10,
    4,
    8,
    9,
    15,
    13,
    6,
    1,
    12,
    0,
    2,
    11,
    7,
    5,
    3
  ];
  const parameterBlock = new Uint8Array(64).fill(0);
  const SIGMA82 = new Uint8Array(SIGMA8.map(function(x) {
    return x * 2;
  }));
  function ADD64AA(v2, a, b) {
    const o0 = v2[a] + v2[b];
    let o1 = v2[a + 1] + v2[b + 1];
    if (o0 >= 4294967296)
      o1++;
    v2[a] = o0;
    v2[a + 1] = o1;
  }
  function ADD64AC(v2, a, b0, b1) {
    let o0 = v2[a] + b0;
    if (b0 < 0)
      o0 += 4294967296;
    let o1 = v2[a + 1] + b1;
    if (o0 >= 4294967296)
      o1++;
    v2[a] = o0;
    v2[a + 1] = o1;
  }
  function B2B_GET32(arr, i) {
    return arr[i] ^ arr[i + 1] << 8 ^ arr[i + 2] << 16 ^ arr[i + 3] << 24;
  }
  function B2B_G(a, b, c, d, ix, iy) {
    const x0 = m[ix];
    const x1 = m[ix + 1];
    const y0 = m[iy];
    const y1 = m[iy + 1];
    ADD64AA(v, a, b);
    ADD64AC(v, a, x0, x1);
    let xor0 = v[d] ^ v[a];
    let xor1 = v[d + 1] ^ v[a + 1];
    v[d] = xor1;
    v[d + 1] = xor0;
    ADD64AA(v, c, d);
    xor0 = v[b] ^ v[c];
    xor1 = v[b + 1] ^ v[c + 1];
    v[b] = xor0 >>> 24 ^ xor1 << 8;
    v[b + 1] = xor1 >>> 24 ^ xor0 << 8;
    ADD64AA(v, a, b);
    ADD64AC(v, a, y0, y1);
    xor0 = v[d] ^ v[a];
    xor1 = v[d + 1] ^ v[a + 1];
    v[d] = xor0 >>> 16 ^ xor1 << 16;
    v[d + 1] = xor1 >>> 16 ^ xor0 << 16;
    ADD64AA(v, c, d);
    xor0 = v[b] ^ v[c];
    xor1 = v[b + 1] ^ v[c + 1];
    v[b] = xor1 >>> 31 ^ xor0 << 1;
    v[b + 1] = xor0 >>> 31 ^ xor1 << 1;
  }
  function blake2bCompress(ctx, last) {
    let i = 0;
    for (i = 0;i < 16; i++) {
      v[i] = ctx.h[i];
      v[i + 16] = BLAKE2B_IV32[i];
    }
    v[24] = v[24] ^ ctx.t;
    v[25] = v[25] ^ ctx.t / 4294967296;
    if (last) {
      v[28] = ~v[28];
      v[29] = ~v[29];
    }
    for (i = 0;i < 32; i++) {
      m[i] = B2B_GET32(ctx.b, 4 * i);
    }
    for (i = 0;i < 12; i++) {
      B2B_G(0, 8, 16, 24, SIGMA82[i * 16 + 0], SIGMA82[i * 16 + 1]);
      B2B_G(2, 10, 18, 26, SIGMA82[i * 16 + 2], SIGMA82[i * 16 + 3]);
      B2B_G(4, 12, 20, 28, SIGMA82[i * 16 + 4], SIGMA82[i * 16 + 5]);
      B2B_G(6, 14, 22, 30, SIGMA82[i * 16 + 6], SIGMA82[i * 16 + 7]);
      B2B_G(0, 10, 20, 30, SIGMA82[i * 16 + 8], SIGMA82[i * 16 + 9]);
      B2B_G(2, 12, 22, 24, SIGMA82[i * 16 + 10], SIGMA82[i * 16 + 11]);
      B2B_G(4, 14, 16, 26, SIGMA82[i * 16 + 12], SIGMA82[i * 16 + 13]);
      B2B_G(6, 8, 18, 28, SIGMA82[i * 16 + 14], SIGMA82[i * 16 + 15]);
    }
    for (i = 0;i < 16; i++) {
      ctx.h[i] = ctx.h[i] ^ v[i] ^ v[i + 16];
    }
  }
  function blake2bInit(outlen, key, salt, personal) {
    if (outlen === 0 || outlen > 64) {
      throw new Error("Illegal output length, expected 0 < length <= 64");
    }
    if (key && key.length > 64) {
      throw new Error("Illegal key, expected Uint8Array with 0 < length <= 64");
    }
    if (salt && salt.length !== 16) {
      throw new Error("Illegal salt, expected Uint8Array with length is 16");
    }
    if (personal && personal.length !== 16) {
      throw new Error("Illegal personal, expected Uint8Array with length is 16");
    }
    const ctx = {
      b: new Uint8Array(128),
      h: new Uint32Array(16),
      t: 0,
      c: 0,
      outlen
    };
    parameterBlock.fill(0);
    parameterBlock[0] = outlen;
    if (key)
      parameterBlock[1] = key.length;
    parameterBlock[2] = 1;
    parameterBlock[3] = 1;
    if (salt)
      parameterBlock.set(salt, 32);
    if (personal)
      parameterBlock.set(personal, 48);
    for (let i = 0;i < 16; i++) {
      ctx.h[i] = BLAKE2B_IV32[i] ^ B2B_GET32(parameterBlock, i * 4);
    }
    if (key) {
      blake2bUpdate(ctx, key);
      ctx.c = 128;
    }
    return ctx;
  }
  function blake2bUpdate(ctx, input) {
    for (let i = 0;i < input.length; i++) {
      if (ctx.c === 128) {
        ctx.t += ctx.c;
        blake2bCompress(ctx, false);
        ctx.c = 0;
      }
      ctx.b[ctx.c++] = input[i];
    }
  }
  function blake2bFinal(ctx) {
    ctx.t += ctx.c;
    while (ctx.c < 128) {
      ctx.b[ctx.c++] = 0;
    }
    blake2bCompress(ctx, true);
    const out = new Uint8Array(ctx.outlen);
    for (let i = 0;i < ctx.outlen; i++) {
      out[i] = ctx.h[i >> 2] >> 8 * (i & 3);
    }
    return out;
  }
  function blake2bStart(input, key, outlen, salt, personal) {
    outlen = outlen || 64;
    const ctx = blake2bInit(outlen, key, normalizeInput(salt), normalizeInput(personal));
    blake2bUpdate(ctx, normalizeInput(input));
    return blake2bFinal(ctx);
  }
  function normalizeInput(input) {
    let ret;
    if (input instanceof Uint8Array) {
      ret = input;
    } else if (typeof input === "string") {
      const encoder = new TextEncoder;
      ret = encoder.encode(input);
    } else {
      throw new Error("Input must be an string, Buffer or Uint8Array");
    }
    return ret;
  }
  function toHex(bytes) {
    return Array.prototype.map.call(bytes, function(n) {
      return (n < 16 ? "0" : "") + n.toString(16);
    }).join("");
  }
  function hash(message = "", secret = undefined, length = 64, salt = new Uint8Array(16), personal = new Uint8Array(16)) {
    if (secret?.length === 0)
      secret = undefined;
    if (typeof secret === "string")
      secret = new TextEncoder().encode(secret);
    const output = blake2bStart(message, secret, length, salt, personal);
    return toHex(output);
  }
  Blake2b2.hash = hash;
})(Blake2b || (Blake2b = {}));
var blake2b_default = Blake2b;

// node_modules/@rabbit-company/argon2id/src/argon2id_wasm.js
function getUint8Memory0() {
  if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
    cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachedUint8Memory0;
}
function getStringFromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}
function addHeapObject(obj) {
  if (heap_next === heap.length)
    heap.push(heap.length + 1);
  const idx = heap_next;
  heap_next = heap[idx];
  heap[idx] = obj;
  return idx;
}
function passStringToWasm0(arg, malloc, realloc) {
  if (realloc === undefined) {
    const buf = cachedTextEncoder.encode(arg);
    const ptr2 = malloc(buf.length, 1) >>> 0;
    getUint8Memory0().subarray(ptr2, ptr2 + buf.length).set(buf);
    WASM_VECTOR_LEN = buf.length;
    return ptr2;
  }
  let len = arg.length;
  let ptr = malloc(len, 1) >>> 0;
  const mem = getUint8Memory0();
  let offset = 0;
  for (;offset < len; offset++) {
    const code = arg.charCodeAt(offset);
    if (code > 127)
      break;
    mem[ptr + offset] = code;
  }
  if (offset !== len) {
    if (offset !== 0) {
      arg = arg.slice(offset);
    }
    ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
    const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
    const ret = encodeString(arg, view);
    offset += ret.written;
  }
  WASM_VECTOR_LEN = offset;
  return ptr;
}
function getInt32Memory0() {
  if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
    cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
  }
  return cachedInt32Memory0;
}
function getObject(idx) {
  return heap[idx];
}
function dropObject(idx) {
  if (idx < 132)
    return;
  heap[idx] = heap_next;
  heap_next = idx;
}
function takeObject(idx) {
  const ret = getObject(idx);
  dropObject(idx);
  return ret;
}
function argon2id_hash(message, salt, parallelism, memory, iterations, length) {
  let deferred4_0;
  let deferred4_1;
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
    const ptr0 = passStringToWasm0(message, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passStringToWasm0(salt, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    wasm.argon2id_hash(retptr, ptr0, len0, ptr1, len1, parallelism, memory, iterations, length);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var r2 = getInt32Memory0()[retptr / 4 + 2];
    var r3 = getInt32Memory0()[retptr / 4 + 3];
    var ptr3 = r0;
    var len3 = r1;
    if (r3) {
      ptr3 = 0;
      len3 = 0;
      throw takeObject(r2);
    }
    deferred4_0 = ptr3;
    deferred4_1 = len3;
    return getStringFromWasm0(ptr3, len3);
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
    wasm.__wbindgen_free(deferred4_0, deferred4_1, 1);
  }
}
async function __wbg_load(module, imports) {
  if (typeof Response === "function" && module instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming === "function") {
      try {
        return await WebAssembly.instantiateStreaming(module, imports);
      } catch (e) {
        if (module.headers.get("Content-Type") != "application/wasm") {
          console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
        } else {
          throw e;
        }
      }
    }
    const bytes = await module.arrayBuffer();
    return await WebAssembly.instantiate(bytes, imports);
  } else {
    const instance = await WebAssembly.instantiate(module, imports);
    if (instance instanceof WebAssembly.Instance) {
      return { instance, module };
    } else {
      return instance;
    }
  }
}
function __wbg_get_imports() {
  const imports = {};
  imports.wbg = {};
  imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
    const ret = getStringFromWasm0(arg0, arg1);
    return addHeapObject(ret);
  };
  return imports;
}
function __wbg_init_memory(imports, maybe_memory) {
}
function __wbg_finalize_init(instance, module) {
  wasm = instance.exports;
  __wbg_init.__wbindgen_wasm_module = module;
  cachedInt32Memory0 = null;
  cachedUint8Memory0 = null;
  return wasm;
}
async function __wbg_init(input) {
  if (wasm !== undefined)
    return wasm;
  if (typeof input === "undefined") {
    input = new URL("argon2id_wasm_bg.wasm", import.meta.url);
  }
  const imports = __wbg_get_imports();
  try {
    if (typeof input === "string" || typeof Request === "function" && input instanceof Request || typeof URL === "function" && input instanceof URL) {
      input = fetch(input);
    }
    __wbg_init_memory(imports);
    const { instance, module } = await __wbg_load(await input, imports);
    return __wbg_finalize_init(instance, module);
  } catch {
    const binary = Uint8Array.from(atob(base64Wasm), (c) => c.charCodeAt(0));
    const { instance, module } = await WebAssembly.instantiate(binary.buffer, imports);
    return __wbg_finalize_init(instance, module);
  }
}
var wasm;
var base64Wasm = "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NgIEIAAgA2ogAzYCACADQYACTwRAIAAgAxATDAILIANBeHFB/JfAAGohAQJ/QYSawAAoAgAiBEEBIANBA3Z0IgNxRQRAQYSawAAgAyAEcjYCACABDAELIAEoAggLIQQgASAANgIIIAQgADYCDCAAIAE2AgwgACAENgIIDAELIAIgAyAFaiIAQQNyNgIEIAAgAmoiACAAKAIEQQFyNgIECyACQQhqIQMLIAhBEGokACADC6gZAhN+EH8jACIXIBdBgBBrQUBxIhckACAXQYAIaiABQYAIEEcaQYB4IQEDQCAXQYAIaiABaiIWQYAIaiIYIBgpAwAgASACaiIYQYAIaikDAIU3AwAgFkGICGoiGSAZKQMAIBhBiAhqKQMAhTcDACAWQZAIaiIZIBkpAwAgGEGQCGopAwCFNwMAIBZBmAhqIhYgFikDACAYQZgIaikDAIU3AwAgAUEgaiIBDQALIBcgF0GACGpBgAgQRyIXQYAIaiAXQYAIEEcaQQAhAgNAIBdBgAhqIAJqIgEgAUE4aiIWKQMAIgUgAUEYaiIYKQMAIgd8IAdCAYZC/v///x+DIAVC/////w+DfnwiByABQfgAaiIZKQMAhUIgiSIEIAFB2ABqIhopAwAiCHwgBEL/////D4MgCEIBhkL+////H4N+fCIIIAWFQiiJIgUgB3wgBUL/////D4MgB0IBhkL+////H4N+fCIHIASFQjCJIgQgAUEoaiIbKQMAIgMgAUEIaiIcKQMAIgZ8IAZCAYZC/v///x+DIANC/////w+DfnwiBiABQegAaiIdKQMAhUIgiSILIAFByABqIh4pAwAiDHwgC0L/////D4MgDEIBhkL+////H4N+fCIMIAOFQiiJIgMgBnwgA0L/////D4MgBkIBhkL+////H4N+fCIGIAuFQjCJIgsgDHwgC0L/////D4MgDEIBhkL+////H4N+fCIMIAOFQgGJIgMgAUEgaiIfKQMAIg8gASkDACIKfCAKQgGGQv7///8fgyAPQv////8Pg358IgogAUHgAGoiICkDAIVCIIkiECABQUBrIiEpAwAiE3wgEEL/////D4MgE0IBhkL+////H4N+fCITIA+FQiiJIg8gCnwgD0L/////D4MgCkIBhkL+////H4N+fCIKfCADQv////8PgyAKQgGGQv7///8fg358IgmFQiCJIhQgAUEwaiIiKQMAIhEgAUEQaiIjKQMAIg18IA1CAYZC/v///x+DIBFC/////w+DfnwiDSABQfAAaiIkKQMAhUIgiSISIAFB0ABqIgEpAwAiDnwgEkL/////D4MgDkIBhkL+////H4N+fCIOIBGFQiiJIhEgDXwgEUL/////D4MgDUIBhkL+////H4N+fCINIBKFQjCJIhIgDnwgEkL/////D4MgDkIBhkL+////H4N+fCIOfCAUQv////8PgyAOQgGGQv7///8fg358IhUgA4VCKIkiAyAJfCADQv////8PgyAJQgGGQv7///8fg358Igk3AwAgGSAJIBSFQjCJIgk3AwAgASAJIBV8IAlC/////w+DIBVCAYZC/v///x+DfnwiCTcDACAbIAMgCYVCAYk3AwAgICAOIBGFQgGJIgMgBnwgA0L/////D4MgBkIBhkL+////H4N+fCIGIAogEIVCMIkiCoVCIIkiECAEIAh8IARC/////w+DIAhCAYZC/v///x+DfnwiBHwgEEIBhkL+////H4MgBEL/////D4N+fCIIIAOFQiiJIgMgBnwgA0L/////D4MgBkIBhkL+////H4N+fCIJIBCFQjCJIgY3AwAgHCAJNwMAIBogBiAIfCAGQv////8PgyAIQgGGQv7///8fg358Igg3AwAgIiADIAiFQgGJNwMAIB0gBCAFhUIBiSIFIA18IAVC/////w+DIA1CAYZC/v///x+DfnwiBCALhUIgiSIIIAogE3wgCkL/////D4MgE0IBhkL+////H4N+fCIDfCAIQv////8PgyADQgGGQv7///8fg358IgYgBYVCKIkiBSAEfCAFQv////8PgyAEQgGGQv7///8fg358IgsgCIVCMIkiBDcDACAjIAs3AwAgISAEIAZ8IARC/////w+DIAZCAYZC/v///x+DfnwiBDcDACAWIAQgBYVCAYk3AwAgJCAHIAMgD4VCAYkiBXwgB0L/////D4MgBUIBhkL+////H4N+fCIHIBKFQiCJIgQgDHwgBEL/////D4MgDEIBhkL+////H4N+fCIIIAWFQiiJIgUgB3wgBUL/////D4MgB0IBhkL+////H4N+fCIDIASFQjCJIgc3AwAgGCADNwMAIB4gByAIfCAHQv////8PgyAIQgGGQv7///8fg358Igc3AwAgHyAFIAeFQgGJNwMAIAJBgAFqIgJBgAhHDQALQYB/IQIDQCAXQYAIaiACaiIBQYABaiIWIAFBiARqIhgpAwAiBSABQYgCaiIZKQMAIgd8IAdCAYZC/v///x+DIAVC/////w+DfnwiByABQYgIaiIaKQMAhUIgiSIEIAFBiAZqIhspAwAiCHwgBEL/////D4MgCEIBhkL+////H4N+fCIIIAWFQiiJIgUgB3wgBUL/////D4MgB0IBhkL+////H4N+fCIHIASFQjCJIgQgAUGIA2oiHCkDACIDIAFBiAFqIh0pAwAiBnwgBkIBhkL+////H4MgA0L/////D4N+fCIGIAFBiAdqIh4pAwCFQiCJIgsgAUGIBWoiHykDACIMfCALQv////8PgyAMQgGGQv7///8fg358IgwgA4VCKIkiAyAGfCADQv////8PgyAGQgGGQv7///8fg358IgYgC4VCMIkiCyAMfCALQv////8PgyAMQgGGQv7///8fg358IgwgA4VCAYkiAyABQYADaiIgKQMAIg8gFikDACIKfCAKQgGGQv7///8fgyAPQv////8Pg358IgogAUGAB2oiFikDAIVCIIkiECABQYAFaiIhKQMAIhN8IBBC/////w+DIBNCAYZC/v///x+DfnwiEyAPhUIoiSIPIAp8IA9C/////w+DIApCAYZC/v///x+DfnwiCnwgA0L/////D4MgCkIBhkL+////H4N+fCIJhUIgiSIUIAFBgARqIiIpAwAiESABQYACaiIjKQMAIg18IA1CAYZC/v///x+DIBFC/////w+DfnwiDSABQYAIaiIkKQMAhUIgiSISIAFBgAZqIgEpAwAiDnwgEkL/////D4MgDkIBhkL+////H4N+fCIOIBGFQiiJIhEgDXwgEUL/////D4MgDUIBhkL+////H4N+fCINIBKFQjCJIhIgDnwgEkL/////D4MgDkIBhkL+////H4N+fCIOfCAUQv////8PgyAOQgGGQv7///8fg358IhUgA4VCKIkiAyAJfCADQv////8PgyAJQgGGQv7///8fg358Igk3AwAgGiAJIBSFQjCJIgk3AwAgASAJIBV8IAlC/////w+DIBVCAYZC/v///x+DfnwiCTcDACAcIAMgCYVCAYk3AwAgFiAOIBGFQgGJIgMgBnwgA0L/////D4MgBkIBhkL+////H4N+fCIGIAogEIVCMIkiCoVCIIkiECAEIAh8IARC/////w+DIAhCAYZC/v///x+DfnwiBHwgEEIBhkL+////H4MgBEL/////D4N+fCIIIAOFQiiJIgMgBnwgA0L/////D4MgBkIBhkL+////H4N+fCIJIBCFQjCJIgY3AwAgHSAJNwMAIBsgBiAIfCAGQv////8PgyAIQgGGQv7///8fg358Igg3AwAgIiADIAiFQgGJNwMAIB4gBCAFhUIBiSIFIA18IAVC/////w+DIA1CAYZC/v///x+DfnwiBCALhUIgiSIIIAogE3wgCkL/////D4MgE0IBhkL+////H4N+fCIDfCAIQv////8PgyADQgGGQv7///8fg358IgYgBYVCKIkiBSAEfCAFQv////8PgyAEQgGGQv7///8fg358IgsgCIVCMIkiBDcDACAjIAs3AwAgISAEIAZ8IARC/////w+DIAZCAYZC/v///x+DfnwiBDcDACAYIAQgBYVCAYk3AwAgJCAHIAMgD4VCAYkiBXwgB0L/////D4MgBUIBhkL+////H4N+fCIHIBKFQiCJIgQgDHwgBEL/////D4MgDEIBhkL+////H4N+fCIIIAWFQiiJIgUgB3wgBUL/////D4MgB0IBhkL+////H4N+fCIDIASFQjCJIgc3AwAgGSADNwMAIB8gByAIfCAHQv////8PgyAIQgGGQv7///8fg358Igc3AwAgICAFIAeFQgGJNwMAIAJBEGoiAg0AC0GAeCEBA0AgF0GACGogAWoiAkGACGoiFiAWKQMAIAEgF2oiFkGACGopAwCFNwMAIAJBiAhqIhggGCkDACAWQYgIaikDAIU3AwAgAkGQCGoiGCAYKQMAIBZBkAhqKQMAhTcDACACQZgIaiICIAIpAwAgFkGYCGopAwCFNwMAIAFBIGoiAQ0ACyAAIBdBgAhqQYAIEEcaJAALtRYCF38EfiMAQbAHayIEJAACQCADRQRAQQghAQwBCyAEIAM2AgwCQCADQcEATwRAIARBEGpBwAAQECAEQdgAakGAARBIIQcgBEHYAWpBBDoAACAEIAM2AlggAUUNASAAIAFBA3RqIQlBBCEFA0AgACgCACEBAkACQAJAIABBBGooAgAiBkGAASAFQf8BcSIFayIISwRAIAVFDQEgBSAHaiABIAgQRxogBCAEKQNQQoABfDcD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A5gGIARCADcDwAQgCUFAayAPEEgaIARBADoAoAcgFCAJIARBwARqEBsgBEGoBGogDSkDACIbNwMAIARBoARqIBUpAwAiHDcDACAEQZgEaiAWKQMAIh03AwAgBEGQBGogFykDACIeNwMAIAwgGikDADcDACALIBkpAwA3AwAgBSAYKQMANwMAIBMgHjcDACASIB03AwAgESAcNwMAIBAgGzcDACAEIAQpA8AEIhs3A/ADIAQgGzcD4AEgAEEYaiAFKQMANwAAIABBEGogCykDADcAACAAQQhqIAwpAwA3AAAgACAEKQPgATcAACAAQSBqIQAgDiABQSBrIgVHDQELC0EAIAFrIQELIAMgAWsiBkHAAEsEQEEJIQEMAQsgBEHgBWoiACAGEBAgBEGQBWoiBSAAQcgAEEcaIARB7AJqQYEBEEghACAEQaACaiAEQfYDaiAEQcYEaiAFQcgAEEdByAAQR0HIABBHGiAEIAY2AugCAkAgBEHsA2otAAAiBUHAAE0EQCAAIAVqIgAgBCkD4AE3AAAgAEE4aiAEQZgCaikDADcAACAAQTBqIARBkAJqKQMANwAAIABBKGogBEGIAmopAwA3AAAgAEEgaiAEQYACaikDADcAACAAQRhqIARB+AFqKQMANwAAIABBEGogBEHwAWopAwA3AAAgAEEIaiAEQegBaikDADcAACAFQUBrIQUMAQsgACAFaiAEQeABaiIIQYABIAVrIgcQRxogBCAEKQPgAkKAAXw3A+ACIARBoAJqIABCABABIAAgByAIaiAFQUBqIgVBgH9xaiAFEEcaCyAEIAU6AOwDIARB2AVqIARBoAJqQdABEEcaIAEgA00EQCAGIAQoAqAGRgRAIARB+ARqQgA3AwAgBEHwBGpCADcDACAEQegEakIANwMAIARB4ARqQgA3AwAgBEHYBGpCADcDACAEQdAEakIANwMAIARByARqQgA3AwAgBEIANwPABCAEIAQpA5gGIARBpAdqLQAAIgCtfDcDmAYgBEGkBmohAyAAQYABRwRAIAAgA2pBgAEgAGsQSBoLIARBADoApAcgBEHYBWogAyAEQcAEaiIAEBsgASACaiAAIAYQRxpBEiEBDAILQZyKwABBHSAEQa8HakG8isAAQcyKwAAQHQALIAEgA0GMisAAEB4ACyAEQbAHaiQAIAEL2jMCJn8LfiMA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aiEFIAAgCiAIKAIQEQAARQ0ACyAFQQFrIAZJDwsgBQ8LIAYgAyAEIAAoAgwRAQAL/AUBBX8gAEEIayIBIABBBGsoAgAiA0F4cSIAaiECAkACQAJAAkAgA0EBcQ0AIANBA3FFDQEgASgCACIDIABqIQAgASADayIBQZSawAAoAgBGBEAgAigCBEEDcUEDRw0BQYyawAAgADYCACACIAIoAgRBfnE2AgQgASAAQQFyNgIEIAIgADYCAA8LIAEgAxAOCwJAAkAgAigCBCIDQQJxRQRAIAJBmJrAACgCAEYNAiACQZSawAAoAgBGDQUgAiADQXhxIgIQDiABIAAgAmoiAEEBcjYCBCAAIAFqIAA2AgAgAUGUmsAAKAIARw0BQYyawAAgADYCAA8LIAIgA0F+cTYCBCABIABBAXI2AgQgACABaiAANgIACyAAQYACSQ0CIAEgABATQQAhAUGsmsAAQayawAAoAgBBAWsiADYCACAADQFB9JfAACgCACIABEADQCABQQFqIQEgACgCCCIADQALC0GsmsAAQf8fIAEgAUH/H00bNgIADwtBmJrAACABNgIAQZCawABBkJrAACgCACAAaiIANgIAIAEgAEEBcjYCBEGUmsAAKAIAIAFGBEBBjJrAAEEANgIAQZSawABBADYCAAsgAEGkmsAAKAIAIgNNDQBBmJrAACgCACICRQ0AQQAhAQJAQZCawAAoAgAiBEEpSQ0AQeyXwAAhAANAIAIgACgCACIFTwRAIAUgACgCBGogAksNAgsgACgCCCIADQALC0H0l8AAKAIAIgAEQANAIAFBAWohASAAKAIIIgANAAsLQayawABB/x8gASABQf8fTRs2AgAgAyAETw0AQaSawABBfzYCAAsPCyAAQXhxQfyXwABqIQICf0GEmsAAKAIAIgNBASAAQQN2dCIAcUUEQEGEmsAAIAAgA3I2AgAgAgwBCyACKAIICyEAIAIgATYCCCAAIAE2AgwgASACNgIMIAEgADYCCA8LQZSawAAgATYCAEGMmsAAQYyawAAoAgAgAGoiADYCACABIABBAXI2AgQgACABaiAANgIAC4YFAQp/IwBBMGsiAyQAIANBJGogATYCACADQQM6ACwgA0EgNgIcIANBADYCKCADIAA2AiAgA0EANgIUIANBADYCDAJ/AkACQAJAIAIoAhAiCkUEQCAC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NgIEIABBCGogAjYCAAwBCyAAQQA2AgQLIABBATYCAAuTAQEBfyMAQUBqIgMkACAAIAFCfxABIAIgACkDADcAACACQQhqIABBCGopAwA3AAAgAkEQaiAAQRBqKQMANwAAIAJBGGogAEEYaikDADcAACACQSBqIAApAyA3AAAgAkEoaiAAQShqKQMANwAAIAJBMGogAEEwaikDADcAACACQThqIABBOGopAwA3AAAgA0FAayQAC4wBAgN/AX4jAEEgayICJAAgAUEEaiEDIAEoAgRFBEAgASgCACEBIAJBHGoiBEEANgIAIAJCATcCFCACQRRqQfCOwAAgARAKGiACQRBqIAQoAgAiATYCACACIAIpAhQiBTcDCCADQQhqIAE2AgAgAyAFNwIACyAAQZCQwAA2AgQgACADNgIAIAJBIGokAAt9AQF/IwBBQGoiBSQAIAUgATYCDCAFIAA2AgggBSADNgIUIAUgAjYCECAFQSRqQgI3AgAgBUE8akEmNgIAIAVBAjYCHCAFQaCTwAA2AhggBUEnNgI0IAUgBUEwajYCICAFIAVBEGo2AjggBSAFQQhqNgIwIAVBGGogBBApAAtsAQF/IwBBMGsiAyQAIAMgADYCACADIAE2AgQgA0EUakICNwIAIANBLGpBDzYCACADQQI2AgwgA0GAlsAANgIIIANBDzYCJCADIANBIGo2AhAgAyADQQRqNgIoIAMgAzYCICADQQhqIAIQKQALbAEBfyMAQTBrIgMkACADIAE2AgQgAyAANgIAIANBFGpCAjcCACADQSxqQQ82AgAgA0ECNgIMIANBjJPAADYCCCADQQ82AiQgAyADQSBqNgIQIAMgAzYCKCADIANBBGo2AiAgA0EIaiACECkAC2cAIwBBMGsiACQAQbCWwAAtAAAEQCAAQRhqQgE3AgAgAEECNgIQIABBrI/AADYCDCAAQQ82AiggACABNgIsIAAgAEEkajYCFCAAIABBLGo2AiQgAEEMakHUj8AAECkACyAAQTBqJAALTwECfyAAKAIEIQIgACgCACEDAkAgACgCCCIALQAARQ0AIANByJPAAEEEIAIoAgwRAQBFDQBBAQ8LIAAgAUEKRjoAACADIAEgAigCEBEAAAtBAQF/IAIgACgCBCAAKAIIIgNrSwRAIAAgAyACEBcgACgCCCEDCyAAKAIAIANqIAEgAhBHGiAAIAIgA2o2AghBAAtNAQJ/QbGWwAAtAAAaIAEoAgQhAiABKAIAIQNBCEEEEDIiAUUEQEEEQQgQRAALIAEgAjYCBCABIAM2AgAgAEGgkMAANgIEIAAgATYCAAtBAQF/IAIgACgCBCAAKAIIIgNrSwRAIAAgAyACEBggACgCCCEDCyAAKAIAIANqIAEgAhBHGiAAIAIgA2o2AghBAAtHAQF/IwBBIGsiAyQAIANBDGpCADcCACADQQE2AgQgA0G8ksAANgIIIAMgATYCHCADIAA2AhggAyADQRhqNgIAIAMgAhApAAs3AAJAIAFpQQFHQYCAgIB4IAFrIABJcg0AIAAEQEGxlsAALQAAGiAAIAEQMiIBRQ0BCyABDwsACzkAAkACfyACQYCAxABHBEBBASAAIAIgASgCEBEAAA0BGgsgAw0BQQALDwsgACADIAQgASgCDBEBAAs/AQF/IwBBIGsiACQAIABBFGpCADcCACAAQQE2AgwgAEG4kcAANgIIIABB6JDAADYCECAAQQhqQcCRwAAQKQALsQIBAn8jAEEgayICJAAgAkEBOwEcIAIgATYCGCACIAA2AhQgAkHIksAANgIQIAJBvJLAADYCDCMAQRBrIgEkACACQQxqIgAoAggiAkUEQEHEjsAAQStBgJDAABAlAAsgASAAKAIMNgIMIAEgADYCCCABIAI2AgQjAEEQayIAJAAgAUEEaiIBKAIAIgJBDGooAgAhAwJAAn8CQAJAIAIoAgQOAgABAwsgAw0CQQAhAkHEjsAADAELIAMNASACKAIAIgMoAgQhAiADKAIACyEDIAAgAjYCBCAAIAM2AgAgAEGwkMAAIAEoAgQiACgCCCABKAIIIAAtABAgAC0AERAWAAsgAEEANgIEIAAgAjYCACAAQcSQwAAgASgCBCIAKAIIIAEoAgggAC0AECAALQAREBYACy0AAkAgA2lBAUdBgICAgHggA2sgAUlyRQRAIAAgASADIAIQLyIADQELAAsgAAuqBAIGfwF+IwBBEGsiBSQAIAUgADYCDCAFQQxqIQcjAEEQayICJAAgAiABKAIUQbCDwABBESABQRhqKAIAKAIMEQEAOgAMIAIgATYCCCACQQA6AA0gAkEANgIEIwBBQGoiACQAIAJBBGoiAygCACEEIAMCf0EBIAMtAAgNABogAygCBCIBKAIcIgZBBHFFBEBBASABKAIUQcyTwABB0JPAACAEG0ECQQEgBBsgAUEYaigCACgCDBEBAA0BGiAHIAFB0IPAACgCABEAAAwBCyAERQRAQQEgASgCFEHRk8AAQQIgAUEYaigCACgCDBEBAA0BGiABKAIcIQYLIABBAToAGyAAQTRqQbCTwAA2AgAgACABKQIUNwIMIAAgAEEbajYCFCAAIAEpAgg3AiQgASkCACEIIAAgBjYCOCAAIAEoAhA2AiwgACABLQAgOgA8IAAgCDcCHCAAIABBDGo2AjBBASAHIABBHGpB0IPAACgCABEAAA0AGiAAKAIwQc6TwABBAiAAKAI0KAIMEQEACzoACCADIARBAWo2AgAgAEFAayQAAn8gAi0ADCIAQQBHIAMoAgAiAUUNABpBASAADQAaIAIoAgghAAJAIAFBAUcNACACLQANRQ0AIAAtABxBBHENAEEBIAAoAhRB05PAAEEBIABBGGooAgAoAgwRAQANARoLIAAoAhRBvJLAAEEBIABBGGooAgAoAgwRAQALIAJBEGokACAFQRBqJAALIAEBfwJAIAAoAgQiAUUNACAAQQhqKAIARQ0AIAEQCQsLEQAgACgCBARAIAAoAgAQCQsLGQAgACgCFCABIAIgAEEYaigCACgCDBEBAAvCBQEFfwJ/AkACQAJAAkAgAkEJTwRAIAIgAxANIggNAUEADAULIANBzP97Sw0BQRAgA0ELakF4cSADQQtJGyEBIABBBGsiAigCACIFQXhxIQQCQCAFQQNxRQRAIAFBgAJJIAQgAUEEcklyIAQgAWtBgYAIT3INAQwFCyAAQQhrIgYgBGohBwJAAkACQAJAIAEgBEsEQCAHQZiawAAoAgBGDQQgB0GUmsAAKAIARg0CIAcoAgQiBUECcQ0FIAVBeHEiBSAEaiIEIAFJDQUgByAFEA4gBCABayIDQRBJDQEgAiABIAIoAgBBAXFyQQJyNgIAIAEgBmoiASADQQNyNgIEIAQgBmoiAiACKAIEQQFyNgIEIAEgAxAMDAkLIAQgAWsiA0EPSw0CDAgLIAIgBCACKAIAQQFxckECcjYCACAEIAZqIgEgASgCBEEBcjYCBAwHC0GMmsAAKAIAIARqIgQgAUkNAgJAIAQgAWsiA0EPTQRAIAIgBUEBcSAEckECcjYCACAEIAZqIgEgASgCBEEBcjYCBEEAIQMMAQsgAiABIAVBAXFyQQJyNgIAIAEgBmoiCCADQQFyNgIEIAQgBmoiASADNgIAIAEgASgCBEF+cTYCBAtBlJrAACAINgIAQYyawAAgAzYCAAwGCyACIAEgBUEBcXJBAnI2AgAgASAGaiIBIANBA3I2AgQgByAHKAIEQQFyNgIEIAEgAxAMDAULQZCawAAoAgAgBGoiBCABSw0DCyADEAIiAUUNASABIABBfEF4IAIoAgAiAUEDcRsgAUF4cWoiASADIAEgA0kbEEcgABAJDAQLIAggACABIAMgASADSRsQRxogABAJCyAIDAILIAIgASAFQQFxckECcjYCACABIAZqIgIgBCABayIBQQFyNgIEQZCawAAgATYCAEGYmsAAIAI2AgAgAAwBCyAACwsLACABBEAgABAJCwsUACAAKAIAIAEgACgCBCgCDBEAAAsZAAJ/IAFBCU8EQCABIAAQDQwBCyAAEAILCyEAIABC2N797/ftoNaKfzcDCCAAQq/D14rE8PndNjcDAAsgACAAQuTex4WQ0IXefTcDCCAAQsH3+ejMk7LRQTcDAAsgACAAQsWAsKa9qOHJSzcDCCAAQpXM9oWR7LDtHzcDAAsTACAAQaCQwAA2AgQgACABNgIACxAAIAEgACgCACAAKAIEEAYLDgAgACgCABoDQAwACwALxQICBH8CfiAANQIAIQYjAEEwayIDJABBJyEAAkAgBkKQzgBUBEAgBiEHDAELA0AgA0EJaiAAaiICQQRrIAYgBkKQzgCAIgdCkM4Afn2nIgRB//8DcUHkAG4iBUEBdEGElMAAai8AADsAACACQQJrIAQgBUHkAGxrQf//A3FBAXRBhJTAAGovAAA7AAAgAEEEayEAIAZC/8HXL1YgByEGDQALCyAHpyICQeMASwRAIABBAmsiACADQQlqaiAHpyICIAJB//8DcUHkAG4iAkHkAGxrQf//A3FBAXRBhJTAAGovAAA7AAALAkAgAkEKTwRAIABBAmsiACADQQlqaiACQQF0QYSUwABqLwAAOwAADAELIABBAWsiACADQQlqaiACQTBqOgAACyABQbySwABBACADQQlqIABqQScgAGsQCCADQTBqJAALCwAgACMAaiQAIwALjgEBA38gACgCACMAQYABayIDJAAtAAAhAANAIAIgA2pB/wBqQTBB1wAgAEEP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cy5pby02ZjE3ZDIyYmJhMTUwMDFmL2FyZ29uMi0wLjUuMy9zcmMvYmxvY2sucnNzaG91bGQgYmUgOCBieXRlcwAKAAAAAAAAAAEAAAALAAAA1AEQAF4AAABCAAAAPQAAAC9Vc2Vycy96aWdhemFqYy8uY2FyZ28vcmVnaXN0cnkvc3JjL2luZGV4LmNyYXRlcy5pby02ZjE3ZDIyYmJhMTUwMDFmL2FyZ29uMi0wLjUuMy9zcmMvbGliLnJzZAIQAFwAAAAvAQAAKAAAAGQCEABcAAAAhgEAAB0AAABkAhAAXAAAALkBAAAsAAAAZAIQAFwAAAC5AQAASAAAAGQCEABcAAAAvAEAAB0AAABkAhAAXAAAAL4BAAAdAAAAZAIQAFwAAADkAQAAHQAAAGQCEABcAAAA6QEAABsAAAAoKQAAYXNzb2NpYXRlZCBkYXRhIGlzIHRvbyBsb25nYWxnb3JpdGhtIGlkZW50aWZpZXIgaW52YWxpZEI2NCBlbmNvZGluZyBpbnZhbGlkOiAAAAB7AxAAFgAAAGtleSBJRCBpcyB0b28gbG9uZ21lbW9yeSBjb3N0IGlzIHRvbyBzbWFsbG1lbW9yeSBjb3N0IGlzIHRvbyBsYXJnZW91dHB1dCBpcyB0b28gc2hvcnRvdXRwdXQgaXMgdG9vIGxvbmdwYXNzd29yZCBpcyB0b28gbG9uZ3NhbHQgaXMgdG9vIHNob3J0c2FsdCBpcyB0b28gbG9uZ3NlY3JldCBpcyB0b28gbG9uZ25vdCBlbm91Z2ggdGhyZWFkc3RvbyBtYW55IHRocmVhZHN0aW1lIGNvc3QgaXMgdG9vIHNtYWxsaW52YWxpZCB2ZXJzaW9uAAAASW52YWxpZEJ1ZmZlclNpemUvVXNlcnMvemlnYXphamMvLmNhcmdvL3JlZ2lzdHJ5L3NyYy9pbmRleC5jcmF0ZXMuaW8tNmYxN2QyMmJiYTE1MDAxZi9hcmdvbjItMC41LjMvc3JjL2JsYWtlMmJfbG9uZy5ycwAApQQQAGUAAABLAAAAJAAAAGludmFsaWQgQmxha2UyYlZhciBvdXQgbGVuZ3RoAAAADQAAAAAAAAABAAAADgAAAKUEEABlAAAATAAAAAoAAAAvVXNlcnMvemlnYXphamMvLmNhcmdvL3JlZ2lzdHJ5L3NyYy9pbmRleC5jcmF0ZXMuaW8tNmYxN2QyMmJiYTE1MDAxZi9hcmdvbjItMC41LjMvc3JjL3BhcmFtcy5ycwBcBRAAXwAAAOgAAAAJAAAAAAAAAGF0dGVtcHQgdG8gZGl2aWRlIGJ5IHplcm8AAABcBRAAXwAAAFQBAAABAAAAYXNzZXJ0aW9uIGZhaWxlZDoga2V5X3NpemUgPD0gVTY0Ojp0b191c2l6ZSgpL1VzZXJzL3ppZ2F6YWpjLy5jYXJnby9yZWdpc3RyeS9zcmMvaW5kZXguY3JhdGVzLmlvLTZmMTdkMjJiYmExNTAwMWYvYmxha2UyLTAuMTAuNi9zcmMvbGliLnJzAAApBhAAXQAAAHIAAAABAAAAYXNzZXJ0aW9uIGZhaWxlZDogb3V0cHV0X3NpemUgPD0gVTY0Ojp0b191c2l6ZSgpYXNzZXJ0aW9uIGZhaWxlZDogc2FsdC5sZW4oKSA8PSBsZW5ndGhhc3NlcnRpb24gZmFpbGVkOiBwZXJzb25hLmxlbigpIDw9IGxlbmd0aGludmFsaWQgQmFzZTY0IGxlbmd0aGludmFsaWQgQmFzZTY0IGVuY29kaW5nAGNhbGxlZCBgT3B0aW9uOjp1bndyYXAoKWAgb24gYSBgTm9uZWAgdmFsdWUAEQAAAAwAAAAEAAAAEgAAABMAAAAUAAAAbWVtb3J5IGFsbG9jYXRpb24gb2YgIGJ5dGVzIGZhaWxlZAAAiAcQABUAAACdBxAADQAAAGxpYnJhcnkvc3RkL3NyYy9hbGxvYy5yc7wHEAAYAAAAYgEAAAkAAABsaWJyYXJ5L3N0ZC9zcmMvcGFuaWNraW5nLnJz5AcQABwAAACEAgAAHgAAABEAAAAMAAAABAAAABUAAAAWAAAACAAAAAQAAAAXAAAAFgAAAAgAAAAEAAAAGAAAABkAAAAaAAAAEAAAAAQAAAAbAAAAHAAAAB0AAAAAAAAAAQAAAB4AAABFcnJvcgAAAB8AAAAMAAAABAAAACAAAAAhAAAAIgAAAGxpYnJhcnkvYWxsb2Mvc3JjL3Jhd192ZWMucnNjYXBhY2l0eSBvdmVyZmxvdwAAAKQIEAARAAAAiAgQABwAAAAhAgAABQAAAGEgZm9ybWF0dGluZyB0cmFpdCBpbXBsZW1lbnRhdGlvbiByZXR1cm5lZCBhbiBlcnJvcgAjAAAAAAAAAAEAAAAkAAAAbGlicmFyeS9hbGxvYy9zcmMvZm10LnJzFAkQABgAAABkAgAAIAAAACkAAAA8CRAAAAAAACgAAAAAAAAAAQAAACkAAABpbmRleCBvdXQgb2YgYm91bmRzOiB0aGUgbGVuIGlzICBidXQgdGhlIGluZGV4IGlzIAAAWAkQACAAAAB4CRAAEgAAADogAAA8CRAAAAAAAJwJEAACAAAAKgAAAAwAAAAEAAAAKwAAACwAAAAtAAAAICAgICwgLAooKAosMHhsaWJyYXJ5L2NvcmUvc3JjL2ZtdC9udW0ucnMAAADWCRAAGwAAAGkAAAAXAAAAMDAwMTAyMDMwNDA1MDYwNzA4MDkxMDExMTIxMzE0MTUxNjE3MTgxOTIwMjEyMjIzMjQyNTI2MjcyODI5MzAzMTMyMzMzNDM1MzYzNzM4Mzk0MDQxNDI0MzQ0NDU0NjQ3NDg0OTUwNTE1MjUzNTQ1NTU2NTc1ODU5NjA2MTYyNjM2NDY1NjY2NzY4Njk3MDcxNzI3Mzc0NzU3Njc3Nzg3OTgwODE4MjgzODQ4NTg2ODc4ODg5OTA5MTkyOTM5NDk1OTY5Nzk4OTlyYW5nZSBzdGFydCBpbmRleCAgb3V0IG9mIHJhbmdlIGZvciBzbGljZSBvZiBsZW5ndGggzAoQABIAAADeChAAIgAAAHJhbmdlIGVuZCBpbmRleCAQCxAAEAAAAN4KEAAiAHsJcHJvZHVjZXJzAghsYW5ndWFnZQEEUnVzdAAMcHJvY2Vzc2VkLWJ5AwVydXN0Yx0xLjc1LjAgKDgyZTE2MDhkZiAyMDIzLTEyLTIxKQZ3YWxydXMGMC4yMC4zDHdhc20tYmluZGdlbhIwLjIuOTAgKGFkY2Y3Nzg2ZCkALA90YXJnZXRfZmVhdHVyZXMCKw9tdXRhYmxlLWdsb2JhbHMrCHNpZ24tZXh0";
var cachedTextDecoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf-8", { ignoreBOM: true, fatal: true }) : {
  decode: () => {
    throw Error("TextDecoder not available");
  }
};
if (typeof TextDecoder !== "undefined") {
  cachedTextDecoder.decode();
}
var cachedUint8Memory0 = null;
var heap = new Array(128).fill(undefined);
heap.push(undefined, null, true, false);
var heap_next = heap.length;
var WASM_VECTOR_LEN = 0;
var cachedTextEncoder = typeof TextEncoder !== "undefined" ? new TextEncoder("utf-8") : {
  encode: () => {
    throw Error("TextEncoder not available");
  }
};
var encodeString = typeof cachedTextEncoder.encodeInto === "function" ? function(arg, view) {
  return cachedTextEncoder.encodeInto(arg, view);
} : function(arg, view) {
  const buf = cachedTextEncoder.encode(arg);
  view.set(buf);
  return {
    read: arg.length,
    written: buf.length
  };
};
var cachedInt32Memory0 = null;
var argon2id_wasm_default = __wbg_init;

// node_modules/@rabbit-company/argon2id/src/argon2id.js
var Argon2id;
(function(Argon2id2) {
  function hexToBase64(hexstring) {
    return btoa((hexstring.match(/\w{2}/g) || []).map(function(a) {
      return String.fromCharCode(parseInt(a, 16));
    }).join(""));
  }
  Argon2id2.hexToBase64 = hexToBase64;
  function base64ToHex(str) {
    const raw = atob(str);
    let result = "";
    for (let i = 0;i < raw.length; i++) {
      const hex = raw.charCodeAt(i).toString(16);
      result += hex.length === 2 ? hex : "0" + hex;
    }
    return result.toUpperCase();
  }
  Argon2id2.base64ToHex = base64ToHex;
  function randRange(min, max) {
    var range = max - min;
    var requestBytes = Math.ceil(Math.log2(range) / 8);
    if (!requestBytes)
      return min;
    var maxNum = Math.pow(256, requestBytes);
    var ar = new Uint8Array(requestBytes);
    while (true) {
      window.crypto.getRandomValues(ar);
      var val = 0;
      for (var i = 0;i < requestBytes; i++)
        val = (val << 8) + ar[i];
      if (val < maxNum - maxNum % range)
        return min + val % range;
    }
  }
  Argon2id2.randRange = randRange;
  function randomSalt() {
    let length = 16;
    let lcase = "abcdefghijklmnopqrstuvwxyz";
    let ucase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let numb = "1234567890";
    let salt = [];
    for (let i = 0;i < length; i++)
      salt.push(lcase.charAt(randRange(0, lcase.length)));
    for (let i = 0;i < length / 2; i++)
      salt[randRange(0, salt.length)] = ucase.charAt(randRange(0, ucase.length));
    for (let i = 0;i < length / 2; i++)
      salt[randRange(0, salt.length)] = numb.charAt(randRange(0, numb.length));
    return salt.join("");
  }
  Argon2id2.randomSalt = randomSalt;
  Argon2id2.hash = async (message, salt = Argon2id2.randomSalt(), p = 4, m = 16, t = 3, l = 32) => {
    if (m <= 20)
      m = Math.pow(2, m);
    const fallbackToWasm = async () => {
      await argon2id_wasm_default();
      return argon2id_hash(message, salt, p, m, t, l);
    };
    try {
      if (!window.Worker)
        return fallbackToWasm();
      const response = await fetch("argon2id_worker.js", {
        method: "HEAD"
      });
      if (!response.ok)
        return fallbackToWasm();
      return await new Promise((resolve, reject) => {
        const Argon2idWorker = new Worker("argon2id_worker.js", {
          type: "module"
        });
        Argon2idWorker.onmessage = ({ data }) => {
          Argon2idWorker.terminate();
          data.error ? reject(data.error) : resolve(data.output);
        };
        Argon2idWorker.onerror = (error) => {
          Argon2idWorker.terminate();
          reject(`Worker error: ${error.message}`);
        };
        Argon2idWorker.postMessage([
          message,
          salt,
          p,
          m,
          t,
          l
        ]);
      });
    } catch {
      return fallbackToWasm();
    }
  };
  Argon2id2.hashEncoded = (message, salt = Argon2id2.randomSalt(), p = 4, m = 16, t = 3, l = 32) => new Promise((res, rej) => {
    if (m <= 20)
      m = Math.pow(2, m);
    Argon2id2.hash(message, salt, p, m, t, l).then((output) => {
      res(`\$argon2id\$v=19\$m=${m},t=${t},p=${p}\$${btoa(salt).replaceAll("=", "")}\$${hexToBase64(output).replaceAll("=", "")}`);
    }).catch((err) => {
      rej(err);
    });
  });
  function hashDecode(hashEncoded) {
    let digest = hashEncoded.split("$")[5];
    return base64ToHex(digest).toLowerCase();
  }
  Argon2id2.hashDecode = hashDecode;
  Argon2id2.verify = (hashEncoded, message) => new Promise((res, rej) => {
    let hea = hashEncoded.split("$");
    if (hea.length != 6)
      rej("invalid hash");
    if (hea[1] != "argon2id")
      rej("unsupported algorithm");
    if (hea[2] != "v=19")
      rej("unsupported version");
    let hpa = hea[3].split(",");
    if (hpa.length != 3)
      rej("invalid hash");
    let m = parseInt(hpa[0].split("=")[1], 10);
    let t = parseInt(hpa[1].split("=")[1], 10);
    let p = parseInt(hpa[2].split("=")[1], 10);
    let salt = atob(hea[4]);
    let digest = Argon2id2.hashDecode(hashEncoded);
    Argon2id2.hash(message, salt, p, m, t, digest.length / 2).then((output) => {
      res(output === digest);
    }).catch((err) => {
      rej(err);
    });
  });
})(Argon2id || (Argon2id = {}));
var argon2id_default = Argon2id;

// node_modules/@rabbit-company/password-entropy/src/password-entropy.js
var PasswordEntropy;
(function(PasswordEntropy2) {
  PasswordEntropy2.lcase = "abcdefghijklmnopqrstuvwxyz";
  PasswordEntropy2.ucase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  PasswordEntropy2.numb = "1234567890";
  PasswordEntropy2.symbol = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~ ";
  function _includesChar(text, charlist) {
    for (let i = 0;i < text.length; i++) {
      if (charlist.includes(text[i]))
        return true;
    }
    return false;
  }
  function calculate(password) {
    if (typeof password !== "string")
      return 0;
    let pool = 0;
    if (_includesChar(password, PasswordEntropy2.lcase))
      pool += PasswordEntropy2.lcase.length;
    if (_includesChar(password, PasswordEntropy2.ucase))
      pool += PasswordEntropy2.ucase.length;
    if (_includesChar(password, PasswordEntropy2.numb))
      pool += PasswordEntropy2.numb.length;
    if (_includesChar(password, PasswordEntropy2.symbol))
      pool += PasswordEntropy2.symbol.length;
    if (!_includesChar(password, PasswordEntropy2.lcase + PasswordEntropy2.ucase + PasswordEntropy2.numb + PasswordEntropy2.symbol))
      pool += 100;
    if (pool == 0)
      return 0;
    return Math.round(password.length * Math.log(pool) / Math.LN2);
  }
  PasswordEntropy2.calculate = calculate;
})(PasswordEntropy || (PasswordEntropy = {}));
var password_entropy_default = PasswordEntropy;

// src/cloudky-api.ts
class CloudkyAPI {
  server;
  username;
  password;
  otp;
  authHash = "";
  token = "";
  constructor(server, username, password, otp) {
    this.server = server;
    this.username = username;
    this.password = password;
    this.otp = otp;
  }
  static validate(server, username, password, otp) {
    if (!validate_default.url(server))
      return errors_default.getJson(5000 /* SERVER_UNREACHABLE */);
    if (!validate_default.username(username))
      return errors_default.getJson(1003 /* INVALID_USERNAME_FORMAT */);
    if (password_entropy_default.calculate(password) < 75)
      return errors_default.getJson(1025 /* PASSWORD_TOO_WEAK */);
    if (!validate_default.otp(otp))
      return errors_default.getJson(1024 /* INVALID_OTP */);
    return errors_default.getJson(0 /* SUCCESS */);
  }
  validate() {
    if (!validate_default.url(this.server))
      return errors_default.getJson(5000 /* SERVER_UNREACHABLE */);
    if (!validate_default.username(this.username))
      return errors_default.getJson(1003 /* INVALID_USERNAME_FORMAT */);
    if (!validate_default.otp(this.otp))
      return errors_default.getJson(1024 /* INVALID_OTP */);
    if (this.token.length) {
      if (!validate_default.token(this.token))
        return errors_default.getJson(1016 /* INVALID_TOKEN */);
    } else if (this.authHash.length) {
      if (!validate_default.password(this.authHash))
        return errors_default.getJson(1004 /* PASSWORD_NOT_HASHED */);
    } else if (this.password.length) {
      if (password_entropy_default.calculate(this.password) < 75)
        return errors_default.getJson(1013 /* INVALID_PASSWORD */);
    }
    return errors_default.getJson(0 /* SUCCESS */);
  }
  async initialize() {
    this.authHash = await CloudkyAPI.generateAuthenticationHash(this.username, this.password) || "";
    if (this.authHash.length) {
      this.password = "";
      return true;
    }
    return false;
  }
  static async generateAuthenticationHash(username, password) {
    const authHash = blake2b_default.hash(`cloudky2024-${password}-${username}`);
    const authSalt = blake2b_default.hash(`cloudky2024-${username}`);
    try {
      return await argon2id_default.hash(authHash, authSalt, 4, 16, 3, 64);
    } catch {
      return null;
    }
  }
  static async createAccount(server, username, email, password, type) {
    if (!validate_default.url(server))
      return errors_default.getJson(5000 /* SERVER_UNREACHABLE */);
    if (!validate_default.username(username))
      return errors_default.getJson(1003 /* INVALID_USERNAME_FORMAT */);
    if (!validate_default.email(email))
      return errors_default.getJson(1009 /* INVALID_EMAIL */);
    if (!validate_default.password(password))
      return errors_default.getJson(1004 /* PASSWORD_NOT_HASHED */);
    if (!validate_default.accountType(type))
      return errors_default.getJson(1019 /* INVALID_ACCOUNT_TYPE */);
    try {
      const data = {
        username,
        email,
        password,
        type
      };
      const result = await fetch(server + "/v1/account/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const response = await result.json();
      if (validate_default.response(response))
        return response;
      return errors_default.getJson(2000 /* UNKNOWN_ERROR */);
    } catch (err) {
      if (err instanceof SyntaxError)
        return errors_default.getJson(5001 /* INVALID_RESPONSE_FORMAT */);
      return errors_default.getJson(5000 /* SERVER_UNREACHABLE */);
    }
  }
  static async getToken(server, username, password, otp) {
    if (!validate_default.url(server))
      return errors_default.getJson(5000 /* SERVER_UNREACHABLE */);
    if (!validate_default.username(username))
      return errors_default.getJson(1003 /* INVALID_USERNAME_FORMAT */);
    if (!validate_default.password(password))
      return errors_default.getJson(1004 /* PASSWORD_NOT_HASHED */);
    if (!validate_default.otp(otp))
      return errors_default.getJson(1024 /* INVALID_OTP */);
    try {
      const data = {
        otp
      };
      const result = await fetch(server + "/v1/account/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(username + ":" + password)}`
        },
        body: JSON.stringify(data)
      });
      const response = await result.json();
      if (validate_default.response(response))
        return response;
      return errors_default.getJson(2000 /* UNKNOWN_ERROR */);
    } catch (err) {
      if (err instanceof SyntaxError)
        return errors_default.getJson(5001 /* INVALID_RESPONSE_FORMAT */);
      return errors_default.getJson(5000 /* SERVER_UNREACHABLE */);
    }
  }
  async getToken() {
    const res = await CloudkyAPI.getToken(this.server, this.username, this.authHash, this.otp);
    if (res.token) {
      this.token = res.token;
      this.authHash = "";
    }
    return res;
  }
  static async getAccountData(server, username, token) {
    if (!validate_default.url(server))
      return errors_default.getJson(5000 /* SERVER_UNREACHABLE */);
    if (!validate_default.username(username))
      return errors_default.getJson(1003 /* INVALID_USERNAME_FORMAT */);
    if (!validate_default.token(token))
      return errors_default.getJson(1016 /* INVALID_TOKEN */);
    try {
      const result = await fetch(server + "/v1/account/data", {
        method: "GET",
        headers: {
          Authorization: `Basic ${btoa(username + ":" + token)}`
        }
      });
      const response = await result.json();
      if (validate_default.response(response))
        return response;
      return errors_default.getJson(2000 /* UNKNOWN_ERROR */);
    } catch (err) {
      if (err instanceof SyntaxError)
        return errors_default.getJson(5001 /* INVALID_RESPONSE_FORMAT */);
      return errors_default.getJson(5000 /* SERVER_UNREACHABLE */);
    }
  }
  async getAccountData() {
    return await CloudkyAPI.getAccountData(this.server, this.username, this.token);
  }
  static async deleteAccount(server, username, token) {
    if (!validate_default.url(server))
      return errors_default.getJson(5000 /* SERVER_UNREACHABLE */);
    if (!validate_default.username(username))
      return errors_default.getJson(1003 /* INVALID_USERNAME_FORMAT */);
    if (!validate_default.token(token))
      return errors_default.getJson(1016 /* INVALID_TOKEN */);
    try {
      const result = await fetch(server + "/v1/account/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(username + ":" + token)}`
        }
      });
      const response = await result.json();
      if (validate_default.response(response))
        return response;
      return errors_default.getJson(2000 /* UNKNOWN_ERROR */);
    } catch (err) {
      if (err instanceof SyntaxError)
        return errors_default.getJson(5001 /* INVALID_RESPONSE_FORMAT */);
      return errors_default.getJson(5000 /* SERVER_UNREACHABLE */);
    }
  }
  async deleteAccount() {
    return await CloudkyAPI.deleteAccount(this.server, this.username, this.token);
  }
  static async getFileList(server, username, token) {
    if (!validate_default.url(server))
      return errors_default.getJson(5000 /* SERVER_UNREACHABLE */);
    if (!validate_default.username(username))
      return errors_default.getJson(1003 /* INVALID_USERNAME_FORMAT */);
    if (!validate_default.token(token))
      return errors_default.getJson(1016 /* INVALID_TOKEN */);
    try {
      const result = await fetch(server + "/v1/file/list", {
        method: "GET",
        headers: {
          Authorization: `Basic ${btoa(username + ":" + token)}`
        }
      });
      const response = await result.json();
      if (validate_default.response(response))
        return response;
      return errors_default.getJson(2000 /* UNKNOWN_ERROR */);
    } catch (err) {
      if (err instanceof SyntaxError)
        return errors_default.getJson(5001 /* INVALID_RESPONSE_FORMAT */);
      return errors_default.getJson(5000 /* SERVER_UNREACHABLE */);
    }
  }
  async getFileList() {
    return await CloudkyAPI.getFileList(this.server, this.username, this.token);
  }
  static async deleteFiles(server, username, token, paths) {
    if (!validate_default.url(server))
      return errors_default.getJson(5000 /* SERVER_UNREACHABLE */);
    if (!validate_default.username(username))
      return errors_default.getJson(1003 /* INVALID_USERNAME_FORMAT */);
    if (!validate_default.token(token))
      return errors_default.getJson(1016 /* INVALID_TOKEN */);
    if (!validate_default.userFilePathNames(paths))
      return errors_default.getJson(1005 /* INVALID_FILE_NAME */);
    try {
      const data = {
        paths
      };
      const result = await fetch(server + "/v1/file/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(username + ":" + token)}`
        },
        body: JSON.stringify(data)
      });
      const response = await result.json();
      if (validate_default.response(response))
        return response;
      return errors_default.getJson(2000 /* UNKNOWN_ERROR */);
    } catch (err) {
      if (err instanceof SyntaxError)
        return errors_default.getJson(5001 /* INVALID_RESPONSE_FORMAT */);
      return errors_default.getJson(5000 /* SERVER_UNREACHABLE */);
    }
  }
  async deleteFiles(paths) {
    return await CloudkyAPI.deleteFiles(this.server, this.username, this.token, paths);
  }
  static async downloadFile(server, username, token, path) {
    if (!validate_default.url(server))
      return errors_default.getJson(5000 /* SERVER_UNREACHABLE */);
    if (!validate_default.username(username))
      return errors_default.getJson(1003 /* INVALID_USERNAME_FORMAT */);
    if (!validate_default.token(token))
      return errors_default.getJson(1016 /* INVALID_TOKEN */);
    if (!validate_default.userFilePathName(path))
      return errors_default.getJson(1005 /* INVALID_FILE_NAME */);
    try {
      const data = {
        path
      };
      const result = await fetch(server + "/v1/file/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(username + ":" + token)}`
        },
        body: JSON.stringify(data)
      });
      if (result.status !== 200) {
        const response = await result.json();
        if (validate_default.response(response))
          return response;
        return errors_default.getJson(2000 /* UNKNOWN_ERROR */);
      }
      return await result.blob();
    } catch (err) {
      if (err instanceof SyntaxError)
        return errors_default.getJson(5001 /* INVALID_RESPONSE_FORMAT */);
      return errors_default.getJson(5000 /* SERVER_UNREACHABLE */);
    }
  }
  async downloadFile(path) {
    return await CloudkyAPI.downloadFile(this.server, this.username, this.token, path);
  }
  static async moveFiles(server, username, token, files, destination) {
    if (!validate_default.url(server))
      return errors_default.getJson(5000 /* SERVER_UNREACHABLE */);
    if (!validate_default.username(username))
      return errors_default.getJson(1003 /* INVALID_USERNAME_FORMAT */);
    if (!validate_default.token(token))
      return errors_default.getJson(1016 /* INVALID_TOKEN */);
    if (!validate_default.userFilePathNames(files))
      return errors_default.getJson(1005 /* INVALID_FILE_NAME */);
    if (!validate_default.userFilePathName(destination))
      return errors_default.getJson(1005 /* INVALID_FILE_NAME */);
    try {
      const data = {
        files,
        destination
      };
      const result = await fetch(server + "/v1/file/move", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(username + ":" + token)}`
        },
        body: JSON.stringify(data)
      });
      const response = await result.json();
      if (validate_default.response(response))
        return response;
      return errors_default.getJson(2000 /* UNKNOWN_ERROR */);
    } catch (err) {
      if (err instanceof SyntaxError)
        return errors_default.getJson(5001 /* INVALID_RESPONSE_FORMAT */);
      return errors_default.getJson(5000 /* SERVER_UNREACHABLE */);
    }
  }
  async moveFiles(files, destination) {
    return await CloudkyAPI.moveFiles(this.server, this.username, this.token, files, destination);
  }
  static async renameFile(server, username, token, path, destination) {
    if (!validate_default.url(server))
      return errors_default.getJson(5000 /* SERVER_UNREACHABLE */);
    if (!validate_default.username(username))
      return errors_default.getJson(1003 /* INVALID_USERNAME_FORMAT */);
    if (!validate_default.token(token))
      return errors_default.getJson(1016 /* INVALID_TOKEN */);
    if (!validate_default.userFilePathName(path))
      return errors_default.getJson(1005 /* INVALID_FILE_NAME */);
    if (!validate_default.userFilePathName(destination))
      return errors_default.getJson(1005 /* INVALID_FILE_NAME */);
    try {
      const data = {
        path,
        destination
      };
      const result = await fetch(server + "/v1/file/rename", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(username + ":" + token)}`
        },
        body: JSON.stringify(data)
      });
      const response = await result.json();
      if (validate_default.response(response))
        return response;
      return errors_default.getJson(2000 /* UNKNOWN_ERROR */);
    } catch (err) {
      if (err instanceof SyntaxError)
        return errors_default.getJson(5001 /* INVALID_RESPONSE_FORMAT */);
      return errors_default.getJson(5000 /* SERVER_UNREACHABLE */);
    }
  }
  async renameFile(path, destination) {
    return await CloudkyAPI.renameFile(this.server, this.username, this.token, path, destination);
  }
  static async uploadFile(server, username, token, destination, fileContent) {
    if (!validate_default.url(server))
      return errors_default.getJson(5000 /* SERVER_UNREACHABLE */);
    if (!validate_default.username(username))
      return errors_default.getJson(1003 /* INVALID_USERNAME_FORMAT */);
    if (!validate_default.token(token))
      return errors_default.getJson(1016 /* INVALID_TOKEN */);
    if (!validate_default.userFilePathName(destination))
      return errors_default.getJson(1005 /* INVALID_FILE_NAME */);
    if (fileContent.size === 0)
      return errors_default.getJson(1006 /* INVALID_FILE */);
    if (fileContent.size > 53687091200)
      return errors_default.getJson(1010 /* MAX_FILE_SIZE_EXCEEDED */);
    try {
      const formData = new FormData;
      formData.append("file", fileContent, destination);
      const result = await fetch(server + "/v1/file/upload", {
        method: "PUT",
        headers: {
          Authorization: `Basic ${btoa(username + ":" + token)}`
        },
        body: formData
      });
      const response = await result.json();
      if (validate_default.response(response))
        return response;
      return errors_default.getJson(2000 /* UNKNOWN_ERROR */);
    } catch (err) {
      if (err instanceof SyntaxError)
        return errors_default.getJson(5001 /* INVALID_RESPONSE_FORMAT */);
      return errors_default.getJson(5000 /* SERVER_UNREACHABLE */);
    }
  }
  async uploadFile(destination, fileContent) {
    return await CloudkyAPI.uploadFile(this.server, this.username, this.token, destination, fileContent);
  }
  static async shareLinkCreate(server, username, token, path, password, expiration) {
    if (!validate_default.url(server))
      return errors_default.getJson(5000 /* SERVER_UNREACHABLE */);
    if (!validate_default.username(username))
      return errors_default.getJson(1003 /* INVALID_USERNAME_FORMAT */);
    if (!validate_default.token(token))
      return errors_default.getJson(1016 /* INVALID_TOKEN */);
    if (!validate_default.userFilePathName(path))
      return errors_default.getJson(1005 /* INVALID_FILE_NAME */);
    if (password !== null && !validate_default.password(password))
      return errors_default.getJson(1004 /* PASSWORD_NOT_HASHED */);
    if (expiration !== null && !validate_default.expiration(expiration))
      return errors_default.getJson(1021 /* INVALID_EXPIRATION_TIMESTAMP */);
    try {
      const data = {
        path,
        password,
        expiration
      };
      const result = await fetch(server + "/v1/sharelink/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(username + ":" + token)}`
        },
        body: JSON.stringify(data)
      });
      const response = await result.json();
      if (validate_default.response(response))
        return response;
      return errors_default.getJson(2000 /* UNKNOWN_ERROR */);
    } catch (err) {
      if (err instanceof SyntaxError)
        return errors_default.getJson(5001 /* INVALID_RESPONSE_FORMAT */);
      return errors_default.getJson(5000 /* SERVER_UNREACHABLE */);
    }
  }
  async shareLinkCreate(path, password, expiration) {
    return await CloudkyAPI.shareLinkCreate(this.server, this.username, this.token, path, password, expiration);
  }
  static async shareLinkDelete(server, username, token, link) {
    if (!validate_default.url(server))
      return errors_default.getJson(5000 /* SERVER_UNREACHABLE */);
    if (!validate_default.username(username))
      return errors_default.getJson(1003 /* INVALID_USERNAME_FORMAT */);
    if (!validate_default.token(token))
      return errors_default.getJson(1016 /* INVALID_TOKEN */);
    if (!validate_default.sharelink(link))
      return errors_default.getJson(1023 /* INVALID_SHARE_LINK */);
    try {
      const data = {
        link
      };
      const result = await fetch(server + "/v1/sharelink/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(username + ":" + token)}`
        },
        body: JSON.stringify(data)
      });
      const response = await result.json();
      if (validate_default.response(response))
        return response;
      return errors_default.getJson(2000 /* UNKNOWN_ERROR */);
    } catch (err) {
      if (err instanceof SyntaxError)
        return errors_default.getJson(5001 /* INVALID_RESPONSE_FORMAT */);
      return errors_default.getJson(5000 /* SERVER_UNREACHABLE */);
    }
  }
  async shareLinkDelete(link) {
    return await CloudkyAPI.shareLinkDelete(this.server, this.username, this.token, link);
  }
  static async shareLinkList(server, username, token) {
    if (!validate_default.url(server))
      return errors_default.getJson(5000 /* SERVER_UNREACHABLE */);
    if (!validate_default.username(username))
      return errors_default.getJson(1003 /* INVALID_USERNAME_FORMAT */);
    if (!validate_default.token(token))
      return errors_default.getJson(1016 /* INVALID_TOKEN */);
    try {
      const result = await fetch(server + "/v1/sharelink/list", {
        method: "GET",
        headers: {
          Authorization: `Basic ${btoa(username + ":" + token)}`
        }
      });
      const response = await result.json();
      if (validate_default.response(response))
        return response;
      return errors_default.getJson(2000 /* UNKNOWN_ERROR */);
    } catch (err) {
      if (err instanceof SyntaxError)
        return errors_default.getJson(5001 /* INVALID_RESPONSE_FORMAT */);
      return errors_default.getJson(5000 /* SERVER_UNREACHABLE */);
    }
  }
  async shareLinkList() {
    return await CloudkyAPI.shareLinkList(this.server, this.username, this.token);
  }
}
var cloudky_api_default = CloudkyAPI;
export {
  cloudky_api_default as default
};
