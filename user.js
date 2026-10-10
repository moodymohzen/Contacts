import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  serverTimestamp,
  updateDoc,
  writeBatch
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAcZ9O4p17JVr7C06k13bh2os0UNeAcsXc",
  authDomain: "contacts-fe6a3.firebaseapp.com",
  projectId: "contacts-fe6a3",
  storageBucket: "contacts-fe6a3.firebasestorage.app",
  messagingSenderId: "935301469100",
  appId: "1:935301469100:web:27cda42fe3e9b44cf3e009",
  measurementId: "G-511YL5PGVX"
};

const translations = {
  ar: {
    appName: "جهات الاتصال",
    loginTitle: "دخول المستخدم",
    loginSubtitle: "أدخل بريدك الإلكتروني وكلمة المرور لعرض جهات اتصالك",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    showPassword: "إظهار كلمة المرور",
    hidePassword: "إخفاء كلمة المرور",
    loginButton: "دخول",
    loggingIn: "جارٍ تسجيل الدخول...",
    invalidCredentials: "البريد الإلكتروني أو كلمة المرور غير صحيح.",
    loadFailed: "تعذر تحميل البيانات. تحقق من الاتصال وقواعد قراءة Firestore.",
    loginRequired: "يرجى إدخال البريد الإلكتروني وكلمة المرور.",
    myContacts: "جهات اتصالي",
    logout: "تسجيل الخروج",
    contactCount: "جهة اتصال",
    noContacts: "لا توجد جهات اتصال مرتبطة بهذا الحساب.",
    noSearchMatches: "لا توجد نتائج تطابق بحثك.",
    openContactDetails: "فتح بيانات جهة الاتصال: {name}",
    backToContacts: "العودة لجهات الاتصال",
    backToTop: "العودة إلى أعلى الصفحة",
    contactDetails: "بيانات جهة الاتصال",
    contactAddress: "العنوان",
    contactNotes: "ملاحظات",
    contactBirthday: "تاريخ الميلاد",
    contactWebsite: "الموقع الإلكتروني",
    contactCreated: "تاريخ الإضافة",
    contactType: "النوع",
    noName: "بدون اسم",
    noPhone: "لا يوجد رقم هاتف",
    call: "اتصال",
    whatsapp: "واتساب",
    saveContact: "حفظ جهة الاتصال",
    phoneLabel: "الهاتف",
    searchContacts: "ابحث في جهات اتصالك...",
    exportMyContacts: "تصدير جهات اتصالي",
    importContacts: "استيراد ملف الهاتف",
    importHelp: "اختر ملف VCF مُصدّرًا من تطبيق جهات الاتصال في هاتفك؛ سيبدأ الاستيراد بعد اختياره.",
    addContact: "إضافة جهة اتصال",
    addContactTitle: "إضافة جهة اتصال",
    addContactSubtitle: "أضف اسمًا ورقم هاتف لحفظه في قائمتك",
    contactName: "اسم جهة الاتصال",
    cancel: "إلغاء",
    saveContactAction: "حفظ جهة الاتصال",
    contactAdded: "تمت إضافة جهة الاتصال.",
    deleteContact: "حذف جهة الاتصال",
    confirmDeleteContact: "هل تريد حذف جهة الاتصال هذه نهائيًا؟",
    contactDeleted: "تم حذف جهة الاتصال.",
    contactDeleteError: "تعذر حذف جهة الاتصال. تحقق من صلاحيات قاعدة البيانات.",
    contactAddError: "تعذرت إضافة جهة الاتصال. تحقق من اتصالك وصلاحيات قاعدة البيانات.",
    importEmpty: "لم نعثر على جهات اتصال قابلة للاستيراد في الملف.",
    importFileError: "تعذرت قراءة الملف. اختر ملف VCF صالحًا.",
    importFailed: "تعذر حفظ جهات الاتصال المستوردة. تحقق من صلاحيات قاعدة البيانات.",
    importDone: "اكتمل الاستيراد: أُضيف {added} جهة اتصال وتُخطّي {skipped} مكررة.",
    importPartial: "تم استيراد {added} جهة اتصال قبل حدوث خطأ. تحقق من البيانات وأعد المحاولة.",
    importing: "جارٍ استيراد جهات الاتصال...",
    exportEmpty: "لا توجد جهات اتصال لتصديرها.",
    exportError: "تعذر تصدير جهات الاتصال.",
    changePassword: "تغيير كلمة المرور",
    passwordDialogSubtitle: "أدخل كلمة المرور الحالية ثم اختر كلمة مرور جديدة",
    currentPassword: "كلمة المرور الحالية",
    newPassword: "كلمة المرور الجديدة",
    confirmPassword: "تأكيد كلمة المرور الجديدة",
    close: "إغلاق",
    savePassword: "حفظ كلمة المرور",
    passwordIncorrect: "كلمة المرور الحالية غير صحيحة.",
    passwordMismatch: "كلمتا المرور الجديدتان غير متطابقتين.",
    passwordTooShort: "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل.",
    passwordChanged: "تم تحديث كلمة المرور.",
    passwordChangeError: "تعذر تغيير كلمة المرور. تحقق من صلاحيات قاعدة البيانات.",
    passwordWorking: "جارٍ تحديث كلمة المرور...",
    contactSearchLabel: "البحث في جهات الاتصال",
    languageButton: "English"
  },
  en: {
    appName: "Contact Manager",
    loginTitle: "User login",
    loginSubtitle: "Enter your email and password to view your contacts",
    email: "Email address",
    password: "Password",
    showPassword: "Show password",
    hidePassword: "Hide password",
    loginButton: "Sign in",
    loggingIn: "Signing in...",
    invalidCredentials: "The email address or password is incorrect.",
    loadFailed: "Unable to load data. Check the connection and Firestore read rules.",
    loginRequired: "Enter your email address and password.",
    myContacts: "My contacts",
    logout: "Sign out",
    contactCount: "contacts",
    noContacts: "There are no contacts linked to this account.",
    noSearchMatches: "No contacts match your search.",
    openContactDetails: "Open contact details: {name}",
    backToContacts: "Back to contacts",
    backToTop: "Back to top",
    contactDetails: "Contact details",
    contactAddress: "Address",
    contactNotes: "Notes",
    contactBirthday: "Birthday",
    contactWebsite: "Website",
    contactCreated: "Date added",
    contactType: "Type",
    noName: "Unnamed contact",
    noPhone: "No phone number",
    call: "Call",
    whatsapp: "WhatsApp",
    saveContact: "Save contact",
    phoneLabel: "Phone",
    searchContacts: "Search your contacts...",
    exportMyContacts: "Export my contacts",
    importContacts: "Import phone file",
    importHelp: "Choose a VCF exported from your phone's contacts app; importing starts as soon as you select it.",
    addContact: "Add contact",
    addContactTitle: "Add a contact",
    addContactSubtitle: "Enter a name and phone number to add it to your list",
    contactName: "Contact name",
    cancel: "Cancel",
    saveContactAction: "Save contact",
    contactAdded: "Contact added.",
    deleteContact: "Delete contact",
    confirmDeleteContact: "Permanently delete this contact?",
    contactDeleted: "Contact deleted.",
    contactDeleteError: "Unable to delete the contact. Check database permissions.",
    contactAddError: "Unable to add the contact. Check your connection and database permissions.",
    importEmpty: "No importable contacts were found in the file.",
    importFileError: "Unable to read this file. Choose a valid VCF file.",
    importFailed: "Unable to save imported contacts. Check database permissions.",
    importDone: "Import complete: added {added} contacts and skipped {skipped} duplicates.",
    importPartial: "Imported {added} contacts before an error. Check your data and try again.",
    importing: "Importing contacts...",
    exportEmpty: "There are no contacts to export.",
    exportError: "Unable to export contacts.",
    changePassword: "Change password",
    passwordDialogSubtitle: "Enter your current password, then choose a new one",
    currentPassword: "Current password",
    newPassword: "New password",
    confirmPassword: "Confirm new password",
    close: "Close",
    savePassword: "Save password",
    passwordIncorrect: "The current password is incorrect.",
    passwordMismatch: "The new passwords do not match.",
    passwordTooShort: "The password must be at least 8 characters long.",
    passwordChanged: "Password updated.",
    passwordChangeError: "Unable to change the password. Check database permissions.",
    passwordWorking: "Updating password...",
    contactSearchLabel: "Search contacts",
    languageButton: "العربية"
  }
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, "contactsid");
const elements = {
  loginPanel: document.querySelector("#loginPanel"),
  contactsPanel: document.querySelector("#contactsPanel"),
  loginForm: document.querySelector("#loginForm"),
  email: document.querySelector("#emailInput"),
  password: document.querySelector("#passwordInput"),
  loginButton: document.querySelector("#loginButton"),
  error: document.querySelector("#loginError"),
  togglePassword: document.querySelector("#togglePassword"),
  languageButton: document.querySelector("#languageButton"),
  welcome: document.querySelector("#welcomeHeading"),
  profileEmail: document.querySelector("#profileEmail"),
  count: document.querySelector("#contactCount"),
  contactList: document.querySelector("#contactList"),
  logoutButton: document.querySelector("#logoutButton"),
  contactSearch: document.querySelector("#contactSearch"),
  contactsListView: document.querySelector("#contactsListView"),
  contactDetailView: document.querySelector("#contactDetailView"),
  contactDetailBack: document.querySelector("#contactDetailBack"),
  contactDetailAvatar: document.querySelector("#contactDetailAvatar"),
  contactDetailName: document.querySelector("#contactDetailName"),
  contactDetailPhone: document.querySelector("#contactDetailPhone"),
  contactDetailActions: document.querySelector("#contactDetailActions"),
  contactDetailFields: document.querySelector("#contactDetailFields"),
  addContactButton: document.querySelector("#addContactButton"),
  addContactDialog: document.querySelector("#addContactDialog"),
  addContactForm: document.querySelector("#addContactForm"),
  addContactError: document.querySelector("#addContactError"),
  saveContactButton: document.querySelector("#saveContactButton"),
  importContactsButton: document.querySelector("#importContactsButton"),
  contactFileInput: document.querySelector("#contactFileInput"),
  exportMyContactsButton: document.querySelector("#exportMyContactsButton"),
  operationStatus: document.querySelector("#operationStatus"),
  changePasswordButton: document.querySelector("#changePasswordButton"),
  passwordDialog: document.querySelector("#passwordDialog"),
  passwordForm: document.querySelector("#passwordForm"),
  passwordError: document.querySelector("#passwordError"),
  savePasswordButton: document.querySelector("#savePasswordButton"),
  backToTopButton: document.querySelector("#backToTopButton")
};
let language = "ar";
let activeUser = null;
let allContacts = [];
let operationStatusMessage = null;
let selectedContactId = null;

