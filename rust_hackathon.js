/* tslint:disable */
import * as wasm from './rust_hackathon_bg';
import { get_shuffled_cards } from './index';

const TextEncoder = typeof self === 'object' && self.TextEncoder
    ? self.TextEncoder
    : require('util').TextEncoder;

let cachedEncoder = new TextEncoder('utf-8');

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null ||
        cachegetUint8Memory.buffer !== wasm.memory.buffer)
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    return cachegetUint8Memory;
}

function passStringToWasm(arg) {

    const buf = cachedEncoder.encode(arg);
    const ptr = wasm.__wbindgen_malloc(buf.length);
    getUint8Memory().set(buf, ptr);
    return [ptr, buf.length];
}

let cachegetUint32Memory = null;
function getUint32Memory() {
    if (cachegetUint32Memory === null ||
        cachegetUint32Memory.buffer !== wasm.memory.buffer)
        cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);
    return cachegetUint32Memory;
}

export function __wbg_f_get_shuffled_cards_get_shuffled_cards_n(ret) {
    const [retptr, retlen] = passStringToWasm(get_shuffled_cards());
    const mem = getUint32Memory();
                    mem[ret / 4] = retptr;
                    mem[ret / 4 + 1] = retlen;

}

let cachedGlobalArgumentPtr = null;
function globalArgumentPtr() {
    if (cachedGlobalArgumentPtr === null)
        cachedGlobalArgumentPtr = wasm.__wbindgen_global_argument_ptr();
    return cachedGlobalArgumentPtr;
}

function getGlobalArgument(arg) {
    const idx = globalArgumentPtr() / 4 + arg;
    return getUint32Memory()[idx];
}

let slab = [];

let slab_next = 0;

function addHeapObject(obj) {
    if (slab_next === slab.length)
        slab.push(slab.length + 1);
    const idx = slab_next;
    const next = slab[idx];

    slab_next = next;

    slab[idx] = { obj, cnt: 1 };
    return idx << 1;
}

let stack = [];

function getObject(idx) {
    if ((idx & 1) === 1) {
        return stack[idx >> 1];
    } else {
        const val = slab[idx >> 1];

    return val.obj;

    }
}

export function __wbg_f_setTimeout_set_timeout_n(arg0, arg1) {
    let idxarg0 = getUint32Memory()[arg0 / 4];
    if (idxarg0 === 0xffffffff) {
        let cbarg0 = function() {
            let a = this.a;
            this.a = 0;
            try {
                return this.f(a, this.b);
            } finally {
                this.a = a;
            }
        };
        cbarg0.a = getGlobalArgument(0);
        cbarg0.b = getGlobalArgument(1);
        cbarg0.f = wasm.__wbg_function_table.get(getGlobalArgument(2));
        let real = cbarg0.bind(cbarg0);
        real.original = cbarg0;
        idxarg0 = getUint32Memory()[arg0 / 4] = addHeapObject(real);
    }
    return setTimeout(getObject(idxarg0), arg1);
}

export function __wbg_static_accessor_document_document() {
    return addHeapObject(document);
}

function GetOwnOrInheritedPropertyDescriptor(obj, id) {
  while (obj) {
    let desc = Object.getOwnPropertyDescriptor(obj, id);
    if (desc) return desc;
    obj = Object.getPrototypeOf(obj);
  }
  throw "descriptor not found";
}

const __wbg_f_body_body_HTMLDocument_target = GetOwnOrInheritedPropertyDescriptor(HTMLDocument.prototype, 'body').get;;

export function __wbg_f_body_body_HTMLDocument(arg0) {
    return addHeapObject(__wbg_f_body_body_HTMLDocument_target.call(getObject(arg0)));
}

const __wbg_f_createElement_createElement_HTMLDocument_target = HTMLDocument.prototype.createElement;

const TextDecoder = typeof self === 'object' && self.TextDecoder
    ? self.TextDecoder
    : require('util').TextDecoder;

let cachedDecoder = new TextDecoder('utf-8');