function text(key) {
  return translations[language][key] || translations.ar[key] || key;
}

function formatMessage(key, values = {}) {
  return text(key).replace(/\{(\w+)\}/g, (match, name) => String(values[name] ?? match));
}

function setOperationStatus(key, values = {}) {
  operationStatusMessage = { key, values };
  elements.operationStatus.textContent = formatMessage(key, values);
  elements.operationStatus.hidden = false;
}

function clearStoredUserId() {
  try {
    sessionStorage.removeItem("contacts-user-id");
  } catch (error) {
    console.error("Unable to clear the remembered user session", error);
  }
}

function setLanguage(nextLanguage) {
  language = nextLanguage;
  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  document.title = language === "ar" ? "جهات الاتصال" : "Contacts";
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = text(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = text(element.dataset.i18nPlaceholder);
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    element.setAttribute("aria-label", text(element.dataset.i18nAria));
  });
  elements.languageButton.textContent = text("languageButton");
  elements.togglePassword.setAttribute("aria-label", text(elements.password.type === "password" ? "showPassword" : "hidePassword"));
  elements.togglePassword.title = text(elements.password.type === "password" ? "showPassword" : "hidePassword");
  if (operationStatusMessage) {
    elements.operationStatus.textContent = formatMessage(operationStatusMessage.key, operationStatusMessage.values);
  }
  if (activeUser) renderContacts();
  if (!elements.error.hidden) {
    elements.error.textContent = elements.error.dataset.message ? text(elements.error.dataset.message) : elements.error.textContent;
  }
}

function normalize(value) {
  return typeof value === "string" || typeof value === "number"
    ? String(value).trim().toLocaleLowerCase()
    : "";
}

function field(record, names) {
  const wanted = new Set(names.map((name) => name.toLocaleLowerCase()));
  for (const [key, value] of Object.entries(record || {})) {
    if (wanted.has(key.toLocaleLowerCase()) && (typeof value === "string" || typeof value === "number")) {
      const result = String(value).trim();
      if (result) return result;
    }
  }
  return "";
}

function userEmail(user) {
  return field(user, ["email", "mail"]);
}

function userPassword(user) {
  for (const [key, value] of Object.entries(user || {})) {
    if (key.toLocaleLowerCase() === "password" && typeof value === "string") return value;
  }
  return "";
}

function userName(user) {
  return field(user, ["name", "fullName", "displayName", "username", "userName", "firstName"]) || text("appName");
}

function identitySet(userId, user) {
  const values = [userId];
  for (const [key, value] of Object.entries(user)) {
    if (["userid", "uid", "username", "user", "email", "mail"].includes(key.toLocaleLowerCase())) {
      values.push(value);
    }
  }
  return new Set(values.map(normalize).filter(Boolean));
}

function linkedContacts(userId, user, contacts) {
  const identities = identitySet(userId, user);
  return contacts.filter(({ data }) => Object.entries(data).some(([key, value]) => {
    if (!["userid", "uid", "username", "user", "ownerid", "ownername", "createdby", "createdbyname", "useremail", "owneremail", "usermail"].includes(key.toLocaleLowerCase())) {
      return false;
    }
    const contactIdentity = normalize(value);
    return contactIdentity && identities.has(contactIdentity);
  }));
}

function phoneValue(contact) {
  return field(contact, ["phone", "phoneNumber", "mobile", "telephone"]).replace(/^tel:/i, "");
}

function phoneDigits(phone) {
  return phone.replace(/\D/g, "");
}