function getStringFromWasm(ptr, len) {
    return cachedDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

export function __wbg_f_createElement_createElement_HTMLDocument(arg0, arg1, arg2) {
    let varg1 = getStringFromWasm(arg1, arg2);
    return addHeapObject(__wbg_f_createElement_createElement_HTMLDocument_target.call(getObject(arg0), varg1));
}

const __wbg_f_getElementById_get_element_by_id_HTMLDocument_target = HTMLDocument.prototype.getElementById;

export function __wbg_f_getElementById_get_element_by_id_HTMLDocument(arg0, arg1, arg2) {
    let varg1 = getStringFromWasm(arg1, arg2);
    return addHeapObject(__wbg_f_getElementById_get_element_by_id_HTMLDocument_target.call(getObject(arg0), varg1));
}

const __wbg_f_set_id_set_id_HTMLElement_target = GetOwnOrInheritedPropertyDescriptor(HTMLElement.prototype, 'id').set;;

export function __wbg_f_set_id_set_id_HTMLElement(arg0, arg1, arg2) {
    let varg1 = getStringFromWasm(arg1, arg2);
    __wbg_f_set_id_set_id_HTMLElement_target.call(getObject(arg0), varg1);
}

const __wbg_f_set_class_set_class_HTMLElement_target = GetOwnOrInheritedPropertyDescriptor(HTMLElement.prototype, 'className').set;;

export function __wbg_f_set_class_set_class_HTMLElement(arg0, arg1, arg2) {
    let varg1 = getStringFromWasm(arg1, arg2);
    __wbg_f_set_class_set_class_HTMLElement_target.call(getObject(arg0), varg1);
}

const __wbg_f_set_style_set_style_HTMLElement_target = GetOwnOrInheritedPropertyDescriptor(HTMLElement.prototype, 'style').set;;

export function __wbg_f_set_style_set_style_HTMLElement(arg0, arg1, arg2) {
    let varg1 = getStringFromWasm(arg1, arg2);
    __wbg_f_set_style_set_style_HTMLElement_target.call(getObject(arg0), varg1);
}

const __wbg_f_set_inner_html_set_inner_html_HTMLElement_target = GetOwnOrInheritedPropertyDescriptor(HTMLElement.prototype, 'innerHTML').set;;

export function __wbg_f_set_inner_html_set_inner_html_HTMLElement(arg0, arg1, arg2) {
    let varg1 = getStringFromWasm(arg1, arg2);
    __wbg_f_set_inner_html_set_inner_html_HTMLElement_target.call(getObject(arg0), varg1);
}

const __wbg_f_appendChild_append_child_HTMLElement_target = HTMLElement.prototype.appendChild;

export function __wbg_f_appendChild_append_child_HTMLElement(arg0, arg1) {
    __wbg_f_appendChild_append_child_HTMLElement_target.call(getObject(arg0), getObject(arg1));
}

const __wbg_f_set_onclick_set_onclick_HTMLElement_target = GetOwnOrInheritedPropertyDescriptor(HTMLElement.prototype, 'onclick').set;;

export function __wbg_f_set_onclick_set_onclick_HTMLElement(arg0, arg1) {
    let idxarg1 = getUint32Memory()[arg1 / 4];
    if (idxarg1 === 0xffffffff) {
        let cbarg1 = function() {
            let a = this.a;
            this.a = 0;
            try {
                return this.f(a, this.b);
            } finally {
                this.a = a;
            }
        };
        cbarg1.a = getGlobalArgument(0);
        cbarg1.b = getGlobalArgument(1);
        cbarg1.f = wasm.__wbg_function_table.get(getGlobalArgument(2));
        let real = cbarg1.bind(cbarg1);
        real.original = cbarg1;
        idxarg1 = getUint32Memory()[arg1 / 4] = addHeapObject(real);
    }
    __wbg_f_set_onclick_set_onclick_HTMLElement_target.call(getObject(arg0), getObject(idxarg1));
}

const __wbg_f_log_log_n_target = console.log;

export function __wbg_f_log_log_n(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    __wbg_f_log_log_n_target(varg0);
}

function addBorrowedObject(obj) {
    stack.push(obj);
    return ((stack.length - 1) << 1) | 1;
}

export class Memory {

                static __construct(ptr) {
                    return new Memory(ptr);
                }

                constructor(ptr) {
                    this.ptr = ptr;
                }

            free() {
                const ptr = this.ptr;
                this.ptr = 0;
                wasm.__wbg_memory_free(ptr);
            }
        static new(arg0) {
    const [ptr0, len0] = passStringToWasm(arg0);
    try {
        return Memory.__construct(wasm.memory_new(ptr0, len0));
    } finally {
        wasm.__wbindgen_free(ptr0, len0 * 1);
    }
}
init() {
    return wasm.memory_init(this.ptr);
}
render_title(arg0) {
    try {
        return wasm.memory_render_title(this.ptr, addBorrowedObject(arg0));
    } finally {
        stack.pop();
    }
}
render_cards(arg0) {
    try {
        return wasm.memory_render_cards(this.ptr, addBorrowedObject(arg0));
    } finally {
        stack.pop();
    }
}
render_button(arg0) {
    try {
        return wasm.memory_render_button(this.ptr, addBorrowedObject(arg0));
    } finally {
        stack.pop();
    }
}
update_cards() {
    return wasm.memory_update_cards(this.ptr);
}
update_score() {
    return wasm.memory_update_score(this.ptr);
}
update() {
    return wasm.memory_update(this.ptr);
}
render() {
    const retptr = globalArgumentPtr();
    wasm.memory_render(retptr, this.ptr);
    const mem = getUint32Memory();
    const ptr = mem[retptr / 4];
    const len = mem[retptr / 4 + 1];
    const realRet = getStringFromWasm(ptr, len).slice();
    wasm.__wbindgen_free(ptr, len * 1);
    return realRet;
}
close_cards() {
    return wasm.memory_close_cards(this.ptr);
}
reveal_card(arg0) {
    return wasm.memory_reveal_card(this.ptr, arg0);
}
set_card_style(arg0) {
    const [ptr0, len0] = passStringToWasm(arg0);
    try {
        return wasm.memory_set_card_style(this.ptr, ptr0, len0);
    } finally {
        wasm.__wbindgen_free(ptr0, len0 * 1);
    }
}
set_button_style(arg0) {
    const [ptr0, len0] = passStringToWasm(arg0);
    try {
        return wasm.memory_set_button_style(this.ptr, ptr0, len0);
    } finally {
        wasm.__wbindgen_free(ptr0, len0 * 1);
    }
}
check_match() {
    return (wasm.memory_check_match(this.ptr)) !== 0;
}
handle_match() {
    return wasm.memory_handle_match(this.ptr);
}
increase_score() {
    return wasm.memory_increase_score(this.ptr);
}
log(arg0) {
    const [ptr0, len0] = passStringToWasm(arg0);
    try {
        return wasm.memory_log(this.ptr, ptr0, len0);
    } finally {
        wasm.__wbindgen_free(ptr0, len0 * 1);
    }
}
}

export function __wbindgen_object_clone_ref(idx) {
    // If this object is on the stack promote it to the heap.
    if ((idx & 1) === 1)
        return addHeapObject(getObject(idx));

    // Otherwise if the object is on the heap just bump the
    // refcount and move on
    const val = slab[idx >> 1];
    val.cnt += 1;
    return idx;
}

function dropRef(idx) {

    let obj = slab[idx >> 1];

    obj.cnt -= 1;
    if (obj.cnt > 0)
        return;

    // If we hit 0 then free up our space in the slab
    slab[idx >> 1] = slab_next;
    slab_next = idx >> 1;
}

export function __wbindgen_object_drop_ref(i) { dropRef(i); }

export function __wbindgen_string_new(p, l) {
    return addHeapObject(getStringFromWasm(p, l));
}

export function __wbindgen_number_new(i) { return addHeapObject(i); }

export function __wbindgen_number_get(n, invalid) {
    let obj = getObject(n);
    if (typeof(obj) === 'number')
        return obj;
    getUint8Memory()[invalid] = 1;
    return 0;
}

export function __wbindgen_undefined_new() { return addHeapObject(undefined); }

export function __wbindgen_null_new() {
    return addHeapObject(null);
}

export function __wbindgen_is_null(idx) {
    return getObject(idx) === null ? 1 : 0;
}

export function __wbindgen_is_undefined(idx) {
    return getObject(idx) === undefined ? 1 : 0;
}

export function __wbindgen_boolean_new(v) {
    return addHeapObject(v === 1);
}

export function __wbindgen_boolean_get(i) {
    let v = getObject(i);
    if (typeof(v) === 'boolean') {
        return v ? 1 : 0;
    } else {
        return 2;
    }
}

export function __wbindgen_symbol_new(ptr, len) {
    let a;
    if (ptr === 0) {
        a = Symbol();
    } else {
        a = Symbol(getStringFromWasm(ptr, len));
    }
    return addHeapObject(a);
}

export function __wbindgen_is_symbol(i) {
    return typeof(getObject(i)) === 'symbol' ? 1 : 0;
}

export function __wbindgen_string_get(i, len_ptr) {
    let obj = getObject(i);
    if (typeof(obj) !== 'string')
        return 0;
    const [ptr, len] = passStringToWasm(obj);
    getUint32Memory()[len_ptr / 4] = len;
    return ptr;
}

export function __wbindgen_throw(ptr, len) {
    throw new Error(getStringFromWasm(ptr, len));
}