function vCardValue(value) {
  return String(value || "")
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function contactVCard(contact) {
  const name = field(contact, ["name", "fullName", "displayName"]) || text("noName");
  const phone = phoneValue(contact);
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${vCardValue(name)}`,
    `N:${vCardValue(name)};;;;`,
    ...(phone ? [`TEL;TYPE=CELL:${vCardValue(phone)}`] : []),
    "END:VCARD",
    ""
  ].join("\r\n");
}

function downloadVCard(cards, fileName) {
  const url = URL.createObjectURL(new Blob([cards.join("")], { type: "text/vcard;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function saveVCard(contact) {
  const name = field(contact, ["name", "fullName", "displayName"]) || text("noName");
  downloadVCard([contactVCard(contact)], `${name.replace(/[\\/:*?"<>|]/g, "_")}.vcf`);
}

async function deleteContact(contactId) {
  if (!activeUser || !window.confirm(text("confirmDeleteContact"))) return;
  try {
    await deleteDoc(doc(db, "contacts", contactId));
    allContacts = allContacts.filter(({ id }) => id !== contactId);
    if (selectedContactId === contactId) {
      selectedContactId = null;
      elements.contactDetailView.hidden = true;
      elements.contactsListView.hidden = false;
    }
    renderContacts();
    setOperationStatus("contactDeleted");
  } catch (error) {
    console.error("Unable to delete contact", error);
    setOperationStatus("contactDeleteError");
  }
}

function unescapeVCard(value) {
  return value
    .replace(/\\n/gi, "\n")
    .replace(/\\([,;:\\])/g, "$1");
}

function decodeVCardText(value, parameters) {
  const encoding = parameters.match(/(?:^|;)ENCODING="?([^";]+)"?/i)?.[1]?.toLocaleUpperCase();
  const charset = parameters.match(/(?:^|;)CHARSET="?([^";]+)"?/i)?.[1] || "UTF-8";
  if (encoding !== "QUOTED-PRINTABLE" && encoding !== "QP") {
    return unescapeVCard(value);
  }

  const bytes = [];
  for (let index = 0; index < value.length;) {
    if (value[index] === "=" && /^[\da-f]{2}$/i.test(value.slice(index + 1, index + 3))) {
      bytes.push(Number.parseInt(value.slice(index + 1, index + 3), 16));
      index += 3;
      continue;
    }
    const character = String.fromCodePoint(value.codePointAt(index));
    bytes.push(...new TextEncoder().encode(character));
    index += character.length;
  }

  try {
    return unescapeVCard(new TextDecoder(charset).decode(new Uint8Array(bytes)));
  } catch (error) {
    console.warn(`Unsupported vCard character set "${charset}", falling back to UTF-8.`, error);
    return unescapeVCard(new TextDecoder("utf-8").decode(new Uint8Array(bytes)));
  }
}

async function readVCardFile(file) {
  const bytes = new Uint8Array(await file.arrayBuffer());
  if (bytes.length >= 2 && bytes[0] === 0xff && bytes[1] === 0xfe) {
    return new TextDecoder("utf-16le").decode(bytes.subarray(2));
  }
  if (bytes.length >= 2 && bytes[0] === 0xfe && bytes[1] === 0xff) {
    return new TextDecoder("utf-16be").decode(bytes.subarray(2));
  }
  return new TextDecoder("utf-8").decode(bytes);
}

function parseVCardFile(contents) {
  const lines = contents.replace(/^\uFEFF/, "").replace(/\r\n?/g, "\n").replace(/=\n[ \t]?/g, "").split("\n");
  const unfolded = [];
  for (const line of lines) {
    if (/^[ \t]/.test(line) && unfolded.length) {
      unfolded[unfolded.length - 1] += line.slice(1);
    } else {
      unfolded.push(line);
    }
  }

  const contacts = [];
  let current = null;
  for (const line of unfolded) {
    const trimmed = line.trim();
    if (trimmed.toLocaleUpperCase() === "BEGIN:VCARD") {
      current = { name: "", phone: "" };
      continue;
    }
    if (!current) continue;
    if (trimmed.toLocaleUpperCase() === "END:VCARD") {
      if (!current.name && current.familyName) current.name = current.familyName;
      if (!current.name && current.phone) current.name = current.phone;
      if (current.name) contacts.push({ name: current.name, phone: current.phone });
      current = null;
      continue;
    }

    const separator = trimmed.indexOf(":");
    if (separator < 0) continue;
    const propertyAndParameters = trimmed.slice(0, separator);
    const [groupedProperty, ...parameterParts] = propertyAndParameters.split(";");
    const property = groupedProperty.split(".").pop().toLocaleUpperCase();
    const value = decodeVCardText(trimmed.slice(separator + 1).trim(), `;${parameterParts.join(";")}`);
    if (property === "FN" && value) {
      current.name = value;
    } else if (property === "N" && value && !current.name) {
      const [family, given] = value.split(";");
      current.familyName = [given, family].filter(Boolean).join(" ").trim();
    } else if (property === "TEL" && value && !current.phone) {
      current.phone = value.replace(/^tel:/i, "");
    }
  }
  return contacts;
}

function contactKey(contact) {
  const name = field(contact, ["name", "fullName", "displayName"]).toLocaleLowerCase();
  return `${name}|${phoneDigits(phoneValue(contact))}`;
}

async function importVCardFile(file) {
  elements.importContactsButton.disabled = true;
  elements.contactFileInput.disabled = true;
  setOperationStatus("importing");
  let committed = 0;
  try {
    if (!activeUser) throw new Error("No active user");
    const parsed = parseVCardFile(await readVCardFile(file));
    if (!parsed.length) {
      setOperationStatus("importEmpty");
      return;
    }

    const userContacts = linkedContacts(activeUser.id, activeUser.data, allContacts);
    const known = new Set(userContacts.map(({ data }) => contactKey(data)));
    const unique = [];
    let skipped = 0;
    for (const contact of parsed) {
      const key = contactKey(contact);
      if (known.has(key)) {
        skipped += 1;
        continue;
      }
      known.add(key);
      unique.push(contact);
    }

    for (let start = 0; start < unique.length; start += 450) {
      const batch = writeBatch(db);
      const newContacts = unique.slice(start, start + 450).map((contact) => {
        const reference = doc(collection(db, "contacts"));
        const data = { name: contact.name, phone: contact.phone, userId: activeUser.id, createdAt: serverTimestamp() };
        batch.set(reference, data);
        return { id: reference.id, data };
      });
      await batch.commit();
      allContacts.push(...newContacts);
      committed += newContacts.length;
    }
    renderContacts();
    setOperationStatus("importDone", { added: committed, skipped });
  } catch (error) {
    console.error("Unable to import contact file", error);
    if (committed) {
      renderContacts();
      setOperationStatus("importPartial", { added: committed });
    } else {
      setOperationStatus("importFailed");
    }
  } finally {
    elements.importContactsButton.disabled = false;
    elements.contactFileInput.disabled = false;
    elements.contactFileInput.value = "";
  }
}

function makeAction(label, path, href, className = "") {
  const link = document.createElement("a");
  link.setAttribute("aria-label", label);
  link.title = label;
  if (className) link.className = className;
  if (href) {
    link.href = href;
    if (href.startsWith("https://")) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
  } else {
    link.href = "#";
  }
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("aria-hidden", "true");
  const shape = document.createElementNS("http://www.w3.org/2000/svg", "path");
  shape.setAttribute("d", path);
  svg.append(shape);
  link.append(svg);
  return link;
}

function makeDeleteButton(contactId) {
  const button = document.createElement("button");
  button.type = "button";
  button.setAttribute("aria-label", text("deleteContact"));
  button.title = text("deleteContact");
  button.className = "delete-contact";
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("aria-hidden", "true");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", "M3 6h18M8 6V4h8v2m3 0-1 14H6L5 6m4 4v6m6-6v6");
  svg.append(path);
  button.append(svg);
  button.addEventListener("click", () => deleteContact(contactId));
  return button;
}

function safeContactValue(value) {
  if (value == null || value === "") return "";
  if (typeof value.toDate === "function") return value.toDate().toLocaleString(language === "ar" ? "ar" : "en");
  if (value instanceof Date) return value.toLocaleString(language === "ar" ? "ar" : "en");
  if (Array.isArray(value)) return value.map(safeContactValue).filter(Boolean).join(", ");
  if (typeof value === "object") {
    const visible = Object.fromEntries(Object.entries(value)
      .filter(([key]) => !hiddenContactField(key))
      .map(([key, nestedValue]) => [key, safeContactValue(nestedValue)]));
    return Object.keys(visible).length ? JSON.stringify(visible, null, 2) : "";
  }
  return String(value);
}

function hiddenContactField(key) {
  const normalized = key.toLocaleLowerCase().replace(/[^a-z0-9]/g, "");
  return [
    "id", "userid", "uid", "ownerid", "ownername", "createdby", "createdbyname",
    "useremail", "owneremail", "usermail", "password"
  ].includes(normalized) || normalized.includes("email") || normalized.includes("mail") ||
    normalized.includes("company") || normalized === "organization" || normalized === "org";
}

function contactFieldLabel(key) {
  const normalized = key.toLocaleLowerCase().replace(/[^a-z0-9]/g, "");
  const labels = {
    address: "contactAddress",
    homeaddress: "contactAddress",
    workaddress: "contactAddress",
    notes: "contactNotes",
    note: "contactNotes",
    birthday: "contactBirthday",
    website: "contactWebsite",
    url: "contactWebsite",
    createdat: "contactCreated",
    type: "contactType",
    phone: "phoneLabel",
    phonenumber: "phoneLabel",
    mobile: "phoneLabel",
    telephone: "phoneLabel",
    name: "contactName",
    fullname: "contactName",
    displayname: "contactName"
  };
  return labels[normalized] ? text(labels[normalized]) : key;
}

function detailActionGroup(contact) {
  const group = document.createElement("div");
  group.className = "contact-detail-action-group";
  const phone = phoneValue(contact.data);
  if (phone) {
    group.append(makeAction(text("call"), "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.84.58 2.8.7A2 2 0 0 1 22 16.92Z", `tel:${phone}`));
    const digits = phoneDigits(phone);
    if (digits) {
      group.append(makeAction(text("whatsapp"), "M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z", `https://wa.me/${digits}`, "whatsapp"));
    }
  }
  const save = makeAction(text("saveContact"), "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2ZM17 21v-8H7v8M7 3v5h8", "");
  save.addEventListener("click", (event) => {
    event.preventDefault();
    saveVCard(contact.data);
  });
  group.append(save, makeDeleteButton(contact.id));
  return group;
}

function renderContactDetails() {
  const contact = allContacts.find(({ id }) => id === selectedContactId);
  if (!contact) {
    selectedContactId = null;
    elements.contactDetailView.hidden = true;
    elements.contactsListView.hidden = false;
    return;
  }
  const { data } = contact;
  const name = field(data, ["name", "fullName", "displayName"]) || text("noName");
  const phone = phoneValue(data);
  elements.contactDetailAvatar.textContent = name.slice(0, 1).toLocaleUpperCase();
  elements.contactDetailName.textContent = name;
  elements.contactDetailPhone.textContent = phone || text("noPhone");
  elements.contactDetailPhone.dir = phone ? "ltr" : "auto";
  elements.contactDetailPhone.classList.toggle("phone-number", Boolean(phone));
  elements.contactDetailActions.replaceChildren(detailActionGroup(contact));
  elements.contactDetailFields.replaceChildren();

  for (const [key, value] of Object.entries(data)) {
    const normalized = key.toLocaleLowerCase().replace(/[^a-z0-9]/g, "");
    if (hiddenContactField(key) || ["name", "fullname", "displayname", "phone", "phonenumber", "mobile", "telephone"].includes(normalized)) {
      continue;
    }
    const formatted = safeContactValue(value);
    if (!formatted) continue;
    const row = document.createElement("div");
    row.className = "contact-detail-field";
    const label = document.createElement("span");
    label.className = "contact-detail-label";
    label.textContent = contactFieldLabel(key);
    const valueElement = document.createElement("span");
    valueElement.className = "contact-detail-value";
    valueElement.textContent = formatted;
    row.append(label, valueElement);
    elements.contactDetailFields.append(row);
  }

  if (phone) {
    const row = document.createElement("div");
    row.className = "contact-detail-field";
    const label = document.createElement("span");
    label.className = "contact-detail-label";
    label.textContent = text("phoneLabel");
    const value = document.createElement("a");
    value.className = "contact-detail-value phone-number";
    value.href = `tel:${phone}`;
    value.dir = "ltr";
    value.textContent = phone;
    row.append(label, value);
    elements.contactDetailFields.prepend(row);
  }
}

function renderContacts() {
  if (!activeUser) return;
  const results = linkedContacts(activeUser.id, activeUser.data, allContacts);
  const query = normalize(elements.contactSearch.value);
  const filtered = results.filter(({ data }) =>
    [field(data, ["name", "fullName", "displayName"]), phoneValue(data)]
      .some((value) => normalize(value).includes(query))
  );
  elements.welcome.textContent = userName(activeUser.data);
  elements.profileEmail.textContent = userEmail(activeUser.data);
  elements.count.textContent = String(results.length);
  elements.contactList.replaceChildren();
  if (selectedContactId) {
    elements.contactsListView.hidden = true;
    elements.contactDetailView.hidden = false;
    renderContactDetails();
    return;
  }
  elements.contactsListView.hidden = false;
  elements.contactDetailView.hidden = true;

  if (!filtered.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = results.length ? text("noSearchMatches") : text("noContacts");
    elements.contactList.append(empty);
    return;
  }

  for (const contact of filtered) {
    const { id, data } = contact;
    const name = field(data, ["name", "fullName", "displayName"]) || text("noName");
    const phone = phoneValue(data);
    const card = document.createElement("article");
    card.className = "contact-card";

    const heading = document.createElement("div");
    heading.className = "contact-card-heading";
    const avatar = document.createElement("span");
    avatar.className = "contact-avatar";
    avatar.setAttribute("aria-hidden", "true");
    avatar.textContent = name.slice(0, 1).toLocaleUpperCase();
    const contactName = document.createElement("span");
    contactName.className = "contact-name";
    contactName.textContent = name;
    const openButton = document.createElement("button");
    openButton.type = "button";
    openButton.className = "contact-open";
    openButton.setAttribute("aria-label", formatMessage("openContactDetails", { name }));
    openButton.addEventListener("click", () => {
      selectedContactId = id;
      renderContacts();
      elements.contactDetailBack.focus();
    });

    const actions = document.createElement("div");
    actions.className = "contact-actions";
    if (phone) {
      actions.append(makeAction(text("call"), "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.84.58 2.8.7A2 2 0 0 1 22 16.92Z", `tel:${phone}`));
      const digits = phoneDigits(phone);
      if (digits) {
        actions.append(makeAction(text("whatsapp"), "M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z", `https://wa.me/${digits}`, "whatsapp"));
      }
    }
    const saveButton = makeAction(text("saveContact"), "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2ZM17 21v-8H7v8M7 3v5h8", "");
    saveButton.addEventListener("click", (event) => {
      event.preventDefault();
      saveVCard(data);
    });
    const deleteButton = makeDeleteButton(id);
    actions.append(saveButton, deleteButton);
    heading.append(avatar, contactName, actions);

    const phoneLine = document.createElement("p");
    phoneLine.className = "contact-phone";
    if (phone) {
      const phoneLink = document.createElement("a");
      phoneLink.href = `tel:${phone}`;
      phoneLink.className = "phone-number";
      phoneLink.dir = "ltr";
      phoneLink.textContent = phone;
      const label = document.createElement("span");
      label.textContent = `${text("phoneLabel")}: `;
      phoneLine.append(label, phoneLink);
    } else {
      phoneLine.textContent = text("noPhone");
    }
    card.append(openButton, heading, phoneLine);
    elements.contactList.append(card);
  }
}

function showError(messageKey) {
  elements.error.dataset.message = messageKey;
  elements.error.textContent = text(messageKey);
  elements.error.hidden = false;
}

function openUserSession(user, contacts) {
  activeUser = user;
  allContacts = contacts;
  elements.contactSearch.value = "";
  operationStatusMessage = null;
  elements.operationStatus.hidden = true;
  renderContacts();
  elements.loginForm.reset();
  elements.loginPanel.hidden = true;
  elements.contactsPanel.hidden = false;
}

elements.loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  elements.error.hidden = true;
  delete elements.error.dataset.message;
  const email = elements.email.value.trim().toLocaleLowerCase();
  const password = elements.password.value;
  if (!email || !password) {
    showError("loginRequired");
    return;
  }

  elements.loginButton.disabled = true;
  elements.loginButton.textContent = text("loggingIn");
  try {
    const [usersSnapshot, contactsSnapshot] = await Promise.all([
      getDocs(collection(db, "users")),
      getDocs(collection(db, "contacts"))
    ]);
    const users = usersSnapshot.docs.map((document) => ({ id: document.id, data: document.data() }));
    const user = users.find(({ data }) =>
      userEmail(data).toLocaleLowerCase() === email && userPassword(data) === password
    );
    if (!user) {
      showError("invalidCredentials");
      return;
    }

    const contacts = contactsSnapshot.docs.map((document) => ({ id: document.id, data: document.data() }));
    try {
      sessionStorage.setItem("contacts-user-id", user.id);
    } catch (storageError) {
      console.error("Unable to persist the signed-in user for page refresh", storageError);
    }
    openUserSession(user, contacts);
  } catch (error) {
    console.error("Unable to load user contact data", error);
    showError("loadFailed");
  } finally {
    elements.loginButton.disabled = false;
    elements.loginButton.textContent = text("loginButton");
  }
});

elements.togglePassword.addEventListener("click", () => {
  const showing = elements.password.type === "password";
  elements.password.type = showing ? "text" : "password";
  const label = text(showing ? "hidePassword" : "showPassword");
  elements.togglePassword.setAttribute("aria-label", label);
  elements.togglePassword.title = label;
});

elements.languageButton.addEventListener("click", () => {
  setLanguage(language === "ar" ? "en" : "ar");
});

function updateBackToTopButton() {
  elements.backToTopButton.hidden = window.scrollY < 320;
}

window.addEventListener("scroll", updateBackToTopButton, { passive: true });
elements.backToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

elements.logoutButton.addEventListener("click", () => {
  clearStoredUserId();
  elements.contactsPanel.hidden = true;
  elements.loginPanel.hidden = false;
  elements.contactList.replaceChildren();
  elements.welcome.textContent = "";
  elements.profileEmail.textContent = "";
  elements.count.textContent = "0";
  elements.contactSearch.value = "";
  allContacts = [];
  activeUser = null;
  selectedContactId = null;
  operationStatusMessage = null;
  elements.operationStatus.hidden = true;
  elements.password.value = "";
  elements.error.hidden = true;
  elements.email.focus();
});

elements.contactSearch.addEventListener("input", renderContacts);
elements.contactDetailBack.addEventListener("click", () => {
selectedContactId = null;
renderContacts();
});

elements.addContactButton.addEventListener("click", () => {
  elements.addContactForm.reset();
  elements.addContactError.hidden = true;
  elements.addContactDialog.showModal();
});

elements.addContactForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!activeUser) return;
  elements.addContactError.hidden = true;
  elements.saveContactButton.disabled = true;
  try {
    const formData = new FormData(elements.addContactForm);
    const contact = {
      name: String(formData.get("name") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      userId: activeUser.id,
      createdAt: serverTimestamp()
    };
    if (!contact.name) return;
    const saved = await addDoc(collection(db, "contacts"), contact);
    allContacts.push({ id: saved.id, data: contact });
    renderContacts();
    elements.addContactDialog.close();
    setOperationStatus("contactAdded");
  } catch (error) {
    console.error("Unable to add contact", error);
    elements.addContactError.textContent = text("contactAddError");
    elements.addContactError.hidden = false;
  } finally {
    elements.saveContactButton.disabled = false;
  }
});

elements.importContactsButton.addEventListener("click", () => {
  elements.contactFileInput.click();
});

elements.contactFileInput.addEventListener("change", async () => {
  const [file] = elements.contactFileInput.files || [];
  if (!file) return;
  if (!file.name.toLocaleLowerCase().endsWith(".vcf") && file.type !== "text/vcard") {
    setOperationStatus("importFileError");
    elements.contactFileInput.value = "";
    return;
  }
  await importVCardFile(file);
});

elements.exportMyContactsButton.addEventListener("click", () => {
  try {
    if (!activeUser) return;
    const contacts = linkedContacts(activeUser.id, activeUser.data, allContacts);
    if (!contacts.length) {
      setOperationStatus("exportEmpty");
      return;
    }
    downloadVCard(contacts.map(({ data }) => contactVCard(data)), "my-contacts.vcf");
  } catch (error) {
    console.error("Unable to export user contacts", error);
    setOperationStatus("exportError");
  }
});

elements.changePasswordButton.addEventListener("click", () => {
  elements.passwordForm.reset();
  elements.passwordError.hidden = true;
  elements.passwordDialog.showModal();
});

elements.passwordForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!activeUser) return;
  const formData = new FormData(elements.passwordForm);
  const currentPassword = String(formData.get("currentPassword") || "");
  const newPassword = String(formData.get("newPassword") || "");
  const confirmPassword = String(formData.get("confirmPassword") || "");
  const storedPassword = userPassword(activeUser.data);
  let validationError = "";

  if (currentPassword !== storedPassword) validationError = "passwordIncorrect";
  else if (newPassword.length < 8) validationError = "passwordTooShort";
  else if (newPassword !== confirmPassword) validationError = "passwordMismatch";

  if (validationError) {
    elements.passwordError.textContent = text(validationError);
    elements.passwordError.hidden = false;
    return;
  }

  elements.passwordError.hidden = true;
  elements.savePasswordButton.disabled = true;
  elements.savePasswordButton.textContent = text("passwordWorking");
  try {
    const passwordKey = Object.keys(activeUser.data).find((key) => key.toLocaleLowerCase() === "password") || "password";
    await updateDoc(doc(db, "users", activeUser.id), { [passwordKey]: newPassword });
    activeUser.data[passwordKey] = newPassword;
    elements.passwordDialog.close();
    elements.passwordForm.reset();
    setOperationStatus("passwordChanged");
  } catch (error) {
    console.error("Unable to update user password", error);
    elements.passwordError.textContent = text("passwordChangeError");
    elements.passwordError.hidden = false;
  } finally {
    elements.savePasswordButton.disabled = false;
    elements.savePasswordButton.textContent = text("savePassword");
  }
});

document.querySelectorAll("[data-close-dialog]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(`#${button.dataset.closeDialog}`).close();
  });
});

async function restoreSession() {
  let userId = "";
  try {
    userId = sessionStorage.getItem("contacts-user-id") || "";
  } catch (error) {
    console.error("Unable to restore the signed-in user", error);
    return;
  }
  if (!userId) return;

  try {
    const [usersSnapshot, contactsSnapshot] = await Promise.all([
      getDocs(collection(db, "users")),
      getDocs(collection(db, "contacts"))
    ]);
    const userDocument = usersSnapshot.docs.find((document) => document.id === userId);
    if (!userDocument) {
      clearStoredUserId();
      return;
    }
    const user = { id: userDocument.id, data: userDocument.data() };
    const contacts = contactsSnapshot.docs.map((document) => ({ id: document.id, data: document.data() }));
    openUserSession(user, contacts);
  } catch (error) {
    console.error("Unable to reload signed-in user contacts", error);
    showError("loadFailed");
  }
}

setLanguage(language);
updateBackToTopButton();
restoreSession();
